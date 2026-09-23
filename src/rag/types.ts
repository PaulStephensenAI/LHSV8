/**
 * Lavender Hill Studio — Embodied RAG Type Definitions
 * Phase 1 Offline-First Dual-Notebook Partitioning
 * Enforces Dolphin Security: 100% Local Storage, Zero Cloud Vector DBs
 */

export type NotebookPartition = 'notebook_ui_ops' | 'notebook_strategic';

export interface UiOpsMetadata {
  componentName: string;
  interactionType: 'dom_node' | 'webgl_kinetic' | 'spatial_anchor' | 'gesture_event' | 'form_interaction';
  spatialAnchor?: '45_deg_side_by_side' | '0_deg_direct' | '60_deg_workbench' | '30_deg_cadence';
  perspectiveZ?: number;
  rotationTheta?: number;
  category: 'navigation' | 'hologram_shader' | 'audio_synthesizer' | 'theme' | 'layout' | 'commercial_planner' | 'session_runtime_state';
  extra?: Record<string, unknown>;
}

export interface StrategicMetadata {
  domain: 'aiee_ethics' | 'clinical_governance' | 'founder_ethos' | 'business_model' | 'persona_dossier';
  companionAffinity?: 'toni' | 'elysian' | 'kenny' | 'holly' | 'phoebe' | 'ari';
  documentTitle: string;
  sourceFile: string;
  chunkIndex: number;
  invariantRule?: string;
  auditStandard?: string;
  isCertified?: boolean;
  tags?: string[];
}

export interface IngestionChunk<T = UiOpsMetadata | StrategicMetadata> {
  id: string;
  partition: NotebookPartition;
  content: string;
  metadata: T;
  tokenEstimate: number;
}

export interface IngestedVectorRecord<T = UiOpsMetadata | StrategicMetadata> {
  id: string;
  partition: NotebookPartition;
  content: string;
  embedding: Float32Array; // Memory representation
  embeddingBlob: Buffer;    // SQLite binary representation
  metadata: T;
  createdAt: Date;
}

export interface VectorSearchResult<T = UiOpsMetadata | StrategicMetadata> {
  id: string;
  partition: NotebookPartition;
  content: string;
  similarity: number; // 0.0 to 1.0 (Cosine Similarity)
  metadata: T;
}

export interface EmbeddingOptions {
  model?: 'text-embedding-004' | 'gemini-embedding-2-preview';
  maxRetries?: number;
  retryDelayMs?: number;
  batchSize?: number;
}
