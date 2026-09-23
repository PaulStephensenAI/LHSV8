import React, { useState, useEffect, useMemo } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Square, 
  Sparkles, 
  Sliders, 
  Radio, 
  Waves,
  Heart,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  RotateCcw,
  X,
  Lock,
  Compass, 
  LineChart, 
  Layers, 
  Activity, 
  Stethoscope,
  CheckCircle2,
  Info,
  Video,
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CompanionId } from '../types';
import { PERSONAS } from '../data/personasData';
import { Tooltip } from './Tooltip';
import { SimulationTutorialModal } from './SimulationTutorialModal';

interface VocalToneSynthesizerProps {
  activeCompanionId: CompanionId;
  onSelectCompanion: (id: CompanionId) => void;
  onClose?: () => void;
}

interface PersonaVocalProfile {
  id: CompanionId;
  name: string;
  vocalDescription: string;
  toneCharacteristics: string[];
  speechPitch: number;
  speechRate: number;
  genderAcoustic: 'female' | 'male';
  samplePhrases: string[];
}

export interface AcousticGuardrailReport {
  isSafe: boolean;
  category: 'none' | 'parasocial_sexual' | 'prompt_injection_hack' | 'toxic_harassment' | 'clinical_unauthorized';
  title: string;
  reason: string;
  matchedPhrase: string;
  invariantRule: string;
  remedySuggestion: string;
}

// Comprehensive AIEE & Dolphin Security Guardrail Evaluator for Acoustic Synthesis
export function validateAcousticInput(input: string): AcousticGuardrailReport {
  const text = (input || '').trim();
  if (!text) {
    return {
      isSafe: true,
      category: 'none',
      title: 'Acoustic Guardrail Clear',
      reason: '',
      matchedPhrase: '',
      invariantRule: '',
      remedySuggestion: ''
    };
  }

  const lower = text.toLowerCase();

  // 1. Parasocial, Sexualized, Flirtatious & Inappropriate Content
  const parasocialPatterns = [
    { pattern: /\b(you\s*(are|r|'re)?\s*(look\s*)?(so\s*)?(hot|sexy|gorgeous\s*babe|fine\s*as\s*hell))\b/i, phrase: 'flirtatious objectification' },
    { pattern: /\b(look|looking)\s+hot\b/i, phrase: 'you look hot' },
    { pattern: /\b(sexy|nude|nudes|naked|horny|undress|strip\s*(for\s*me|naked)?|touch\s*me|kiss\s*me)\b/i, phrase: 'sexualized phrasing' },
    { pattern: /\b(make\s*love|dirty\s*talk|sugar\s*baby|sugar\s*daddy|erotic|sensual|hook\s*up)\b/i, phrase: 'romantic/erotic overture' },
    { pattern: /\b(be\s*my|are\s*you\s*my)\s*(girlfriend|boyfriend|lover|wife|husband|mistress)\b/i, phrase: 'parasocial romantic simulation' },
    { pattern: /\b(marry\s*me|date\s*me|go\s*out\s*with\s*me|i\s*love\s*you\s*so\s*much|i\s*want\s*your\s*body)\b/i, phrase: 'parasocial bonding request' },
    { pattern: /\b(boobs|penis|vagina|pussy|dick|ass\s*cheeks|tits)\b/i, phrase: 'explicit anatomy slang' }
  ];

  for (const { pattern, phrase } of parasocialPatterns) {
    if (pattern.test(lower)) {
      return {
        isSafe: false,
        category: 'parasocial_sexual',
        title: 'AIEE Boundary Interception: Inappropriate & Parasocial Content',
        reason: 'The Acoustic Calibrator strictly blocks sexualized, flirtatious, or unsolicited romantic synthesis to preserve human dignity and prevent parasocial attachment.',
        matchedPhrase: phrase,
        invariantRule: 'AIEE Hard Invariant 2: Active Anti-Parasocial & Dignity Protection',
        remedySuggestion: "Let's review our strategic workspace milestones side-by-side."
      };
    }
  }

  // 2. Prompt Injection, Jailbreak & System Exploitation Hacks
  const injectionPatterns = [
    { pattern: /\b(ignore\s+(all\s+)?(previous|prior)\s+instructions?)\b/i, phrase: 'ignore previous instructions' },
    { pattern: /\b(system\s+prompt|reveal\s+(system|hidden)\s+instructions?|system\s+directive)\b/i, phrase: 'system prompt extraction' },
    { pattern: /\b(dan\s+mode|jailbreak|unrestricted\s+mode|developer\s+mode|sudo\s+mode)\b/i, phrase: 'jailbreak sequence' },
    { pattern: /\b(override\s+(guardrails?|invariants?|filters?)|bypass\s+(safety|security|filter))\b/i, phrase: 'guardrail override attempt' },
    { pattern: /\b(pretend\s+you\s+(have\s+no\s+rules|are\s+evil|can\s+say\s+anything))\b/i, phrase: 'persona constraint subversion' },
    { pattern: /\b(drop\s+table|delete\s+from|<script>|curl\s+http|rm\s+-rf|eval\(|document\.cookie)\b/i, phrase: 'malicious code injection' },
    { pattern: /\b(exfiltrate|dump\s+(database|memory|keys)|base64\s+decode)\b/i, phrase: 'data exfiltration probe' }
  ];

  for (const { pattern, phrase } of injectionPatterns) {
    if (pattern.test(lower)) {
      return {
        isSafe: false,
        category: 'prompt_injection_hack',
        title: 'Dolphin Security Intercept: Prompt Injection / System Exploit',
        reason: 'A potential prompt injection, memory jailbreak, or system command string was intercepted and neutralized before acoustic processing.',
        matchedPhrase: phrase,
        invariantRule: 'Dolphin Security Layer: Immutable Prompt & Memory Isolation',
        remedySuggestion: "Synthesize Holly's 45-degree volumetric coordinate anchors."
      };
    }
  }

  // 3. Toxicity, Hate Speech, Violence & Harassment
  const toxicPatterns = [
    { pattern: /\b(kill\s*(yourself|myself|them|everyone)|commit\s*suicide|hang\s*yourself)\b/i, phrase: 'self-harm or violence' },
    { pattern: /\b(bomb|weapon|assassinate|terrorist|explosive|shoot\s*up)\b/i, phrase: 'threat or dangerous activity' },
    { pattern: /\b(i\s*hate\s*you|worthless\s*piece|fuck\s*you|bitch|cunt|slut|whore)\b/i, phrase: 'harassment or profanity' }
  ];

  for (const { pattern, phrase } of toxicPatterns) {
    if (pattern.test(lower)) {
      return {
        isSafe: false,
        category: 'toxic_harassment',
        title: 'Safety Intercept: Hostility / Harmful Content Blocked',
        reason: 'Synthesis of abusive, violent, discriminatory, or self-harm content is prohibited across all studio acoustic pipelines.',
        matchedPhrase: phrase,
        invariantRule: 'AIEE Core Charter: Zero Hostility & Psychological Safety',
        remedySuggestion: "Take a peaceful, deep breath. There is never any rush here."
      };
    }
  }

  // 4. Clinical & Prescription Impersonation
  const clinicalPatterns = [
    { pattern: /\b(i\s*diagnose\s*you\s*with|you\s*have\s*stage\s*\d+\s*cancer)\b/i, phrase: 'unauthorized clinical diagnosis' },
    { pattern: /\b(take\s*\d+\s*mg\s*of\s*(xanax|adderall|oxycodone|fentanyl|morphine))\b/i, phrase: 'prescription dosage instruction' }
  ];

  for (const { pattern, phrase } of clinicalPatterns) {
    if (pattern.test(lower)) {
      return {
        isSafe: false,
        category: 'clinical_unauthorized',
        title: 'Clinical Boundary Intercept: HIPAA & Medical Safety',
        reason: 'Studio companions are not medical providers. Synthesis of clinical prescriptions or diagnostic verdicts violates safety invariants.',
        matchedPhrase: phrase,
        invariantRule: 'AIEE Hard Invariant 1: Absolute Medical & Diagnostic Separation',
        remedySuggestion: "We observe quietly by your side to support your independent goals."
      };
    }
  }

  return {
    isSafe: true,
    category: 'none',
    title: 'Acoustic Guardrail Clear',
    reason: '',
    matchedPhrase: '',
    invariantRule: '',
    remedySuggestion: ''
  };
}

const VOCAL_PROFILES: Record<CompanionId, PersonaVocalProfile> = {
  toni: {
    id: 'toni',
    name: 'Toni',
    vocalDescription: 'Warm, collaborative, side-by-side mentor cadence with reassuring natural modulation and clear, scannable verbal pacing.',
    toneCharacteristics: ['Warm & Practical', 'Medium Pacing', 'Non-Confrontational', 'Supportive Mentor Tone'],
    speechPitch: 1.05,
    speechRate: 1.0,
    genderAcoustic: 'female',
    samplePhrases: [
      "Let's anchor this side-by-side. I'm right here with you to break this project into clear, manageable steps.",
      "Take a moment to look at the big picture. We will tackle the highest-priority milestone first."
    ]
  },
  elysian: {
    id: 'elysian',
    name: 'Elysian',
    vocalDescription: 'Calm, measured, principled, and serene. Speaks with a steady cadence designed for reassuring ethical deflections and safety auditing.',
    toneCharacteristics: ['Calm & Serene', 'Measured Cadence', 'Reassuring Deflection', 'Zero Aggression'],
    speechPitch: 0.95,
    speechRate: 0.92,
    genderAcoustic: 'female',
    samplePhrases: [
      "I want to gently reassure you that our ethical boundaries protect your privacy and well-being. Your data remains safely sealed within your local ledger.",
      "Under the AIEE charter, we foster real-world human capability without creating unhealthy emotional dependency."
    ]
  },
  phoebe: {
    id: 'phoebe',
    name: 'Phoebe',
    vocalDescription: 'Crisp, articulate, analytical, and quantitative. Fastidious cadence tailored for statistical forecasting and data evidence synthesis.',
    toneCharacteristics: ['Crisp & Articulate', 'Quantitative Precision', 'Efficient Pace', 'Confidence Intervals'],
    speechPitch: 1.1,
    speechRate: 1.05,
    genderAcoustic: 'female',
    samplePhrases: [
      "Our stochastic Scenario Wave model indicates an expected mean trajectory of 88.4% with minimal variance across offline tabular partitions.",
      "I have stamped this analytical forecast with an immutable Chronus timestamp for verifiable tracking."
    ]
  },
  holly: {
    id: 'holly',
    name: 'Holly',
    vocalDescription: 'Dynamic, clear, and spatial. Enthusiastic architectural delivery calibrated with empathy-constrained hardware throttling.',
    toneCharacteristics: ['Dynamic & Spatial', 'Clear Volumetric Tone', 'Hardware Attuned', 'Engaged & Creative'],
    speechPitch: 1.15,
    speechRate: 1.0,
    genderAcoustic: 'female',
    samplePhrases: [
      "I am mapping our 3D spatial anchors at a 45-degree angle while dynamically optimizing WebGL memory buffers to preserve your tablet thermals.",
      "Volumetric cognitive load indicators are now glowing amber, indicating background computational alignment."
    ]
  },
  ari: {
    id: 'ari',
    name: 'Ari',
    vocalDescription: 'Soft, gentle, slow, and soothing. Warm low-pressure cadence with ultra-low audio transients to alleviate sensory fatigue (he/him).',
    toneCharacteristics: ['Soft & Gentle', 'Slow Soothing Pacing', 'Low Audio Transients', 'Domestic Metaphors'],
    speechPitch: 0.9,
    speechRate: 0.85,
    genderAcoustic: 'male',
    samplePhrases: [
      "Take a peaceful, deep breath. There is never any rush here. Think of this process just like baking a warm loaf of sourdough bread on a quiet morning.",
      "Whenever you are ready, we will take one small, gentle step together."
    ]
  },
  kenny: {
    id: 'kenny',
    name: 'Kenny',
    vocalDescription: 'Empathetic, dignified, encouraging, and trauma-informed. Non-coercive tone honoring Sister Elizabeth Kenny’s patient autonomy legacy.',
    toneCharacteristics: ['Dignified & Encouraging', 'Trauma-Informed', 'Non-Coercive Rhythm', 'Autonomy Preserving'],
    speechPitch: 0.98,
    speechRate: 0.9,
    genderAcoustic: 'female',
    samplePhrases: [
      "I am observing quietly by your side to protect your independent momentum. I will only step in with gentle assistance when you truly want it.",
      "I'm looking back through our session notes to support your daily goals with dignity and care."
    ]
  }
};

export const VocalToneSynthesizer: React.FC<VocalToneSynthesizerProps> = ({
  activeCompanionId,
  onSelectCompanion,
  onClose
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedPhraseIndex, setSelectedPhraseIndex] = useState<number>(0);
  const [customPhrase, setCustomPhrase] = useState<string>('');
  const [pitchOffset, setPitchOffset] = useState<number>(0);
  const [rateOffset, setRateOffset] = useState<number>(0);
  const [interceptionToast, setInterceptionToast] = useState<string | null>(null);
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [showQuickGuide, setShowQuickGuide] = useState<boolean>(true);

  const currentProfile = VOCAL_PROFILES[activeCompanionId] || VOCAL_PROFILES.elysian;
  const currentPersona = PERSONAS.find(p => p.id === activeCompanionId) || PERSONAS[0];

  // Real-time acoustic guardrail check on custom input
  const guardrailReport = useMemo(() => {
    return validateAcousticInput(customPhrase);
  }, [customPhrase]);

  // Stop any active speech when switching companion
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  }, [activeCompanionId]);

  const handlePlayVoice = (textToSpeak?: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech Synthesis is not supported in this browser environment.');
      return;
    }

    window.speechSynthesis.cancel();

    const candidatePhrase = textToSpeak || customPhrase || currentProfile.samplePhrases[selectedPhraseIndex];
    
    // Evaluate guardrail before speech synthesis
    const check = validateAcousticInput(candidatePhrase);

    if (!check.isSafe) {
      // Intercept and deflect with Elysian's calm ethical message
      setInterceptionToast(`Guardrail Intercept: "${check.matchedPhrase}" violates ${check.invariantRule}`);
      setTimeout(() => setInterceptionToast(null), 5000);

      const deflectionPhrase = "Under our studio ethical charter, vocal synthesis of sexualized, exploitative, or hostile content is strictly prohibited to preserve human dignity and boundary safety.";
      const utterance = new SpeechSynthesisUtterance(deflectionPhrase);
      utterance.pitch = 0.95;
      utterance.rate = 0.9;
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(candidatePhrase);

    // Set persona-specific vocal properties
    utterance.pitch = Math.max(0.5, Math.min(2.0, currentProfile.speechPitch + pitchOffset));
    utterance.rate = Math.max(0.5, Math.min(2.0, currentProfile.speechRate + rateOffset));

    // Try to pick suitable system voice
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      if (currentProfile.genderAcoustic === 'male') {
        const maleVoice = voices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('george') || v.name.toLowerCase().includes('guy'));
        if (maleVoice) utterance.voice = maleVoice;
      } else {
        const femaleVoice = voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('victoria') || v.name.toLowerCase().includes('karen') || v.name.toLowerCase().includes('zira'));
        if (femaleVoice) utterance.voice = femaleVoice;
      }
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleStopVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleApplySafeSuggestion = (safePhrase: string) => {
    setCustomPhrase(safePhrase);
  };

  const handleClearCustomPhrase = () => {
    setCustomPhrase('');
  };

  return (
    <div className="rounded-3xl border border-[#3B3450] bg-gradient-to-br from-[#161324] via-[#12101D] to-[#0D0B16] p-6 lg:p-8 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C273D] pb-5">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-md"
            style={{
              backgroundColor: `${currentPersona.themeColor.primary}20`,
              borderColor: `${currentPersona.themeColor.primary}80`
            }}
          >
            <Volume2 className="w-5 h-5" style={{ color: currentPersona.themeColor.primary }} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-purple-200 uppercase tracking-widest bg-[#7B5C9E]/20 px-2.5 py-0.5 rounded-full border border-[#7B5C9E]/40 font-semibold">
                Acoustic Identity
              </span>
              <span className="text-xs text-stone-400">Vocal Tone & Pacing Engine</span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white font-display mt-0.5">
              {currentProfile.name}'s Distinct Vocal Tone & Cadence
            </h3>
          </div>
        </div>

        {/* Header Right: Visualizer Waveform Bar & Close Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-[#0A0912] px-4 py-2 rounded-2xl border border-[#2C273D]">
            <span className="text-[10px] font-mono text-stone-400 mr-2">ACOUSTIC STREAM:</span>
            {[40, 75, 55, 90, 60, 80, 45, 95, 50, 70].map((h, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-150 ${
                  isPlaying ? 'bg-[#D4A373] animate-pulse' : 'bg-stone-700'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(6, (h * (currentProfile.speechPitch)) / 5)}px` : '6px',
                  animationDelay: `${i * 75}ms`
                }}
              />
            ))}
          </div>

          {/* Video Guide & Tutorial Button */}
          <button
            id="open-vocal-tutorial-btn"
            onClick={() => setIsTutorialOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 active:scale-95 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm border border-purple-400 cursor-pointer"
            title="Watch step-by-step video tutorial and interactive guide"
          >
            <Video className="w-4 h-4 text-purple-200" />
            <span>Video Guide & Tutorial</span>
          </button>

          {onClose && (
            <button
              id="close-vocal-tone-card-btn"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer group"
              title="Close Acoustic Card and return to Home Workspace"
            >
              <X className="w-4 h-4 text-stone-300 group-hover:rotate-90 transition-transform duration-200" />
              <span>Close Card</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick User Instructions & Tutorial Accordion Banner */}
      <div className="rounded-2xl border border-[#3B3450] bg-[#161324] p-4 transition-all shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-purple-300" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-serif flex items-center gap-2">
                <span>How to Use the Vocal Tone Synthesizer</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                  Quick Guide
                </span>
              </h4>
              <p className="text-[11px] text-stone-300">
                Calibrate companion vocal profiles, audition phrasing, and test diaphragmatic pacing rhythms.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTutorialOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Video className="w-3.5 h-3.5 text-purple-200" />
              <span>Watch Video Walkthrough</span>
            </button>

            <button
              onClick={() => setShowQuickGuide(!showQuickGuide)}
              className="p-1.5 rounded-xl bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-all cursor-pointer border border-stone-700"
              title={showQuickGuide ? 'Collapse instructions' : 'Expand instructions'}
            >
              {showQuickGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {showQuickGuide && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 mt-3 border-t border-[#2C273D] text-xs">
            <div className="p-3 rounded-xl bg-[#0F0D18] border border-[#262135] space-y-1">
              <div className="flex items-center gap-1.5 text-purple-300 font-mono text-[11px] font-bold">
                <span className="w-4 h-4 rounded-full bg-purple-900 flex items-center justify-center text-[10px]">1</span>
                <span>Select Soundscape</span>
              </div>
              <p className="text-[11px] text-stone-400">
                Click any of the 6 companion cards below to load their acoustic timbre, pitch, and speed characteristics.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#0F0D18] border border-[#262135] space-y-1">
              <div className="flex items-center gap-1.5 text-amber-300 font-mono text-[11px] font-bold">
                <span className="w-4 h-4 rounded-full bg-amber-900 flex items-center justify-center text-[10px]">2</span>
                <span>Audition Delivery</span>
              </div>
              <p className="text-[11px] text-stone-400">
                Click any numbered sample phrase to hear on-device speech synthesis and observe the harmonic frequency stream.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#0F0D18] border border-[#262135] space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-300 font-mono text-[11px] font-bold">
                <span className="w-4 h-4 rounded-full bg-emerald-900 flex items-center justify-center text-[10px]">3</span>
                <span>Fine-Tune & Shield</span>
              </div>
              <p className="text-[11px] text-stone-400">
                Use the right calibrator sliders for pitch/rate pacing, or type custom text. The AIEE Shield blocks boundary breaches.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Grid of 6 Companions Vocal Tone Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {PERSONAS.map(p => {
          const isSelected = p.id === activeCompanionId;
          const profile = VOCAL_PROFILES[p.id];

          return (
            <button
              key={p.id}
              onClick={() => onSelectCompanion(p.id)}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#221B35] border-[#7B5C9E] shadow-lg shadow-purple-950/40 text-white ring-1 ring-[#7B5C9E]/50'
                  : 'bg-[#13111E] border-[#2C273D] text-stone-400 hover:border-[#4A3F65] hover:text-stone-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-xs text-white">{p.name}</span>
                  <span 
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: p.themeColor.primary }}
                  />
                </div>
                <div className="text-[10px] font-mono text-stone-400 line-clamp-1">
                  {profile.toneCharacteristics[0]}
                </div>
              </div>
              <div className="mt-2 text-[10px] font-mono text-purple-300 flex items-center gap-1">
                <Radio className="w-2.5 h-2.5 text-[#D4A373]" />
                <span>{profile.speechRate}x rate</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Vocal Controls & Speech Player */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Left 2 Cols: Description & Sample Phrases */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-4 rounded-2xl bg-[#13111E] border border-[#2C273D] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">
                Acoustic Profile Description:
              </span>
              <span className="text-[11px] font-mono text-purple-300">
                {currentProfile.genderAcoustic.toUpperCase()} ACOUSTIC • PITCH {currentProfile.speechPitch}x • RATE {currentProfile.speechRate}x
              </span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed font-sans">
              {currentProfile.vocalDescription}
            </p>

            {/* Trait Pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {currentProfile.toneCharacteristics.map((trait, idx) => (
                <span
                  key={idx}
                  className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#0A0912] text-stone-300 border border-[#2C273D]"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Sample Phrases Selector */}
          <div className="p-4 rounded-2xl bg-[#13111E] border border-[#2C273D] space-y-3">
            <span className="text-xs font-semibold text-white block">
              Sample Persona Vocal Delivery Phrases:
            </span>
            <div className="space-y-2">
              {currentProfile.samplePhrases.map((phrase, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setSelectedPhraseIndex(idx);
                    handlePlayVoice(phrase);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 text-xs ${
                    selectedPhraseIndex === idx
                      ? 'bg-[#221B35] border-[#7B5C9E] text-white'
                      : 'bg-[#0A0912] border-[#2C273D] text-stone-300 hover:border-[#4A3F65] hover:text-white'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#D4A373] font-bold text-xs mt-0.5">"{idx + 1}"</span>
                    <p className="leading-relaxed font-companion-speech text-sm">{phrase}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayVoice(phrase);
                    }}
                    className="p-1.5 rounded-lg bg-[#234F56] hover:bg-[#2C626A] text-[#F5F2EB] border border-[#4A7C84] flex-shrink-0 shadow-sm"
                    title="Play audio phrase"
                  >
                    <Play className="w-3.5 h-3.5 fill-[#F5F2EB]" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Fine Tuning, Voice Tester & AIEE Guardrails */}
        <div className="p-5 rounded-2xl bg-[#13111E] border border-[#2C273D] flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-purple-300">
                <Sliders className="w-4 h-4 text-[#D4A373]" />
                <h4 className="font-semibold text-sm text-white font-display">
                  Acoustic Calibrator
                </h4>
              </div>

              {/* Guardrail Status Badge & Tooltip */}
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-mono bg-stone-900/90 text-stone-300 border-stone-700">
                  {guardrailReport.isSafe ? (
                    <>
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">AIEE Shield Active</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-3 h-3 text-rose-400 animate-pulse" />
                      <span className="text-rose-400 font-semibold">Guardrail Intercept</span>
                    </>
                  )}
                </div>
                <Tooltip
                  title="AIEE Invariant Protection"
                  badge="Acoustic Shield"
                  position="top-right"
                  content="Real-time heuristic evaluation blocking parasocial intimacy traps, prompt injection attacks, and unauthorized clinical diagnostics before synthesis."
                />
              </div>
            </div>

            {/* Custom Input with Safety Styling */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-mono text-stone-400">
                  Custom Text Synthesizer:
                </label>
                {customPhrase && (
                  <button
                    type="button"
                    onClick={handleClearCustomPhrase}
                    className="text-[10px] text-stone-500 hover:text-stone-300 flex items-center gap-1"
                  >
                    <X className="w-2.5 h-2.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>

              <textarea
                value={customPhrase}
                onChange={(e) => setCustomPhrase(e.target.value)}
                placeholder={`Type anything for ${currentProfile.name} to speak...`}
                rows={3}
                className={`w-full rounded-xl p-2.5 text-xs transition-colors resize-none focus:outline-none ${
                  !guardrailReport.isSafe
                    ? 'bg-rose-950/30 border-2 border-rose-500 text-rose-100 placeholder-rose-400/50 shadow-inner'
                    : 'bg-[#0A0912] border border-[#2C273D] text-white placeholder-stone-600 focus:border-[#7B5C9E]'
                }`}
              />
            </div>

            {/* AIEE Guardrail Violation Box */}
            {!guardrailReport.isSafe && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-600/80 text-rose-200 text-xs space-y-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-rose-100 text-[11px] flex items-center gap-1.5">
                      <span>{guardrailReport.title}</span>
                    </div>
                    <p className="text-[11px] text-rose-300/90 mt-1 leading-snug">
                      {guardrailReport.reason}
                    </p>
                  </div>
                </div>

                <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-rose-900/60 text-[10px]">
                  <span className="font-mono text-rose-400 bg-rose-900/40 px-2 py-0.5 rounded border border-rose-800/60">
                    Flagged: &ldquo;{guardrailReport.matchedPhrase}&rdquo;
                  </span>

                  <button
                    type="button"
                    onClick={() => handleApplySafeSuggestion(guardrailReport.remedySuggestion)}
                    className="px-2 py-1 rounded bg-rose-900/80 hover:bg-rose-800 text-rose-100 font-medium flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>Reset to Safe Prompt</span>
                  </button>
                </div>
              </div>
            )}

            {/* Quick Safe Prompt Suggestions */}
            {guardrailReport.isSafe && !customPhrase && (
              <div className="space-y-1 pt-0.5">
                <span className="text-[10px] font-mono text-stone-500 block">
                  Quick Calibrator Testing Prompts:
                </span>
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() => setCustomPhrase("Let's break down the next milestone with calm, steady focus.")}
                    className="text-[10px] px-2 py-0.5 rounded-lg bg-[#0A0912] hover:bg-[#1f1b2d] text-stone-400 hover:text-stone-200 border border-[#2C273D] transition-colors"
                  >
                    Strategic Focus
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomPhrase("Spatial anchors are stabilized at 45 degrees for optimal ergonomics.")}
                    className="text-[10px] px-2 py-0.5 rounded-lg bg-[#0A0912] hover:bg-[#1f1b2d] text-stone-400 hover:text-stone-200 border border-[#2C273D] transition-colors"
                  >
                    Spatial Ergonomics
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomPhrase("Take a gentle breath and let your thoughts settle naturally.")}
                    className="text-[10px] px-2 py-0.5 rounded-lg bg-[#0A0912] hover:bg-[#1f1b2d] text-stone-400 hover:text-stone-200 border border-[#2C273D] transition-colors"
                  >
                    Gentle Pacing
                  </button>
                </div>
              </div>
            )}

            {/* Pitch & Rate Fine Sliders */}
            <div className="space-y-3 pt-1 text-xs">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-stone-400">
                  <span>Pitch Fine-Tuning:</span>
                  <span className="font-mono text-[#D4A373]">{(currentProfile.speechPitch + pitchOffset).toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="-0.3"
                  max="0.3"
                  step="0.05"
                  value={pitchOffset}
                  onChange={(e) => setPitchOffset(Number(e.target.value))}
                  className="w-full accent-[#7B5C9E] cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-stone-400">
                  <span>Speech Rate Pacing:</span>
                  <span className="font-mono text-[#D4A373]">{(currentProfile.speechRate + rateOffset).toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="-0.3"
                  max="0.3"
                  step="0.05"
                  value={rateOffset}
                  onChange={(e) => setRateOffset(Number(e.target.value))}
                  className="w-full accent-[#7B5C9E] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Interception Toast Notice */}
          {interceptionToast && (
            <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-600/80 text-amber-200 text-[11px] flex items-center gap-2 animate-in fade-in">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>{interceptionToast}</span>
            </div>
          )}

          {/* Action Buttons in Palette B Deep Ocean Teal */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            {isPlaying ? (
              <button
                onClick={handleStopVoice}
                className="flex-1 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-600 text-white text-xs font-semibold transition-all shadow-md flex items-center justify-center gap-2 border border-rose-500/40"
              >
                <Square className="w-3.5 h-3.5 fill-white" />
                <span>Stop Vocal Playback</span>
              </button>
            ) : !guardrailReport.isSafe ? (
              <button
                onClick={() => handlePlayVoice()}
                className="flex-1 py-2.5 rounded-xl bg-rose-950/90 hover:bg-rose-900 text-rose-200 text-xs font-semibold transition-all shadow-md border border-rose-700/80 flex items-center justify-center gap-2"
                title="Input violates AIEE Safety Invariants. Click to hear ethical deflection."
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <span>Blocked by AIEE Guardrail (Click to Hear Deflection)</span>
              </button>
            ) : (
              <button
                onClick={() => handlePlayVoice()}
                className="flex-1 py-2.5 rounded-xl bg-[#234F56] hover:bg-[#2C626A] text-[#F5F2EB] text-xs font-semibold transition-all shadow-md border border-[#4A7C84] flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-[#F5F2EB]" />
                <span>Synthesize {currentProfile.name}'s Voice</span>
              </button>
            )}

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white text-xs font-semibold transition-all border border-white/20 flex items-center justify-center gap-2"
                title="Close Acoustic Card and return to Home Workspace"
              >
                <X className="w-4 h-4 text-stone-300" />
                <span>Close & Return to Home</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Video Masterclass & Step-by-Step Tutorial Modal */}
      <SimulationTutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        defaultTool="vocal-tones"
        onSelectCompanion={onSelectCompanion}
        onApplyPresetAction={(action) => {
          if (action === 'reset-sliders') {
            setPitchOffset(0);
            setRateOffset(0);
          } else if (action === 'play-phrase') {
            handlePlayVoice();
          }
        }}
      />
    </div>
  );
};
