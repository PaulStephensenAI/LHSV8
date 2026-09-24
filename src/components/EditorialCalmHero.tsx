import React from 'react';
import { 
  ArrowRight, 
  Cloud, 
  Laptop, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { CompanionId } from '../types';
import { PERSONAS } from '../data/personasData';
import { HolographicSphereGraphic } from './HolographicSphereGraphic';
import { BotanicalLavenderSprig } from './BotanicalLavenderSprig';

export type StorylineStage = 
  | 'overview' 
  | 'meet-the-avatars' 
  | 'your-workspace' 
  | 'your-applications' 
  | 'ownership-privacy';

interface EditorialCalmHeroProps {
  activeCompanionId: CompanionId;
  onSelectCompanion: (id: CompanionId) => void;
  onOpenChat: (id?: CompanionId) => void;
  onOpenConsultation: () => void;
  onScrollToTeam: () => void;
  onSelectStage?: (stage: StorylineStage) => void;
  activeStage?: StorylineStage;
}

export const EditorialCalmHero: React.FC<EditorialCalmHeroProps> = ({
  activeCompanionId,
  onSelectCompanion,
  onOpenChat,
  onOpenConsultation,
  onScrollToTeam,
  onSelectStage,
  activeStage = 'overview'
}) => {
  const activePersona = PERSONAS.find(p => p.id === activeCompanionId) || PERSONAS[0];

  const handleStageClick = (stage: StorylineStage) => {
    if (onSelectStage) {
      onSelectStage(stage);
    }

    if (stage === 'meet-the-avatars') {
      const el = document.getElementById('companion-roster-cockpit') || document.getElementById('panel-team');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (stage === 'your-workspace') {
      const el = document.getElementById('choose-workspace-lives') || document.getElementById('lavender-hill-ecosystem');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (stage === 'your-applications') {
      const el = document.getElementById('panel-tools') || document.getElementById('your-applications-ribbon');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (stage === 'ownership-privacy') {
      const el = document.getElementById('compliance-guarantees') || document.getElementById('founder-bio-section');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToOwnership = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('compliance-guarantees') || document.getElementById('what-is-human-centred-ai');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToDeploymentChoice = (target: 'cloud' | 'local') => {
    const el = document.getElementById('lavender-hill-ecosystem') || document.getElementById('choose-workspace-lives');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section 
      aria-label="Welcome to Lavender Hill Studio"
      className="space-y-6 sm:space-y-8 animate-in fade-in duration-300"
    >
      {/* 1. TOP BREADCRUMB TRAIL */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-[#7B5C9E]/90 font-sans">
        <button 
          type="button" 
          onClick={() => handleStageClick('overview')}
          className="hover:text-[#5A3882] transition-colors cursor-pointer"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#A78BFA] shrink-0" />
        <button 
          type="button" 
          onClick={() => handleStageClick('meet-the-avatars')}
          className="hover:text-[#5A3882] transition-colors cursor-pointer font-medium"
        >
          Learn
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-[#A78BFA] shrink-0" />
        <span className="text-[#5A5568] font-medium">AI avatars</span>
      </nav>

      {/* 2. MAIN 2-COLUMN HERO BANNER (Directly matching Image Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        
        {/* LEFT COLUMN: Editorial Value Proposition */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5 pr-0 lg:pr-4">
          <div className="space-y-2">
            <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-[#7B5C9E] uppercase block">
              HUMAN-CENTRED AI AVATARS
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#181524] tracking-tight leading-[1.15]">
              A familiar guide. <br className="hidden sm:inline" />
              A workspace you own.
            </h1>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif font-medium text-[#7B5C9E] pt-0.5">
              Technology that restores calm and serves human agency.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#5A5568] leading-relaxed max-w-xl font-sans">
            Meet six AI guides with different roles. Explore a workspace built around your needs, with cloud or local options.
          </p>

          <div className="pt-1">
            <button
              type="button"
              onClick={scrollToOwnership}
              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-serif font-bold text-[#7B5C9E] hover:text-[#5A3882] transition-colors group cursor-pointer underline underline-offset-4 decoration-[#C4B5FD] hover:decoration-[#7B5C9E]"
            >
              <span>How ownership works</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: "MEET YOUR GUIDES" Spotlight Card */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl bg-[#F8F6FA] border border-[#E8E2F0] p-5 sm:p-6 shadow-sm relative overflow-hidden flex flex-col justify-between h-full min-h-[340px]">
            {/* Soft Ambient Background Glow */}
            <div 
              className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none -mr-16 -mt-16 transition-colors duration-500"
              style={{ backgroundColor: activePersona.themeColor.primary }}
            />

            {/* Top Label */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#7B5C9E]">
                MEET YOUR GUIDES
              </span>
              <span 
                className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border transition-colors"
                style={{
                  backgroundColor: `${activePersona.themeColor.primary}12`,
                  color: activePersona.themeColor.primary,
                  borderColor: `${activePersona.themeColor.primary}35`
                }}
              >
                {activePersona.name} Active
              </span>
            </div>

            {/* Middle Section: Holographic Sphere + Botanical Sprig (Left) + Persona Info & Switcher (Right) */}
            <div className="relative z-10 grid grid-cols-12 gap-3 items-center py-3 sm:py-4">
              
              {/* Left Visual: 3D Holographic Sphere + Botanical Sprig Accent */}
              <div className="col-span-5 relative flex items-center justify-center">
                <HolographicSphereGraphic 
                  size={145} 
                  primaryColor={activePersona.themeColor.primary}
                />
                <BotanicalLavenderSprig 
                  className="absolute -bottom-4 -left-3 w-20 h-28 opacity-85 pointer-events-none" 
                />
              </div>

              {/* Right Persona Information + 6-Pill Switcher Grid */}
              <div className="col-span-7 space-y-3.5 pl-1">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#181524] tracking-tight">
                    {activePersona.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A5568] font-sans font-medium mt-0.5 line-clamp-2">
                    {activePersona.id === 'toni' ? 'Lead guide & planning' : activePersona.role}
                  </p>
                </div>

                {/* 6 Personas Pill Grid (2 Columns × 3 Rows) */}
                <div className="grid grid-cols-3 gap-1.5" role="tablist" aria-label="Select a companion guide">
                  {PERSONAS.map((p) => {
                    const isSelected = p.id === activeCompanionId;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => onSelectCompanion(p.id)}
                        className={`py-1.5 px-2 rounded-xl text-xs font-medium transition-all text-center cursor-pointer truncate ${
                          isSelected
                            ? 'bg-[#7B5C9E] text-white font-bold shadow-xs'
                            : 'bg-white/90 text-[#5A5568] hover:text-[#181524] hover:bg-white border border-[#ECE7DE]'
                        }`}
                        title={`${p.name} - ${p.role}`}
                      >
                        {p.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Button: Explore Role */}
            <div className="relative z-10 pt-2 border-t border-[#ECE7DE]/70">
              <button
                type="button"
                onClick={() => onOpenChat(activePersona.id)}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-[#F2ECF9] text-[#181524] hover:text-[#5A3882] border border-[#D5C6EC] font-serif font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-2xs group cursor-pointer"
              >
                <span>Explore {activePersona.name}&rsquo;s role</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#7B5C9E]" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 3. STORYLINE 5-STAGE SEGMENTED NAVIGATION BAR */}
      <nav 
        aria-label="Studio storyline navigation"
        className="p-1.5 bg-[#F2ECF9]/70 border border-[#E2D8EE] rounded-2xl sm:rounded-full shadow-xs backdrop-blur-xs flex items-center justify-between overflow-x-auto scrollbar-none"
      >
        <div className="flex items-center gap-1 sm:gap-1.5 w-full justify-between sm:justify-start">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'meet-the-avatars', label: 'Meet the avatars' },
            { id: 'your-workspace', label: 'Your workspace' },
            { id: 'your-applications', label: 'Your applications' },
            { id: 'ownership-privacy', label: 'Ownership & privacy' }
          ].map((item) => {
            const isActive = activeStage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleStageClick(item.id as StorylineStage)}
                className={`px-3.5 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer flex-1 sm:flex-initial text-center ${
                  isActive
                    ? 'bg-[#7B5C9E] text-white font-bold shadow-xs'
                    : 'text-[#5A5568] hover:text-[#181524] hover:bg-white/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* 4. CHOOSE WHERE YOUR WORKSPACE LIVES SECTION */}
      <div id="choose-workspace-lives" className="space-y-4 pt-1 sm:pt-2">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#181524] tracking-tight">
            Choose where your workspace lives
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5568] font-sans">
            Bespoke setup, with source code and workspace handover.
          </p>
        </div>

        {/* 2 Dual-Path Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Card 1: Cloud Workspace */}
          <article 
            onClick={() => scrollToDeploymentChoice('cloud')}
            className="p-5 sm:p-6 rounded-3xl bg-[#FAF8F5] hover:bg-white border border-[#ECE7DE] hover:border-[#7B5C9E]/50 shadow-2xs hover:shadow-md transition-all duration-300 flex items-start gap-4 sm:gap-5 cursor-pointer group"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F2ECF9] border border-[#D5C6EC] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Cloud className="w-7 h-7 text-[#7B5C9E]" />
            </div>

            <div className="space-y-2 flex-1">
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#181524] group-hover:text-[#7B5C9E] transition-colors">
                  Cloud workspace
                </h3>
                <span className="text-[11px] font-mono text-[#7B5C9E] block">
                  Cloud-Based Human-Centred AI Avatar&rsquo;s
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5A5568] leading-relaxed">
                For access across devices and distributed teams. Hosted in your own account.
              </p>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-serif font-bold text-[#7B5C9E] group-hover:text-[#5A3882]">
                  <span>Explore cloud</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </article>

          {/* Card 2: Local Workspace */}
          <article 
            onClick={() => scrollToDeploymentChoice('local')}
            className="p-5 sm:p-6 rounded-3xl bg-[#FAF8F5] hover:bg-white border border-[#ECE7DE] hover:border-[#3B4A3F]/50 shadow-2xs hover:shadow-md transition-all duration-300 flex items-start gap-4 sm:gap-5 cursor-pointer group"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#EBF0EC] border border-[#C6D6C8] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Laptop className="w-7 h-7 text-[#3B4A3F]" />
            </div>

            <div className="space-y-2 flex-1">
              <div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#181524] group-hover:text-[#3B4A3F] transition-colors">
                  Local workspace
                </h3>
                <span className="text-[11px] font-mono text-[#3B4A3F] block">
                  Local Sovereign Human-Centred AI Avatar&rsquo;s
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#5A5568] leading-relaxed">
                For private, offline work on your own devices. Designed to keep data on your device.
              </p>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-serif font-bold text-[#3B4A3F] group-hover:text-[#234F56]">
                  <span>Explore local</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </article>

        </div>
      </div>

      {/* 5. INTEGRATED APPLICATIONS RIBBON & FORWARD FLOW BUTTON */}
      <div 
        id="your-applications-ribbon"
        className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#ECE7DE]"
      >
        {/* Left Side: Your applications quiet summary */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm">
          <span className="font-serif font-bold text-[#181524]">
            Your applications
          </span>
          <span className="text-[#ECE7DE] hidden sm:inline">|</span>
          <span className="text-[#5A5568]">
            <strong className="text-[#181524] font-medium">Gia</strong> • Family memories
          </span>
          <span className="text-[#ECE7DE] hidden sm:inline">|</span>
          <span className="text-[#5A5568]">
            <strong className="text-[#181524] font-medium">Angel.AI</strong> • Everyday reflection
          </span>
          <span className="text-[#ECE7DE] hidden sm:inline">|</span>
          <span className="text-[#5A5568]">
            <strong className="text-[#181524] font-medium">FAB</strong> • Build your own tools
          </span>
        </div>

        {/* Right Side: Next button */}
        <button
          type="button"
          onClick={() => handleStageClick('meet-the-avatars')}
          className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#7B5C9E] hover:bg-[#653E8A] text-white font-serif font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer group shrink-0"
        >
          <span>Next: Meet the avatars</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

    </section>
  );
};
