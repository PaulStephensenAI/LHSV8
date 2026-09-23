import React from 'react';
import { 
  Cloud, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  Calculator, 
  Boxes,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Eye
} from 'lucide-react';
import { Tooltip } from './Tooltip';

export type EcosystemTab = 'team' | 'notebooks' | 'ambient-scan' | 'tools' | 'planner';

interface EcosystemTabBarProps {
  activeTab: EcosystemTab;
  onTabChange: (tab: EcosystemTab) => void;
  className?: string;
}

export const EcosystemTabBar: React.FC<EcosystemTabBarProps> = ({
  activeTab,
  onTabChange,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="text-center">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#5A5568]">
          Explore Studio Workspaces &amp; Companions
        </span>
      </div>

      {/* Soft, capsule-shaped glassmorphic pill track */}
      <div 
        role="tablist" 
        aria-label="Lavender Hill Studio Workspace Views"
        className="holo-panel p-1.5 sm:p-2 rounded-full border border-[#E5E0D8] bg-white/95 shadow-sm flex items-center gap-1 sm:gap-2 max-w-full overflow-x-auto scrollbar-none"
      >
        {/* Tab 1: Meet the Team */}
        <div className="flex items-center">
          <button
            role="tab"
            id="tab-team"
            aria-selected={activeTab === 'team'}
            aria-controls="panel-team"
            tabIndex={activeTab === 'team' ? 0 : -1}
            onClick={() => onTabChange('team')}
            className={`px-3.5 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[#7B5C9E] ${
              activeTab === 'team'
                ? 'bg-[#7B5C9E] text-white shadow-sm border border-[#684A87]'
                : 'text-[#5A5568] hover:text-slate-900 hover:bg-[#F5F2EB] border border-transparent'
            }`}
          >
            <Compass className={`w-4 h-4 transition-transform duration-300 ${activeTab === 'team' ? 'scale-110 text-white' : 'text-[#7B5C9E]'}`} aria-hidden="true" />
            <span>1. Meet the Team</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
              activeTab === 'team' ? 'bg-white/20 text-white' : 'bg-[#F2ECF9] text-[#7B5C9E]'
            }`}>
              6 Companions + Founder
            </span>
          </button>
          <Tooltip
            title="Meet the Team Directory"
            badge="Workspace 1"
            position="bottom-left"
            content="Explore profiles for Founder Paul Stephensen and all 6 active AI cognitive avatars (Toni, Elysian, Phoebe, Kenny, Holly, Ari)."
          />
        </div>

        {/* Tab 2: Embodied Notebooks & Domain Mastery */}
        <div className="flex items-center">
          <button
            role="tab"
            id="tab-notebooks"
            aria-selected={activeTab === 'notebooks'}
            aria-controls="panel-notebooks"
            tabIndex={activeTab === 'notebooks' ? 0 : -1}
            onClick={() => onTabChange('notebooks')}
            className={`px-3.5 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[#234F56] ${
              activeTab === 'notebooks'
                ? 'bg-[#234F56] text-[#F5F2EB] shadow-sm border border-[#4A7C84]'
                : 'text-[#5A5568] hover:text-slate-900 hover:bg-[#F5F2EB] border border-transparent'
            }`}
          >
            <BookOpen className={`w-4 h-4 transition-transform duration-300 ${activeTab === 'notebooks' ? 'scale-110 text-[#D4A373]' : 'text-[#234F56]'}`} aria-hidden="true" />
            <span>2. Embodied Notebooks</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
              activeTab === 'notebooks' ? 'bg-white/20 text-[#F5F2EB]' : 'bg-[#EAF0F1] text-[#234F56]'
            }`}>
              Domain Mastery
            </span>
          </button>
          <Tooltip
            title="Embodied Notebooks Engine"
            badge="Core Architecture"
            position="bottom-left"
            content="Discover how AI avatars dynamically link to your customized domain notebooks with zero hallucinations and local offline sovereignty."
          />
        </div>

        {/* Tab 3: Ambient Room & Self-Regulation Scanner (Optional Extra) */}
        <div className="flex items-center">
          <button
            role="tab"
            id="tab-ambient-scan"
            aria-selected={activeTab === 'ambient-scan'}
            aria-controls="panel-ambient-scan"
            tabIndex={activeTab === 'ambient-scan' ? 0 : -1}
            onClick={() => onTabChange('ambient-scan')}
            className={`px-3.5 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[#7B5C9E] ${
              activeTab === 'ambient-scan'
                ? 'bg-[#7B5C9E] text-white shadow-sm border border-[#684A87]'
                : 'text-[#5A5568] hover:text-slate-900 hover:bg-[#F5F2EB] border border-transparent'
            }`}
          >
            <Eye className={`w-4 h-4 transition-transform duration-300 ${activeTab === 'ambient-scan' ? 'scale-110 text-white' : 'text-[#7B5C9E]'}`} aria-hidden="true" />
            <span>3. Ambient Room Scanner</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
              activeTab === 'ambient-scan' ? 'bg-white/20 text-white' : 'bg-[#F2ECF9] text-[#7B5C9E]'
            }`}>
              Optional Extra
            </span>
          </button>
          <Tooltip
            title="Ambient Room & Self-Regulation Scanner"
            badge="Optional Companion Add-On"
            position="bottom-left"
            content="An opt-in companion lens that observes room lighting, posture, and pacing for self-regulation with zero recording or video retention."
          />
        </div>

        {/* Tab 4: Private Architecture & Tools */}
        <button
          role="tab"
          id="tab-tools"
          aria-selected={activeTab === 'tools'}
          aria-controls="panel-tools"
          tabIndex={activeTab === 'tools' ? 0 : -1}
          onClick={() => onTabChange('tools')}
          className={`px-3.5 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[#234F56] ${
            activeTab === 'tools'
              ? 'bg-[#234F56] text-[#F5F2EB] shadow-sm border border-[#4A7C84]'
              : 'text-[#5A5568] hover:text-slate-900 hover:bg-[#F5F2EB] border border-transparent'
          }`}
        >
          <Boxes className={`w-4 h-4 transition-transform duration-300 ${activeTab === 'tools' ? 'scale-110 text-[#D4A373]' : 'text-[#234F56]'}`} aria-hidden="true" />
          <span>4. Private Architecture</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
            activeTab === 'tools' ? 'bg-white/20 text-[#F5F2EB]' : 'bg-[#EAF0F1] text-[#234F56]'
          }`}>
            3 Standalone Apps
          </span>
        </button>

        {/* Tab 5: Plan Your Workspace */}
        <button
          role="tab"
          id="tab-planner"
          aria-selected={activeTab === 'planner'}
          aria-controls="panel-planner"
          tabIndex={activeTab === 'planner' ? 0 : -1}
          onClick={() => onTabChange('planner')}
          className={`px-3.5 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[#D4A373] ${
            activeTab === 'planner'
              ? 'bg-[#D4A373] text-stone-950 shadow-sm border border-[#C5925F] font-bold'
              : 'text-[#5A5568] hover:text-slate-900 hover:bg-[#F5F2EB] border border-transparent'
          }`}
        >
          <Calculator className={`w-4 h-4 transition-transform duration-300 ${activeTab === 'planner' ? 'scale-110 text-stone-950' : 'text-[#D4A373]'}`} aria-hidden="true" />
          <span>5. Plan Workspace</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
            activeTab === 'planner' ? 'bg-black/15 text-stone-950' : 'bg-[#FAF3EA] text-[#8C5D2A]'
          }`}>
            Cost Estimator
          </span>
        </button>
      </div>
    </div>
  );
};

interface DualPathDeploymentCardsProps {
  className?: string;
  onOpenConsultation?: () => void;
}

export const DualPathDeploymentCards: React.FC<DualPathDeploymentCardsProps> = ({
  className = '',
  onOpenConsultation
}) => {
  return (
    <section 
      id="lavender-hill-ecosystem" 
      aria-labelledby="ecosystem-heading"
      className={`rounded-[32px] bg-[#F9F7F4] border border-[#E5E0D8] p-6 sm:p-8 lg:p-10 shadow-sm transition-all relative overflow-hidden ${className}`}
    >
      {/* Subtle ambient lighting orbs in background */}
      <div 
        className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#7B5C9E]/10 blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#3B4A3F]/10 blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Header Block with Accessible Semantics */}
      <header className="max-w-3xl space-y-3 mb-8">
        {/* Section Category */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2ECF9] border border-[#D5C6EC] text-[#5A3882] text-xs font-mono font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#7B5C9E]" aria-hidden="true" />
          <span>Deployment Architecture</span>
        </div>

        {/* Core Catchphrase */}
        <h2 
          id="ecosystem-heading" 
          className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 tracking-tight leading-tight"
        >
          Cloud-Based Convenience. Local Hardware Sovereignty.
        </h2>

        {/* Introductory Body */}
        <p className="text-[#5A5568] text-base sm:text-lg leading-relaxed font-sans">
          At Lavender Hill Studio, we offer an empowered dual-path choice for your companion and assistant environments:
        </p>
      </header>

      {/* Dual-Path Cards (Desktop Side-by-Side, Mobile Stacked) */}
      <div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch"
        role="region"
        aria-label="Deployment Paths"
      >
        {/* Card 1 (Path 1): Cloud-Based Assistants */}
        <article 
          className="holo-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-400 ease-out hover:scale-[1.015] hover:shadow-md hover:border-[#7B5C9E]/40 group relative overflow-hidden"
          aria-labelledby="path-1-heading"
        >
          {/* Subtle top accent gradient */}
          <div 
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7B5C9E] via-[#9F82C2] to-transparent opacity-80" 
            aria-hidden="true" 
          />

          <div className="space-y-4">
            {/* Badge & Icon Accent */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2ECF9] border border-[#D5C6EC] text-[#7B5C9E] text-xs font-mono font-bold uppercase tracking-wider">
                <Cloud className="w-3.5 h-3.5 text-[#7B5C9E]" aria-hidden="true" />
                <span>Path 1 • Vercel Distributed</span>
              </span>
              <span className="text-xs font-mono text-[#7B5C9E] font-medium bg-white/80 px-2.5 py-0.5 rounded-md border border-[#E5E0D8]">
                Multi-Device Sync
              </span>
            </div>

            {/* Title with Deep Lavender (#7B5C9E) woven into header */}
            <h3 
              id="path-1-heading" 
              className="text-xl sm:text-2xl font-serif font-bold text-slate-900 flex items-baseline gap-2"
            >
              <span className="text-[#7B5C9E] font-mono text-lg sm:text-xl font-bold">1.</span>
              <span>Cloud-Based Assistants</span>
            </h3>

            {/* Description (Exact requested copy) */}
            <p className="text-[#5A5568] text-base sm:text-[18px] leading-relaxed font-sans">
              Hosted securely on Vercel for clients who require seamless distributed team access across multiple devices without local hardware constraints.
            </p>

            {/* Architectural Highlights */}
            <ul className="space-y-2.5 pt-2 text-sm text-[#383344] font-medium" aria-label="Cloud Assistant Key Benefits">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#7B5C9E] shrink-0" aria-hidden="true" />
                <span>One-time client-owned VPC / Vercel deployment (zero software subscriptions)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#7B5C9E] shrink-0" aria-hidden="true" />
                <span>Instant access across iOS, Android, macOS, and Web browsers</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#7B5C9E] shrink-0" aria-hidden="true" />
                <span>Global low-latency edge runtime with secure encrypted API relays</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-[#ECE7DE] flex items-center justify-between text-xs text-[#7B5C9E] font-medium">
            <span className="font-mono">Ideal for Distributed Teams</span>
            {onOpenConsultation ? (
              <button
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform font-semibold text-[#7B5C9E] hover:text-[#5A3882]"
              >
                Plan Cloud Setup <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            ) : (
              <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Path <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            )}
          </div>
        </article>

        {/* Card 2 (Path 2): Local Sovereign Assistants */}
        <article 
          className="holo-panel rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-400 ease-out hover:scale-[1.015] hover:shadow-md hover:border-[#3B4A3F]/50 group relative overflow-hidden"
          aria-labelledby="path-2-heading"
        >
          {/* Subtle top accent gradient */}
          <div 
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3B4A3F] via-[#5C7262] to-transparent opacity-80" 
            aria-hidden="true" 
          />

          <div className="space-y-4">
            {/* Badge & Icon Accent */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2EC] border border-[#CADBCB] text-[#3B4A3F] text-xs font-mono font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#3B4A3F]" aria-hidden="true" />
                <span>Path 2 • 100% Offline Hardware</span>
              </span>
              <span className="text-xs font-mono text-[#3B4A3F] font-medium bg-white/80 px-2.5 py-0.5 rounded-md border border-[#CADBCB]">
                Air-Gapped Ready
              </span>
            </div>

            {/* Title with Safe Sage Green (#3B4A3F) framing accent */}
            <h3 
              id="path-2-heading" 
              className="text-xl sm:text-2xl font-serif font-bold text-slate-900 flex items-baseline gap-2"
            >
              <span className="text-[#3B4A3F] font-mono text-lg sm:text-xl font-bold">2.</span>
              <span>Local Sovereign Assistants</span>
            </h3>

            {/* Description (Exact requested copy) */}
            <p className="text-[#5A5568] text-base sm:text-[18px] leading-relaxed font-sans">
              Designed to run entirely offline on your own hardware—specifically Windows 11 laptops and Samsung tablets—ensuring absolute data dignity, local SQLite vaults, and zero telemetry.
            </p>

            {/* Architectural Highlights */}
            <ul className="space-y-2.5 pt-2 text-sm text-[#383344] font-medium" aria-label="Local Sovereign Assistant Key Benefits">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3B4A3F] shrink-0" aria-hidden="true" />
                <span>Zero cloud logs, zero telemetry, air-gapped cryptographic vaults</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3B4A3F] shrink-0" aria-hidden="true" />
                <span>Turnkey handover on Windows 11 Laptops & Samsung Galaxy Tab S10</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#3B4A3F] shrink-0" aria-hidden="true" />
                <span>Complete local autonomy for clinical, research, and sensitive archives</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-[#ECE7DE] flex items-center justify-between text-xs text-[#3B4A3F] font-medium">
            <span className="font-mono">Ideal for High-Privacy & Clinical</span>
            {onOpenConsultation ? (
              <button
                type="button"
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform font-semibold text-[#3B4A3F] hover:text-[#234F56]"
              >
                Configure Sovereign Rig <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            ) : (
              <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Explore Sovereignty <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
            )}
          </div>
        </article>
      </div>
    </section>
  );
};

export interface LavenderHillEcosystemProps {
  activeTab: EcosystemTab;
  onTabChange: (tab: EcosystemTab) => void;
  className?: string;
  onOpenConsultation?: () => void;
}

export const LavenderHillEcosystem: React.FC<LavenderHillEcosystemProps> = ({
  activeTab,
  onTabChange,
  className = '',
  onOpenConsultation
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <EcosystemTabBar activeTab={activeTab} onTabChange={onTabChange} />
      <DualPathDeploymentCards onOpenConsultation={onOpenConsultation} />
    </div>
  );
};
