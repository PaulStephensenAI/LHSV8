export type CompanionId = 'toni' | 'elysian' | 'phoebe' | 'holly' | 'ari' | 'kenny';

export interface PersonaData {
  id: CompanionId;
  name: string;
  codename: string;
  tagline: string;
  role: string;
  avatarIcon: string;
  avatarImage?: string;
  avatarDescription?: string;
  themeColor: {
    primary: string;
    border: string;
    bg: string;
    text: string;
    glow: string;
    accent: string;
    gradient: string;
  };
  identity: {
    genderPronoun: string;
    archetype: string;
    spatialAnchor: string;
    frameworkPosition: string;
  };
  uniqueFeatures: {
    title: string;
    description: string;
    technicalKey: string;
    icon: string;
  }[];
  specializations: string[];
  operationalInvariants: string[];
  dailyAffirmations: string[];
  samplePrompts: {
    label: string;
    prompt: string;
    category: 'standard' | 'stress' | 'boundary' | 'technical' | 'clinical';
  }[];
  mathematicalTheory?: {
    name: string;
    formula: string;
    explanation: string;
    parameters: { name: string; symbol: string; defaultVal: number | string; unit?: string; description: string }[];
  };
}

export interface ChatMessage {
  id: string;
  companionId: CompanionId;
  sender: 'user' | 'companion' | 'system-guardrail';
  text: string;
  timestamp: string;
  isScannableFormatted?: boolean;
  metadata?: {
    latencyMs?: number;
    frictionScore?: number;
    interceptTriggered?: boolean;
    interceptReason?: string;
    awarenessScore?: number;
    thresholdEpsilon?: number;
    dprCapped?: number;
    scenarioConfidence?: number;
    chronusChainId?: string;
    footerTag?: string;
    streaming?: boolean;
    interceptCategory?: 'medical_diagnosis' | 'prescription_dosage' | 'emotional_dependency';
    interceptStudioCoordinated?: boolean;
    traceId?: string;
    scannabilityGuardrailApplied?: boolean;
    scannabilityScore?: number;
    lifecycleTrace?: RequestLifecycleTrace;
  };
}

export interface LifecycleTraceEvent {
  stage: 'ingress' | 'elysian_interceptor' | 'persona_routing' | 'gemini_orchestration' | 'studio_formatting' | 'chronus_attestation' | 'egress';
  status: 'passed' | 'intercepted' | 'routed' | 'success' | 'fallback' | 'warning' | 'error';
  timestamp: string;
  durationMs?: number;
  summary: string;
  details?: Record<string, any>;
}

export interface RequestLifecycleTrace {
  traceId: string;
  timestamp: string;
  companionId: CompanionId;
  clientPayload: {
    messagePreview: string;
    messageLength: number;
    scannableMode: boolean;
    struggleScore?: number;
    epsilonThreshold?: number;
    frictionScore?: number;
  };
  interception: {
    evaluated: boolean;
    triggered: boolean;
    category?: 'medical_diagnosis' | 'prescription_dosage' | 'emotional_dependency' | '';
    reason?: string;
    studioCoordinated: boolean;
    evaluatedRulesCount: number;
    detectedKeywords?: string[];
  };
  routing: {
    targetPersona: CompanionId;
    handler: 'elysian_boundary_handler' | 'kenny_autonomy_handler' | 'gemini_cascade_stream' | 'studio_deterministic_engine';
    isScannableRequested: boolean;
    personaArchetype?: string;
  };
  geminiApi: {
    attemptedModels: string[];
    selectedModel?: string;
    status: 'completed' | 'bypassed_due_to_interception' | 'fallback_activated' | 'error';
    statusCode?: number;
    streamChunkCount: number;
    apiLatencyMs: number;
    tokenEstimate?: number;
  };
  studioFormatting: {
    applied: boolean;
    chunkCount: number;
    hasBulletPoints: boolean;
    scannabilityScore: number;
    formattingType: 'scannable_chunks' | 'bullet_scaffolding' | 'standard_pacing';
  };
  chronusAttestation: {
    chainId: string;
    hash: string;
    syncStatus: string;
  };
  totalLatencyMs: number;
  events: LifecycleTraceEvent[];
}

export interface FrictionMetrics {
  typingSpeedWpm: number;
  backspaceRatio: number;
  pauseCount: number;
  hesitationScore: number; // 0 - 100
  sensoryPacingLevel: 'nominal' | 'gentle' | 'low-transient';
}

export interface HollyHardwareStats {
  deviceType: string;
  dpr: number;
  targetDpr: number;
  gpuLoadPercent: number;
  thermalState: 'cool' | 'nominal' | 'elevated' | 'throttling';
  vramAllocatedMb: number;
  vramPurgedCount: number;
  isDisposalActive: boolean;
}

export interface KennyAutonomyState {
  struggleScoreE: number; // 0 - 1.0
  epsilonThreshold: number; // default 0.65
  isAwarenessActive: boolean; // A = 1 if E > epsilon
  ndisDomain: 'Cognitive' | 'Mobility' | 'Daily Activity' | 'Communication';
  autonomyPreservationRate: number;
}

export interface PhoebeForecastScenario {
  scenarioName: string;
  probability: number;
  lowerBound: number;
  mean: number;
  upperBound: number;
  varianceDelta: number;
}

export interface ChronusLedgerEntry {
  id: string;
  timestamp: string;
  personaId: CompanionId;
  action: string;
  hash: string;
  deviceSyncStatus: 'synced-local-sqlite' | 'offline-buffer' | 'cloud-attested';
}

export type FAQCategory = 
  | 'all'
  | 'deployment'
  | 'personas'
  | 'security-privacy'
  | 'founder-ethos'
  | 'sovereign-apps'
  | 'clinical-boundaries';

export interface FAQItem {
  id: string;
  category: 'deployment' | 'personas' | 'security-privacy' | 'founder-ethos' | 'sovereign-apps' | 'clinical-boundaries';
  categoryLabel: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  keywords: string[];
  groundedCitation: {
    fileId: string;
    filename: string;
    section: string;
  };
  relevantPersonaId: CompanionId;
  recommendedPrompts?: string[];
  verifiedCompliant: boolean;
}

export interface FAQSearchResult {
  item: FAQItem;
  score: number;
  matchedFields: string[];
  matchedKeywords: string[];
}

export type ViewSectionId = 'workspace' | 'vocal-tones' | 'spatial-lab';

export type VoiceControlStatus = 'inactive' | 'listening' | 'processing' | 'error' | 'unsupported';

export interface VoiceFeedback {
  type: 'success' | 'info' | 'error' | 'warning';
  message: string;
  recognizedPhrase: string;
  targetSection?: ViewSectionId;
  targetCompanion?: CompanionId;
  timestamp: number;
}

export interface RoomScanMetrics {
  ambientBrightness: number; // 0 - 100%
  movementDelta: number; // 0 - 100%
  screenContrastRatio: number;
  detectedPosture: 'upright' | 'slumped_forward' | 'tilted' | 'relaxed';
  lightingQuality: 'soft_balanced' | 'harsh_glare' | 'dim_strained' | 'flicker';
}

export interface RoomScanResult {
  id: string;
  timestamp: string;
  companionId: CompanionId;
  equilibriumScore: number; // 0 - 100
  companionObservation: string;
  clientSelfRegulation: {
    physicalCues: string[];
    breathingPaceRecommendation: string;
    postureGuidance: string;
  };
  environmentChanges: {
    summary: string;
    lightingStatus: string;
    clutterIndex: 'low_minimal' | 'moderate' | 'high_cognitive_load';
    recentShift?: string;
  };
  actionablePacingCues: string[];
  sovereignPrivacyStatus: 'zero_recorded_airgapped';
}

