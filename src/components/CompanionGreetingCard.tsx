import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  LineChart, 
  Layers, 
  Activity, 
  Stethoscope, 
  MessageSquare,
  ChevronRight,
  Sun,
  Moon,
  Clock,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Volume2,
  RefreshCw,
  Heart,
  Copy,
  UserCheck,
  CheckCircle2,
  X
} from 'lucide-react';
import { PersonaData, CompanionId } from '../types';
import { DailyAffirmation } from './DailyAffirmation';
import { CompanionAvatar } from './CompanionAvatar';

export { DailyAffirmation };

interface CompanionGreetingCardProps {
  activePersona: PersonaData;
  onOpenChat: (personaId: CompanionId) => void;
  className?: string;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Compass,
  ShieldCheck,
  LineChart,
  Layers,
  Activity,
  Stethoscope
};

export const CompanionGreetingCard: React.FC<CompanionGreetingCardProps> = ({
  activePersona,
  onOpenChat,
  className = ''
}) => {
  const [timeGreeting, setTimeGreeting] = useState('Welcome to your Workspace');
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Set time-based greeting & clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours();
      if (hour >= 5 && hour < 12) {
        setTimeGreeting('Good morning');
      } else if (hour >= 12 && hour < 17) {
        setTimeGreeting('Good afternoon');
      } else if (hour >= 17 && hour < 22) {
        setTimeGreeting('Good evening');
      } else {
        setTimeGreeting('Peaceful night');
      }

      setCurrentTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const IconComp = ICON_MAP[activePersona.avatarIcon] || Sparkles;

  return (
    <div
      id={`companion-greeting-card-${activePersona.id}`}
      className={`relative overflow-hidden rounded-3xl border transition-all duration-500 bg-white/95 shadow-sm p-5 sm:p-7 space-y-5 ${className}`}
      style={{
        borderColor: `${activePersona.themeColor.primary}35`,
        boxShadow: `0 8px 30px -8px ${activePersona.themeColor.glow}`
      }}
    >
      {/* Ambient subtle background tint */}
      <div 
        className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: activePersona.themeColor.primary }}
      />
      <div 
        className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ backgroundColor: activePersona.themeColor.primary }}
      />

      {/* Top Bar: Companion Hero Greeting & Direct Chat Quick Trigger */}
      <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ECE7DE] pb-4">
        <div className="flex items-center gap-3.5 sm:gap-4">
          {/* Persona Avatar */}
          <CompanionAvatar
            persona={activePersona}
            size="lg"
            showStatusRing={true}
            isOnline={true}
            borderGlow={true}
            showBadgeIcon={true}
            onClick={() => onOpenChat(activePersona.id)}
            className="cursor-pointer transition-transform hover:scale-105"
          />

          {/* Heading Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#181524] font-serif tracking-tight flex items-center gap-2">
                <span>{timeGreeting}, Workspace Architect</span>
              </h2>

              <span 
                className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border"
                style={{
                  color: activePersona.themeColor.primary,
                  borderColor: `${activePersona.themeColor.primary}40`,
                  backgroundColor: `${activePersona.themeColor.primary}12`
                }}
              >
                {activePersona.name} Active
              </span>
            </div>

            <p className="text-xs text-[#5A5568] font-sans mt-0.5">
              {activePersona.tagline}
            </p>
          </div>
        </div>

        {/* Right Status / Quick Action Controls */}
        <div className="flex items-center flex-wrap gap-2 self-start sm:self-center">
          {/* How this card works toggle button */}
          <button
            type="button"
            onClick={() => setIsGuideOpen(prev => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border shadow-2xs cursor-pointer ${
              isGuideOpen
                ? 'bg-[#F2ECF9] text-[#653E8A] border-[#D4C4E8]'
                : 'bg-white text-[#5A5568] hover:text-[#181524] hover:bg-[#FAF8F5] border-[#E0DACF]'
            }`}
            title="Learn what this card is, what it does, and how to use it"
          >
            <HelpCircle className={`w-3.5 h-3.5 ${isGuideOpen ? 'text-[#7B5C9E]' : 'text-[#8A8495]'}`} />
            <span>{isGuideOpen ? 'Hide Card Guide' : 'How this card works'}</span>
            {isGuideOpen ? (
              <ChevronUp className="w-3 h-3 text-[#7B5C9E]" />
            ) : (
              <ChevronDown className="w-3 h-3 text-[#8A8495]" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('what-is-human-centred-ai');
              el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white border border-[#E0DACF] text-[11px] text-[#7B5C9E] hover:text-[#5A3882] hover:bg-[#FAF8F5] transition-colors font-medium shadow-2xs cursor-pointer"
            title="Read everyday explanation of Human-Centred AI Avatars"
          >
            <Sparkles className="w-3 h-3 text-[#7B5C9E]" />
            <span>What is an Avatar?</span>
          </button>

          {currentTimeStr && (
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#F5F2EB] border border-[#E0DACF] text-[11px] font-mono text-[#5A5568] font-semibold">
              <Clock className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>{currentTimeStr}</span>
            </div>
          )}

          <button
            id="greeting-card-chat-btn"
            type="button"
            onClick={() => onOpenChat(activePersona.id)}
            className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-semibold text-[#F5F2EB] transition-all flex items-center gap-1.5 sm:gap-2 shadow-xs hover:brightness-110 active:scale-95 bg-[#234F56] border border-[#4A7C84] cursor-pointer shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Consult {activePersona.name}</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>
      </div>

      {/* COMPREHENSIVE CARD GUIDE PANEL (Expandable & Clear Everyday Language) */}
      {isGuideOpen && (
        <div className="rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] p-4 sm:p-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-[#ECE7DE] pb-3">
            <div className="flex items-center gap-2">
              <div 
                className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: activePersona.themeColor.primary }}
              >
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-serif font-bold text-[#181524]">
                  Understanding Your Companion Presence Card
                </h3>
                <p className="text-[11px] sm:text-xs text-[#5A5568]">
                  In everyday language: what this card is, what it does, and how to use it during your day.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsGuideOpen(false)}
              className="p-1.5 rounded-lg hover:bg-[#ECE7DE] text-[#5A5568] hover:text-[#181524] transition-colors"
              title="Close guide"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed">
            {/* 1. What is this card? */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#E5E0D8] space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 font-mono font-bold text-[#7B5C9E] uppercase tracking-wider text-[11px]">
                <UserCheck className="w-3.5 h-3.5" />
                <span>1. What is this card?</span>
              </div>
              <h4 className="font-serif font-bold text-xs sm:text-sm text-[#181524]">
                Your Live Workspace Desk Anchor
              </h4>
              <p className="text-[#5A5568]">
                This card represents the specific AI companion currently sitting beside you at your desk (at our collaborative 45-degree angle). It mirrors your selected companion—currently <strong>{activePersona.name}</strong>—and adapts to whoever you choose in the team grid below.
              </p>
            </div>

            {/* 2. What does it do? */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#E5E0D8] space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 font-mono font-bold text-[#234F56] uppercase tracking-wider text-[11px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>2. What does it do?</span>
              </div>
              <h4 className="font-serif font-bold text-xs sm:text-sm text-[#181524]">
                Morale Grounding &amp; Quick Access
              </h4>
              <ul className="text-[#5A5568] space-y-1">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#2E6F40] font-bold">•</span>
                  <span><strong>Time-Aware Welcome:</strong> Greets you based on your actual local time.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#2E6F40] font-bold">•</span>
                  <span><strong>Daily Morale Boost:</strong> Delivers psychological grounding to ease burnout and anxiety.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#2E6F40] font-bold">•</span>
                  <span><strong>Audio Voice:</strong> Speaks affirmations aloud in gentle, calming cadence.</span>
                </li>
              </ul>
            </div>

            {/* 3. How do you use it? */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#E5E0D8] space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 font-mono font-bold text-[#92400E] uppercase tracking-wider text-[11px]">
                <Activity className="w-3.5 h-3.5" />
                <span>3. How do you use it?</span>
              </div>
              <h4 className="font-serif font-bold text-xs sm:text-sm text-[#181524]">
                Simple Controls You Can Click
              </h4>
              <ul className="text-[#5A5568] space-y-1">
                <li className="flex items-start gap-1.5">
                  <span className="text-[#7B5C9E] font-bold">1.</span>
                  <span><strong>Click &ldquo;Listen&rdquo;:</strong> Hear the companion read the affirmation aloud.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#7B5C9E] font-bold">2.</span>
                  <span><strong>Click &ldquo;Inspire Me&rdquo;:</strong> Cycle through 5 tailored daily reflections.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#7B5C9E] font-bold">3.</span>
                  <span><strong>Click &ldquo;Consult {activePersona.name}&rdquo;:</strong> Launch a secure 1-on-1 chat.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-[#7B5C9E] font-bold">4.</span>
                  <span><strong>Click &ldquo;Heart&rdquo; / &ldquo;Copy&rdquo;:</strong> Save or copy quotes to your notes.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick switcher reminder */}
          <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-200/80 flex items-center justify-between text-xs text-[#5A3882]">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#7B5C9E] shrink-0" />
              <span>
                <strong>Want a different companion?</strong> Scroll down to the team grid and click any profile (Toni, Elysian, Phoebe, Holly, Ari) to update this card immediately.
              </span>
            </span>
            <button
              type="button"
              onClick={() => setIsGuideOpen(false)}
              className="px-2.5 py-1 rounded-lg bg-white border border-purple-200 font-semibold text-[11px] text-[#7B5C9E] hover:bg-purple-100 transition-colors shrink-0 ml-2"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Embedded Daily Affirmation Sub-Component */}
      <DailyAffirmation
        activePersona={activePersona}
        onOpenChat={onOpenChat}
        showChatCta={false}
      />
    </div>
  );
};

