/**
 * Executable Ingestion Runner for Lavender Hill Studio Embodied RAG
 * Run via: npx tsx scripts/run-rag-ingest.ts
 */

import path from 'path';
import dotenv from 'dotenv';
import { EmbodiedRagPipeline } from '../src/rag/ingestionPipeline';

dotenv.config();

async function main() {
  console.log('================================================================');
  console.log('Lavender Hill Studio — Dual-Notebook RAG Pipeline (Phase 1)');
  console.log('Target Architecture: Offline-First SQLite • Dolphin Security');
  console.log('Hardware Target: Samsung Galaxy Tab S10 Ultra & Windows 11');
  console.log('================================================================\n');

  const dbPath = path.resolve(process.cwd(), 'storage', 'lavenderhill_rag.db');
  const knowledgeDir = path.resolve(process.cwd(), 'ai_training_context');

  const pipeline = new EmbodiedRagPipeline({
    dbPath,
    chunkSizeChars: 1000,
    chunkOverlapChars: 150,
    embeddingOptions: {
      model: 'gemini-embedding-2-preview'
    }
  });

  console.log(`[Database] Initialized SQLite database at: ${dbPath}`);
  console.log(`[Source] Ingesting knowledge base from: ${knowledgeDir}`);

  if (process.env.GEMINI_API_KEY) {
    // 1. Ingest Strategic Knowledge Files
    const stats = await pipeline.ingestDirectory(knowledgeDir);
    console.log(`\n[Ingestion Summary] Strategic Chunks Processed: ${stats.processed}, Failed: ${stats.failed}`);

    // 2. Ingest 3D WebGL Kinetic & UI Ops Elements into notebook_ui_ops
    console.log('\n[UI Ops] Ingesting 3D WebGL Kinetics & Interactive DOM Specifications...');
    const uiOpsElements = [
      {
        id: 'UI_SPATIAL_HOLOGRAM_45DEG',
        partition: 'notebook_ui_ops' as const,
        content: 'Spatial Hologram Lab 45-degree isometric projection stage. Toni strategic neurodivergent side-by-side positioning, laser emitter concentric rings, volumetric light cone shader, and quantum orbit nodes at 60 FPS.',
        tokenEstimate: 45,
        metadata: {
          componentName: 'SpatialHologramLab',
          interactionType: 'webgl_kinetic' as const,
          spatialAnchor: '45_deg_side_by_side' as const,
          perspectiveZ: 1.2,
          rotationTheta: 45.0,
          category: 'hologram_shader' as const,
          extra: { shaderMode: 'laser_concentric_crt', frameTargetFps: 60 }
        }
      },
      {
        id: 'UI_SPATIAL_HOLOGRAM_0DEG',
        partition: 'notebook_ui_ops' as const,
        content: 'Direct frontal avatar projection at 0 degrees for Elysian ethical guardian. Crystalline aura shaders, frontal focus eye contact, zero lateral angle, and depth scalar 1.0x.',
        tokenEstimate: 38,
        metadata: {
          componentName: 'SpatialHologramLab',
          interactionType: 'webgl_kinetic' as const,
          spatialAnchor: '0_deg_direct' as const,
          perspectiveZ: 1.0,
          rotationTheta: 0.0,
          category: 'hologram_shader' as const,
          extra: { shaderMode: 'crystalline_aura', frameTargetFps: 60 }
        }
      },
      {
        id: 'UI_AUDIO_SYNTH_432HZ',
        partition: 'notebook_ui_ops' as const,
        content: 'Web Audio API Solfeggio frequency tone generator at 432 Hz and 528 Hz for sensory cadence and daily affirmation resonance. Zero audio buffer underrun with soft exponential ramps.',
        tokenEstimate: 42,
        metadata: {
          componentName: 'DailyAffirmation',
          interactionType: 'gesture_event' as const,
          category: 'audio_synthesizer' as const,
          extra: { baseFrequency: 432, targetGain: 0.15 }
        }
      }
    ];

    for (const el of uiOpsElements) {
      await pipeline.ingestChunk(el);
      console.log(` - Ingested UI Ops: ${el.id} (${el.metadata.componentName})`);
    }

    // 3. Test High-Speed Zero-Latency Vector Query
    console.log('\n[Zero-Latency Retrieval Benchmark (Samsung Galaxy Tab S10 Ultra Profile)]');
    const t0 = performance.now();
    const testEmbedding = await pipeline['uiOpsMemoryCache'].values().next().value?.embedding;
    if (testEmbedding) {
      const queryResults = pipeline.queryUiOps(testEmbedding, 2);
      const latencyMs = (performance.now() - t0).toFixed(3);
      console.log(` - In-Memory Float32 Cosine Search Latency: ${latencyMs} ms (Target < 16.6ms for 60 FPS)`);
      console.log(` - Top Result: ${queryResults[0]?.id} (Similarity: ${(queryResults[0]?.similarity * 100).toFixed(1)}%)`);
    }
  } else {
    console.warn('\n[Notice] GEMINI_API_KEY is not set in environment.');
    console.warn('[Notice] The pipeline structure, SQLite tables, and vector schemas are ready.');
    console.warn('[Notice] Provide GEMINI_API_KEY in .env to run embedding generation.');
  }

  pipeline.close();
}

if (process.argv[1]?.includes('run-rag-ingest')) {
  main().catch(console.error);
}

export { main };
