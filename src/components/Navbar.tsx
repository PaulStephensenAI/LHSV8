import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  Database, 
  Sparkles, 
  BookOpen, 
  Wifi, 
  WifiOff, 
  FileText,
  Mic,
  Radio,
  Palette,
  Eye,
  ChevronDown,
  Boxes,
  Users,
  Calculator
} from 'lucide-react';
import { CompanionId, ViewSectionId } from '../types';
import { PERSONAS } from '../data/personasData';
import { OfficialLavenderHillLogo } from './BrandLogos';
import { CompanionAvatar } from './CompanionAvatar';
import { EcosystemTab } from './LavenderHillEcosystem';

interface NavbarProps {
  activeCompanionId: CompanionId;
  onSelectCompanion: (id: CompanionId) => void;
  activeViewSection?: ViewSectionId;
  ecosystemTab?: EcosystemTab;
  isOfflineMode: boolean;
  onToggleOfflineMode: () => void;
  onOpenCharter: () => void;
  onOpenLedger: () => void;
  onOpenChat: (id?: CompanionId) => void;
  onOpenTrainingFiles?: () => void;
  onOpenBrandGuide?: () => void;
  onOpenBio?: () => void;
  onOpenConsultation?: () => void;
  onOpenNotebooks?: () => void;
  onOpenAmbientScan?: () => void;
  onOpenTools?: () => void;
  onOpenPlanner?: () => void;
  onScrollToTeam?: () => void;
  onSelectEcosystemTab?: (tab: EcosystemTab) => void;
  onNavigateHome?: () => void;
  onNavigateExplore?: (tab?: EcosystemTab) => void;
  onNavigateHowItWorks?: () => void;
  onNavigateAbout?: () => void;
  onNavigateContact?: () => void;
  isVoiceListening?: boolean;
  isVoiceSupported?: boolean;
  onToggleVoiceControl?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCompanionId,
  onSelectCompanion,
  activeViewSection = 'workspace',
  ecosystemTab = 'team',
  isOfflineMode,
  onToggleOfflineMode,
  onOpenCharter,
  onOpenLedger,
  onOpenChat,
  onOpenTrainingFiles,
  onOpenBrandGuide,
  onOpenBio,
  onOpenConsultation,
  onOpenNotebooks,
  onOpenAmbientScan,
  onOpenTools,
  onOpenPlanner,
  onScrollToTeam,
  onSelectEcosystemTab,
  onNavigateHome,
  onNavigateExplore,
  onNavigateHowItWorks,
  onNavigateAbout,
  onNavigateContact,
  isVoiceListening = false,
  isVoiceSupported = true,
  onToggleVoiceControl
}) => {
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const exploreMenuRef = useRef<HTMLDivElement>(null);
  const activePersona = PERSONAS.find(p => p.id === activeCompanionId) || PERSONAS[0];

  // Close explore dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (exploreMenuRef.current && !exploreMenuRef.current.contains(e.target as Node)) {
        setIsExploreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGoHome = () => {
    setIsExploreOpen(false);
    if (onNavigateHome) {
      onNavigateHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExploreTabSelect = (tab: EcosystemTab) => {
    setIsExploreOpen(false);
    if (onNavigateExplore) {
      onNavigateExplore(tab);
    } else if (onSelectEcosystemTab) {
      onSelectEcosystemTab(tab);
      const targetId = tab === 'team' ? 'meet-the-team' : tab === 'notebooks' ? 'embodied-notebooks-studio' : tab === 'ambient-scan' ? 'ambient-room-scanner-root' : tab === 'tools' ? 'panel-tools' : 'panel-planner';
      setTimeout(() => {
        const el = document.getElementById(targetId) || document.getElementById('lavender-hill-ecosystem');
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else if (tab === 'team' && onScrollToTeam) {
      onScrollToTeam();
    } else if (tab === 'notebooks' && onOpenNotebooks) {
      onOpenNotebooks();
    } else if (tab === 'ambient-scan' && onOpenAmbientScan) {
      onOpenAmbientScan();
    } else if (tab === 'tools' && onOpenTools) {
      onOpenTools();
    } else if (tab === 'planner' && onOpenPlanner) {
      onOpenPlanner();
    }
  };

  const handleHowItWorks = () => {
    setIsExploreOpen(false);
    if (onNavigateHowItWorks) {
      onNavigateHowItWorks();
    } else {
      const el = document.getElementById('choose-workspace-lives') || document.getElementById('lavender-hill-ecosystem');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAbout = () => {
    setIsExploreOpen(false);
    if (onNavigateAbout) {
      onNavigateAbout();
    } else if (onOpenBio) {
      onOpenBio();
    } else {
      const el = document.getElementById('founder-bio-section') || document.getElementById('meet-the-team');
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleContact = () => {
    setIsExploreOpen(false);
    if (onNavigateContact) {
      onNavigateContact();
    } else if (onOpenConsultation) {
      onOpenConsultation();
    }
  };

  // Determine current active navigation link
  const isHomeActive = activeViewSection === 'workspace' && typeof window !== 'undefined' && window.scrollY < 200;
  const isExploreActive = !isHomeActive && activeViewSection === 'workspace';

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF8]/95 backdrop-blur-md border-b border-[#E5E0D8] px-4 lg:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col gap-2.5">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Studio Emblem & Name */}
          <div className="flex items-center justify-between w-full lg:w-auto gap-2 sm:gap-4">
            <div 
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 flex-1 sm:flex-initial"
              onClick={handleGoHome}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white p-1 shadow-sm border border-[#E0D8CB] flex items-center justify-center group-hover:border-[#7B5C9E] transition-colors shrink-0">
                <OfficialLavenderHillLogo size={26} showText={false} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#181524] tracking-tight text-sm sm:text-base font-display truncate">
                    Lavender Hill Studio
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.2 rounded-full bg-[#7B5C9E]/10 border border-[#7B5C9E]/30 text-[#7B5C9E] font-semibold shrink-0">
                    ToniAI™
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-[#5A5568] font-sans truncate">
                  Resilient Calm Private Workspaces
                </p>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex lg:hidden items-center gap-1 sm:gap-1.5 shrink-0">
              {onToggleVoiceControl && (
                <button
                  onClick={onToggleVoiceControl}
                  className={`text-xs px-2.5 py-1.5 rounded-xl border flex items-center gap-1 transition-all ${
                    isVoiceListening
                      ? 'bg-[#7B5C9E] border-[#9575CD] text-white shadow-purple-900/30'
                      : 'bg-white border-[#E0DACF] text-[#5A5568]'
                  }`}
                  title="Toggle Voice Navigation"
                >
                  {isVoiceListening ? <Radio className="w-3.5 h-3.5 animate-pulse" /> : <Mic className="w-3.5 h-3.5" />}
                  <span className="hidden xs:inline">{isVoiceListening ? 'Listening' : 'Voice'}</span>
                </button>
              )}

              <button
                onClick={() => onOpenChat(activeCompanionId)}
                className="text-xs px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#234F56] hover:bg-[#2C626A] text-[#F5F2EB] font-semibold flex items-center gap-1.5 shadow-2xs transition-all whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                <span>Talk <span className="hidden xs:inline">to {activePersona.name}</span></span>
              </button>
            </div>
          </div>

          {/* Consistent Main Navigation Pill (Home · Explore · How it works · About · Contact) */}
          <div className="w-full lg:w-auto flex items-center justify-start lg:justify-center overflow-x-visible py-0.5">
            <nav 
              aria-label="Main Navigation"
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 bg-white/95 rounded-full border border-[#E2DDD3] shadow-sm whitespace-nowrap"
            >
              {/* 1. Home */}
              <button
                type="button"
                onClick={handleGoHome}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  isHomeActive
                    ? 'bg-[#F2ECF9] text-[#5A3882] font-bold shadow-2xs'
                    : 'text-[#5A5568] hover:text-[#181524]'
                }`}
              >
                Home
              </button>

              {/* 2. Explore (Avatars, Applications & Optional Tools) with dropdown */}
              <div className="relative" ref={exploreMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsExploreOpen(prev => !prev)}
                  aria-expanded={isExploreOpen}
                  aria-haspopup="true"
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                    isExploreActive
                      ? 'bg-[#7B5C9E] text-white font-bold shadow-xs'
                      : 'text-[#5A5568] hover:text-[#181524]'
                  }`}
                >
                  <span>Explore</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${isExploreOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Explore Dropdown Menu */}
                {isExploreOpen && (
                  <div 
                    role="menu"
                    aria-label="Explore menu options"
                    className="absolute top-full left-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white border border-[#E5E0D8] shadow-xl p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 space-y-2"
                  >
                    {/* Section 1: AI Avatars */}
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7B5C9E] px-2 pt-1">
                        AI Avatars (6 Guides)
                      </div>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => handleExploreTabSelect('team')}
                        className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                          ecosystemTab === 'team' ? 'bg-[#F2ECF9] text-[#5A3882] font-bold' : 'hover:bg-[#FAF8F5] text-[#181524]'
                        }`}
                      >
                        <Users className="w-4 h-4 text-[#7B5C9E] shrink-0" />
                        <div className="min-w-0">
                          <div className="font-semibold text-xs">Meet the 6 Avatars</div>
                          <div className="text-[10px] text-[#5A5568] truncate">Toni, Elysian, Phoebe, Holly, Ari, Kenny</div>
                        </div>
                      </button>
                    </div>

                    <div className="h-px bg-[#ECE7DE]" />

                    {/* Section 2: Applications & Frameworks */}
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#234F56] px-2">
                        Applications
                      </div>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => handleExploreTabSelect('tools')}
                        className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                          ecosystemTab === 'tools' ? 'bg-[#EAF0F1] text-[#234F56] font-bold' : 'hover:bg-[#FAF8F5] text-[#181524]'
                        }`}
                      >
                        <Boxes className="w-4 h-4 text-[#234F56] shrink-0" />
                        <div className="min-w-0">
                          <div className="font-semibold text-xs">Standalone Sovereign Apps</div>
                          <div className="text-[10px] text-[#5A5568] truncate">Gia (family), Angel.AI (health), FAB (tools)</div>
                        </div>
                      </button>

                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => handleExploreTabSelect('notebooks')}
                        className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                          ecosystemTab === 'notebooks' ? 'bg-[#EAF0F1] text-[#234F56] font-bold' : 'hover:bg-[#FAF8F5] text-[#181524]'
                        }`}
                      >
                        <BookOpen className="w-4 h-4 text-[#234F56] shrink-0" />
                        <div className="min-w-0">
                          <div className="font-semibold text-xs">Embodied Notebooks</div>
                          <div className="text-[10px] text-[#5A5568] truncate">Local domain files with zero hallucinations</div>
                        </div>
                      </button>
                    </div>

                    <div className="h-px bg-[#ECE7DE]" />

                    {/* Section 3: Optional Workspace Tools */}
                    <div className="space-y-1">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#D4A373] px-2">
                        Workspace Tools (Optional)
                      </div>
                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => handleExploreTabSelect('ambient-scan')}
                        className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                          ecosystemTab === 'ambient-scan' ? 'bg-[#F2ECF9] text-[#5A3882] font-bold' : 'hover:bg-[#FAF8F5] text-[#181524]'
                        }`}
                      >
                        <Eye className="w-4 h-4 text-[#7B5C9E] shrink-0" />
                        <div className="min-w-0 flex items-center justify-between gap-1">
                          <span className="font-semibold text-xs">Room Scanner</span>
                          <span className="text-[9px] font-mono px-1 py-0.2 rounded-full bg-[#F2ECF9] text-[#7B5C9E] font-semibold">Opt-in</span>
                        </div>
                        <div className="text-[10px] text-[#5A5568] truncate">Room lighting, glare, and posture pacing</div>
                      </button>

                      <button
                        type="button"
                        role="menuitem"
                        onClick={() => handleExploreTabSelect('planner')}
                        className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center gap-2.5 transition-colors cursor-pointer ${
                          ecosystemTab === 'planner' ? 'bg-[#FAF6EC] text-[#97682C] font-bold' : 'hover:bg-[#FAF8F5] text-[#181524]'
                        }`}
                      >
                        <Calculator className="w-4 h-4 text-[#D4A373] shrink-0" />
                        <div className="min-w-0">
                          <div className="font-semibold text-xs">Workspace Estimator</div>
                          <div className="text-[10px] text-[#5A5568] truncate">4-step handover cost calculator</div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. How it works */}
              <button
                type="button"
                onClick={handleHowItWorks}
                className="px-3 py-1 rounded-full text-xs font-semibold text-[#5A5568] hover:text-[#181524] transition-colors cursor-pointer"
              >
                How it works
              </button>

              {/* 4. About */}
              <button
                type="button"
                onClick={handleAbout}
                className="px-3 py-1 rounded-full text-xs font-semibold text-[#5A5568] hover:text-[#181524] transition-colors cursor-pointer"
              >
                About
              </button>

              {/* 5. Contact */}
              <button
                type="button"
                onClick={handleContact}
                className="px-3 py-1 rounded-full text-xs font-semibold text-[#5A5568] hover:text-[#181524] transition-colors cursor-pointer"
              >
                Contact
              </button>

              <span className="w-px h-4 bg-[#E2DDD3] mx-1" aria-hidden="true" />

              {/* Action Pill: Talk to Active Avatar */}
              <button
                type="button"
                onClick={() => onOpenChat(activeCompanionId)}
                className="px-3 py-1 rounded-full text-xs font-bold bg-[#F2ECF9] text-[#5A3882] hover:bg-[#E8DEF5] border border-[#D5C6EC] transition-all flex items-center gap-1.5 shrink-0 shadow-2xs cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Talk to {activePersona.name}</span>
              </button>
            </nav>
          </div>

          {/* Quick Companion Switchers & Utilities */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Companions Quick Switch Bar */}
            <div className="flex items-center gap-1 bg-[#F5F2EB] p-1 rounded-2xl border border-[#E0DACF]">
              {PERSONAS.map((persona) => {
                const isActive = persona.id === activeCompanionId;
                return (
                  <button
                    key={persona.id}
                    onClick={() => onSelectCompanion(persona.id)}
                    className={`px-2 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-white text-[#181524] border border-[#7B5C9E]/40 shadow-xs'
                        : 'text-[#5A5568] hover:text-[#181524] hover:bg-white/60 border border-transparent'
                    }`}
                    title={`Switch to ${persona.name} (${persona.role})`}
                  >
                    <CompanionAvatar
                      persona={persona}
                      size="xs"
                      showStatusRing={false}
                      borderGlow={isActive}
                      shape="circle"
                    />
                    <span className="hidden xl:inline">{persona.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Offline/Galaxy Tab Mode Toggle */}
            <button
              onClick={onToggleOfflineMode}
              title={isOfflineMode ? 'Switch to Cloud Sync' : 'Switch to 100% Offline Samsung Galaxy Tab Mode'}
              className={`text-xs px-2.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 font-medium cursor-pointer ${
                isOfflineMode
                  ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs'
                  : 'bg-white border-[#E0DACF] text-[#5A5568] hover:text-[#181524]'
              }`}
            >
              {isOfflineMode ? <WifiOff className="w-3.5 h-3.5 text-amber-600" /> : <Wifi className="w-3.5 h-3.5 text-emerald-600" />}
              <span className="hidden xl:inline">{isOfflineMode ? 'Offline Tab S10' : 'Dolphin Cloud'}</span>
            </button>

            {/* Voice Control Trigger */}
            {onToggleVoiceControl && (
              <button
                onClick={onToggleVoiceControl}
                className={`text-xs px-2.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 font-medium cursor-pointer ${
                  isVoiceListening
                    ? 'bg-purple-600 border-purple-500 text-white shadow-sm animate-pulse'
                    : 'bg-white border-[#E0DACF] text-[#7B5C9E] hover:bg-purple-50'
                }`}
                title={isVoiceListening ? 'Stop Voice Control' : 'Start Web Speech Voice Navigation'}
              >
                {isVoiceListening ? <Radio className="w-3.5 h-3.5 text-white animate-pulse" /> : <Mic className="w-3.5 h-3.5" />}
                <span className="hidden xl:inline">{isVoiceListening ? 'Listening' : 'Voice'}</span>
              </button>
            )}

            {/* Training Files */}
            {onOpenTrainingFiles && (
              <button
                onClick={onOpenTrainingFiles}
                className="text-xs px-2.5 py-1.5 rounded-xl bg-white border border-[#E0DACF] text-[#5A5568] hover:text-[#7B5C9E] hover:border-[#7B5C9E]/40 transition-all flex items-center gap-1 cursor-pointer"
                title="Inspect 7 Studio AI Training Context Files"
              >
                <FileText className="w-3.5 h-3.5 text-[#7B5C9E]" />
              </button>
            )}

            {/* Brand Guide */}
            {onOpenBrandGuide && (
              <button
                onClick={onOpenBrandGuide}
                className="text-xs px-2.5 py-1.5 rounded-xl bg-white border border-[#E0DACF] text-[#5A5568] hover:text-[#234F56] hover:border-[#234F56]/40 transition-all flex items-center gap-1 cursor-pointer"
                title="Brand & Visual Identity Guidelines"
              >
                <Palette className="w-3.5 h-3.5 text-[#D4A373]" />
              </button>
            )}

            {/* SQLite Ledger */}
            <button
              onClick={onOpenLedger}
              className="text-xs px-2.5 py-1.5 rounded-xl bg-white border border-[#E0DACF] text-[#5A5568] hover:text-[#234F56] transition-all flex items-center gap-1 cursor-pointer"
              title="Inspect Dolphin Security SQLite Local Audit Trail"
            >
              <Database className="w-3.5 h-3.5 text-cyan-700" />
            </button>
          </div>
        </div>

        {/* Slogan Sub-Banner (Exact quote from Image 1) */}
        <div className="flex items-center justify-center">
          <div className="px-4 py-1 rounded-full bg-white/80 border border-[#E5E0D8] text-xs text-[#5A5568] text-center shadow-2xs font-sans max-w-2xl">
            <span className="font-semibold text-[#181524]">Lavender Hill Studio</span> • Human-centered AI avatars and offline workspaces that help people work, play and learn.
          </div>
        </div>
      </div>
    </header>
  );
};
