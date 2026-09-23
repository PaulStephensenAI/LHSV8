import React from 'react';
import { 
  ShieldCheck, 
  Database, 
  Sparkles, 
  BookOpen, 
  Wifi, 
  WifiOff, 
  Tablet, 
  Cloud, 
  FileText,
  Mic,
  MicOff,
  Radio,
  Palette,
  Compass,
  GraduationCap,
  Calculator,
  MessageSquare,
  Eye
} from 'lucide-react';
import { CompanionId } from '../types';
import { PERSONAS } from '../data/personasData';
import { OfficialLavenderHillLogo } from './BrandLogos';
import { CompanionAvatar } from './CompanionAvatar';
import { Tooltip } from './Tooltip';

interface NavbarProps {
  activeCompanionId: CompanionId;
  onSelectCompanion: (id: CompanionId) => void;
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
  onScrollToTeam?: () => void;
  isVoiceListening?: boolean;
  isVoiceSupported?: boolean;
  onToggleVoiceControl?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCompanionId,
  onSelectCompanion,
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
  onScrollToTeam,
  isVoiceListening = false,
  isVoiceSupported = true,
  onToggleVoiceControl
}) => {
  const activePersona = PERSONAS.find(p => p.id === activeCompanionId) || PERSONAS[0];

  return (
    <header className="sticky top-0 z-40 bg-[#FAFAF8]/95 backdrop-blur-md border-b border-[#E5E0D8] px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col gap-3">
        {/* Top Header Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3.5">
          {/* Studio Emblem & Name */}
          <div className="flex items-center justify-between w-full lg:w-auto gap-2 sm:gap-4">
            <div 
              className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0 flex-1 sm:flex-initial"
              onClick={onScrollToTeam}
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-white p-1 shadow-sm border border-[#E0D8CB] flex items-center justify-center group-hover:border-[#7B5C9E] transition-colors shrink-0">
                <OfficialLavenderHillLogo size={28} showText={false} />
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
                  className={`text-xs px-2 sm:px-2.5 py-1.5 rounded-xl border flex items-center gap-1 transition-all ${
                    isVoiceListening
                      ? 'bg-purple-600 text-white border-purple-500 shadow-md animate-pulse'
                      : 'bg-white border-[#E0D8CB] text-[#7B5C9E] hover:bg-purple-50'
                  }`}
                  title={isVoiceListening ? 'Stop Voice Control' : 'Start Voice Control'}
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

          {/* Floating Navigation Pill */}
          <div className="w-full lg:w-auto flex items-center justify-start lg:justify-center overflow-x-auto scrollbar-none py-0.5">
            <nav className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1.5 bg-white/95 rounded-full border border-[#E2DDD3] shadow-sm whitespace-nowrap">
              <Tooltip
                title="Meet the Team & Leadership"
                badge="6 Personas + Founder"
                position="bottom-left"
                content="Explore Founder Paul Stephensen's research portfolio and interact with all 6 specialized cognitive companions (Toni, Elysian, Phoebe, Kenny, Holly, Ari)."
              >
                <button
                  onClick={onScrollToTeam}
                  className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold text-[#3B3450] hover:text-[#181524] hover:bg-[#F5F2EB] transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Compass className="w-3.5 h-3.5 text-[#7B5C9E]" />
                  <span>Meet the Team</span>
                </button>
              </Tooltip>

              <Tooltip
                title="Paul Stephensen Portfolio"
                badge="Principal Researcher"
                position="bottom-left"
                content="View Founder Paul Stephensen's full academic bio, ethical engineering manifesto, and sovereign workspace architecture."
              >
                <button
                  onClick={onOpenBio}
                  className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold text-[#3B3450] hover:text-[#181524] hover:bg-[#F5F2EB] transition-all flex items-center gap-1.5 shrink-0"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#7B5C9E]" />
                  <span>Founder Bio</span>
                </button>
              </Tooltip>

              {onOpenNotebooks && (
                <Tooltip
                  title="Embodied Notebooks & Domain Mastery"
                  badge="Core Feature"
                  position="bottom-left"
                  content="Learn how AI avatars dynamically embody your organization's custom SOPs, clinical protocols, and research files with zero hallucinations."
                >
                  <button
                    onClick={onOpenNotebooks}
                    className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold text-[#3B3450] hover:text-[#181524] hover:bg-[#F5F2EB] transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#234F56]" />
                    <span>Embodied Notebooks</span>
                  </button>
                </Tooltip>
              )}

              {onOpenAmbientScan && (
                <Tooltip
                  title="Ambient Room & Self-Regulation Scanner"
                  badge="Optional Add-On"
                  position="bottom-left"
                  content="Opt-in companion lens that senses room lighting, screen glare, and posture with zero video recording."
                >
                  <button
                    onClick={onOpenAmbientScan}
                    className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold text-[#3B3450] hover:text-[#181524] hover:bg-[#F5F2EB] transition-all flex items-center gap-1.5 shrink-0"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#7B5C9E]" />
                    <span>Room Scanner</span>
                    <span className="text-[9px] font-mono px-1 py-0.2 rounded-full bg-[#F2ECF9] text-[#7B5C9E] font-semibold">
                      Opt-in
                    </span>
                  </button>
                </Tooltip>
              )}

              <button
                onClick={onOpenCharter}
                className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold text-[#3B3450] hover:text-[#181524] hover:bg-[#F5F2EB] transition-all flex items-center gap-1.5 shrink-0"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#234F56]" />
                <span>Our Privacy Promise</span>
              </button>

              <button
                onClick={onOpenConsultation}
                className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold text-[#3B3450] hover:text-[#181524] hover:bg-[#F5F2EB] transition-all flex items-center gap-1.5 shrink-0"
              >
                <Calculator className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Plan Your Workspace</span>
              </button>

              <button
                onClick={() => onOpenChat(activeCompanionId)}
                className="px-3 py-1 rounded-full text-xs font-bold bg-[#F2ECF9] text-[#5A3882] hover:bg-[#E8DEF5] border border-[#D5C6EC] transition-all flex items-center gap-1.5 shrink-0 shadow-2xs"
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
                    className={`px-2 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
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
              className={`text-xs px-2.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 font-medium ${
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
                className={`text-xs px-2.5 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 font-medium ${
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
                className="text-xs px-2.5 py-1.5 rounded-xl bg-white border border-[#E0DACF] text-[#5A5568] hover:text-[#7B5C9E] hover:border-[#7B5C9E]/40 transition-all flex items-center gap-1"
                title="Inspect 7 Studio AI Training Context Files"
              >
                <FileText className="w-3.5 h-3.5 text-[#7B5C9E]" />
              </button>
            )}

            {/* Brand Guide */}
            {onOpenBrandGuide && (
              <button
                onClick={onOpenBrandGuide}
                className="text-xs px-2.5 py-1.5 rounded-xl bg-white border border-[#E0DACF] text-[#5A5568] hover:text-[#234F56] hover:border-[#234F56]/40 transition-all flex items-center gap-1"
                title="Brand & Visual Identity Guidelines"
              >
                <Palette className="w-3.5 h-3.5 text-[#D4A373]" />
              </button>
            )}

            {/* SQLite Ledger */}
            <button
              onClick={onOpenLedger}
              className="text-xs px-2.5 py-1.5 rounded-xl bg-white border border-[#E0DACF] text-[#5A5568] hover:text-[#234F56] transition-all flex items-center gap-1"
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


