import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  ShieldCheck, 
  Database, 
  Tablet, 
  Laptop, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  FileText, 
  Split, 
  Eye, 
  Lock, 
  Zap, 
  CornerDownRight, 
  Brain,
  Bookmark,
  Share2,
  RefreshCw,
  Cpu
} from 'lucide-react';
import { CompanionId } from '../types';
import { PERSONAS } from '../data/personasData';
import { CompanionAvatar } from './CompanionAvatar';
import { Tooltip } from './Tooltip';

interface EmbodiedNotebookSectionProps {
  activeCompanionId?: CompanionId;
  onOpenChat?: (companionId?: CompanionId) => void;
  onOpenConsultation?: () => void;
  className?: string;
}

interface NotebookSample {
  id: string;
  companionId: CompanionId;
  title: string;
  topic: string;
  deviceTarget: string;
  partition: 'notebook_strategic' | 'notebook_ui_ops';
  lastSynced: string;
  userNotes: {
    rawIdea: string;
    bulletPoints: string[];
    handwrittenAnnotation?: string;
  };
  companionSynthesis: {
    scannableMilestones: string[];
    strategicInsight: string;
    ethicalOrRiskNotice?: string;
  };
}

const NOTEBOOK_SAMPLES: NotebookSample[] = [
  {
    id: 'nb-toni-strategy',
    companionId: 'toni',
    title: 'Strategic Growth & Neuro-Ergonomic Workspace Architecture',
    topic: 'Calm Executive Mentorship & Pacing',
    deviceTarget: 'Samsung Galaxy Tab S10 Ultra (S-Pen) + Windows 11',
    partition: 'notebook_strategic',
    lastSynced: 'Local SQLite (Air-Gapped • 0ms latency)',
    userNotes: {
      rawIdea: 'Client executive team suffering from 24/7 Slack context switching, endless email notifications, and panic during multi-quarter sprint planning. Need a structured, non-judgmental workflow intervention.',
      bulletPoints: [
        'Team has 14 disparate SaaS subscriptions, zero unified memory.',
        'Current tools demand prompt engineering; team wants silent 45° angle alignment.',
        'Urgent requirement: confidential financial models must NEVER touch public AI training servers.'
      ],
      handwrittenAnnotation: '★ S-Pen Note: Check if board requires Dolphin Security hardware attestation before Q3.'
    },
    companionSynthesis: {
      scannableMilestones: [
        '1. Consolidate high-friction communication into 2 calm daily review intervals.',
        '2. Deploy local sovereign vector store on client-owned Galaxy Tab hardware.',
        '3. Map strategic invariants into an unhurried 90-day execution roadmap.'
      ],
      strategicInsight: 'Toni’s 45° Angle Lens: We replace chaotic reactive messaging with structured, unhurried check-ins. Your financial research remains 100% sovereign in your local SQLite vault.',
      ethicalOrRiskNotice: 'Dolphin Security Verified: Zero cloud logging, zero telemetry.'
    }
  },
  {
    id: 'nb-elysian-ethics',
    companionId: 'elysian',
    title: 'Algorithmic Dignity & AIEE Ethical Boundary Audit',
    topic: 'Governance, Human Dignity & Privacy Protocols',
    deviceTarget: 'Windows 11 Sovereign Air-Gapped Laptop',
    partition: 'notebook_strategic',
    lastSynced: 'Local SQLite (Hardware Enclave Protected)',
    userNotes: {
      rawIdea: 'Drafting ethical governance protocols for autonomous companion memory. How do we ensure user emotional vulnerability is never commodified or analyzed for marketing personas?',
      bulletPoints: [
        'Audit memory purge routines: when a user ends a session, kinetic memory must cleanly flush.',
        'Verify zero third-party telemetry beacons in client-side bundles.',
        'Guarantee human primacy: companion must never override human moral judgment or intuition.'
      ],
      handwrittenAnnotation: '★ Stylus Note: Review Clause 4.2 of AIEE Charter on non-coercive UI defaults.'
    },
    companionSynthesis: {
      scannableMilestones: [
        '1. Enforce strict ephemeral memory barriers for conversational sentiment.',
        '2. Isolate long-term knowledge vectors into encrypted client-held SQLite files.',
        '3. Implement user-controlled one-tap total memory purge.'
      ],
      strategicInsight: 'Elysian’s Ethical Lens: Human dignity requires complete data sovereignty. We refuse the extractive surveillance model; privacy is an uncompromised moral right, not a toggle.',
      ethicalOrRiskNotice: 'AIEE Charter Compliance: 100% Attested.'
    }
  },
  {
    id: 'nb-phoebe-analytics',
    companionId: 'phoebe',
    title: 'Quantitative Signal Processing & Cognitive Load Index',
    topic: 'Data Precision & Statistical Synthesis',
    deviceTarget: 'Samsung Galaxy Tab S10 Ultra + Local Vector Cache',
    partition: 'notebook_ui_ops',
    lastSynced: 'L1 In-Memory Cache (Sub-millisecond WebGL lookup)',
    userNotes: {
      rawIdea: 'Analyzing empirical metrics on user attention span when interacting with dense walls of text vs. bold-key scannable milestones across 120 testing sessions.',
      bulletPoints: [
        'Unformatted text increased cognitive fatigue markers by 42% after 18 minutes.',
        'Scannable milestone formatting enabled 3.4x faster recall with 0 reported headaches.',
        'Audio synthesis tone modulation kept focus stable across prolonged study blocks.'
      ],
      handwrittenAnnotation: '★ S-Pen Margin: Graph P-value distribution (p < 0.001 significance).'
    },
    companionSynthesis: {
      scannableMilestones: [
        '1. Maintain typographic scannability threshold (< 45 words per milestone chunk).',
        '2. Anchor vocal pitch to 138 Hz soothing spectrum during high-entropy tasks.',
        '3. Pre-warm UI Ops cache for 60 FPS fluid rendering on 120Hz tablet displays.'
      ],
      strategicInsight: 'Phoebe’s Quantitative Lens: Data demonstrates that clarity is cognitive medicine. Formatting is not aesthetic decoration—it directly preserves executive energy.',
      ethicalOrRiskNotice: 'Empirical Verification: Standard deviation σ = 0.04'
    }
  }
];

export const EmbodiedNotebookSection: React.FC<EmbodiedNotebookSectionProps> = ({
  activeCompanionId = 'toni',
  onOpenChat,
  onOpenConsultation,
  className = ''
}) => {
  const [selectedNotebookId, setSelectedNotebookId] = useState<string>(NOTEBOOK_SAMPLES[0].id);
  const [activeViewMode, setActiveViewMode] = useState<'split' | 'canvas' | 'margin' | 'architecture'>('split');
  const [isSimulatingSync, setIsSimulatingSync] = useState(false);

  const currentNotebook = NOTEBOOK_SAMPLES.find(nb => nb.id === selectedNotebookId) || NOTEBOOK_SAMPLES[0];
  const assignedCompanion = PERSONAS.find(p => p.id === currentNotebook.companionId) || PERSONAS[0];

  const handleSimulateSync = () => {
    setIsSimulatingSync(true);
    setTimeout(() => {
      setIsSimulatingSync(false);
    }, 600);
  };

  return (
    <div id="embodied-notebooks-section" className={`rounded-3xl bg-white border border-[#E5E0D8] shadow-sm p-5 sm:p-7 lg:p-8 space-y-6 ${className}`}>
      {/* Top Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-[#ECE7DE] pb-5">
        <div className="space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2ECF9] border border-[#D4C4E8] text-[#653E8A] text-xs font-bold font-mono uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#7B5C9E]" />
            <span>Core Studio Feature • The Embodied Notebook</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#181524] tracking-tight">
            Not a Flat Document. A Living, Embodied Workspace.
            <span className="block text-base sm:text-lg font-serif font-normal text-[#7B5C9E] mt-0.5">
              Where your thoughts, research, and AI companion co-inhabit the page.
            </span>
          </h2>
          <p className="text-[#5A5568] text-xs sm:text-sm leading-relaxed">
            In standard software, your notes sit in dead text files while AI lives in a disconnected chatbot popup. In Lavender Hill Studio, an <strong>Embodied Notebook</strong> is an active cognitive canvas where your companion sits beside you at a 45-degree angle—organizing complex research, tracking active milestones, and safeguarding your private thoughts in 100% offline local SQLite.
          </p>
        </div>

        {/* View Mode Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-[#FAF8F5] rounded-2xl border border-[#ECE7DE] self-start lg:self-end shrink-0">
          <button
            type="button"
            onClick={() => setActiveViewMode('split')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeViewMode === 'split'
                ? 'bg-[#7B5C9E] text-white shadow-xs font-bold'
                : 'text-[#5A5568] hover:text-[#181524] hover:bg-white'
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Side-by-Side</span>
            <span>Split</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveViewMode('canvas')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeViewMode === 'canvas'
                ? 'bg-[#234F56] text-[#F5F2EB] shadow-xs font-bold'
                : 'text-[#5A5568] hover:text-[#181524] hover:bg-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Note Canvas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveViewMode('margin')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeViewMode === 'margin'
                ? 'bg-[#653E8A] text-white shadow-xs font-bold'
                : 'text-[#5A5568] hover:text-[#181524] hover:bg-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>45° Margin</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveViewMode('architecture')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeViewMode === 'architecture'
                ? 'bg-[#181524] text-white shadow-xs font-bold'
                : 'text-[#5A5568] hover:text-[#181524] hover:bg-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Dual-Partition Engine</span>
          </button>
        </div>
      </div>

      {/* Notebook Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono font-bold text-[#5A5568] uppercase tracking-wider mr-1">
          Explore Sample Notebooks:
        </span>
        {NOTEBOOK_SAMPLES.map(nb => {
          const companion = PERSONAS.find(p => p.id === nb.companionId) || PERSONAS[0];
          const isSelected = nb.id === selectedNotebookId;
          return (
            <button
              key={nb.id}
              onClick={() => setSelectedNotebookId(nb.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 border cursor-pointer ${
                isSelected
                  ? 'bg-white border-[#7B5C9E] text-[#181524] shadow-sm font-bold ring-2 ring-[#7B5C9E]/20'
                  : 'bg-[#FAF8F5] border-[#ECE7DE] text-[#5A5568] hover:bg-white hover:text-[#181524]'
              }`}
            >
              <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 border border-slate-200">
                <img src={companion.avatarUrl} alt={companion.name} className="w-full h-full object-cover" />
              </div>
              <span className="font-serif">{nb.title.split('&')[0].trim()}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#F2ECF9] text-[#7B5C9E]">
                {companion.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Workspace Display based on activeViewMode */}
      {activeViewMode !== 'architecture' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* LEFT: The User's Note Canvas (Visible in 'split' and 'canvas') */}
          {(activeViewMode === 'split' || activeViewMode === 'canvas') && (
            <div className={`${activeViewMode === 'split' ? 'lg:col-span-7' : 'lg:col-span-12'} p-5 sm:p-6 rounded-2xl bg-[#FCFBF9] border border-[#E5E0D8] shadow-2xs space-y-4 flex flex-col justify-between`}>
              <div className="space-y-4">
                {/* Note Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ECE7DE] pb-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#5A5568]">
                    <FileText className="w-4 h-4 text-[#7B5C9E]" />
                    <span className="font-bold text-[#181524]">Canvas 01: Private Research Draft</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                      Offline SQLite Vault
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#5A5568]">
                    <Tablet className="w-3.5 h-3.5 text-[#234F56]" />
                    <span>{currentNotebook.deviceTarget}</span>
                  </div>
                </div>

                {/* Note Title & Raw Thought */}
                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#181524]">
                    {currentNotebook.title}
                  </h3>
                  <p className="text-xs text-[#5A5568] italic bg-white p-3 rounded-xl border border-[#ECE7DE] leading-relaxed">
                    &ldquo;{currentNotebook.userNotes.rawIdea}&rdquo;
                  </p>
                </div>

                {/* Raw Bullet Items */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold text-[#5A5568] uppercase tracking-wider block">
                    Working Notes &amp; Observations:
                  </span>
                  <ul className="space-y-2">
                    {currentNotebook.userNotes.bulletPoints.map((bullet, idx) => (
                      <li key={idx} className="text-xs text-[#3B3450] flex items-start gap-2 bg-white/60 p-2.5 rounded-xl border border-[#F0EBE1]">
                        <span className="w-4 h-4 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* S-Pen / Stylus Annotation Callout */}
                {currentNotebook.userNotes.handwrittenAnnotation && (
                  <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs font-sans text-amber-900 flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold uppercase bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded-md">
                      Stylus Ingestion
                    </span>
                    <span>{currentNotebook.userNotes.handwrittenAnnotation}</span>
                  </div>
                )}
              </div>

              {/* Note Footer Status */}
              <div className="pt-3 border-t border-[#ECE7DE] flex items-center justify-between text-[11px] font-mono text-[#5A5568]">
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{currentNotebook.lastSynced}</span>
                </div>
                <button
                  type="button"
                  onClick={handleSimulateSync}
                  className="hover:text-[#181524] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className={`w-3 h-3 ${isSimulatingSync ? 'animate-spin text-[#7B5C9E]' : ''}`} />
                  <span>{isSimulatingSync ? 'Verifying Partition...' : 'Verify Local SQLite'}</span>
                </button>
              </div>
            </div>
          )}

          {/* RIGHT: The Companion's 45° Angle Embodied Margin (Visible in 'split' and 'margin') */}
          {(activeViewMode === 'split' || activeViewMode === 'margin') && (
            <div className={`${activeViewMode === 'split' ? 'lg:col-span-5' : 'lg:col-span-12'} p-5 sm:p-6 rounded-2xl bg-[#F6F3FB] border border-[#D5C6EC] shadow-2xs space-y-4 flex flex-col justify-between relative overflow-hidden`}>
              <div className="space-y-4">
                {/* Companion Header */}
                <div className="flex items-center justify-between border-b border-[#E0D4F0] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#7B5C9E] shadow-2xs">
                      <img src={assignedCompanion.avatarUrl} alt={assignedCompanion.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif font-bold text-sm text-[#181524]">
                          {assignedCompanion.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#E5D7F5] text-[#653E8A] font-bold">
                          45° Desk Partner
                        </span>
                      </div>
                      <p className="text-[10px] text-[#653E8A] font-sans">
                        Embodied Margin Active • Pacing Co-Pilot
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenChat && onOpenChat(assignedCompanion.id)}
                    className="px-2.5 py-1 rounded-lg bg-white border border-[#D5C6EC] text-[#5A3882] hover:bg-[#E5D7F5] font-semibold text-[11px] transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                  >
                    <Sparkles className="w-3 h-3 text-[#7B5C9E]" />
                    <span>Talk</span>
                  </button>
                </div>

                {/* Scannable Milestones Synthesized from Notes */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-bold text-[#653E8A] uppercase tracking-wider block">
                    Structured Action Milestones (Anti-Overwhelm):
                  </span>
                  <div className="space-y-2">
                    {currentNotebook.companionSynthesis.scannableMilestones.map((milestone, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-white border border-[#E0D4F0] text-xs text-[#181524] shadow-2xs flex items-start gap-2">
                        <CornerDownRight className="w-3.5 h-3.5 text-[#7B5C9E] shrink-0 mt-0.5" />
                        <span className="font-medium">{milestone}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deep Ethos & Strategic Margin Commentary */}
                <div className="p-3.5 rounded-xl bg-white/90 border border-[#E0D4F0] space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-[#7B5C9E] uppercase tracking-wider block">
                    Companion Cognitive Alignment:
                  </span>
                  <p className="text-xs text-[#3B3450] leading-relaxed italic">
                    &ldquo;{currentNotebook.companionSynthesis.strategicInsight}&rdquo;
                  </p>
                </div>

                {/* Ethical or Security Assurance Badge */}
                {currentNotebook.companionSynthesis.ethicalOrRiskNotice && (
                  <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200 text-[11px] font-mono text-emerald-900 flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{currentNotebook.companionSynthesis.ethicalOrRiskNotice}</span>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-[#E0D4F0] flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-[#653E8A]">
                  Partition: <strong>{currentNotebook.partition}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => onOpenChat && onOpenChat(assignedCompanion.id)}
                  className="px-3 py-1.5 rounded-xl bg-[#7B5C9E] text-white hover:bg-[#653E8A] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Synthesize Next Step</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ARCHITECTURE VIEW: Explaining the Dual-Partition Offline Engine */
        <div className="p-5 sm:p-7 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] space-y-6 animate-in fade-in duration-200">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-[11px] font-mono font-bold uppercase">
              <Database className="w-3.5 h-3.5 text-[#234F56]" />
              <span>Offline SQLite Dual-Partition Architecture</span>
            </div>
            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#181524]">
              How the Embodied Notebook Engine Operates (Zero-Cloud Latency &amp; Absolute Privacy)
            </h3>
            <p className="text-xs sm:text-sm text-[#5A5568] leading-relaxed max-w-3xl">
              Unlike cloud services that stream your intimate notes to remote servers, Lavender Hill&apos;s Embodied Notebook divides its intelligence into two dedicated, locally stored SQLite partitions running directly on your personal device:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Partition 1 */}
            <div className="p-5 rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-mono font-bold">
                  notebook_ui_ops
                </span>
                <span className="text-[10px] font-mono text-[#5A5568]">
                  L1 In-Memory Cache • &lt;1ms
                </span>
              </div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#181524]">
                Kinetic State &amp; Viewport Attention Tracker
              </h4>
              <p className="text-xs text-[#5A5568] leading-relaxed">
                Stores your live interaction focus, scroll depth, active milestones, spatial 3D camera angles, and viewport anchors. Pre-warmed into fast in-memory buffers to guarantee 60 FPS rendering without taxing your battery or tablet CPU.
              </p>
              <div className="pt-2 border-t border-[#ECE7DE] text-[11px] font-mono text-[#234F56] space-y-1">
                <div>• In-memory WebGL / Three.js coordination</div>
                <div>• Active milestone progression tracking</div>
                <div>• S-Pen stylus gesture &amp; tap coordinates</div>
              </div>
            </div>

            {/* Partition 2 */}
            <div className="p-5 rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-mono font-bold">
                  notebook_strategic
                </span>
                <span className="text-[10px] font-mono text-[#5A5568]">
                  AES-256 SQLite • Offline Vectors
                </span>
              </div>
              <h4 className="font-serif font-bold text-sm sm:text-base text-[#181524]">
                Strategic Intelligence &amp; Private Knowledge Vault
              </h4>
              <p className="text-xs text-[#5A5568] leading-relaxed">
                Stores your confidential research papers, business frameworks, personal reflections, and ethical guidelines. Embedded locally via vector cosine similarity math—empowering your companion to search and cross-reference your knowledge without a single byte escaping to the cloud.
              </p>
              <div className="pt-2 border-t border-[#ECE7DE] text-[11px] font-mono text-[#7B5C9E] space-y-1">
                <div>• Zero-cloud Dolphin Security encryption</div>
                <div>• Cross-notebook semantic memory retrieval</div>
                <div>• Air-gapped on Windows 11 &amp; Samsung Galaxy tablets</div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#3B3450]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#7B5C9E] shrink-0" />
              <span>
                <strong>Zero-Subscription &amp; Client Ownership:</strong> The entire SQLite database file is handed over directly to you. You own the code, the vector indexes, and the research.
              </span>
            </div>
            {onOpenConsultation && (
              <button
                type="button"
                onClick={onOpenConsultation}
                className="px-3.5 py-1.5 rounded-xl bg-[#234F56] text-[#F5F2EB] hover:brightness-110 font-bold text-xs whitespace-nowrap cursor-pointer shrink-0"
              >
                Inquire About Offline Deployment
              </button>
            )}
          </div>
        </div>
      )}

      {/* Bottom Features Strip: The 3 Core Invariants of Embodied Notebooks */}
      <div className="pt-3 border-t border-[#ECE7DE] grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#5A5568]">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span><strong>45° Angle Co-Pilot:</strong> Sits alongside your notes instead of hijacking your focus.</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span><strong>Dolphin Security Invariant:</strong> 100% offline, local SQLite, zero cloud logging.</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span><strong>Multimodal Handwriting:</strong> Optimized for Samsung Galaxy Tab S10 Ultra &amp; S-Pen.</span>
        </div>
      </div>
    </div>
  );
};
