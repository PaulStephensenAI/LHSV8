/**
 * Strict Google Gemini Embedding Utility for Offline-First RAG
 * Utilizes @google/genai SDK with exponential backoff, batching,
 * and Dolphin Security enforcement (no cloud vector DB transit).
 */

import { GoogleGenAI } from '@google/genai';
import { EmbeddingOptions } from './types';

let cachedClient: GoogleGenAI | null = null;

/**
 * Lazy-initializes the GoogleGenAI client using process.env.GEMINI_API_KEY.
 * Fails fast with clear architectural feedback if the key is missing.
 */
export function getGeminiClient(): GoogleGenAI {
  if (!cachedClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        'Dolphin Security Invariant Check Failed: GEMINI_API_KEY is not defined in environment.'
      );
    }
    cachedClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'lavender-hill-embodied-rag',
        },
      },
    });
  }
  return cachedClient;
}

/**
 * Converts a single text snippet into a high-dimensional Float32Array vector embedding
 * using Google's text-embedding models (default: text-embedding-004, 768 dimensions).
 */
export async function generateGeminiEmbedding(
  text: string,
  options: EmbeddingOptions = {}
): Promise<Float32Array> {
  const cleanText = text.trim();
  if (!cleanText) {
    throw new Error('Cannot generate embedding for empty text content.');
  }

  const model = options.model || 'gemini-embedding-2-preview';
  const maxRetries = options.maxRetries ?? 3;
  const initialDelayMs = options.retryDelayMs ?? 1000;

  const ai = getGeminiClient();

  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const response = await ai.models.embedContent({
        model,
        contents: cleanText,
        config: {
          outputDimensionality: 768,
        },
      });

      // Handle response structure in @google/genai SDK
      let values: number[] | undefined;
      
      const anyResp = response as any;
      if (Array.isArray(anyResp.embeddings) && anyResp.embeddings[0]?.values) {
        values = anyResp.embeddings[0].values;
      } else if (anyResp.embedding?.values) {
        values = anyResp.embedding.values;
      } else if (Array.isArray(anyResp.values)) {
        values = anyResp.values;
      }

      if (!values || values.length === 0) {
        throw new Error(`Embedding model (${model}) returned an empty vector.`);
      }

      return new Float32Array(values);
    } catch (err: any) {
      attempt++;
      const isRateLimited = err?.status === 429 || err?.message?.includes('RESOURCE_EXHAUSTED');
      const isTransient = err?.status >= 500 || err?.code === 'ECONNRESET';

      if ((isRateLimited || isTransient) && attempt < maxRetries) {
        const delay = initialDelayMs * Math.pow(2, attempt - 1);
        console.warn(`[GeminiEmbedding] Retryable error (${err?.message || err}). Backing off ${delay}ms (attempt ${attempt}/${maxRetries})...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw new Error(`Failed to generate embedding with ${model} after ${attempt} attempts: ${err?.message || err}`);
      }
    }
  }

  throw new Error(`Failed to generate embedding after ${maxRetries} attempts.`);
}

/**
 * Batch-embeds a list of texts with sequential rate-limiting to preserve quotas
 * and avoid memory spikes on ARM64 mobile hardware.
 */
export async function batchGenerateGeminiEmbeddings(
  texts: string[],
  options: EmbeddingOptions = {}
): Promise<Float32Array[]> {
  const batchSize = options.batchSize ?? 5;
  const results: Float32Array[] = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const batchPromises = batch.map((txt) => generateGeminiEmbedding(txt, options));
    const batchVectors = await Promise.all(batchPromises);
    results.push(...batchVectors);

    // Yield to event loop to allow UI/WebGL frames to render smoothly
    if (i + batchSize < texts.length) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }

  return results;
}
