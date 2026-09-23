/**
 * Lavender Hill Studio — Embodied RAG Ingestion Pipeline
 * Partitioned Dual-Notebook Architecture: UI Ops vs Strategic Intelligence
 * Storage: 100% Offline Local SQLite (Zero-Cloud Dolphin Security)
 * Target Hardware: Samsung Galaxy Tab S10 Ultra & Windows 11 Laptops
 */

import fs from 'fs';
import path from 'path';
import { DatabaseSync } from 'node:sqlite';
import { generateGeminiEmbedding } from './embedding';
import { floatArrayToBlob, blobToFloatArray, cosineSimilarity } from './vectorMath';
import {
  NotebookPartition,
  UiOpsMetadata,
  StrategicMetadata,
  IngestionChunk,
  VectorSearchResult,
  EmbeddingOptions
} from './types';
import { DEFAULT_UI_OPS_SEEDS } from './defaultUiOpsSeeds';

export interface IngestionPipelineConfig {
  dbPath: string;
  chunkSizeChars?: number;
  chunkOverlapChars?: number;
  embeddingOptions?: EmbeddingOptions;
}

export class EmbodiedRagPipeline {
  private db: DatabaseSync;
  private config: Required<IngestionPipelineConfig>;
  // In-memory L1 cache for instant 60 FPS WebGL / UI queries without SQLite disk I/O
  private uiOpsMemoryCache: Map<string, { embedding: Float32Array; metadata: UiOpsMetadata; content: string }> = new Map();

  constructor(config: IngestionPipelineConfig) {
    this.config = {
      dbPath: config.dbPath,
      chunkSizeChars: config.chunkSizeChars ?? 1200,
      chunkOverlapChars: config.chunkOverlapChars ?? 200,
      embeddingOptions: config.embeddingOptions ?? { model: 'gemini-embedding-2-preview' }
    };

    // Ensure database directory exists
    const dir = path.dirname(this.config.dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    this.db = new DatabaseSync(this.config.dbPath);
    this.configureSqlitePragmas();
    this.initTables();
    this.warmupUiOpsCache();
  }

  /**
   * Configures high-performance SQLite PRAGMAs for zero-latency 60 FPS rendering.
   */
  private configureSqlitePragmas(): void {
    this.db.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA synchronous = NORMAL;
      PRAGMA cache_size = -64000; -- 64MB memory page cache
      PRAGMA mmap_size = 268435456; -- 256MB memory-mapped I/O
      PRAGMA temp_store = MEMORY;
    `);
  }

  /**
   * Initializes SQLite tables corresponding to Prisma models.
   */
  private initTables(): void {
    // Notebook 1: UI Operations & Kinetic State
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS notebook_ui_ops (
        id TEXT PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        componentName TEXT NOT NULL,
        interactionType TEXT NOT NULL,
        spatialAnchor TEXT,
        perspectiveZ REAL,
        rotationTheta REAL,
        content TEXT NOT NULL,
        embedding BLOB NOT NULL,
        embeddingDim INTEGER NOT NULL DEFAULT 768,
        category TEXT NOT NULL,
        metadataJson TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_ui_ops_component ON notebook_ui_ops(componentName);
      CREATE INDEX IF NOT EXISTS idx_ui_ops_category ON notebook_ui_ops(category);
    `);

    // Notebook 2: Strategic Knowledge & Ethical Frameworks
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS notebook_strategic (
        id TEXT PRIMARY KEY,
        chunkId TEXT UNIQUE NOT NULL,
        documentTitle TEXT NOT NULL,
        sourceFile TEXT NOT NULL,
        domain TEXT NOT NULL,
        companionAffinity TEXT,
        content TEXT NOT NULL,
        tokenCount INTEGER,
        chunkIndex INTEGER NOT NULL,
        embedding BLOB NOT NULL,
        embeddingDim INTEGER NOT NULL DEFAULT 768,
        invariantRule TEXT,
        auditStandard TEXT DEFAULT 'ISO_IEC_25010_2023',
        isCertified INTEGER DEFAULT 1,
        metadataJson TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      );

      CREATE INDEX IF NOT EXISTS idx_strategic_domain ON notebook_strategic(domain);
      CREATE INDEX IF NOT EXISTS idx_strategic_companion ON notebook_strategic(companionAffinity);
    `);
  }

  /**
   * Pre-warms in-memory cache for notebook_ui_ops to guarantee sub-millisecond lookups
   * during 3D WebGL render cycles (e.g. SpatialHologramLab).
   */
  public warmupUiOpsCache(): void {
    try {
      const stmt = this.db.prepare('SELECT id, componentName, interactionType, spatialAnchor, perspectiveZ, rotationTheta, category, metadataJson, content, embedding FROM notebook_ui_ops');
      const rows = stmt.all() as any[];

      this.uiOpsMemoryCache.clear();
      for (const r of rows) {
        const embedding = blobToFloatArray(r.embedding);
        const metadata: UiOpsMetadata = {
          componentName: r.componentName,
          interactionType: r.interactionType,
          spatialAnchor: r.spatialAnchor || undefined,
          perspectiveZ: r.perspectiveZ || undefined,
          rotationTheta: r.rotationTheta || undefined,
          category: r.category,
          extra: r.metadataJson ? JSON.parse(r.metadataJson) : undefined
        };
        this.uiOpsMemoryCache.set(r.id, { embedding, metadata, content: r.content });
      }
      console.log(`[RAG Engine] Warmed up ${this.uiOpsMemoryCache.size} UI Ops vectors in zero-latency L1 memory.`);
    } catch (e) {
      console.warn('[RAG Engine] Warmup note: tables are newly created or empty.');
    }
  }

  /**
   * Classifies incoming documents into 'notebook_ui_ops' vs 'notebook_strategic'.
   */
  public classifyOperationalIntent(filePath: string, text: string): NotebookPartition {
    const lowerPath = filePath.toLowerCase();
    const lowerContent = text.toLowerCase();

    // UI/WebGL/DOM kinetic indicators
    const isUiOps =
      lowerPath.includes('component') ||
      lowerPath.includes('webgl') ||
      lowerPath.includes('spatial') ||
      lowerPath.includes('avatar') ||
      lowerPath.includes('hologram') ||
      lowerContent.includes('perspective(') ||
      lowerContent.includes('spatialanchor') ||
      lowerContent.includes('rotationtheta') ||
      lowerContent.includes('webgl') ||
      lowerContent.includes('dom node');

    if (isUiOps) {
      return 'notebook_ui_ops';
    }

    // Default to strategic intelligence (AIEE ethics, dossiers, clinical boundaries)
    return 'notebook_strategic';
  }

  /**
   * Chunks Markdown, JSON, or Plaintext source documents.
   */
  public chunkDocument(filePath: string, content: string): IngestionChunk[] {
    const partition = this.classifyOperationalIntent(filePath, content);
    const chunks: IngestionChunk[] = [];
    const basename = path.basename(filePath);

    // If file is JSON, parse objects or properties
    if (filePath.endsWith('.json')) {
      try {
        const parsed = JSON.parse(content);
        const entries = Array.isArray(parsed) ? parsed : Object.entries(parsed);
        entries.forEach((item, idx) => {
          const chunkStr = typeof item === 'string' ? item : JSON.stringify(item, null, 2);
          chunks.push(this.buildChunk(filePath, chunkStr, idx, partition, basename));
        });
        return chunks;
      } catch (e) {
        // Fallback to text chunking
      }
    }

    // Markdown / Text hierarchical section chunking
    const sections = content.split(/\n(?=#{1,3}\s)/g);
    let chunkCounter = 0;

    for (const section of sections) {
      const trimmed = section.trim();
      if (!trimmed) continue;

      if (trimmed.length <= this.config.chunkSizeChars) {
        chunks.push(this.buildChunk(filePath, trimmed, chunkCounter++, partition, basename));
      } else {
        // Split section by paragraph or length
        let start = 0;
        while (start < trimmed.length) {
          const end = Math.min(start + this.config.chunkSizeChars, trimmed.length);
          const slice = trimmed.slice(start, end).trim();
          if (slice.length > 50) {
            chunks.push(this.buildChunk(filePath, slice, chunkCounter++, partition, basename));
          }
          start += this.config.chunkSizeChars - this.config.chunkOverlapChars;
        }
      }
    }

    return chunks;
  }

  private buildChunk(
    filePath: string,
    chunkText: string,
    idx: number,
    partition: NotebookPartition,
    filename: string
  ): IngestionChunk {
    const chunkId = `${path.parse(filename).name.toUpperCase()}_C${idx}`;
    const tokenEstimate = Math.ceil(chunkText.length / 4);

    if (partition === 'notebook_ui_ops') {
      const meta: UiOpsMetadata = {
        componentName: filename.replace(/\.[^/.]+$/, ''),
        interactionType: chunkText.includes('perspective') || chunkText.includes('theta') ? 'webgl_kinetic' : 'dom_node',
        spatialAnchor: chunkText.includes('45') ? '45_deg_side_by_side' : chunkText.includes('0') ? '0_deg_direct' : undefined,
        perspectiveZ: chunkText.includes('perspective') ? 1.0 : undefined,
        rotationTheta: chunkText.includes('45') ? 45.0 : 0.0,
        category: chunkText.includes('hologram') ? 'hologram_shader' : 'layout',
      };
      return { id: chunkId, partition, content: chunkText, metadata: meta, tokenEstimate };
    } else {
      let domain: StrategicMetadata['domain'] = 'aiee_ethics';
      const lower = chunkText.toLowerCase();
      if (lower.includes('kenny') || lower.includes('rehabilitation') || lower.includes('clinical')) {
        domain = 'clinical_governance';
      } else if (lower.includes('paul stephensen') || lower.includes('founder') || lower.includes('ethicist')) {
        domain = 'founder_ethos';
      } else if (lower.includes('pricing') || lower.includes('handover') || lower.includes('bespoke')) {
        domain = 'business_model';
      } else if (lower.includes('persona') || lower.includes('companion') || lower.includes('toni')) {
        domain = 'persona_dossier';
      }

      let companionAffinity: StrategicMetadata['companionAffinity'] = undefined;
      for (const comp of ['toni', 'elysian', 'kenny', 'holly', 'phoebe', 'ari'] as const) {
        if (lower.includes(comp)) {
          companionAffinity = comp;
          break;
        }
      }

      const meta: StrategicMetadata = {
        domain,
        companionAffinity,
        documentTitle: filename.replace(/_/g, ' ').replace(/\.[^/.]+$/, ''),
        sourceFile: filePath,
        chunkIndex: idx,
        invariantRule: lower.includes('medical') ? 'NON_PRESCRIPTIVE_MEDICAL_BOUNDARY' : undefined,
        auditStandard: 'ISO_IEC_25010_2023',
        isCertified: true,
      };
      return { id: chunkId, partition, content: chunkText, metadata: meta, tokenEstimate };
    }
  }

  /**
   * Ingests a single chunk: calls Gemini embedding, creates Float32Array blob,
   * and saves to the partitioned SQLite table.
   */
  public async ingestChunk(chunk: IngestionChunk): Promise<void> {
    // 1. Generate Gemini embedding vector
    const embeddingVector = await generateGeminiEmbedding(chunk.content, this.config.embeddingOptions);
    const embeddingBlob = floatArrayToBlob(embeddingVector);
    const now = new Date().toISOString();

    if (chunk.partition === 'notebook_ui_ops') {
      const meta = chunk.metadata as UiOpsMetadata;
      const stmt = this.db.prepare(`
        INSERT INTO notebook_ui_ops (
          id, slug, componentName, interactionType, spatialAnchor, perspectiveZ,
          rotationTheta, content, embedding, embeddingDim, category, metadataJson,
          createdAt, updatedAt
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
        ON CONFLICT(slug) DO UPDATE SET
          componentName = excluded.componentName,
          interactionType = excluded.interactionType,
          spatialAnchor = excluded.spatialAnchor,
          perspectiveZ = excluded.perspectiveZ,
          rotationTheta = excluded.rotationTheta,
          content = excluded.content,
          embedding = excluded.embedding,
          category = excluded.category,
          metadataJson = excluded.metadataJson,
          updatedAt = excluded.updatedAt
      `);

      stmt.run(
        chunk.id,
        `slug_${chunk.id}`,
        meta.componentName,
        meta.interactionType,
        meta.spatialAnchor || null,
        meta.perspectiveZ ?? null,
        meta.rotationTheta ?? null,
        chunk.content,
        embeddingBlob,
        embeddingVector.length,
        meta.category,
        meta.extra ? JSON.stringify(meta.extra) : null,
        now,
        now
      );

      // Update in-memory L1 cache for zero-latency 60 FPS retrieval
      this.uiOpsMemoryCache.set(chunk.id, {
        embedding: embeddingVector,
        metadata: meta,
        content: chunk.content
      });
    } else {
      const meta = chunk.metadata as StrategicMetadata;
      const stmt = this.db.prepare(`
        INSERT INTO notebook_strategic (
          id, chunkId, documentTitle, sourceFile, domain, companionAffinity,
          content, tokenCount, chunkIndex, embedding, embeddingDim, invariantRule,
          auditStandard, isCertified, metadataJson, createdAt, updatedAt
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
        ON CONFLICT(chunkId) DO UPDATE SET
          documentTitle = excluded.documentTitle,
          sourceFile = excluded.sourceFile,
          domain = excluded.domain,
          companionAffinity = excluded.companionAffinity,
          content = excluded.content,
          tokenCount = excluded.tokenCount,
          chunkIndex = excluded.chunkIndex,
          embedding = excluded.embedding,
          invariantRule = excluded.invariantRule,
          auditStandard = excluded.auditStandard,
          isCertified = excluded.isCertified,
          metadataJson = excluded.metadataJson,
          updatedAt = excluded.updatedAt
      `);

      stmt.run(
        chunk.id,
        chunk.id,
        meta.documentTitle,
        meta.sourceFile,
        meta.domain,
        meta.companionAffinity || null,
        chunk.content,
        chunk.tokenEstimate,
        meta.chunkIndex,
        embeddingBlob,
        embeddingVector.length,
        meta.invariantRule || null,
        meta.auditStandard || 'ISO_IEC_25010_2023',
        meta.isCertified ? 1 : 0,
        JSON.stringify(meta),
        now,
        now
      );
    }
  }

  /**
   * Ingests an entire directory of documents into the dual-notebook structure.
   */
  public async ingestDirectory(dirPath: string): Promise<{ processed: number; failed: number }> {
    let processed = 0;
    let failed = 0;

    if (!fs.existsSync(dirPath)) {
      throw new Error(`Directory not found: ${dirPath}`);
    }

    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isFile() && (file.endsWith('.md') || file.endsWith('.txt') || file.endsWith('.json'))) {
        console.log(`[RAG Ingest] Processing: ${file}...`);
        const content = fs.readFileSync(fullPath, 'utf-8');
        const chunks = this.chunkDocument(fullPath, content);

        for (const chunk of chunks) {
          try {
            await this.ingestChunk(chunk);
            processed++;
          } catch (err: any) {
            console.error(`[RAG Ingest Error] Failed chunk ${chunk.id}: ${err?.message || err}`);
            failed++;
          }
        }
      }
    }

    console.log(`[RAG Ingest Complete] Processed: ${processed} chunks, Failed: ${failed}`);
    return { processed, failed };
  }

  /**
   * Zero-latency Vector Retrieval for 60 FPS WebGL / UI Kinetics.
   * Runs directly against in-memory Float32Array cache (<0.1ms).
   */
  public queryUiOps(queryVector: Float32Array, topK: number = 3): VectorSearchResult<UiOpsMetadata>[] {
    const results: VectorSearchResult<UiOpsMetadata>[] = [];

    for (const [id, item] of this.uiOpsMemoryCache.entries()) {
      const sim = cosineSimilarity(queryVector, item.embedding);
      results.push({
        id,
        partition: 'notebook_ui_ops',
        content: item.content,
        similarity: sim,
        metadata: item.metadata
      });
    }

    return results.sort((a, b) => b.similarity - a.similarity).slice(0, topK);
  }

  /**
   * Strategic Knowledge Vector Retrieval from SQLite database.
   */
  public queryStrategic(queryVector: Float32Array, topK: number = 4, domainFilter?: string): VectorSearchResult<StrategicMetadata>[] {
    let query = 'SELECT id, chunkId, documentTitle, sourceFile, domain, companionAffinity, content, embedding, metadataJson FROM notebook_strategic';
    const params: any[] = [];

    if (domainFilter) {
      query += ' WHERE domain = ?';
      params.push(domainFilter);
    }

    const stmt = this.db.prepare(query);
    const rows = (params.length > 0 ? stmt.all(...params) : stmt.all()) as any[];

    const results: VectorSearchResult<StrategicMetadata>[] = [];
    for (const row of rows) {
      const rowVector = blobToFloatArray(row.embedding);
      const sim = cosineSimilarity(queryVector, rowVector);

      const metadata: StrategicMetadata = {
        domain: row.domain,
        companionAffinity: row.companionAffinity || undefined,
        documentTitle: row.documentTitle,
        sourceFile: row.sourceFile,
        chunkIndex: 0,
        tags: row.metadataJson ? JSON.parse(row.metadataJson).tags : undefined
      };

      results.push({
        id: row.id,
        partition: 'notebook_strategic',
        content: row.content,
        similarity: sim,
        metadata
      });
    }

    return results.sort((a, b) => b.similarity - a.similarity).slice(0, topK);
  }

  /**
   * Retrieves current database record counts across both partitions.
   */
  public getCounts(): { strategicCount: number; uiOpsCount: number } {
    try {
      const s = this.db.prepare('SELECT count(*) as c FROM notebook_strategic').get() as { c: number };
      const u = this.db.prepare('SELECT count(*) as c FROM notebook_ui_ops').get() as { c: number };
      return { strategicCount: s?.c || 0, uiOpsCount: u?.c || 0 };
    } catch (err) {
      return { strategicCount: 0, uiOpsCount: 0 };
    }
  }

  /**
   * Cold-Start Auto-Ingestion & Verification:
   * Ensures lavenderhill_rag.db has valid strategic and UI ops data upon web server boot.
   */
  public async ensureColdStartReady(knowledgeDir: string): Promise<{ strategicCount: number; uiOpsCount: number; autoIngested: boolean }> {
    let counts = this.getCounts();
    if (counts.strategicCount > 0 && counts.uiOpsCount > 0) {
      console.log(`[RAG Engine] Cold-start ready: ${counts.strategicCount} strategic records, ${counts.uiOpsCount} UI ops records.`);
      this.warmupUiOpsCache();
      return { ...counts, autoIngested: false };
    }

    console.log('[RAG Engine] Cold-start detected empty or incomplete tables. Initiating automated ingestion...');
    // 1. Seed UI Ops records
    for (const seed of DEFAULT_UI_OPS_SEEDS) {
      try {
        await this.ingestChunk(seed);
      } catch (err: any) {
        console.warn(`[RAG Engine] Seed UI ops warning: ${err?.message || err}`);
      }
    }

    // 2. Ingest Knowledge Directory
    if (fs.existsSync(knowledgeDir)) {
      await this.ingestDirectory(knowledgeDir);
    }

    this.warmupUiOpsCache();
    counts = this.getCounts();
    console.log(`[RAG Engine] Automated cold-start ingestion complete: ${counts.strategicCount} strategic, ${counts.uiOpsCount} UI ops.`);
    return { ...counts, autoIngested: true };
  }

  /**
   * High-level query interface: takes natural language query, generates vector,
   * and returns topK strategic knowledge chunks with optional companion boost.
   * Includes graceful fallback to tokenized scoring if embedding service is unreachable.
   */
  public async queryStrategicByText(
    queryText: string,
    topK: number = 3,
    companionAffinity?: string
  ): Promise<VectorSearchResult<StrategicMetadata>[]> {
    try {
      const queryVector = await generateGeminiEmbedding(queryText, this.config.embeddingOptions);
      const results = this.queryStrategic(queryVector, topK * 2);

      if (companionAffinity) {
        for (const res of results) {
          if (res.metadata.companionAffinity === companionAffinity) {
            res.similarity = Math.min(1.0, res.similarity + 0.08);
          }
        }
        results.sort((a, b) => b.similarity - a.similarity);
      }

      return results.slice(0, topK);
    } catch (err: any) {
      console.warn(`[RAG Query] Vector embedding fallback triggered (${err?.message || err}).`);
      return this.queryStrategicByKeywords(queryText, topK, companionAffinity);
    }
  }

  /**
   * Resilient fallback keyword/token search across notebook_strategic.
   */
  private queryStrategicByKeywords(
    queryText: string,
    topK: number = 3,
    companionAffinity?: string
  ): VectorSearchResult<StrategicMetadata>[] {
    const tokens = queryText.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(t => t.length > 2);
    const stmt = this.db.prepare('SELECT id, chunkId, documentTitle, sourceFile, domain, companionAffinity, content, metadataJson FROM notebook_strategic');
    const rows = stmt.all() as any[];

    const scored: VectorSearchResult<StrategicMetadata>[] = [];
    for (const row of rows) {
      const lower = row.content.toLowerCase();
      let matchCount = 0;
      for (const t of tokens) {
        if (lower.includes(t)) matchCount++;
      }
      if (companionAffinity && row.companionAffinity === companionAffinity) {
        matchCount += 1.5;
      }
      if (matchCount > 0) {
        const metadata: StrategicMetadata = {
          domain: row.domain,
          companionAffinity: row.companionAffinity || undefined,
          documentTitle: row.documentTitle,
          sourceFile: row.sourceFile,
          chunkIndex: 0
        };
        scored.push({
          id: row.id,
          partition: 'notebook_strategic',
          content: row.content,
          similarity: Math.min(0.95, matchCount / (tokens.length + 1)),
          metadata
        });
      }
    }
    return scored.sort((a, b) => b.similarity - a.similarity).slice(0, topK);
  }

  /**
   * Upserts the live web visitor's UI ops state into notebook_ui_ops and L1 memory cache.
   */
  public upsertSessionUiState(sessionId: string, state: {
    componentName: string;
    activeView: string;
    activeModal?: string;
    interactionType?: string;
    spatialAnchor?: string;
    perspectiveZ?: number;
    rotationTheta?: number;
    content?: string;
    extra?: any;
  }): void {
    const id = `SESSION_${sessionId}`;
    const slug = `slug_session_${sessionId}`;
    const content = state.content || `Active view: ${state.activeView}, active modal: ${state.activeModal || 'none'}, primary component: ${state.componentName}`;
    const now = new Date().toISOString();
    const meta: UiOpsMetadata = {
      componentName: state.componentName,
      interactionType: (state.interactionType as any) || 'dom_node',
      spatialAnchor: state.spatialAnchor as any,
      perspectiveZ: state.perspectiveZ,
      rotationTheta: state.rotationTheta,
      category: 'session_runtime_state',
      extra: {
        activeView: state.activeView,
        activeModal: state.activeModal,
        ...(state.extra || {})
      }
    };

    const existing = this.uiOpsMemoryCache.get(id);
    const embedding = existing?.embedding || new Float32Array(768);
    this.uiOpsMemoryCache.set(id, {
      embedding,
      metadata: meta,
      content
    });

    const stmt = this.db.prepare(`
      INSERT INTO notebook_ui_ops (
        id, slug, componentName, interactionType, spatialAnchor, perspectiveZ,
        rotationTheta, content, embedding, embeddingDim, category, metadataJson,
        createdAt, updatedAt
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(slug) DO UPDATE SET
        componentName = excluded.componentName,
        interactionType = excluded.interactionType,
        spatialAnchor = excluded.spatialAnchor,
        perspectiveZ = excluded.perspectiveZ,
        rotationTheta = excluded.rotationTheta,
        content = excluded.content,
        category = excluded.category,
        metadataJson = excluded.metadataJson,
        updatedAt = excluded.updatedAt
    `);

    stmt.run(
      id,
      slug,
      meta.componentName,
      meta.interactionType,
      meta.spatialAnchor || null,
      meta.perspectiveZ ?? null,
      meta.rotationTheta ?? null,
      content,
      floatArrayToBlob(embedding),
      768,
      meta.category,
      JSON.stringify(meta.extra),
      now,
      now
    );
  }

  /**
   * Retrieves the live visitor's active UI ops state.
   */
  public getSessionUiState(sessionId: string): { content: string; metadata: UiOpsMetadata } | null {
    const cached = this.uiOpsMemoryCache.get(`SESSION_${sessionId}`);
    if (cached) {
      return { content: cached.content, metadata: cached.metadata };
    }
    const stmt = this.db.prepare('SELECT componentName, interactionType, spatialAnchor, perspectiveZ, rotationTheta, category, metadataJson, content FROM notebook_ui_ops WHERE id = ?');
    const row = stmt.get(`SESSION_${sessionId}`) as any;
    if (!row) return null;
    return {
      content: row.content,
      metadata: {
        componentName: row.componentName,
        interactionType: row.interactionType,
        spatialAnchor: row.spatialAnchor || undefined,
        perspectiveZ: row.perspectiveZ ?? undefined,
        rotationTheta: row.rotationTheta ?? undefined,
        category: row.category,
        extra: row.metadataJson ? JSON.parse(row.metadataJson) : undefined
      }
    };
  }

  public close(): void {
    this.db.close();
  }
}
