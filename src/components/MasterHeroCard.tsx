import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Calendar,
  Compass,
  CheckCircle2,
  Layers,
  HeartHandshake,
  Brain,
  Coffee,
  Lock,
  UserCheck,
  Smile,
  Heart,
  BookOpen,
  Database,
  Eye,
  Camera,
  ShieldCheck
} from 'lucide-react';
import { CompanionId } from '../types';
import { PERSONAS } from '../data/personasData';
import { Tooltip } from './Tooltip';
import { FeaturedCompanionRoster } from './FeaturedCompanionRoster';
import { CompanionGreetingCard } from './CompanionGreetingCard';

export const COMPANION_CAPABILITIES: Record<CompanionId, {
  oneSentence: string;
  tagline: string;
  architectureBadge: string;
  color: string;
  textColor: string;
  bgLight: string;
  borderLight: string;
  accentBadge: string;
}> = {
  toni: {
    oneSentence: 'Strategic mentorship and cognitive pacing engine engineered to restructure complex workloads into clear, scannable steps.',
    tagline: 'The Lead Guide & Strategic Mentor',
    architectureBadge: 'Scannability Guardrail & 45° Side-by-Side Spatial Alignment',
    color: '#7B5C9E',
    textColor: 'text-[#653E8A]',
    bgLight: 'bg-[#F2ECF9]',
    borderLight: 'border-[#D5C6EC]',
    accentBadge: 'Lead Guide'
  },
  elysian: {
    oneSentence: 'Silent, principled ethics officer enforcing the Elysian Gate, zero-telemetry bounds, and local data dignity.',
    tagline: 'The Ethical Guardian & Safety Warden',
    architectureBadge: 'Elysian Gate & Dolphin Security Invariant',
    color: '#0ea5e9',
    textColor: 'text-[#0369a1]',
    bgLight: 'bg-[#E6F4F8]',
    borderLight: 'border-[#BFDFEA]',
    accentBadge: 'Ethics Sentinel'
  },
  phoebe: {
    oneSentence: 'Quantitative reasoning powerhouse specialized in stochastic Scenario Wave visualizers and offline tabular data modeling.',
    tagline: 'The Tireless Researcher & Forecaster',
    architectureBadge: 'Scenario Wave Stochastic 3D & Chronus Integrity',
    color: '#10b981',
    textColor: 'text-[#047857]',
    bgLight: 'bg-[#E8F5EE]',
    borderLight: 'border-[#C2E7D1]',
    accentBadge: 'Forecasting Engine'
  },
  holly: {
    oneSentence: 'Volumetric spatial architect optimizing 3D holographic blueprints and empathy-constrained hardware thermal throttling.',
    tagline: 'The Holographic Builder & Spatial Architect',
    architectureBadge: 'Hardware Thermal Throttling & Three.js Memory Disposal',
    color: '#f59e0b',
    textColor: 'text-[#b45309]',
    bgLight: 'bg-[#FEF6E9]',
    borderLight: 'border-[#F9DCAD]',
    accentBadge: 'Spatial Hologram'
  },
  ari: {
    oneSentence: 'Gentle interaction rhythm monitor detecting typing fatigue and translating technical complexity into domestic metaphors.',
    tagline: 'The Gentle Guide & Cadence Monitor',
    architectureBadge: 'Cadence Friction Detection & Domestic Analogies',
    color: '#ec4899',
    textColor: 'text-[#be185d]',
    bgLight: 'bg-[#FDF2F7]',
    borderLight: 'border-[#F8C8DC]',
    accentBadge: 'Sensory Pacing'
  },
  kenny: {
    oneSentence: 'Trauma-informed rehabilitation companion operating under the Experience-Based Awareness Theorem (A=1) to preserve autonomy.',
    tagline: 'The Rehabilitation Companion & Clinical Guide',
    architectureBadge: 'Awareness Theorem (A=1 if E>ε) & Care Guardrails',
    color: '#3b82f6',
    textColor: 'text-[#1d4ed8]',
    bgLight: 'bg-[#EFF6FF]',
    borderLight: 'border-[#BFDBFE]',
    accentBadge: 'Autonomy Safeguard'
  }
};

interface MasterHeroCardProps {
  activeCompanionId: CompanionId;
  onSelectCompanion: (id: CompanionId) => void;
  onOpenChat: (id?: CompanionId) => void;
  onOpenConsultation: () => void;
  onScrollToTeam: () => void;
  onSelectEcosystemTab?: (tab: 'team' | 'notebooks' | 'ambient-scan' | 'tools' | 'planner') => void;
}

export const MasterHeroCard: React.FC<MasterHeroCardProps> = ({
  activeCompanionId,
  onSelectCompanion,
  onOpenChat,
  onOpenConsultation,
  onScrollToTeam,
  onSelectEcosystemTab
}) => {
  const [explainerTab, setExplainerTab] = useState<'what-is-it' | 'why-want-one' | 'embodied-notebooks' | 'ambient-scan' | 'comparison'>('what-is-it');
  const [activeDomainSample, setActiveDomainSample] = useState<'toni' | 'kenny' | 'phoebe'>('toni');

  const activePersona = PERSONAS.find(p => p.id === activeCompanionId) || PERSONAS[0];

  const handleOpenNotebookStudio = () => {
    if (onSelectEcosystemTab) {
      onSelectEcosystemTab('notebooks');
    }
    const el = document.getElementById('embodied-notebooks-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAmbientStudio = () => {
    if (onSelectEcosystemTab) {
      onSelectEcosystemTab('ambient-scan');
    }
    const el = document.getElementById('ambient-room-scanner-root');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="rounded-[28px] sm:rounded-[32px] bg-white border border-[#E5E0D8] shadow-lg p-4 sm:p-7 lg:p-8 space-y-6 sm:space-y-7 relative overflow-hidden">
      {/* Subtle ambient lavender glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* TOP CARD: WHAT IS A HUMAN-CENTRED AI AVATAR & WHY YOU WOULD WANT ONE (Replaces Cloud Convenience & Local Sovereignty Card) */}
      <div 
        id="what-is-human-centred-ai" 
        className="rounded-2xl sm:rounded-3xl bg-[#FAF8F5] border border-[#ECE7DE] p-5 sm:p-7 lg:p-8 space-y-6 relative overflow-hidden"
      >
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-100/40 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#ECE7DE] pb-5 relative">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2ECF9] border border-[#D4C4E8] text-[#653E8A] text-[11px] font-bold uppercase tracking-wider font-mono">
              <HeartHandshake className="w-3.5 h-3.5 text-[#7B5C9E]" />
              <span>In Everyday Language • Human-Centred Computing</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-[#181524] tracking-tight">
              What is a Human-Centred AI Avatar?
              <span className="block text-base sm:text-lg font-serif font-normal text-[#7B5C9E] mt-0.5">
                And why you would actually want one in your daily life.
              </span>
            </h2>
            <p className="text-[#5A5568] text-xs sm:text-sm leading-relaxed">
              No robotic buzzwords, no corporate hype. Just an honest explanation of how a gentle, private digital companion changes your daily focus and eases mental fatigue.
            </p>
          </div>

          {/* Interactive Navigation Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl sm:rounded-2xl border border-[#ECE7DE] shadow-2xs shrink-0 self-start md:self-auto overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setExplainerTab('what-is-it')}
              className={`px-3 py-1.5 rounded-lg sm:rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                explainerTab === 'what-is-it'
                  ? 'bg-[#7B5C9E] text-white shadow-xs font-bold'
                  : 'text-[#5A5568] hover:text-[#181524] hover:bg-[#FAF8F5]'
              }`}
            >
              <Smile className="w-3.5 h-3.5" />
              <span>1. What is it?</span>
            </button>

            <button
              type="button"
              onClick={() => setExplainerTab('why-want-one')}
              className={`px-3 py-1.5 rounded-lg sm:rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                explainerTab === 'why-want-one'
                  ? 'bg-[#234F56] text-[#F5F2EB] shadow-xs font-bold'
                  : 'text-[#5A5568] hover:text-[#181524] hover:bg-[#FAF8F5]'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>2. Why want one?</span>
            </button>

            <button
              type="button"
              onClick={() => setExplainerTab('embodied-notebooks')}
              className={`px-3 py-1.5 rounded-lg sm:rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                explainerTab === 'embodied-notebooks'
                  ? 'bg-[#684A87] text-white shadow-xs font-bold'
                  : 'text-[#5A5568] hover:text-[#181524] hover:bg-[#FAF8F5]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>3. Embodied Notebooks</span>
            </button>

            <button
              type="button"
              onClick={() => setExplainerTab('ambient-scan')}
              className={`px-3 py-1.5 rounded-lg sm:rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                explainerTab === 'ambient-scan'
                  ? 'bg-[#7B5C9E] text-white shadow-xs font-bold'
                  : 'text-[#5A5568] hover:text-[#181524] hover:bg-[#FAF8F5]'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>4. Room Scanner (Optional)</span>
            </button>

            <button
              type="button"
              onClick={() => setExplainerTab('comparison')}
              className={`px-3 py-1.5 rounded-lg sm:rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                explainerTab === 'comparison'
                  ? 'bg-[#181524] text-white shadow-xs font-bold'
                  : 'text-[#5A5568] hover:text-[#181524] hover:bg-[#FAF8F5]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>5. vs. Normal Chatbots</span>
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="relative">
          {explainerTab === 'what-is-it' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Everyday Analogy Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E0D8] shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#7B5C9E] uppercase tracking-wider">
                  <Coffee className="w-4 h-4 text-[#7B5C9E]" />
                  <span>The Desk Partner Analogy</span>
                </div>
                <p className="font-serif text-sm sm:text-base text-[#181524] leading-relaxed">
                  &ldquo;Think of a Human-Centred AI Avatar like having a <strong>calm, patient colleague sitting right beside you at a 45-degree angle</strong>. They don&apos;t snatch the keyboard from your hands or tell you what to think. Instead, they share your screen, help you untangle complicated research, and break heavy tasks into clear, unhurried steps.&rdquo;
                </p>
                <div className="pt-2 border-t border-[#ECE7DE] flex flex-wrap items-center gap-3 text-xs text-[#5A5568]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E6F40]" />
                    <span>Works beside you (collaborative alignment)</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E6F40]" />
                    <span>Never judges, rushes, or interrupts</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E6F40]" />
                    <span>Total code &amp; note privacy</span>
                  </span>
                </div>
              </div>

              {/* 3 Pillars in Everyday Terms */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl sm:rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200/80 flex items-center justify-center text-[#7B5C9E]">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif font-bold text-sm text-[#181524]">
                    1. A Co-Pilot, Not a Replacement
                  </h3>
                  <p className="text-xs text-[#5A5568] leading-relaxed">
                    It doesn&apos;t pretend to be human or attempt to replace your voice. Its sole purpose is to amplify your capabilities, clarify your thinking, and do the tedious heavy lifting.
                  </p>
                </div>

                <div className="p-4 rounded-xl sm:rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-[#234F56]">
                    <Brain className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif font-bold text-sm text-[#181524]">
                    2. Gentle on Your Attention &amp; Eyes
                  </h3>
                  <p className="text-xs text-[#5A5568] leading-relaxed">
                    Standard AI dumps massive blocks of exhausting text. A human-centred avatar formats answers with bold highlights and calm, scannable milestones to prevent cognitive fatigue.
                  </p>
                </div>

                <div className="p-4 rounded-xl sm:rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-[#92400E]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif font-bold text-sm text-[#181524]">
                    3. Unconditional Privacy &amp; Dignity
                  </h3>
                  <p className="text-xs text-[#5A5568] leading-relaxed">
                    Your notes, research, and questions belong to you alone. It never sends your personal data to public training servers or sells advertising around your thoughts.
                  </p>
                </div>
              </div>
            </div>
          )}

          {explainerTab === 'why-want-one' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Benefit 1 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-purple-50 text-[#7B5C9E] border border-purple-200/60 flex items-center justify-center font-bold text-xs font-mono">
                      01
                    </span>
                    <span className="text-[10px] font-mono text-[#7B5C9E] font-bold bg-[#F2ECF9] px-2 py-0.5 rounded-full border border-[#D5C6EC]">
                      Beat Overwhelm
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#181524]">
                    To Untangle Mental Clutter &amp; Blank-Screen Paralysis
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#5A5568] leading-relaxed">
                    <strong>The Real-Life Problem:</strong> You have 25 open browser tabs, a messy draft, or an intimidating new project and don&apos;t know where to start.
                  </p>
                  <p className="text-xs sm:text-[13px] text-[#181524] bg-[#FAF8F5] p-2.5 rounded-xl border border-[#ECE7DE] leading-relaxed">
                    <strong>How Your Avatar Helps:</strong> You can paste in your disorganized thoughts and ask: <em>&ldquo;Can you organize this into three calm steps?&rdquo;</em> Your avatar turns anxiety into an actionable checklist.
                  </p>
                </div>

                {/* Benefit 2 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-teal-50 text-[#234F56] border border-teal-200/60 flex items-center justify-center font-bold text-xs font-mono">
                      02
                    </span>
                    <span className="text-[10px] font-mono text-[#234F56] font-bold bg-[#E6F4F8] px-2 py-0.5 rounded-full border border-[#BFDFEA]">
                      Always Attentive
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#181524]">
                    A Patient, Non-Judgmental Sounding Board (24/7)
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#5A5568] leading-relaxed">
                    <strong>The Real-Life Problem:</strong> It&apos;s late at night, or you want to practice a sensitive message, test a business pitch, or ask &ldquo;basic&rdquo; questions without feeling embarrassed.
                  </p>
                  <p className="text-xs sm:text-[13px] text-[#181524] bg-[#FAF8F5] p-2.5 rounded-xl border border-[#ECE7DE] leading-relaxed">
                    <strong>How Your Avatar Helps:</strong> It never sighs, never gets tired, and never judges your first drafts. It gives you honest, clear feedback whenever inspiration strikes.
                  </p>
                </div>

                {/* Benefit 3 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-emerald-50 text-[#047857] border border-emerald-200/60 flex items-center justify-center font-bold text-xs font-mono">
                      03
                    </span>
                    <span className="text-[10px] font-mono text-[#047857] font-bold bg-[#E8F5EE] px-2 py-0.5 rounded-full border border-[#C2E7D1]">
                      Zero Telemetry
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#181524]">
                    Your Life &amp; Confidential Notes Stay 100% Private
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#5A5568] leading-relaxed">
                    <strong>The Real-Life Problem:</strong> Commercial AI apps harvest your queries and documents to train public neural networks—exposing sensitive work or personal thoughts.
                  </p>
                  <p className="text-xs sm:text-[13px] text-[#181524] bg-[#FAF8F5] p-2.5 rounded-xl border border-[#ECE7DE] leading-relaxed">
                    <strong>How Your Avatar Helps:</strong> You can run your companion completely offline on your personal laptop or tablet (or on your own private cloud). No corporate snooping, ever.
                  </p>
                </div>

                {/* Benefit 4 */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-amber-50 text-[#B45309] border border-amber-200/60 flex items-center justify-center font-bold text-xs font-mono">
                      04
                    </span>
                    <span className="text-[10px] font-mono text-[#B45309] font-bold bg-[#FEF6E9] px-2 py-0.5 rounded-full border border-[#F9DCAD]">
                      Cognitive Fit
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-[#181524]">
                    Adapted to How Your Brain Actually Works
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#5A5568] leading-relaxed">
                    <strong>The Real-Life Problem:</strong> One-size-fits-all AI expects you to write complex &ldquo;prompts&rdquo; and adapts to computer logic instead of human needs.
                  </p>
                  <p className="text-xs sm:text-[13px] text-[#181524] bg-[#FAF8F5] p-2.5 rounded-xl border border-[#ECE7DE] leading-relaxed">
                    <strong>How Your Avatar Helps:</strong> Pick from 6 specialized avatars that match your state of mind—from strategic mentor (Toni) and ethics warden (Elysian) to quantitative research (Phoebe).
                  </p>
                </div>
              </div>
            </div>
          )}

          {explainerTab === 'embodied-notebooks' && (
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-5 animate-in fade-in duration-200">
              {/* Header explanation */}
              <div className="space-y-2 border-b border-[#ECE7DE] pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-200/80 flex items-center justify-center text-[#7B5C9E]">
                    <BookOpen className="w-3.5 h-3.5 text-[#7B5C9E]" />
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#181524]">
                    How AI Avatars Embody Your Custom Domain Knowledge
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#5A5568] leading-relaxed">
                  Generic chatbots scour the open internet and hallucinate inaccurate claims. An <strong>Embodied Notebook</strong> is a sovereign, encrypted knowledge vault built directly from your organization’s proprietary SOPs, clinical protocols, legal binders, or research papers. When linked, your chosen Avatar dynamically <em>embodies</em> that knowledge—providing verified paragraph citations, adhering to strict ethical limits, and operating 100% offline.
                </p>
              </div>

              {/* Interactive Mini Linker Showcase */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-[#5A5568] uppercase tracking-wider">
                    Interactive Domain Linker Preview:
                  </span>
                  <span className="text-[11px] font-mono text-[#7B5C9E]">
                    Click a pairing below to see grounded citations:
                  </span>
                </div>

                {/* 3 Domain Pairing Selector Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveDomainSample('toni')}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      activeDomainSample === 'toni'
                        ? 'bg-[#F9F6FC] border-[#7B5C9E] shadow-2xs ring-1 ring-[#7B5C9E]'
                        : 'bg-[#FAFAF8] border-[#ECE7DE] hover:border-[#D5C6EC]'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold text-[#7B5C9E]">Toni • Strategy</div>
                    <div className="font-serif font-bold text-xs text-[#181524] truncate">M&amp;A &amp; Capital Governance</div>
                    <div className="text-[10px] text-stone-500 font-mono">240 Board Documents</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveDomainSample('kenny')}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      activeDomainSample === 'kenny'
                        ? 'bg-[#EFF6FF] border-[#3B82F6] shadow-2xs ring-1 ring-[#3B82F6]'
                        : 'bg-[#FAFAF8] border-[#ECE7DE] hover:border-[#BFDBFE]'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold text-[#2563EB]">Kenny • Clinical</div>
                    <div className="font-serif font-bold text-xs text-[#181524] truncate">Trauma &amp; Sensory Pathways</div>
                    <div className="text-[10px] text-stone-500 font-mono">185 Clinical Guides</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveDomainSample('phoebe')}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                      activeDomainSample === 'phoebe'
                        ? 'bg-[#EBF5FB] border-[#0284C7] shadow-2xs ring-1 ring-[#0284C7]'
                        : 'bg-[#FAFAF8] border-[#ECE7DE] hover:border-[#BAE6FD]'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold text-[#0284C7]">Phoebe • Quant</div>
                    <div className="font-serif font-bold text-xs text-[#181524] truncate">Volatility &amp; Risk Matrix</div>
                    <div className="text-[10px] text-stone-500 font-mono">420 LaTeX Models</div>
                  </button>
                </div>

                {/* Grounded Demo Card */}
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#ECE7DE] space-y-3">
                  {activeDomainSample === 'toni' && (
                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] text-[#7B5C9E] font-bold">
                          Client Query: &ldquo;How do we protect our research charter in the Series B term sheet?&rdquo;
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                          Zero Hallucinations
                        </span>
                      </div>
                      <p className="text-[#3B3450] leading-relaxed bg-white p-3 rounded-lg border border-[#ECE7DE]">
                        &ldquo;Drawing directly from your <strong>Capital Governance Notebook (§4.2)</strong>: Your charter requires 15% of compute power to be permanently reserved for ethical research. Ensure investor board ratification thresholds expressly exclude charter amendments.&rdquo;
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-mono text-[10px] text-[#5A5568]">
                        <span className="text-[#653E8A] font-semibold bg-[#F2ECF9] px-2 py-0.5 rounded">
                          Source: Capital Governance Notebook §4.2 • p. 112
                        </span>
                        <span className="text-emerald-700 font-semibold">
                          Partition: notebook_strategic (Local SQLite)
                        </span>
                      </div>
                    </div>
                  )}

                  {activeDomainSample === 'kenny' && (
                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] text-[#2563EB] font-bold">
                          Client Query: &ldquo;What protocol should we use for patient executive paralysis?&rdquo;
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                          Zero Hallucinations
                        </span>
                      </div>
                      <p className="text-[#3B3450] leading-relaxed bg-white p-3 rounded-lg border border-[#ECE7DE]">
                        &ldquo;Per your <strong>Clinical Care Protocol 104</strong>: Prioritize somatic down-regulation before task engagement. Guide the patient through a 90-second sensory grounding sequence and lower ambient illumination under 300 lux.&rdquo;
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-mono text-[10px] text-[#5A5568]">
                        <span className="text-[#2563EB] font-semibold bg-[#EFF6FF] px-2 py-0.5 rounded">
                          Source: Clinical Care Protocol 104 • Section 2
                        </span>
                        <span className="text-emerald-700 font-semibold">
                          Partition: Air-Gapped Local Tablet (HIPAA)
                        </span>
                      </div>
                    </div>
                  )}

                  {activeDomainSample === 'phoebe' && (
                    <div className="space-y-2.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] text-[#0284C7] font-bold">
                          Client Query: &ldquo;How should we adjust our interest rate swap hedge?&rdquo;
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                          Zero Hallucinations
                        </span>
                      </div>
                      <p className="text-[#3B3450] leading-relaxed bg-white p-3 rounded-lg border border-[#ECE7DE]">
                        &ldquo;Executing deterministic lookup in your <strong>Quant Risk Matrix (§14.2)</strong>: Current variance kurtosis is 5.12, requiring a delta hedge adjustment from 0.65 to 0.82 to guard against non-Gaussian tail risk.&rdquo;
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-mono text-[10px] text-[#5A5568]">
                        <span className="text-[#0284C7] font-semibold bg-[#EBF5FB] px-2 py-0.5 rounded">
                          Source: Quant Risk Manual §14.2 • Eq. 3
                        </span>
                        <span className="text-emerald-700 font-semibold">
                          Partition: Local ONNX Vector Sandbox
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Studio Explorer Link Banner */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#ECE7DE]">
                  <p className="text-xs text-[#5A5568]">
                    Ready to explore all 6 domain notebooks and the offline dual-partition architecture?
                  </p>
                  <button
                    type="button"
                    onClick={handleOpenNotebookStudio}
                    className="px-4 py-2 rounded-xl bg-[#234F56] text-[#F5F2EB] hover:brightness-110 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#D4A373]" />
                    <span>Open Embodied Notebooks Studio ↓</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {explainerTab === 'ambient-scan' && (
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-4 animate-in fade-in duration-200">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#F2ECF9] text-[#7B5C9E] border border-[#D5C6EC]">
                    Optional Companion Add-On
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Zero Video Storage
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#181524]">
                  Room Scanning &amp; Gentle Self-Regulation (Opt-in Extra)
                </h3>
                <p className="text-xs sm:text-sm text-[#5A5568] leading-relaxed">
                  As an optional extra, your companion can gently scan your physical workspace and observe subtle changes—such as creeping darkness as evening sets in, screen glare causing eye strain, or physical posture slump—inviting you to pause, self-regulate, and breathe in rhythm.
                </p>
              </div>

              {/* 3 Core Benefits Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#ECE7DE] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#7B5C9E]">
                    <Eye className="w-4 h-4" />
                    <span>Noticing Room Changes</span>
                  </div>
                  <p className="text-xs text-[#5A5568] leading-relaxed">
                    Detects lighting drop-offs, harsh contrast, or desktop clutter buildup that unconsciously spikes cognitive stress.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#ECE7DE] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#234F56]">
                    <HeartHandshake className="w-4 h-4" />
                    <span>Somatic Self-Regulation</span>
                  </div>
                  <p className="text-xs text-[#5A5568] leading-relaxed">
                    Provides soothing, non-judgmental prompts: unclench your jaw, roll shoulders, hydrate, and sync with the 4-7-8 breathing pacer.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#ECE7DE] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>100% Sovereign Mirror</span>
                  </div>
                  <p className="text-xs text-[#5A5568] leading-relaxed">
                    Acts just like a real mirror: it reflects in the present moment, but never records, stores, or transmits any footage.
                  </p>
                </div>
              </div>

              {/* Action Banner */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#ECE7DE]">
                <p className="text-xs text-[#5A5568]">
                  Try the live camera lens or explore simulated room scenarios with your companion.
                </p>
                <button
                  type="button"
                  onClick={handleOpenAmbientStudio}
                  className="px-4 py-2 rounded-xl bg-[#7B5C9E] text-white hover:brightness-110 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Open Ambient Room Scanner Studio ↓</span>
                </button>
              </div>
            </div>
          )}

          {explainerTab === 'comparison' && (
            <div className="p-4 sm:p-6 rounded-2xl bg-white border border-[#ECE7DE] shadow-2xs space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Column 1: Generic Chatbot */}
                <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-400" />
                    <h3 className="font-serif font-bold text-sm text-stone-700">
                      Standard Commercial Chatbot
                    </h3>
                  </div>
                  <ul className="space-y-2 text-xs text-stone-600">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Dumps dense, unbroken walls of text that cause eye fatigue.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Quietly uses your personal thoughts &amp; notes to train global models.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>Expects you to be an expert &ldquo;prompt engineer&rdquo;.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">✕</span>
                      <span>One impersonal, generic corporate tone for everyone.</span>
                    </li>
                  </ul>
                </div>

                {/* Column 2: Lavender Hill Human-Centred Avatar */}
                <div className="p-4 rounded-xl bg-[#F2ECF9]/60 border border-[#D5C6EC] space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#7B5C9E]" />
                    <h3 className="font-serif font-bold text-sm text-[#181524]">
                      Lavender Hill Human-Centred Avatar
                    </h3>
                  </div>
                  <ul className="space-y-2 text-xs text-[#3B3450]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1E5D3A] shrink-0 mt-0.5" />
                      <span><strong>Scannable Clarity:</strong> Restructures answers with bold keys and clean milestones to protect your mental focus.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1E5D3A] shrink-0 mt-0.5" />
                      <span><strong>100% Sovereign Privacy:</strong> Runs on your private cloud or completely offline on your personal tablet/laptop.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1E5D3A] shrink-0 mt-0.5" />
                      <span><strong>Natural Everyday Language:</strong> Speaks gently and directly—no tech buzzwords required.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1E5D3A] shrink-0 mt-0.5" />
                      <span><strong>6 Specialized Personas:</strong> Choose the right companion for your current emotional or strategic task.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Test Prompt Callout */}
        <div className="pt-3 border-t border-[#ECE7DE] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#5A5568]">
            <Sparkles className="w-3.5 h-3.5 text-[#7B5C9E] shrink-0" />
            <span>
              <strong>Try it in action:</strong> Ask Toni: <em>&ldquo;Can you help me break down an overwhelming project into 3 calm steps?&rdquo;</em>
            </span>
          </div>

          <button
            type="button"
            onClick={() => onOpenChat('toni')}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#7B5C9E] text-white hover:bg-[#653E8A] transition-all flex items-center gap-1.5 shadow-2xs group shrink-0 cursor-pointer"
          >
            <span>Ask Toni Now</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* 2-COLUMN COMPANION COCKPIT: FEATURED COMPANION ROSTER (LEFT) + HERO COMPANION CARD (RIGHT) */}
      <div id="companion-roster-cockpit" className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch relative">
        {/* LEFT COLUMN: Featured Companion Roster (Image 1) */}
        <div className="lg:col-span-5 flex flex-col">
          <FeaturedCompanionRoster
            activeCompanionId={activeCompanionId}
            onSelectCompanion={onSelectCompanion}
            onOpenChat={onOpenChat}
            className="w-full h-full"
          />
        </div>

        {/* RIGHT COLUMN: Hero Companion Card (Image 2) */}
        <div className="lg:col-span-7 flex flex-col">
          <CompanionGreetingCard
            activePersona={activePersona}
            onOpenChat={onOpenChat}
            className="w-full h-full mb-0"
          />
        </div>
      </div>

      {/* Primary Action Buttons (2 Large Ocean Teal Buttons from Image 1) */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
        <button
          onClick={onOpenConsultation}
          className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-2xl bg-[#234F56] hover:bg-[#2C626A] text-[#F5F2EB] font-serif font-bold text-sm sm:text-base border border-[#4A7C84] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#D4A373]" />
          <span>Request Private Consultation</span>
        </button>

        <Tooltip
          title="Meet the Team & Ecosystem"
          badge="6 Avatars + Founder"
          position="bottom-left"
          className="w-full sm:w-auto flex justify-center"
          content="Jump down to view Founder Paul Stephensen's full academic bio and interact with all 6 specialized cognitive companions."
        >
          <button
            onClick={onScrollToTeam}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-2xl bg-[#234F56] hover:bg-[#2C626A] text-[#F5F2EB] font-serif font-bold text-sm sm:text-base border border-[#4A7C84] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#D4A373]" />
            <span>Meet the Team & Ecosystem</span>
          </button>
        </Tooltip>
      </div>

      {/* Summary Footer Line (Exact text from Image 1) */}
      <div className="border-t border-[#ECE7DE] pt-4 flex flex-col sm:flex-row items-center justify-between text-center gap-2 text-[11px] font-mono text-[#5A5568]">
        <div className="flex items-center gap-1.5 justify-center">
          <span className="font-bold text-[#181524]">6 ACTIVE PERSONAS:</span>
          <span>TONI • ELYSIAN • PHOEBE • HOLLY • ARI • KENNY</span>
        </div>
        <div className="flex items-center gap-1.5 justify-center">
          <span className="font-bold text-[#181524]">3 SOVEREIGN APPLICATIONS:</span>
          <span>GIA • ANGEL.AI • FAB</span>
        </div>
      </div>
    </section>
  );
};
