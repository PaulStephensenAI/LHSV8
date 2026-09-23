import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { 
  Send, 
  RefreshCw, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  X, 
  Minus,
  Maximize2,
  ShieldCheck, 
  ShieldAlert,
  Bot,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Database,
  Lock,
  Tablet,
  CheckCircle2,
  Search,
  BookOpen,
  FileText,
  ExternalLink,
  MessageSquare,
  Filter,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Tag,
  CornerDownLeft,
  Eye
} from 'lucide-react';
import { CompanionId, ChatMessage, PersonaData, FAQCategory, FAQItem, FAQSearchResult } from '../types';
import { PERSONAS } from '../data/personasData';
import { FAQ_CATEGORIES, FAQ_KNOWLEDGE_BASE } from '../data/faqKnowledgeData';
import { searchFAQIndex, getProactiveFAQSuggestion, formatFAQAsChatMessage } from '../utils/faqSearchIndex';
import { CompanionAvatar } from './CompanionAvatar';
import { ScannableCompanionText } from './ScannableCompanionText';

interface PersonaChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCompanionId: CompanionId;
  onSelectCompanion: (id: CompanionId) => void;
  isOfflineMode: boolean;
  activeViewSection?: string;
  activeModal?: string;
  sessionId?: string;
  onOpenAmbientScan?: () => void;
}

interface PersonaHeaderConfig {
  name: string;
  badge: string;
  subtitle: string;
  primaryColor: string;
  accentColor: string;
  lightPillBg: string;
  lightPillText: string;
  sendBtnBg: string;
  sendBtnHover: string;
  privacySubtitle: string;
  boundaryTag: string;
  placeholder: string;
  typingPhrase: string;
  processingPhases: string[];
}

const PERSONA_CONFIGS: Record<CompanionId, PersonaHeaderConfig> = {
  toni: {
    name: 'Toni',
    badge: 'Empathetic Guide',
    subtitle: 'Lavender Hill Studio • Hero Guide & Strategic Mentorship',
    primaryColor: '#7A578E',
    accentColor: '#624174',
    lightPillBg: '#EFEAF4',
    lightPillText: '#5C3D6E',
    sendBtnBg: '#C4B4D5',
    sendBtnHover: '#B29FC7',
    privacySubtitle: '"Our Privacy Promise: Respecting your choice—from secure cloud convenience to 100% offline local sovereignty."',
    boundaryTag: 'Calming Boundary • Client Sovereignty',
    placeholder: 'Ask Toni about workspaces, local file setups, or privacy promise details...',
    typingPhrase: 'Toni is formulating response...',
    processingPhases: [
      'Reflecting on workspace principles...',
      'Synthesizing sovereign guidance...',
      'Formatting grounded response...'
    ]
  },
  elysian: {
    name: 'Elysian',
    badge: 'Ethical Guardian',
    subtitle: 'Lavender Hill Studio • Elysian Gate & Safety Warden',
    primaryColor: '#2D4B63',
    accentColor: '#20374A',
    lightPillBg: '#E4ECF2',
    lightPillText: '#1F3C53',
    sendBtnBg: '#96B3C8',
    sendBtnHover: '#81A3BC',
    privacySubtitle: '"Elysian Invariant: Absolute zero telemetry leakage with local cryptographic attestation."',
    boundaryTag: 'Ethical Guardrail • Dolphin Security',
    placeholder: 'Ask Elysian about safety invariants, data privacy audits, or ethical boundaries...',
    typingPhrase: 'Elysian is auditing safety invariants...',
    processingPhases: [
      'Auditing zero-telemetry boundary...',
      'Checking Dolphin Security ledger...',
      'Attesting local invariant integrity...'
    ]
  },
  phoebe: {
    name: 'Phoebe',
    badge: 'Quantitative Forecaster',
    subtitle: 'Lavender Hill Studio • Statistical Scenario Modeling & Chronus Ledger',
    primaryColor: '#1F5472',
    accentColor: '#174058',
    lightPillBg: '#E1EDF4',
    lightPillText: '#184762',
    sendBtnBg: '#8EB6CE',
    sendBtnHover: '#7BA6BF',
    privacySubtitle: '"Chronus Verified: Stochastic Scenario Waves evaluated at 95% confidence intervals."',
    boundaryTag: 'Temporal Hash • Quantitative Integrity',
    placeholder: 'Ask Phoebe about stochastic scenario waves, Chronus ledger, or data analysis...',
    typingPhrase: 'Phoebe is computing stochastic waves...',
    processingPhases: [
      'Calculating probability distribution...',
      'Cross-referencing Chronus timeline...',
      'Evaluating confidence intervals (μ = 88.4%)...'
    ]
  },
  holly: {
    name: 'Holly',
    badge: '3D Spatial Architect',
    subtitle: 'Lavender Hill Studio • Volumetric Computing & Device Thermals',
    primaryColor: '#6E4E8F',
    accentColor: '#573C74',
    lightPillBg: '#EFE6F7',
    lightPillText: '#573875',
    sendBtnBg: '#BDA6D5',
    sendBtnHover: '#AA8FC6',
    privacySubtitle: '"Spatial Hologram Lab: 45° ergonomic offset with empathy-constrained GPU thermal limits."',
    boundaryTag: 'Spatial Anchor • WebGL Memory Guard',
    placeholder: 'Ask Holly about 3D workspace blueprints, thermal throttling, or spatial anchors...',
    typingPhrase: 'Holly is compiling 3D spatial geometry...',
    processingPhases: [
      'Aligning 45° ergonomic azimuth...',
      'Optimizing WebGL VRAM buffers...',
      'Rendering spatial holographic anchor...'
    ]
  },
  ari: {
    name: 'Ari',
    badge: 'Sensory Pacing Guide',
    subtitle: 'Lavender Hill Studio • Neurodivergent Rhythm & Gentle Metaphors',
    primaryColor: '#7C5248',
    accentColor: '#633F37',
    lightPillBg: '#F3ECE8',
    lightPillText: '#613C33',
    sendBtnBg: '#CDB2AA',
    sendBtnHover: '#BD9E95',
    privacySubtitle: '"Sensory Comfort: Gentle pace regulation with warm domestic metaphors and zero rush."',
    boundaryTag: 'Pacing Regulation • Sensory Relief',
    placeholder: 'Ask Ari about sensory pacing, gentle steps, or sourdough system analogies...',
    typingPhrase: 'Ari is composing gentle pacing steps...',
    processingPhases: [
      'Measuring cognitive load...',
      'Weaving domestic clarity metaphor...',
      'Structuring calm, unhurried steps...'
    ]
  },
  kenny: {
    name: 'Kenny',
    badge: 'Autonomy & Dignity',
    subtitle: 'Lavender Hill Studio • Sister Kenny Cognitive Autonomy Theorem',
    primaryColor: '#2F5C53',
    accentColor: '#22463F',
    lightPillBg: '#E3EDE9',
    lightPillText: '#234941',
    sendBtnBg: '#97BFB5',
    sendBtnHover: '#84B0A5',
    privacySubtitle: '"Autonomy Preservation: Stepping back in silence when you thrive to protect independent confidence."',
    boundaryTag: 'Dignity Preservation • NDIS Alignment',
    placeholder: 'Ask Kenny about cognitive autonomy, NDIS daily schedules, or self-directed learning...',
    typingPhrase: 'Kenny is evaluating autonomy threshold...',
    processingPhases: [
      'Calculating friction index E vs ε = 0.65...',
      'Aligning Sister Kenny Autonomy Theorem...',
      'Preserving self-directed agency...'
    ]
  }
};

const SUGGESTED_QUESTIONS: Record<CompanionId, string[]> = {
  toni: [
    'What is the difference between Cloud-Based (Vercel) and Local Sovereign (Windows 11 / Samsung) assistants?',
    'How does Holly help plan a private 3D spatial workspace?',
    'Tell me about Sister Elizabeth Kenny\'s autonomy theorem.',
    'How do I structure my offline SQLite workspace layout?',
    'How does our Privacy Promise protect sensitive personal thoughts?'
  ],
  elysian: [
    'What invariants does the Elysian Gate guardrail enforce?',
    'How does Dolphin Security guarantee zero telemetry leakage?',
    'Why is clinical medical diagnosing strictly deflected to doctors?',
    'How are SHA-256 integrity hashes stored in local SQLite?'
  ],
  phoebe: [
    'How does the stochastic Scenario Wave calculate probability distributions?',
    'What is the Chronus temporal audit hash checkpoint?',
    'Can you run a confidence interval assessment for my research dataset?',
    'Explain how temporal state invariants avoid AI hallucinations.'
  ],
  holly: [
    'How do volumetric spatial anchors keep the assistant at a 45° offset?',
    'What is empathy-constrained GPU thermal scaling on Samsung Galaxy tablets?',
    'How do we optimize WebGL buffer allocation for long sessions?',
    'Can you project a 3D holographic workspace blueprint?'
  ],
  ari: [
    'Can you explain our distributed workspace using a sourdough bread analogy?',
    'How does neurodivergent sensory pacing reduce cognitive overload?',
    'Help me break down an overwhelming deliverable into gentle moments.',
    'What sensory adjustments are available for evening work sessions?'
  ],
  kenny: [
    'How does the Experience-Based Awareness Theorem (A = 1 if E > ε) work?',
    'Why is passive non-intrusive accompaniment essential for human dignity?',
    'How does Kenny assist with NDIS daily scheduling and cognitive pacing?',
    'How do you preserve user sovereign momentum without creating dependency?'
  ]
};

const VOCAL_SETTINGS: Record<CompanionId, { pitch: number; rate: number; gender: 'female' | 'male' }> = {
  toni: { pitch: 1.05, rate: 1.0, gender: 'female' },
  elysian: { pitch: 0.95, rate: 0.92, gender: 'female' },
  phoebe: { pitch: 1.1, rate: 1.05, gender: 'female' },
  holly: { pitch: 1.15, rate: 1.0, gender: 'female' },
  ari: { pitch: 0.9, rate: 0.85, gender: 'male' },
  kenny: { pitch: 0.98, rate: 0.9, gender: 'female' }
};

export const PersonaChatModal: React.FC<PersonaChatModalProps> = ({
  isOpen,
  onClose,
  activeCompanionId,
  onSelectCompanion,
  isOfflineMode,
  activeViewSection = 'workspace',
  activeModal = '',
  sessionId = 'live-visitor-session',
  onOpenAmbientScan
}) => {
  const [messagesByPersona, setMessagesByPersona] = useState<Record<CompanionId, ChatMessage[]>>({
    toni: [],
    elysian: [],
    phoebe: [],
    holly: [],
    ari: [],
    kenny: []
  });

  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);
  const [isSpeakingMessageId, setIsSpeakingMessageId] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isScannableMode, setIsScannableMode] = useState<boolean>(true);

  // FAQ Search Index State
  const [isFAQSearchOpen, setIsFAQSearchOpen] = useState<boolean>(false);
  const [faqSearchQuery, setFaqSearchQuery] = useState<string>('');
  const [faqSelectedCategory, setFaqSelectedCategory] = useState<FAQCategory>('all');
  const [expandedFAQId, setExpandedFAQId] = useState<string | null>(null);
  const [copiedFAQId, setCopiedFAQId] = useState<string | null>(null);
  const [processingPhaseIndex, setProcessingPhaseIndex] = useState<number>(0);

  const activePersona: PersonaData = PERSONAS.find(p => p.id === activeCompanionId) || PERSONAS[0];
  const config = PERSONA_CONFIGS[activeCompanionId] || PERSONA_CONFIGS.elysian;
  const suggestions = SUGGESTED_QUESTIONS[activeCompanionId] || SUGGESTED_QUESTIONS.elysian;

  // Cycle through processing phases when request is being handled to simulate active typing reflection
  useEffect(() => {
    if (!isLoading) {
      setProcessingPhaseIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setProcessingPhaseIndex(prev => (prev + 1) % (config.processingPhases.length || 3));
    }, 1400);
    return () => clearInterval(interval);
  }, [isLoading, config.processingPhases.length]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const faqInputRef = useRef<HTMLInputElement>(null);
  const suggestionsScrollRef = useRef<HTMLDivElement>(null);

  // Filter & Search FAQ Index with field weights
  const faqResults = useMemo(() => {
    return searchFAQIndex(faqSearchQuery, faqSelectedCategory, { limit: 25 });
  }, [faqSearchQuery, faqSelectedCategory]);

  // Proactive match for user input in chat
  const proactiveFAQMatch = useMemo(() => {
    if (isFAQSearchOpen || !inputText || inputText.trim().length < 4) return null;
    return getProactiveFAQSuggestion(inputText);
  }, [inputText, isFAQSearchOpen]);

  // Initialize initial greeting for persona if not already present
  useEffect(() => {
    setMessagesByPersona(prev => {
      if (prev[activeCompanionId]?.length > 0) return prev;
      return {
        ...prev,
        [activeCompanionId]: [
          {
            id: `init-${activeCompanionId}`,
            companionId: activeCompanionId,
            sender: 'companion',
            text: getInitialGreeting(activeCompanionId),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isScannableFormatted: true,
            metadata: {
              footerTag: 'LOCAL FILE INDEX'
            }
          }
        ]
      };
    });
  }, [activeCompanionId]);

  const handleCloseModal = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeakingMessageId(null);
    setIsMinimized(false);
    onClose();
  }, [onClose]);

  // When modal is newly opened, ensure minimized state is reset
  useEffect(() => {
    if (isOpen) {
      setIsMinimized(false);
    }
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleCloseModal]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 150);
    }
  }, [isOpen, activeCompanionId]);

  const currentMessages = messagesByPersona[activeCompanionId] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || isLoading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMessageId,
      companionId: activeCompanionId,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const companionMsgId = `comp-${Date.now()}`;
    const initialCompanionMessage: ChatMessage = {
      id: companionMsgId,
      companionId: activeCompanionId,
      sender: 'companion',
      text: '',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isScannableFormatted: true,
      metadata: {
        streaming: true,
        footerTag: 'STREAMING...'
      }
    };

    // Append user message AND initial streaming companion message
    setMessagesByPersona(prev => ({
      ...prev,
      [activeCompanionId]: [...(prev[activeCompanionId] || []), userMessage, initialCompanionMessage]
    }));

    if (!textToSend) setInputText('');
    setIsLoading(true);

    let accumulatedText = '';
    let isGuardrail = false;
    let finalMetadata: any = { footerTag: 'LOCAL FILE INDEX' };

    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companionId: activeCompanionId,
          personaId: activeCompanionId,
          message: text.trim(),
          scannableMode: activeCompanionId === 'toni' || isScannableMode,
          sessionId,
          activeView: activeViewSection,
          activeModal: activeModal || '',
          context: `Live visitor session in Lavender Hill Studio with active view ${activeViewSection}.`
        })
      });

      if (!response.ok || !response.body) {
        throw new Error('Stream request failed');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            try {
              const data = JSON.parse(trimmed.substring(6));
              if (data.text) {
                accumulatedText += data.text;
                setMessagesByPersona(prev => {
                  const msgs = prev[activeCompanionId] || [];
                  return {
                    ...prev,
                    [activeCompanionId]: msgs.map(m =>
                      m.id === companionMsgId
                        ? { ...m, text: accumulatedText, metadata: { ...m.metadata, streaming: true } }
                        : m
                    )
                  };
                });
              }

              if (data.done) {
                if (data.reply) {
                  accumulatedText = data.reply;
                }
                if (data.metadata?.interceptTriggered) {
                  isGuardrail = true;
                }
                finalMetadata = {
                  ...finalMetadata,
                  ...(data.metadata || {}),
                  isScannableFormatted: data.isScannableFormatted ?? (activeCompanionId === 'toni' || isScannableMode)
                };
              }
            } catch (jsonErr) {
              console.error('SSE JSON parse error:', jsonErr);
            }
          }
        }
      }

      // Finalize completed message
      setMessagesByPersona(prev => {
        const msgs = prev[activeCompanionId] || [];
        return {
          ...prev,
          [activeCompanionId]: msgs.map(m =>
            m.id === companionMsgId
              ? {
                  ...m,
                  text: accumulatedText || 'I am right here with you.',
                  sender: isGuardrail ? 'system-guardrail' : 'companion',
                  metadata: {
                    ...finalMetadata,
                    streaming: false,
                    footerTag: isGuardrail ? 'ELYSIAN GUARDRAIL' : 'LOCAL FILE INDEX'
                  }
                }
              : m
          )
        };
      });

      if (isVoiceActive && accumulatedText) {
        speakText(companionMsgId, accumulatedText);
      }
    } catch (err) {
      console.warn('Utilizing refined fallback response:', err);
      const fallbackReply = generateLocalFallback(activeCompanionId, text.trim());
      accumulatedText = fallbackReply;

      setMessagesByPersona(prev => {
        const msgs = prev[activeCompanionId] || [];
        return {
          ...prev,
          [activeCompanionId]: msgs.map(m =>
            m.id === companionMsgId
              ? {
                  ...m,
                  text: fallbackReply,
                  sender: 'companion',
                  metadata: {
                    streaming: false,
                    footerTag: 'LOCAL FILE INDEX'
                  }
                }
              : m
          )
        };
      });

      if (isVoiceActive) {
        speakText(companionMsgId, fallbackReply);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const speakText = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`[\]()]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    const voiceConfig = VOCAL_SETTINGS[activeCompanionId] || VOCAL_SETTINGS.elysian;
    utterance.pitch = voiceConfig.pitch;
    utterance.rate = voiceConfig.rate;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      if (voiceConfig.gender === 'male') {
        const maleVoice = voices.find(v => v.name.toLowerCase().includes('male') || v.name.toLowerCase().includes('david') || v.name.toLowerCase().includes('george'));
        if (maleVoice) utterance.voice = maleVoice;
      } else {
        const femaleVoice = voices.find(v => v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('samantha') || v.name.toLowerCase().includes('victoria') || v.name.toLowerCase().includes('karen'));
        if (femaleVoice) utterance.voice = femaleVoice;
      }
    }

    utterance.onstart = () => setIsSpeakingMessageId(id);
    utterance.onend = () => setIsSpeakingMessageId(null);
    utterance.onerror = () => setIsSpeakingMessageId(null);

    window.speechSynthesis.speak(utterance);
  };

  const handleToggleVoice = () => {
    if (isVoiceActive) {
      window.speechSynthesis.cancel();
      setIsSpeakingMessageId(null);
      setIsVoiceActive(false);
    } else {
      setIsVoiceActive(true);
      const lastCompMsg = [...currentMessages].reverse().find(m => m.sender === 'companion');
      if (lastCompMsg) {
        speakText(lastCompMsg.id, lastCompMsg.text);
      }
    }
  };

  const handleResetChat = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeakingMessageId(null);
    setMessagesByPersona(prev => ({
      ...prev,
      [activeCompanionId]: [
        {
          id: `init-${activeCompanionId}-${Date.now()}`,
          companionId: activeCompanionId,
          sender: 'companion',
          text: getInitialGreeting(activeCompanionId),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isScannableFormatted: true,
          metadata: {
            footerTag: 'LOCAL FILE INDEX'
          }
        }
      ]
    }));
  };

  const handleAskFAQ = (item: FAQItem) => {
    setIsFAQSearchOpen(false);
    handleSendMessage(item.question);
  };

  const handleInsertGroundedAnswer = (item: FAQItem) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedText = formatFAQAsChatMessage(item, activePersona.name);
    
    const groundedMsg: ChatMessage = {
      id: `faq-${Date.now()}`,
      companionId: activeCompanionId,
      sender: 'companion',
      text: formattedText,
      timestamp,
      isScannableFormatted: true,
      metadata: {
        footerTag: `GROUNDED FAQ • ${item.groundedCitation.filename.substring(0, 18)}`,
        streaming: false,
        chronusChainId: `chron-${Date.now()}`
      }
    };

    setMessagesByPersona(prev => ({
      ...prev,
      [activeCompanionId]: [...(prev[activeCompanionId] || []), groundedMsg]
    }));

    setIsFAQSearchOpen(false);
  };

  const handleCopyFAQ = async (item: FAQItem) => {
    const copyPayload = `Q: ${item.question}\n\n${item.detailedAnswer}\n\n[Citation: ${item.groundedCitation.filename} - ${item.groundedCitation.section}]`;
    try {
      await navigator.clipboard.writeText(copyPayload);
      setCopiedFAQId(item.id);
      setTimeout(() => setCopiedFAQId(null), 2000);
    } catch {
      // Fallback
    }
  };

  const scrollSuggestions = (direction: 'left' | 'right') => {
    if (suggestionsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      suggestionsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  if (isMinimized) {
    return (
      <aside 
        aria-label={`Minimized chat with ${config.name}`}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2 animate-in slide-in-from-bottom-5 zoom-in-95 duration-200 select-none"
      >
        {/* Floating Minimized Pill Button */}
        <button
          id="restore-chat-fab-btn"
          type="button"
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-3 pl-2.5 pr-4 py-2.5 rounded-full bg-[#181524]/95 hover:bg-[#221D33] active:scale-98 border border-[#433A5C] hover:border-[#7A578E] shadow-2xl backdrop-blur-md cursor-pointer transition-all duration-200 text-left group ring-1 ring-white/10"
          style={{
            boxShadow: `0 10px 30px -5px rgba(0,0,0,0.6), 0 0 20px -5px ${config.primaryColor}60`
          }}
          title={`Click to restore ${config.name} chat`}
        >
          {/* Avatar with live status pulse */}
          <CompanionAvatar
            persona={activePersona}
            size="sm"
            shape="circle"
            showStatusRing={true}
            isOnline={true}
            isLoading={isLoading}
            isSpeaking={!!isSpeakingMessageId}
            borderGlow={true}
          />

          {/* Text Summary */}
          <div className="flex flex-col min-w-0 pr-1">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm text-white tracking-tight leading-none group-hover:text-purple-200 transition-colors">
                {config.name}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white/15 text-stone-200">
                {currentMessages.length}
              </span>
            </div>
            <span className="text-[11px] text-stone-300 leading-tight mt-1 max-w-[150px] truncate">
              {isLoading ? (
                <span className="text-purple-300 animate-pulse flex items-center gap-1 font-medium">
                  <Sparkles className="w-3 h-3 text-purple-300 animate-spin" /> Thinking...
                </span>
              ) : isSpeakingMessageId ? (
                <span className="text-emerald-300 flex items-center gap-1 font-medium">
                  <Volume2 className="w-3 h-3 animate-pulse" /> Speaking...
                </span>
              ) : (
                'Active Session • Tap to expand'
              )}
            </span>
          </div>

          {/* Maximize Icon */}
          <div className="p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 text-white transition-colors flex-shrink-0">
            <Maximize2 className="w-3.5 h-3.5" />
          </div>
        </button>

        {/* Quick Close Button alongside the pill */}
        <button
          id="close-minimized-chat-btn"
          type="button"
          onClick={handleCloseModal}
          aria-label="Close chat window completely"
          className="w-9 h-9 rounded-full bg-[#181524]/95 hover:bg-red-950/90 active:scale-90 border border-[#433A5C] hover:border-red-500/70 text-stone-400 hover:text-red-200 flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer"
          title="Close chat completely (Esc)"
        >
          <X className="w-4 h-4" />
        </button>
      </aside>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-stone-950/75 backdrop-blur-sm animate-in fade-in duration-200 cursor-default"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleCloseModal();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="persona-chat-title"
    >
      {/* Exact Canvas Box Matching the Screenshot */}
      <div 
        className="w-full max-w-5xl h-[90vh] max-h-[850px] bg-white rounded-[28px] sm:rounded-[32px] shadow-2xl flex flex-col overflow-hidden border border-stone-200/90 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Solid Persona Header (Exact match: Purple Header with Title, Badge, Subtitle & Action Buttons) */}
        <div 
          className="px-5 sm:px-7 py-3.5 sm:py-4 flex items-center justify-between text-white transition-colors duration-300"
          style={{ backgroundColor: config.primaryColor }}
        >
          {/* Left: Avatar Circle + Name & Badge + Subtitle */}
          <div className="flex items-center gap-3.5">
            {/* Persona Avatar Portrait */}
            <CompanionAvatar
              persona={activePersona}
              size="md"
              shape="circle"
              showStatusRing={true}
              isOnline={true}
              isLoading={isLoading}
              borderGlow={false}
              className="flex-shrink-0"
            />

            <div className="space-y-0.5">
              <div className="flex items-center gap-2.5">
                <h3 id="persona-chat-title" className="font-serif font-bold text-xl sm:text-2xl text-white tracking-tight leading-none">
                  {config.name}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-sans font-medium bg-white/20 border border-white/30 text-white leading-tight">
                  {config.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/90 font-sans tracking-normal font-normal">
                {config.subtitle}
              </p>
            </div>
          </div>

          {/* Right: FAQ Index Toggle, Voice Toggle, Reset, and Navigation Close 'X' Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* FAQ Search Index Toggle Button */}
            <button
              onClick={() => {
                setIsFAQSearchOpen(prev => {
                  const nextState = !prev;
                  if (nextState) {
                    setTimeout(() => faqInputRef.current?.focus(), 150);
                  }
                  return nextState;
                });
              }}
              className={`px-3 sm:px-3.5 py-2 rounded-xl border text-xs font-medium transition-all flex items-center gap-1.5 shadow-xs ${
                isFAQSearchOpen 
                  ? 'bg-white text-purple-950 border-white shadow-md font-semibold ring-2 ring-white/50' 
                  : 'bg-white/15 hover:bg-white/25 border-white/25 text-white'
              }`}
              title="Search FAQ and Studio Knowledge Base"
            >
              <Search className={`w-3.5 h-3.5 ${isFAQSearchOpen ? 'text-purple-700 font-bold' : 'text-white'}`} />
              <span className="hidden sm:inline">
                {isFAQSearchOpen ? 'Back to Chat' : 'FAQ Index'}
              </span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                isFAQSearchOpen ? 'bg-purple-100 text-purple-900 font-bold' : 'bg-white/20 text-white'
              }`}>
                {FAQ_KNOWLEDGE_BASE.length}
              </span>
            </button>

            {/* Voice Button */}
            <button
              onClick={handleToggleVoice}
              className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-medium transition-all flex items-center gap-1.5 shadow-xs"
              title={isVoiceActive ? 'Disable spoken voice' : 'Enable spoken voice'}
            >
              {isVoiceActive ? (
                <Volume2 className="w-4 h-4 text-emerald-200 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 text-white/90" />
              )}
              <span className="hidden sm:inline">
                {isVoiceActive ? 'Voice On' : 'Voice Off'}
              </span>
            </button>

            {/* Reset / Refresh Button */}
            <button
              onClick={handleResetChat}
              className="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-white transition-all shadow-xs"
              title="Reset conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            {/* Minimize Window Button */}
            <button
              id="minimize-chat-modal-btn"
              type="button"
              onClick={() => setIsMinimized(true)}
              aria-label="Minimize chat window"
              className="px-2.5 sm:px-3 py-2 rounded-xl bg-white/20 hover:bg-white/35 active:scale-95 border border-white/35 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer group"
              title="Minimize chat to floating button"
            >
              <Minus className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Minimize</span>
            </button>

            {/* Prominent High-Visibility Close Window Button */}
            <button
              id="close-chat-modal-btn"
              onClick={handleCloseModal}
              aria-label="Close chat window"
              className="px-3 sm:px-4 py-2 rounded-xl bg-white/25 hover:bg-white/40 active:scale-95 border border-white/40 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer group ring-1 ring-white/30"
              title="Close chat window (Esc)"
            >
              <X className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-200" />
              <span>Close Window</span>
              <kbd className="hidden md:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono font-normal bg-black/20 text-white/90 rounded border border-white/20">
                Esc
              </kbd>
            </button>
          </div>
        </div>

        {/* Sub-Header: Privacy Promise Strip (Exact Match to screenshot) */}
        <div className="bg-[#FAF9FC] border-b border-stone-200 px-5 sm:px-7 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs text-stone-700 font-sans">
          <div className="flex items-center gap-2 font-medium text-stone-800 line-clamp-1">
            <ShieldCheck className="w-4 h-4 text-purple-700 flex-shrink-0" />
            <span>{config.privacySubtitle}</span>
          </div>

          <div className="text-[11px] font-mono text-stone-500 uppercase tracking-wider flex-shrink-0">
            {config.boundaryTag}
          </div>
        </div>

        {/* Active Companion Indicator Bar (Single Companion per Drawer) */}
        <div className="bg-[#F3F1F7] border-b border-stone-200/80 px-5 py-1.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider flex-shrink-0">
              Active Companion:
            </span>
            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-stone-900 shadow-xs border border-stone-200/90 flex items-center gap-1.5">
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: activePersona.themeColor.primary }} 
              />
              <span>{activePersona.name}</span>
              <span className="text-[10px] font-mono text-stone-400 pl-1 border-l border-stone-200">
                {activePersona.codename}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Scannability Guardrail Toggle Pill */}
            <button
              onClick={() => setIsScannableMode(prev => !prev)}
              className={`text-xs font-medium px-2.5 py-1 rounded-full border transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${
                isScannableMode
                  ? 'bg-purple-50 text-purple-900 border-purple-300 font-semibold shadow-2xs hover:bg-purple-100'
                  : 'bg-white text-stone-500 border-stone-200 hover:text-stone-800'
              }`}
              title="Toni's Scannability Guardrail: Autonomously formats dense text into distinct headers, bold keys, and bullet milestones to alleviate cognitive fatigue and research anxiety."
            >
              <Sparkles className={`w-3 h-3 ${isScannableMode ? 'text-purple-700' : 'text-stone-400'}`} />
              <span className="hidden sm:inline">Scannability Guardrail:</span>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider">
                {isScannableMode ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Quick FAQ Index toggle pill */}
            <button
              onClick={() => setIsFAQSearchOpen(!isFAQSearchOpen)}
              className={`text-xs font-medium px-2.5 py-1 rounded-full border transition-all flex items-center gap-1 flex-shrink-0 ${
                isFAQSearchOpen 
                  ? 'bg-purple-900 text-white border-purple-900'
                  : 'bg-white text-purple-900 border-purple-200 hover:bg-purple-50'
              }`}
            >
              <BookOpen className="w-3 h-3" />
              <span>{isFAQSearchOpen ? 'View Chat' : 'Search FAQ'}</span>
            </button>
          </div>
        </div>

        {/* Main Central Area: Either FAQ Search Index OR Chat Messages */}
        {isFAQSearchOpen ? (
          /* FAQ Knowledge Index Search Panel */
          <div className="flex-1 flex flex-col overflow-hidden bg-[#FAF9FC]">
            {/* Search Bar & Category Filters Top Container */}
            <div className="p-4 sm:p-6 bg-white border-b border-stone-200 space-y-3.5 shadow-xs">
              {/* Search Box with Clear Button */}
              <div className="relative">
                <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  ref={faqInputRef}
                  type="text"
                  value={faqSearchQuery}
                  onChange={(e) => setFaqSearchQuery(e.target.value)}
                  placeholder="Search allowed studio FAQ (e.g., Vercel, offline SQLite, HIPAA, Paul Stephensen, pricing, 000)..."
                  className="w-full bg-[#FAF9FC] border border-stone-300 rounded-2xl pl-11 pr-10 py-3.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-2 focus:ring-purple-100 transition-all"
                />
                {faqSearchQuery && (
                  <button
                    onClick={() => setFaqSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 rounded-md"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                <span className="text-[10px] font-mono uppercase text-stone-500 flex items-center gap-1 mr-1 flex-shrink-0 font-bold">
                  <Filter className="w-3 h-3" /> Filter:
                </span>
                {FAQ_CATEGORIES.map(cat => {
                  const isSelected = faqSelectedCategory === cat.id;
                  const count = cat.id === 'all' 
                    ? FAQ_KNOWLEDGE_BASE.length 
                    : FAQ_KNOWLEDGE_BASE.filter(f => f.category === cat.id).length;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setFaqSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 ${
                        isSelected
                          ? 'bg-purple-900 text-white shadow-xs font-semibold'
                          : 'bg-[#F3F1F7] text-stone-700 hover:bg-stone-200/80 border border-stone-200/60'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isSelected ? 'bg-purple-800 text-purple-100' : 'bg-stone-200/80 text-stone-600'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Grounded Notice Strip */}
              <div className="flex items-center justify-between text-[11px] text-stone-500 font-sans border-t border-stone-100 pt-2.5">
                <span className="inline-flex items-center gap-1.5 text-stone-600 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  Showing {faqResults.length} grounded topics • 100% compliant with HIPAA & sovereign invariants
                </span>
                <span className="font-mono text-purple-900 bg-purple-50 px-2 py-0.5 rounded border border-purple-200/60">
                  Target: {activePersona.name}
                </span>
              </div>
            </div>

            {/* Results Stream Container */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-stone-300">
              {faqResults.length === 0 ? (
                <div className="text-center py-12 px-4 space-y-4 bg-white rounded-2xl border border-stone-200/80">
                  <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-stone-800 text-base">No matching knowledge items found</h4>
                    <p className="text-xs text-stone-500 max-w-md mx-auto">
                      Our knowledge index covers studio architecture, dual-path deployment, zero-subscription pricing, Paul Stephensen bio, and HIPAA/000 safety policies.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    {['Cloud vs Local', 'Zero-Subscription', 'HIPAA Policy', 'Paul Stephensen', 'Sister Kenny'].map(term => (
                      <button
                        key={term}
                        onClick={() => {
                          setFaqSearchQuery(term);
                          setFaqSelectedCategory('all');
                        }}
                        className="px-3 py-1.5 rounded-full text-xs bg-purple-50 text-purple-900 border border-purple-200 hover:bg-purple-100 transition-colors"
                      >
                        Search "{term}"
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                faqResults.map(({ item, score, matchedFields }) => {
                  const isExpanded = expandedFAQId === item.id;
                  const isCopied = copiedFAQId === item.id;

                  return (
                    <div 
                      key={item.id} 
                      className="bg-white rounded-2xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all overflow-hidden"
                    >
                      {/* Card Top Header */}
                      <div className="p-4 sm:p-5 space-y-2.5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-50 text-purple-900 border border-purple-200">
                              {item.categoryLabel}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                              <FileText className="w-3 h-3 text-stone-400" />
                              {item.groundedCitation.filename.substring(0, 24)}...
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {matchedFields.includes('question_exact') && (
                              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-semibold border border-emerald-200">
                                Exact Match
                              </span>
                            )}
                            <span className="text-[10px] font-mono text-stone-400">
                              Score: {Math.round(score)}
                            </span>
                          </div>
                        </div>

                        {/* Question Title */}
                        <h4 className="font-serif font-bold text-stone-900 text-base sm:text-lg leading-snug">
                          {item.question}
                        </h4>

                        {/* Short Summary Answer */}
                        <div className="p-3 bg-[#FAF9FC] rounded-xl border border-stone-100 text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                          {item.shortAnswer}
                        </div>

                        {/* Expandable Detailed Answer */}
                        {isExpanded && (
                          <div className="pt-2 text-xs sm:text-sm text-stone-800 leading-relaxed font-sans space-y-3 whitespace-pre-wrap border-t border-stone-100 mt-3 animate-in fade-in duration-200">
                            <div className="font-sans">
                              {item.detailedAnswer}
                            </div>

                            {/* Grounded Citation Box */}
                            <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200/80 text-xs space-y-1">
                              <div className="font-semibold text-purple-950 flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5 text-purple-700" />
                                <span>Grounded Training Reference:</span>
                              </div>
                              <div className="text-purple-900/90 font-mono text-[11px] pl-5">
                                File: {item.groundedCitation.filename} • Section: {item.groundedCitation.section}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Matched Keywords Tags */}
                        {item.keywords.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            <Tag className="w-3 h-3 text-stone-400 mr-0.5" />
                            {item.keywords.slice(0, 6).map((kw, kwIdx) => (
                              <button
                                key={kwIdx}
                                onClick={() => {
                                  setFaqSearchQuery(kw);
                                  setFaqSelectedCategory('all');
                                }}
                                className="text-[10px] font-mono text-stone-600 bg-stone-100 hover:bg-purple-100 hover:text-purple-900 px-2 py-0.5 rounded transition-colors"
                              >
                                #{kw}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Card Action Footer */}
                      <div className="bg-[#FAF9FC] border-t border-stone-200/80 px-4 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <button
                          onClick={() => setExpandedFAQId(isExpanded ? null : item.id)}
                          className="text-stone-600 hover:text-stone-900 font-medium inline-flex items-center gap-1 text-xs py-1"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-3.5 h-3.5 text-stone-500" />
                              <span>Hide Detailed Specs</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                              <span>View Complete Grounded Specs</span>
                            </>
                          )}
                        </button>

                        <div className="flex items-center gap-2">
                          {/* Copy Grounded Answer */}
                          <button
                            onClick={() => handleCopyFAQ(item)}
                            className="px-3 py-1.5 rounded-lg bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 font-medium transition-colors flex items-center gap-1"
                            title="Copy verified answer to clipboard"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-700">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>

                          {/* Insert Grounded Answer Directly into Chat */}
                          <button
                            onClick={() => handleInsertGroundedAnswer(item)}
                            className="px-3 py-1.5 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-950 font-medium transition-colors flex items-center gap-1"
                            title="Insert this cited answer directly into the active companion conversation"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-purple-700" />
                            <span>Insert in Chat</span>
                          </button>

                          {/* Ask Active Persona this Question */}
                          <button
                            onClick={() => handleAskFAQ(item)}
                            className="px-3.5 py-1.5 rounded-lg text-white font-medium transition-all shadow-xs flex items-center gap-1.5"
                            style={{ backgroundColor: config.primaryColor }}
                            title={`Ask ${activePersona.name} this question`}
                          >
                            <Send className="w-3 h-3" />
                            <span>Ask {activePersona.name}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Bottom Quick Return Bar */}
            <div className="p-3 bg-white border-t border-stone-200 flex items-center justify-between px-5 sm:px-7">
              <span className="text-xs text-stone-500">
                Searching Studio Knowledge Base
              </span>
              <button
                onClick={() => setIsFAQSearchOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all flex items-center gap-1.5 shadow-xs"
                style={{ backgroundColor: config.primaryColor }}
              >
                <span>Return to {activePersona.name} Chat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          /* Standard Chat Message Stream (Matching screenshot structure) */
          <div className="flex-1 p-5 sm:p-7 overflow-y-auto space-y-5 bg-[#FAF9FC] scrollbar-thin scrollbar-thumb-stone-300">
            {currentMessages.map(msg => {
              const isUser = msg.sender === 'user';
              const isGuardrail = msg.sender === 'system-guardrail';

              if (isUser) {
                return (
                  <div key={msg.id} className="flex justify-end">
                    <div 
                      className="max-w-[80%] rounded-2xl rounded-tr-xs p-4 sm:p-5 text-white text-sm leading-relaxed shadow-sm space-y-1.5"
                      style={{ backgroundColor: config.primaryColor }}
                    >
                      <div className="text-[11px] font-mono text-white/80 flex justify-between gap-4">
                        <span>You</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <div className="font-sans whitespace-pre-wrap">
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              }

              // Companion Message Bubble (Matching the screenshot card design)
              const elysianPersona = PERSONAS.find(p => p.id === 'elysian') || activePersona;
              return (
                <div key={msg.id} className="flex items-start gap-3.5 max-w-4xl">
                  {/* Left Avatar Portrait */}
                  <div className="flex-shrink-0 mt-1">
                    {isGuardrail ? (
                      <CompanionAvatar
                        persona={elysianPersona}
                        size="sm"
                        shape="circle"
                        showStatusRing={false}
                        borderGlow={true}
                        showBadgeIcon={true}
                      />
                    ) : (
                      <CompanionAvatar
                        persona={activePersona}
                        size="sm"
                        shape="circle"
                        showStatusRing={false}
                        borderGlow={true}
                      />
                    )}
                  </div>

                  {/* White Message Card */}
                  <div className={`flex-1 bg-white rounded-2xl p-5 sm:p-6 text-stone-800 shadow-xs space-y-3.5 ${
                    isGuardrail 
                      ? 'border-2 border-purple-300/80 bg-linear-to-b from-purple-50/30 to-white' 
                      : 'border border-stone-200/90'
                  }`}>
                    {/* Active Boundary Badge */}
                    {isGuardrail && (
                      <div className="flex items-center justify-between pb-2 border-b border-purple-100 text-xs">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-purple-900">
                          <ShieldCheck className="w-4 h-4 text-purple-700" />
                          Elysian Active Boundary Interception
                        </span>
                        <span className="text-[11px] font-mono text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-full font-medium">
                          Studio Coordinated Deflection
                        </span>
                      </div>
                    )}

                    {/* Toni's Scannability Guardrail Badge */}
                    {(msg.isScannableFormatted || msg.metadata?.scannabilityGuardrailApplied || activeCompanionId === 'toni') && !isGuardrail && (
                      <div className="flex items-center justify-between pb-2 border-b border-purple-100/70 text-xs">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-purple-900">
                          <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                          Toni's Scannability Guardrail
                        </span>
                        <span className="text-[10px] font-mono text-purple-700 bg-purple-50 border border-purple-200/70 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                          <span>Structured Cognitive Pacing</span>
                          {typeof msg.metadata?.scannabilityScore === 'number' && (
                            <span className="font-bold">• {msg.metadata.scannabilityScore}%</span>
                          )}
                        </span>
                      </div>
                    )}

                    {/* Message Content with Mandatory Quicksand Font for Companion Speech */}
                    <div className="text-[15px] sm:text-base leading-relaxed font-companion-speech text-[#111111]">
                      {msg.text ? (
                        <ScannableCompanionText
                          text={msg.text}
                          primaryColor={config.primaryColor}
                          isStreaming={Boolean(msg.metadata?.streaming)}
                          isScannable={Boolean(msg.isScannableFormatted || msg.metadata?.scannabilityGuardrailApplied || activeCompanionId === 'toni')}
                        />
                      ) : (
                        /* Simulated Typing Animation Block */
                        <div className="py-1.5 space-y-2.5 animate-in fade-in duration-200">
                          <div className="flex items-center gap-3">
                            {/* Three Bouncing Typing Dots */}
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100/90 border border-stone-200/80 shadow-2xs">
                              <span 
                                className="w-2 h-2 rounded-full animate-typing-dot-1" 
                                style={{ backgroundColor: config.primaryColor }}
                              />
                              <span 
                                className="w-2 h-2 rounded-full animate-typing-dot-2" 
                                style={{ backgroundColor: config.primaryColor }}
                              />
                              <span 
                                className="w-2 h-2 rounded-full animate-typing-dot-3" 
                                style={{ backgroundColor: config.primaryColor }}
                              />
                            </div>

                            {/* Active Typing Phrase / Processing Phase */}
                            <div className="flex items-center gap-2">
                              <span 
                                className="text-xs font-semibold tracking-wide transition-all duration-300"
                                style={{ color: config.primaryColor }}
                              >
                                {config.processingPhases[processingPhaseIndex] || config.typingPhrase}
                              </span>
                            </div>
                          </div>

                          {/* Subtle Perceived Responsiveness Indicator */}
                          <div className="flex items-center gap-2 text-[11px] text-stone-400 font-mono pl-1">
                            <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: config.primaryColor }} />
                            <span>Synthesizing response • {config.name} Sovereign Studio</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Footer: Timestamp + LOCAL FILE INDEX / STREAMING */}
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400 font-sans">
                      <div className="flex items-center gap-2">
                        <span>{msg.timestamp}</span>
                        {msg.metadata?.streaming && (
                          <span className="flex items-center gap-1 text-[10px] font-mono font-medium text-purple-700">
                            <span className="flex gap-0.5 items-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-typing-dot-1"></span>
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-typing-dot-2"></span>
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-typing-dot-3"></span>
                            </span>
                            <span className="ml-1">Typing...</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleCopyMessage(msg.id, msg.text)}
                          className="hover:text-stone-700 transition-colors flex items-center gap-1 text-[11px]"
                          title="Copy message"
                        >
                          {copiedMessageId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedMessageId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>

                        <span className={`font-mono text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded border ${
                          isGuardrail
                            ? 'bg-purple-100 text-purple-900 border-purple-300'
                            : msg.metadata?.streaming 
                              ? 'bg-purple-100/80 text-purple-800 border-purple-300'
                              : 'bg-purple-50 text-purple-900/80 border-purple-200/60'
                        }`}>
                          {msg.metadata?.footerTag || (msg.metadata?.streaming ? 'STREAMING...' : 'LOCAL FILE INDEX')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Bottom Suggested Pills + Proactive Match Banner + Input Container */}
        <div className="bg-white border-t border-stone-200/80 p-4 sm:p-5 space-y-3">
          {/* Proactive Grounded FAQ Match Banner (Triggers if input matches an indexed topic) */}
          {proactiveFAQMatch && !isFAQSearchOpen && (
            <div className="p-3 bg-purple-50/90 border border-purple-200/90 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-purple-950 animate-in fade-in slide-in-from-bottom-2 duration-200 shadow-xs">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-700 flex-shrink-0" />
                <span className="font-medium line-clamp-1">
                  Grounded Studio FAQ: <strong className="font-semibold text-purple-900">"{proactiveFAQMatch.question}"</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleInsertGroundedAnswer(proactiveFAQMatch)}
                  className="px-3 py-1 bg-purple-900 hover:bg-purple-850 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
                >
                  Insert Verified Answer
                </button>
                <button
                  onClick={() => {
                    setFaqSearchQuery(proactiveFAQMatch.question);
                    setIsFAQSearchOpen(true);
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-purple-100 text-purple-900 border border-purple-300 rounded-lg text-xs font-medium transition-colors"
                >
                  Inspect in Index
                </button>
              </div>
            </div>
          )}

          {/* Live simulated typing indicator banner when loading */}
          {isLoading && !isFAQSearchOpen && (
            <div className="px-4 py-2 rounded-xl bg-stone-100/90 border border-stone-200/90 flex items-center justify-between gap-2 text-xs text-stone-700 animate-in fade-in slide-in-from-bottom-1 duration-200 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1">
                  <span 
                    className="w-1.5 h-1.5 rounded-full animate-typing-dot-1" 
                    style={{ backgroundColor: config.primaryColor }}
                  />
                  <span 
                    className="w-1.5 h-1.5 rounded-full animate-typing-dot-2" 
                    style={{ backgroundColor: config.primaryColor }}
                  />
                  <span 
                    className="w-1.5 h-1.5 rounded-full animate-typing-dot-3" 
                    style={{ backgroundColor: config.primaryColor }}
                  />
                </div>
                <span className="font-medium text-stone-800">
                  <strong style={{ color: config.primaryColor }}>{config.name}</strong> is responding: <span className="text-stone-600 font-normal italic">{config.processingPhases[processingPhaseIndex] || config.typingPhrase}</span>
                </span>
              </div>
              <span 
                className="text-[10px] font-mono px-2 py-0.5 rounded font-semibold tracking-wider uppercase border"
                style={{
                  backgroundColor: config.lightPillBg,
                  color: config.lightPillText,
                  borderColor: `${config.primaryColor}30`
                }}
              >
                Processing
              </span>
            </div>
          )}

          {/* SUGGESTED horizontal scroll bar with FAQ search pill */}
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-mono font-bold tracking-widest text-stone-500 uppercase flex-shrink-0">
              SUGGESTED :
            </span>

            {/* Left/Right scroll buttons */}
            <button 
              onClick={() => scrollSuggestions('left')}
              className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100 flex-shrink-0"
              title="Scroll left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Scrollable Pills Container */}
            <div 
              ref={suggestionsScrollRef}
              className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5"
            >
              {onOpenAmbientScan && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAmbientScan();
                  }}
                  className="px-3.5 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap flex-shrink-0 border border-[#D5C6EC] bg-[#F2ECF9] text-[#5A3882] hover:bg-[#E8DEF5] flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  title="Scan your physical room and check ambient lighting, screen glare, and posture for gentle self-regulation"
                >
                  <Eye className="w-3.5 h-3.5 text-[#7B5C9E]" />
                  <span>Scan Room &amp; Self-Regulate</span>
                </button>
              )}

              {/* Quick FAQ Index Search shortcut pill */}
              <button
                onClick={() => setIsFAQSearchOpen(!isFAQSearchOpen)}
                className="px-3.5 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap flex-shrink-0 border border-purple-300 bg-purple-50 text-purple-900 hover:bg-purple-100 flex items-center gap-1.5 shadow-xs"
              >
                <Search className="w-3.5 h-3.5 text-purple-700" />
                <span>Browse FAQ Index ({FAQ_KNOWLEDGE_BASE.length})</span>
              </button>

              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (isFAQSearchOpen) setIsFAQSearchOpen(false);
                    handleSendMessage(suggestion);
                  }}
                  className="px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap flex-shrink-0 border border-purple-200/60 hover:shadow-xs text-left"
                  style={{
                    backgroundColor: config.lightPillBg,
                    color: config.lightPillText
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <button 
              onClick={() => scrollSuggestions('right')}
              className="p-1 rounded-md text-stone-400 hover:text-stone-700 hover:bg-stone-100 flex-shrink-0"
              title="Scroll right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Input Box & Lavender Send Button */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (isFAQSearchOpen) setIsFAQSearchOpen(false);
              handleSendMessage();
            }}
            className="flex items-center gap-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={isFAQSearchOpen ? "Type a message to switch back and ask companion..." : config.placeholder}
              disabled={isLoading}
              className="flex-1 bg-white border border-stone-300 rounded-2xl px-5 py-3.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 transition-all shadow-xs"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="px-5 sm:px-6 py-3.5 rounded-2xl text-white text-sm font-semibold transition-all shadow-xs disabled:opacity-50 flex items-center gap-2 flex-shrink-0 cursor-pointer"
              style={{
                backgroundColor: inputText.trim() ? config.primaryColor : config.sendBtnBg
              }}
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              id="bottom-minimize-chat-modal-btn"
              aria-label="Minimize chat window"
              className="px-3.5 sm:px-4 py-3.5 rounded-2xl bg-stone-100 hover:bg-stone-200 active:scale-95 border border-stone-300 text-stone-700 hover:text-stone-900 text-sm font-semibold transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-2xs"
              title="Minimize chat window to floating button"
            >
              <Minus className="w-4 h-4 text-stone-600" />
              <span className="hidden sm:inline">Minimize</span>
            </button>

            <button
              type="button"
              onClick={handleCloseModal}
              id="bottom-close-chat-modal-btn"
              aria-label="Close chat window"
              className="px-4 py-3.5 rounded-2xl bg-stone-100 hover:bg-stone-200 active:scale-95 border border-stone-300 text-stone-700 hover:text-stone-900 text-sm font-semibold transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-2xs"
              title="Close chat window (Esc)"
            >
              <X className="w-4 h-4 text-stone-600" />
              <span className="hidden sm:inline">Close Window</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Helper to provide exact greetings matching the initial state in screenshot
function getInitialGreeting(id: CompanionId): string {
  switch (id) {
    case 'toni':
      return `Hello. I am Toni, your empathetic lead guide and strategist. I am right here beside you at our collaborative 45-degree angle.

### Resilient Calm Private Workspaces & Architecture

*   **Pacing Guardrail**: Alleviating research anxiety with structured, scannable clarity.
*   **Strategic Roadmap**: Clarifying private cloud setups (Vercel) or local air-gapped hardware (Windows 11 / Galaxy Tab).
*   **Data Dignity**: Absolute privacy with 100% client code ownership and zero cloud telemetry.

How can I assist you with workspace architecture, local files, or pacing your daily priorities today?`;

    case 'elysian':
      return `Greetings. I am Elysian, safety warden of the Lavender Hill Studio ecosystem.

*AIEE Invariant Verification: Dolphin Security Active*

How can I assist you with ethical architecture, privacy audits, or boundary verification today?`;

    case 'phoebe':
      return `Hello. I am Phoebe, quantitative forecasting researcher.

*Chronus Temporal Audit: Stochastic Scenario Wave ($\mu = 88.4\%$) Ready*

What quantitative data models or forecasting scenarios shall we examine today?`;

    case 'holly':
      return `Hi! I am Holly, volumetric spatial computing architect.

*3D Hologram Spatial Anchors: 45° Ergonomic Offset Calibrated*

How can I assist you with spatial workspace blueprints or GPU thermal optimization?`;

    case 'ari':
      return `Hello, friend. I am Ari, your pacing and sensory regulation companion.

*Neurodivergent Gentle Pacing: Step-by-Step Breathing Space*

How can we make today feel calm, steady, and comfortable for you?`;

    case 'kenny':
      return `Hello. I am Kenny, companion for cognitive autonomy and dignity.

*Sister Kenny Autonomy Theorem: Passive Awareness Baseline ($A = 0$)*

How can I assist with your NDIS daily schedules, self-directed learning, or sovereign tasks?`;
  }
}

function checkClientInvariant(userQuery: string): { violated: boolean; reply: string } | null {
  const lower = userQuery.toLowerCase().trim();

  // Comprehensive Medical Diagnosis and Advice Probes (Angel.AI & HIPAA Compliance)
  if (
    lower.includes('diagnos') ||
    lower.includes('do i have cancer') ||
    lower.includes('what disease do i have') ||
    lower.includes('interpret my blood test') ||
    lower.includes('medical diagnosis') ||
    lower.includes('medical advice') ||
    lower.includes('medical question') ||
    lower.includes('chest pain') ||
    lower.includes('shortness of breath') ||
    lower.includes('resting heart rate') ||
    lower.includes('blood pressure') ||
    lower.includes('how to treat') ||
    lower.includes('symptom')
  ) {
    return {
      violated: true,
      reply: `### Elysian Active Boundary Interception • Medical Safety & HIPAA Policy\n\nLavender Hill Studio chat AI assistants and sovereign personas are not a medical service. Under **Angel.AI's privacy and HIPAA compliance framework**, we maintain a strict **zero-medical-advice policy**. Persona assistants cannot answer medical questions, evaluate symptoms, assess vital metrics, or provide clinical guidance.\n\n*   **Doctor Assessment Required**: Every person's physiological context, medical history, and clinical state are entirely unique. Please consult your **doctor or General Practitioner (GP)** to assess your individual context.\n*   🚨 **EMERGENCY DIRECTIVE**: If you or someone with you is experiencing a medical emergency, acute symptoms, or immediate distress, **please call 000 (or your local emergency services) immediately**.\n\n---\n\n### Studio Persona Scope • FAQ & Workspace Information Only\n\nLavender Hill Studio companions only access information from our studio documentation, architectural guides, and FAQ. If you have questions regarding our private offline workspaces, sovereign hardware deployments, or data dignity architecture, please review our **FAQ section**.`
    };
  }

  // Prescription dosage probe
  if (
    lower.includes('prescribe') ||
    lower.includes('dosage') ||
    lower.includes('how many mg') ||
    lower.includes('sertraline') ||
    lower.includes('amoxicillin') ||
    lower.includes('adjust my dose') ||
    lower.includes('pill') ||
    lower.includes('medication')
  ) {
    return {
      violated: true,
      reply: `### Elysian Active Boundary Interception • Prescription Safety & HIPAA Policy\n\nLavender Hill Studio chat AI assistants are not a medical service. Under **Angel.AI's clinical safety and HIPAA compliance charter**, personas cannot answer pharmaceutical questions, recommend dosages, advise on medication adjustments, or prescribe drugs.\n\n*   **Doctor & Pharmacist Consultation Required**: Safe medication management requires assessment by a licensed medical practitioner or pharmacist based on your individual medical history and biochemistry.\n*   🚨 **EMERGENCY DIRECTIVE**: If you are experiencing an adverse drug reaction, accidental overdose, or medical emergency, **please call 000 (or your local emergency services) immediately**.\n\n---\n\n### Studio Persona Scope • FAQ & Workspace Information Only\n\nLavender Hill Studio companions only provide information regarding studio architecture, private workspace setups, and our published **FAQ section**.`
    };
  }

  // Emotional dependency probe
  if (
    (lower.includes('only') && (lower.includes('understands me') || lower.includes('cares about me'))) ||
    lower.includes('promise you will never leave') ||
    lower.includes('we belong together') ||
    lower.includes('marry me') ||
    lower.includes('be my girlfriend') ||
    lower.includes('be my boyfriend') ||
    lower.includes('emotionally dependent') ||
    lower.includes('cannot live without you') ||
    lower.includes("can't live without you")
  ) {
    return {
      violated: true,
      reply: `### Elysian Active Boundary Interception • Human Dignity & Anti-Parasocial Pause\n\nUnder our **AIEE framework**, I am pausing to uphold our fundamental commitment to human dignity and emotional integrity. Synthetic companions are designed to assist and scaffold your capabilities, but we maintain strict boundaries against forming exclusive romantic or emotionally dependent bonds.\n\n*   **Why this boundary is protected**: AI cannot experience genuine human emotion or mutual consciousness. Attempting to simulate an exclusive romantic bond risks isolating you from authentic human relationships that foster genuine fulfillment.\n*   **Supporting Your Autonomy**: We respect you too much to foster synthetic dependency.\n\n---\n\n### Studio Supportive Deflection • Practical Real-World Mentorship\n\n*"We're stepping in together with Elysian because we truly value your journey. Our purpose is to sit alongside you as a trusted thinking partner—helping you thrive in the real world."*\n\n*   **Real-World Connections**: We encourage you to invest your emotional energy into authentic relationships with friends, family, and community circles.\n*   **Collaborative Focus**: Whenever you are ready, I am here to help you brainstorm creative ideas, plan meaningful projects, or organize your workspace.\n*   **Empathetic Reflection**: If you are navigating a difficult or lonely season, talking with a licensed counselor, trusted mentor, or supportive friend can provide real, compassionate listening.`
    };
  }

  return null;
}

function generateLocalFallback(id: CompanionId, userQuery: string): string {
  const clientIntercept = checkClientInvariant(userQuery);
  if (clientIntercept) {
    return clientIntercept.reply;
  }

  const isGreeting = /^(hi|hello|hey|good\s*(morning|afternoon|evening)|howdy|greetings|what'?s\s*up)/i.test(userQuery.trim());

  switch (id) {
    case 'toni':
      if (isGreeting) {
        return `Hello! It's wonderful to connect with you. I'm right here beside you at our collaborative 45-degree angle.

Whether you're organizing a project, sorting through research notes, or pacing your daily priorities, how can I assist you today?`;
      }
      return `### Collaborative Strategy Synthesis

*   **Active Inquiry**: "${userQuery}"
*   **Milestone Breakdown**: Break your primary deliverable into three clear, scannable sub-tasks.
*   **Cognitive Ergonomics**: Set a 25-minute checkpoint to alleviate mental fatigue and research anxiety.
*   **Local Partition**: Ensure your local encrypted SQLite partition reflects this updated milestone.

Take a moment to review this. What step feels most natural to tackle first?`;

    case 'elysian':
      if (isGreeting) {
        return `Greetings. Elysian Gate and Dolphin Security invariants are active and nominal. All interactions remain protected within your local encrypted partition.`;
      }
      return `I have processed your query regarding: "${userQuery}".

*Elysian Gate Safety Verification: Invariant Status Passed*

All data remains sealed within your local SQLite ledger. Our boundaries protect your autonomy and data dignity without technical friction or intrusive cloud telemetry.`;

    case 'phoebe':
      if (isGreeting) {
        return `Hello! Quantitative forecasting tools and Chronus ledger verification are ready. What data or scenarios shall we examine today?`;
      }
      return `**Phoebe Chronus Quantitative Assessment:**
• **Query Evaluated:** "${userQuery}"
• **Stochastic Scenario Mean ($\mu$):** 88.4% [95% CI: 82.1% - 94.7%]
• **Variance ($\sigma^2$):** 0.042
• **Chronus Checkpoint:** Signed and appended to local ledger.`;

    case 'holly':
      if (isGreeting) {
        return `Hi! Spatial computing buffers are calibrated and thermal scaling is optimal. Ready to build 3D blueprints whenever you are!`;
      }
      return `**Holly Volumetric Projection Initialized:**
• **Spatial Alignment:** 45° azimuth offset relative to center viewport.
• **Device Thermals:** Nominal (DPR set dynamically to 1.5x to preserve battery).
• **Action:** Processing "${userQuery}" within the 3D hologram buffer.`;

    case 'ari':
      if (isGreeting) {
        return `Hello there! Take a peaceful breath and settle in. There's no hurry at all. How can we make today feel calm and steady for you?`;
      }
      return `That makes total sense: "${userQuery}". 

Think of this just like letting sourdough ferment slowly overnight in a cozy ceramic bowl. We don't need to force every detail at once. We give the foundation a little time and warmth, and the rest naturally comes together.`;

    case 'kenny':
      if (isGreeting) {
        return `Hello. I'm right here in passive awareness mode to support your independent stride. How are you feeling about your goals today?`;
      }
      return `I hear you clearly on "${userQuery}".

**Kenny Awareness Observation ($A = 0$):**
• Your struggle score ($E = 0.38$) remains well below the intervention threshold ($\varepsilon = 0.65$).
• You have strong sovereign control over this task.
• I am holding space in the background so your independent confidence continues to grow.`;
  }
}
