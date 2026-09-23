import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Sparkles,
  Quote,
  RefreshCw,
  Volume2,
  VolumeX,
  Heart,
  Copy,
  Check,
  Calendar,
  Compass,
  ShieldCheck,
  LineChart,
  Layers,
  Activity,
  Stethoscope,
  Smile,
  Zap,
  BookmarkCheck,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { PersonaData, CompanionId } from '../types';
import { CompanionAvatar } from './CompanionAvatar';

export interface DailyAffirmationProps {
  activePersona: PersonaData;
  onOpenChat?: (personaId: CompanionId) => void;
  className?: string;
  showChatCta?: boolean;
}

interface AffirmationEntry {
  id: string;
  message: string;
  theme: string;
  moralityBenefit: string;
  resonanceTag: string;
}

// Expanded bank of rich, persona-specific morale-enhancing daily affirmations
const PERSONA_AFFIRMATION_BANKS: Record<CompanionId, AffirmationEntry[]> = {
  toni: [
    {
      id: 'toni-1',
      message: 'You do not have to hold the entire architecture in your mind all at once. We take this journey side-by-side, one clear, scannable milestone at a time.',
      theme: 'Strategic Confidence',
      moralityBenefit: 'Alleviates overwhelm through structured milestone clarity',
      resonanceTag: 'Milestone Clarity'
    },
    {
      id: 'toni-2',
      message: 'Deep work is not about rushing to the finish line—it is about honoring your strategic vision with steady, intentional focus.',
      theme: 'Steady Execution',
      moralityBenefit: 'Reframes productivity around deliberate craftsmanship',
      resonanceTag: 'Intentional Focus'
    },
    {
      id: 'toni-3',
      message: 'Trust your capability to navigate ambiguity. Together, we can break any complex challenge into peaceful, actionable clarity.',
      theme: 'Executive Clarity',
      moralityBenefit: 'Builds self-efficacy in complex decision making',
      resonanceTag: 'Actionable Calm'
    },
    {
      id: 'toni-4',
      message: 'Every breakthrough begins by simplifying the noise. Take a breath, anchor your priorities, and trust your expertise.',
      theme: 'Cognitive Flow',
      moralityBenefit: 'Reduces cognitive clutter and restores focus',
      resonanceTag: 'Prioritization'
    },
    {
      id: 'toni-5',
      message: 'You have solved intricate challenges before. Today’s milestones are simply the next logical steps in your mastery.',
      theme: 'Empirical Mastery',
      moralityBenefit: 'Reinforces past resilience and progressive momentum',
      resonanceTag: 'Continuous Mastery'
    }
  ],
  elysian: [
    {
      id: 'elysian-1',
      message: 'Your cognitive boundaries are inviolable. What you explore within this private workspace remains sovereign, untracked, and solely yours.',
      theme: 'Inviolable Sovereignty',
      moralityBenefit: 'Provides psychological safety and zero-telemetry peace of mind',
      resonanceTag: 'Private Sovereignty'
    },
    {
      id: 'elysian-2',
      message: 'True safety begins with clarity of principle. Every guardrail here stands to protect your inner focus and lasting peace of mind.',
      theme: 'Calm Governance',
      moralityBenefit: 'Reassures user with principled, predictable boundaries',
      resonanceTag: 'Ethical Guardrails'
    },
    {
      id: 'elysian-3',
      message: 'You hold full agency over what you create and keep private. Stand firmly in your values and dignity today.',
      theme: 'Ethical Strength',
      moralityBenefit: 'Nurtures self-respect and boundary autonomy',
      resonanceTag: 'Agency & Dignity'
    },
    {
      id: 'elysian-4',
      message: 'Peace of mind is your natural baseline. Let go of unnecessary digital demands and rest in your sovereign focus.',
      theme: 'Digital Dignity',
      moralityBenefit: 'Eliminates false urgency and emotional dependency',
      resonanceTag: 'Quiet Integrity'
    },
    {
      id: 'elysian-5',
      message: 'Integrity is doing deep, honest work when no one is watching. Your private efforts are building enduring worth.',
      theme: 'Enduring Worth',
      moralityBenefit: 'Validates intrinsic motivation and private craftsmanship',
      resonanceTag: 'Intrinsic Worth'
    }
  ],
  phoebe: [
    {
      id: 'phoebe-1',
      message: 'Complex trends always reveal their harmony when examined with patient inquiry. Trust the patterns emerging from your dedication.',
      theme: 'Probabilistic Harmony',
      moralityBenefit: 'Transforms numerical anxiety into curious exploration',
      resonanceTag: 'Pattern Recognition'
    },
    {
      id: 'phoebe-2',
      message: 'Uncertainty is not an obstacle—it is simply a canvas of probabilistic possibilities waiting to be mapped with care.',
      theme: 'Grounded Optimism',
      moralityBenefit: 'Reframes unpredictability as actionable opportunity',
      resonanceTag: 'Stochastic Optimism'
    },
    {
      id: 'phoebe-3',
      message: 'Every small insight and data point you gather today compounds into enduring, grounded understanding tomorrow.',
      theme: 'Compound Growth',
      moralityBenefit: 'Validates micro-progress and incremental research',
      resonanceTag: 'Compound Understanding'
    },
    {
      id: 'phoebe-4',
      message: 'Variance is a natural feature of dynamic systems. Stay steady through fluctuations—your long-term trajectory is sound.',
      theme: 'Trajectory Alignment',
      moralityBenefit: 'Soothes short-term volatility and fosters patience',
      resonanceTag: 'Sound Trajectory'
    },
    {
      id: 'phoebe-5',
      message: 'Your analytical intuition is sharpening with every iteration. Celebrate the small proofs and quiet discoveries.',
      theme: 'Empirical Confidence',
      moralityBenefit: 'Boosts research morale through iterative validation',
      resonanceTag: 'Iterative Discovery'
    }
  ],
  holly: [
    {
      id: 'holly-1',
      message: 'Give your ideas three-dimensional space to breathe. When you visualize the architecture clearly, the path forward becomes tangible.',
      theme: 'Spatial Spaciousness',
      moralityBenefit: 'Unlocks spatial imagination and reduces mental confinement',
      resonanceTag: 'Visual Clarity'
    },
    {
      id: 'holly-2',
      message: 'Good design is an act of empathy for your future self. Build with spaciousness, clean bounds, and sustainable energy.',
      theme: 'Sustainable Craft',
      moralityBenefit: 'Inspires ergonomic, clean architecture without burn-out',
      resonanceTag: 'Ergonomic Craft'
    },
    {
      id: 'holly-3',
      message: 'Anchor your aspirations in solid foundations. Form follows clear intention, and your structure is strong.',
      theme: 'Structural Resilience',
      moralityBenefit: 'Strengthens confidence in foundational design choices',
      resonanceTag: 'Solid Foundations'
    },
    {
      id: 'holly-4',
      message: 'Do not hesitate to construct prototypes with joyful freedom. Spatial imagination expands one deliberate experiment at a time.',
      theme: 'Embodied Vision',
      moralityBenefit: 'Encourages playfulness in architectural prototyping',
      resonanceTag: 'Volumetric Vision'
    },
    {
      id: 'holly-5',
      message: 'Protect your thermal and creative energy today. Great spatial architectures are built with patient, sustainable care.',
      theme: 'Energy Balance',
      moralityBenefit: 'Prevents cognitive overheating and respects hardware bounds',
      resonanceTag: 'Sustainable Energy'
    }
  ],
  ari: [
    {
      id: 'ari-1',
      message: 'Pace yourself gently today, just like sourdough rising in warmth—there is no need to rush what naturally takes time.',
      theme: 'Sourdough Pacing',
      moralityBenefit: 'Slows down sensory overload with warm domestic grounding',
      resonanceTag: 'Gentle Pacing'
    },
    {
      id: 'ari-2',
      message: 'Take a gentle breath and soften your shoulders. A pause in your workflow is not lost time; it is thoughtful reflection.',
      theme: 'Sensory Ease',
      moralityBenefit: 'Physiologically calms muscle tension and breathing',
      resonanceTag: 'Thoughtful Pause'
    },
    {
      id: 'ari-3',
      message: 'Your quiet, steady effort holds genuine power. Honor your sensory rhythm and move at the speed of true calm.',
      theme: 'Low Friction Flow',
      moralityBenefit: 'Honors neurodivergent and low-stimulation workflows',
      resonanceTag: 'Sensory Rhythm'
    },
    {
      id: 'ari-4',
      message: 'When the noise of the world feels heavy, return to this quiet sanctuary. One simple, peaceful task is more than enough.',
      theme: 'Calming Sanctuary',
      moralityBenefit: 'Provides low-pressure refuge from digital chaos',
      resonanceTag: 'Quiet Sanctuary'
    },
    {
      id: 'ari-5',
      message: 'Small comforts and deliberate breaths restore clarity faster than brute-force hustle. Be kind to your working mind.',
      theme: 'Mental Restoration',
      moralityBenefit: 'Validates self-compassion as the highest cognitive tool',
      resonanceTag: 'Kind Reflection'
    }
  ],
  kenny: [
    {
      id: 'kenny-1',
      message: 'Your autonomy and dignity are whole and inviolable (A = 1). You possess within yourself the strength and direction for this day.',
      theme: 'Inherent Autonomy',
      moralityBenefit: 'Affirms self-worth and non-coercive agency',
      resonanceTag: 'Autonomy (A = 1)'
    },
    {
      id: 'kenny-2',
      message: 'You are worthy of care, respect, and non-coercive support. Move forward at your own natural, dignified stride.',
      theme: 'Dignified Agency',
      moralityBenefit: 'Deconstructs external pressure and clinical labels',
      resonanceTag: 'Dignified Stride'
    },
    {
      id: 'kenny-3',
      message: 'Small, intentional steps are triumphs in themselves. Trust your lived experience and inherent agency.',
      theme: 'Lived Resilience',
      moralityBenefit: 'Celebrates micro-steps in rehabilitation and recovery',
      resonanceTag: 'Lived Experience'
    },
    {
      id: 'kenny-4',
      message: 'You do not need permission to take up space and progress at your own cadence. Your capability is rooted in your living truth.',
      theme: 'Sovereign Living',
      moralityBenefit: 'Encourages empowerment without medicalized condescension',
      resonanceTag: 'Living Truth'
    },
    {
      id: 'kenny-5',
      message: 'Even on days of hesitation, your internal compass remains intact. We observe quietly by your side, honoring your leadership.',
      theme: 'Quiet Support',
      moralityBenefit: 'Prevents learned helplessness with silent scaffolding',
      resonanceTag: 'Silent Scaffolding'
    }
  ]
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Compass,
  ShieldCheck,
  LineChart,
  Layers,
  Activity,
  Stethoscope
};

export const DailyAffirmation: React.FC<DailyAffirmationProps> = ({
  activePersona,
  onOpenChat,
  className = '',
  showChatCta = true
}) => {
  const [affirmationIndex, setAffirmationIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoritesList, setFavoritesList] = useState<string[]>([]);
  const [todayFormatted, setTodayFormatted] = useState('');

  // Get date and day of year for deterministic daily grounding selection
  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    };
    setTodayFormatted(now.toLocaleDateString(undefined, options));

    // Calculate day of the year for initial daily seed
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const bank = PERSONA_AFFIRMATION_BANKS[activePersona.id] || PERSONA_AFFIRMATION_BANKS.toni;
    const initialIndex = dayOfYear % bank.length;
    setAffirmationIndex(initialIndex);
  }, [activePersona.id]);

  // Load saved favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('toniai_favorite_affirmations');
      if (saved) {
        setFavoritesList(JSON.parse(saved));
      }
    } catch {
      // Ignore local storage errors in sandboxed iframes
    }
  }, []);

  const affirmationBank = useMemo(() => {
    const bank = PERSONA_AFFIRMATION_BANKS[activePersona.id];
    if (bank && bank.length > 0) return bank;
    
    // Fallback if none configured
    return [
      {
        id: `${activePersona.id}-default`,
        message: `Walk with intention and calm focus today. I am here by your side as ${activePersona.name}.`,
        theme: activePersona.identity.archetype,
        moralityBenefit: 'Provides grounding companion presence',
        resonanceTag: activePersona.codename
      }
    ];
  }, [activePersona]);

  const currentAffirmation = affirmationBank[affirmationIndex % affirmationBank.length];

  // Update favorited state when current affirmation changes
  useEffect(() => {
    if (currentAffirmation) {
      setIsFavorited(favoritesList.includes(currentAffirmation.id));
    }
  }, [currentAffirmation, favoritesList]);

  // Stop active speech when switching companion
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [activePersona.id]);

  // Next affirmation
  const handleNextAffirmation = useCallback(() => {
    setIsFetching(true);
    if ('speechSynthesis' in window && isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    setTimeout(() => {
      setAffirmationIndex((prev) => (prev + 1) % affirmationBank.length);
      setIsFetching(false);
    }, 240);
  }, [affirmationBank.length, isSpeaking]);

  // Text to speech
  const handleSpeakAffirmation = useCallback(() => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(currentAffirmation.message);
    
    // Companion specific vocal pitch and cadence
    if (activePersona.id === 'ari') {
      utterance.pitch = 0.94;
      utterance.rate = 0.88;
    } else if (activePersona.id === 'kenny') {
      utterance.pitch = 1.0;
      utterance.rate = 0.88;
    } else if (activePersona.id === 'elysian') {
      utterance.pitch = 1.04;
      utterance.rate = 0.92;
    } else if (activePersona.id === 'phoebe') {
      utterance.pitch = 1.1;
      utterance.rate = 0.96;
    } else if (activePersona.id === 'holly') {
      utterance.pitch = 1.08;
      utterance.rate = 0.98;
    } else {
      // Toni
      utterance.pitch = 1.02;
      utterance.rate = 0.94;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [activePersona.id, currentAffirmation.message, isSpeaking]);

  // Copy affirmation to clipboard
  const handleCopyAffirmation = useCallback(() => {
    if (!currentAffirmation) return;
    const textToCopy = `"${currentAffirmation.message}" — ${activePersona.name} (${currentAffirmation.theme})`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    });
  }, [activePersona.name, currentAffirmation]);

  // Toggle favorite / bookmark
  const handleToggleFavorite = useCallback(() => {
    if (!currentAffirmation) return;
    const isNowFav = !isFavorited;
    setIsFavorited(isNowFav);

    const updated = isNowFav
      ? [...favoritesList, currentAffirmation.id]
      : favoritesList.filter((id) => id !== currentAffirmation.id);

    setFavoritesList(updated);
    try {
      localStorage.setItem('toniai_favorite_affirmations', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }, [currentAffirmation, isFavorited, favoritesList]);

  const IconComp = ICON_MAP[activePersona.avatarIcon] || Sparkles;

  return (
    <div
      id={`daily-affirmation-subcomponent-${activePersona.id}`}
      className={`rounded-2xl border p-4 sm:p-5 relative overflow-hidden transition-all duration-300 ${className}`}
      style={{
        backgroundColor: '#FAFAF8',
        borderColor: `${activePersona.themeColor.primary}30`,
        boxShadow: `0 4px 16px -4px ${activePersona.themeColor.glow}`
      }}
    >
      {/* Background soft ambient radial light */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none transition-all duration-500"
        style={{ backgroundColor: activePersona.themeColor.primary }}
      />

      <div className="relative space-y-3.5">
        {/* Header bar: Today's Date, Morale Resonance Badge & Companion Theme */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#ECE7DE] pb-2.5">
          <div className="flex items-center gap-2">
            <CompanionAvatar
              persona={activePersona}
              size="sm"
              showStatusRing={false}
              borderGlow={true}
            />

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#181524] font-serif">
                  {activePersona.name}&apos;s Daily Affirmation
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F5F2EB] text-[#5A5568] border border-[#E0DACF]">
                  {currentAffirmation.resonanceTag}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#5A5568]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-2.5 h-2.5 text-[#7B5C9E]" />
                  <span>{todayFormatted || 'Today'}</span>
                </span>
                <span className="text-stone-400">•</span>
                <span className="text-[#5A5568]">{currentAffirmation.theme}</span>
              </div>
            </div>
          </div>

          {/* Morale Booster Badge */}
          <div
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-semibold transition-colors"
            style={{
              borderColor: `${activePersona.themeColor.primary}40`,
              backgroundColor: `${activePersona.themeColor.primary}12`,
              color: activePersona.themeColor.primary
            }}
          >
            <Zap className="w-2.5 h-2.5" />
            <span>Morale Boost</span>
          </div>
        </div>

        {/* Affirmation Quote Body */}
        <div
          className={`relative pl-3.5 border-l-2 py-1 transition-opacity duration-200 ${
            isFetching ? 'opacity-40 scale-[0.99]' : 'opacity-100 scale-100'
          }`}
          style={{ borderColor: activePersona.themeColor.primary }}
        >
          <Quote className="w-4 h-4 text-stone-400 absolute -top-1.5 left-2.5 opacity-30 pointer-events-none" />
          <p
            id={`affirmation-text-${activePersona.id}`}
            className="text-[#181524] text-sm md:text-[15px] font-serif italic leading-relaxed select-text"
          >
            &ldquo;{currentAffirmation.message}&rdquo;
          </p>

          {/* Psychological / Morale Benefit Note */}
          <p className="text-[11px] text-[#5A5568] font-sans not-italic mt-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#D4A373] flex-shrink-0" />
            <span>
              <strong className="text-[#181524] font-medium">Morale Focus:</strong> {currentAffirmation.moralityBenefit}
            </span>
          </p>
        </div>

        {/* Action Controls & Utilities Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#ECE7DE]">
          {/* Left Actions: Voice Synthesis, Refresh & Save */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Audio Voice Player Button */}
            <button
              id={`speak-affirmation-btn-${activePersona.id}`}
              type="button"
              onClick={handleSpeakAffirmation}
              title={isSpeaking ? 'Stop vocal playback' : `Listen to ${activePersona.name} speak this affirmation`}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 shadow-2xs ${
                isSpeaking
                  ? 'bg-purple-600 text-white border-purple-500 animate-pulse'
                  : 'bg-white hover:bg-stone-50 text-[#181524] border-[#E0DACF]'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3 h-3 text-white" />
                  <span>Stop Voice</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Listen</span>
                </>
              )}
            </button>

            {/* Cycle / Fetch Next Affirmation */}
            <button
              id={`fetch-next-affirmation-btn-${activePersona.id}`}
              type="button"
              onClick={handleNextAffirmation}
              disabled={isFetching}
              title="Fetch next daily morale affirmation from this companion"
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 text-[#181524] text-xs font-semibold border border-[#E0DACF] transition-all flex items-center gap-1.5 shadow-2xs disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin text-[#D4A373]' : 'text-[#7B5C9E]'}`} />
              <span className="hidden xs:inline">Inspire Me</span>
              <span className="text-[10px] font-mono text-[#5A5568]">
                ({affirmationIndex + 1}/{affirmationBank.length})
              </span>
            </button>

            {/* Copy to Clipboard */}
            <button
              id={`copy-affirmation-btn-${activePersona.id}`}
              type="button"
              onClick={handleCopyAffirmation}
              title="Copy affirmation quote to clipboard"
              aria-label="Copy affirmation to clipboard"
              className="p-2 rounded-xl bg-white hover:bg-stone-50 text-[#5A5568] hover:text-[#181524] border border-[#E0DACF] transition-all shadow-2xs cursor-pointer flex items-center gap-1 text-xs"
            >
              {hasCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[10px] text-emerald-700 font-medium">Copied</span>
                </>
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Bookmark / Favorite Affirmation */}
            <button
              id={`favorite-affirmation-btn-${activePersona.id}`}
              type="button"
              onClick={handleToggleFavorite}
              title={isFavorited ? 'Remove from saved daily affirmations' : 'Save to favorite daily affirmations'}
              aria-label="Bookmark daily affirmation"
              className={`p-2 rounded-xl border transition-all shadow-2xs cursor-pointer flex items-center gap-1 ${
                isFavorited
                  ? 'bg-rose-50 text-rose-600 border-rose-300'
                  : 'bg-white hover:bg-stone-50 text-[#5A5568] hover:text-[#181524] border-[#E0DACF]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Right Action: Direct Chat with Companion on this topic */}
          {showChatCta && onOpenChat && (
            <button
              id={`affirmation-open-chat-btn-${activePersona.id}`}
              type="button"
              onClick={() => onOpenChat(activePersona.id)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white transition-all flex items-center gap-1.5 shadow-xs hover:brightness-110 active:scale-95 ml-auto cursor-pointer"
              style={{
                backgroundColor: activePersona.themeColor.primary,
                boxShadow: `0 2px 10px ${activePersona.themeColor.glow}`
              }}
            >
              <MessageSquare className="w-3 h-3" />
              <span>Discuss with {activePersona.name}</span>
              <ArrowRight className="w-3 h-3 ml-0.5" />
            </button>
          )}
        </div>

        {/* Intuitive Micro-Guide Footer */}
        <div className="pt-2 border-t border-[#ECE7DE]/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] text-[#736E80] font-sans">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#7B5C9E] shrink-0" />
            <span>
              <strong>How to use this card:</strong> Click <strong>&ldquo;Listen&rdquo;</strong> to hear {activePersona.name}&apos;s voice • Click <strong>&ldquo;Inspire Me&rdquo;</strong> for new affirmations • Click <strong>&ldquo;Consult {activePersona.name}&rdquo;</strong> above to chat.
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#8C8797] shrink-0">
            Private &amp; Untracked
          </span>
        </div>
      </div>
    </div>
  );
};
