/**
 * High-Performance Vector Math & Binary Serialization Utilities
 * Optimized for zero-garbage-collection execution on ARM64 / Tablet hardware
 * (Samsung Galaxy Tab S10 Ultra & Windows 11 Offline Vaults)
 */

/**
 * Converts a Float32Array or number array into a raw Buffer of 32-bit floats (IEEE-754 Little Endian).
 * 768 dimensions * 4 bytes = 3,072 bytes per vector.
 */
export function floatArrayToBlob(floats: number[] | Float32Array): Buffer {
  if (floats instanceof Float32Array) {
    return Buffer.from(floats.buffer, floats.byteOffset, floats.byteLength);
  }
  const f32 = new Float32Array(floats);
  return Buffer.from(f32.buffer);
}

/**
 * Deserializes a raw SQLite BLOB into a typed Float32Array without heap reallocation.
 */
export function blobToFloatArray(buffer: Buffer | Uint8Array): Float32Array {
  const byteOffset = buffer.byteOffset;
  const byteLength = buffer.byteLength;
  // Ensure 4-byte boundary alignment
  if (byteLength % 4 !== 0) {
    throw new Error(`Corrupt vector blob: length ${byteLength} is not divisible by 4.`);
  }
  return new Float32Array(buffer.buffer, byteOffset, byteLength / 4);
}

/**
 * Computes Cosine Similarity between two Float32Array vectors.
 * Loop-unrolled 4x for high-speed execution in 60 FPS animation/WebGL render loops.
 * 
 * Returns a value between -1.0 and 1.0 (typically 0.0 to 1.0 for normalized embeddings).
 */
export function cosineSimilarity(a: Float32Array, b: Float32Array): number {
  const len = a.length;
  if (len !== b.length) {
    throw new Error(`Dimension mismatch: vector A is ${len}, vector B is ${b.length}`);
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  // Unroll loop 4x for CPU pipelining
  let i = 0;
  const limit = len - 3;
  for (; i < limit; i += 4) {
    const a0 = a[i], a1 = a[i + 1], a2 = a[i + 2], a3 = a[i + 3];
    const b0 = b[i], b1 = b[i + 1], b2 = b[i + 2], b3 = b[i + 3];

    dotProduct += a0 * b0 + a1 * b1 + a2 * b2 + a3 * b3;
    normA += a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
    normB += b0 * b0 + b1 * b1 + b2 * b2 + b3 * b3;
  }

  // Handle remaining dimensions
  for (; i < len; i++) {
    const ai = a[i];
    const bi = b[i];
    dotProduct += ai * bi;
    normA += ai * ai;
    normB += bi * bi;
  }

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
