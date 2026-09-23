import { useState, useEffect, useRef, useCallback } from 'react';
import { ViewSectionId, VoiceControlStatus, VoiceFeedback, CompanionId } from '../types';

// SpeechRecognition interface declarations for TypeScript
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: ((this: SpeechRecognitionInstance, ev: Event) => any) | null;
  onend: ((this: SpeechRecognitionInstance, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionErrorEvent) => any) | null;
  onresult: ((this: SpeechRecognitionInstance, ev: SpeechRecognitionEvent) => any) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: {
      new (): SpeechRecognitionInstance;
    };
    webkitSpeechRecognition?: {
      new (): SpeechRecognitionInstance;
    };
  }
}

// Audio chime synthesized via Web Audio API
function playConfirmationChime(type: 'success' | 'listening' | 'error') {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    if (type === 'success') {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = 'sine';
      osc2.type = 'triangle';
      
      osc1.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      
      osc2.frequency.setValueAtTime(440, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.15); // E5

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.3);
      osc2.stop(ctx.currentTime + 0.3);
    } else if (type === 'listening') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(523.25, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } else if (type === 'error') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(160, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.23);
    }
  } catch {
    // Ignore audio context autoplay limitations safely
  }
}

interface UseVoiceControlProps {
  onSwitchSection: (section: ViewSectionId) => void;
  onSelectCompanion?: (companionId: CompanionId) => void;
  onOpenChat?: (companionId?: CompanionId) => void;
  onToggleOffline?: () => void;
  onOpenModal?: (modal: 'charter' | 'ledger' | 'training' | 'bio' | 'consultation' | 'tutorial') => void;
}

export function useVoiceControl({
  onSwitchSection,
  onSelectCompanion,
  onOpenChat,
  onToggleOffline,
  onOpenModal
}: UseVoiceControlProps) {
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [status, setStatus] = useState<VoiceControlStatus>('inactive');
  const [transcript, setTranscript] = useState<string>('');
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [feedback, setFeedback] = useState<VoiceFeedback | null>(null);
  const [isContinuous, setIsContinuous] = useState<boolean>(true);
  const [volumeLevel, setVolumeLevel] = useState<number>(0);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const keepListeningRef = useRef<boolean>(false);
  const feedbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check support on mount
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setIsSupported(false);
      setStatus('unsupported');
    }
  }, []);

  const triggerFeedback = useCallback((newFeedback: VoiceFeedback) => {
    setFeedback(newFeedback);
    if (feedbackTimeoutRef.current) {
      clearTimeout(feedbackTimeoutRef.current);
    }
    feedbackTimeoutRef.current = setTimeout(() => {
      setFeedback(null);
    }, 4500);
  }, []);

  // Voice Command Parser
  const processVoiceCommand = useCallback((rawPhrase: string) => {
    const phrase = rawPhrase.toLowerCase().trim();
    if (!phrase) return;

    setTranscript(rawPhrase);

    // 1. Check Section Switch Commands
    // Match 'workspace'
    const isWorkspace = 
      phrase.includes('workspace') || 
      phrase.includes('companion workspace') || 
      phrase.includes('live hud') || 
      phrase.includes('hud') ||
      phrase.includes('home') ||
      phrase.includes('companions') ||
      phrase.includes('personas') ||
      phrase.includes('dashboard') ||
      phrase === 'overview';

    // Match 'vocal-tones'
    const isVocalTones = 
      phrase.includes('vocal tone') || 
      phrase.includes('vocal tones') || 
      phrase.includes('tone') || 
      phrase.includes('tones') || 
      phrase.includes('synthesizer') || 
      phrase.includes('acoustic') || 
      phrase.includes('audio') || 
      phrase.includes('sound') || 
      phrase.includes('vocal synthesis') ||
      phrase.includes('voice synthesizer') ||
      phrase.includes('prosody');

    // Match 'spatial-lab'
    const isSpatialLab = 
      phrase.includes('spatial') || 
      phrase.includes('spatial lab') || 
      phrase.includes('3d') || 
      phrase.includes('3d spatial') || 
      phrase.includes('hologram') || 
      phrase.includes('hologram lab') || 
      phrase.includes('spatial hologram') || 
      phrase.includes('volumetric') || 
      phrase.includes('3d lab') ||
      phrase.includes('spatial anchor');

    // Execute section switches with priority
    if (isSpatialLab) {
      onSwitchSection('spatial-lab');
      playConfirmationChime('success');
      triggerFeedback({
        type: 'success',
        message: 'Switched to 3D Spatial Hologram Lab',
        recognizedPhrase: rawPhrase,
        targetSection: 'spatial-lab',
        timestamp: Date.now()
      });
      return;
    }

    if (isVocalTones) {
      onSwitchSection('vocal-tones');
      playConfirmationChime('success');
      triggerFeedback({
        type: 'success',
        message: 'Switched to Vocal Tone & Acoustic Synthesizer',
        recognizedPhrase: rawPhrase,
        targetSection: 'vocal-tones',
        timestamp: Date.now()
      });
      return;
    }

    if (isWorkspace) {
      onSwitchSection('workspace');
      playConfirmationChime('success');
      triggerFeedback({
        type: 'success',
        message: 'Switched to Companion Workspace',
        recognizedPhrase: rawPhrase,
        targetSection: 'workspace',
        timestamp: Date.now()
      });
      return;
    }

    // 2. Persona Selection Voice Commands (Bonus natural command)
    if (phrase.includes('toni')) {
      onSelectCompanion?.('toni');
      playConfirmationChime('success');
      triggerFeedback({
        type: 'success',
        message: 'Activated Companion: Toni',
        recognizedPhrase: rawPhrase,
        targetCompanion: 'toni',
        timestamp: Date.now()
      });
      return;
    }
    if (phrase.includes('elysian')) {
      onSelectCompanion?.('elysian');
      playConfirmationChime('success');
      triggerFeedback({
        type: 'success',
        message: 'Activated Companion: Elysian',
        recognizedPhrase: rawPhrase,
        targetCompanion: 'elysian',
        timestamp: Date.now()
      });
      return;
    }
    if (phrase.includes('phoebe')) {
      onSelectCompanion?.('phoebe');
      playConfirmationChime('success');
      triggerFeedback({
        type: 'success',
        message: 'Activated Companion: Phoebe',
        recognizedPhrase: rawPhrase,
        targetCompanion: 'phoebe',
        timestamp: Date.now()
      });
      return;
    }
    if (phrase.includes('holly')) {
      onSelectCompanion?.('holly');
      playConfirmationChime('success');
      triggerFeedback({
        type: 'success',
        message: 'Activated Companion: Holly',
        recognizedPhrase: rawPhrase,
        targetCompanion: 'holly',
        timestamp: Date.now()
      });
      return;
    }
    if (phrase.includes('ari')) {
      onSelectCompanion?.('ari');
      playConfirmationChime('success');
      triggerFeedback({
        type: 'success',
        message: 'Activated Companion: Ari',
        recognizedPhrase: rawPhrase,
        targetCompanion: 'ari',
        timestamp: Date.now()
      });
      return;
    }
    if (phrase.includes('kenny')) {
      onSelectCompanion?.('kenny');
      playConfirmationChime('success');
      triggerFeedback({
        type: 'success',
        message: 'Activated Companion: Kenny',
        recognizedPhrase: rawPhrase,
        targetCompanion: 'kenny',
        timestamp: Date.now()
      });
      return;
    }

    // 3. Modal / Utility Voice Commands
    if (phrase.includes('chat') || phrase.includes('talk') || phrase.includes('message')) {
      onOpenChat?.();
      playConfirmationChime('success');
      triggerFeedback({
        type: 'success',
        message: 'Opening Persona Chat Interface',
        recognizedPhrase: rawPhrase,
        timestamp: Date.now()
      });
      return;
    }

    if (phrase.includes('charter') || phrase.includes('ethics') || phrase.includes('privacy promise')) {
      onOpenModal?.('charter');
      playConfirmationChime('success');
      triggerFeedback({
        type: 'success',
        message: 'Opening AIEE Ethical Charter',
        recognizedPhrase: rawPhrase,
        timestamp: Date.now()
      });
      return;
    }

    if (phrase.includes('ledger') || phrase.includes('audit trail') || phrase.includes('dolphin')) {
      onOpenModal?.('ledger');
      playConfirmationChime('success');
      triggerFeedback({
        type: 'success',
        message: 'Opening SQLite Audit Ledger',
        recognizedPhrase: rawPhrase,
        timestamp: Date.now()
      });
      return;
    }

    if (phrase.includes('training') || phrase.includes('training files') || phrase.includes('context files')) {
      onOpenModal?.('training');
      playConfirmationChime('success');
      triggerFeedback({
        type: 'success',
        message: 'Opening AI Training Context Files',
        recognizedPhrase: rawPhrase,
        timestamp: Date.now()
      });
      return;
    }

    if (phrase.includes('portfolio') || phrase.includes('dossier') || phrase.includes('founder') || phrase.includes('paul stephensen') || phrase.includes('founder bio')) {
      onOpenModal?.('bio');
      playConfirmationChime('success');
      triggerFeedback({
        type: 'success',
        message: 'Opening Founder Portfolio & Bio',
        recognizedPhrase: rawPhrase,
        timestamp: Date.now()
      });
      return;
    }

    if (phrase.includes('tutorial') || phrase.includes('video') || phrase.includes('guide') || phrase.includes('walkthrough') || phrase.includes('how to use')) {
      onOpenModal?.('tutorial');
      playConfirmationChime('success');
      triggerFeedback({
        type: 'success',
        message: 'Opening Video Guides & Simulation Tutorials',
        recognizedPhrase: rawPhrase,
        timestamp: Date.now()
      });
      return;
    }

    if (phrase.includes('offline') || phrase.includes('galaxy tab') || phrase.includes('cloud sync')) {
      onToggleOffline?.();
      playConfirmationChime('success');
      triggerFeedback({
        type: 'success',
        message: 'Toggled Offline / Cloud Sync Mode',
        recognizedPhrase: rawPhrase,
        timestamp: Date.now()
      });
      return;
    }

    // No recognized pattern
    triggerFeedback({
      type: 'info',
      message: `Heard: "${rawPhrase}" • Try: "Workspace", "Shared Memory", "Vocal Tones", or "Spatial Lab"`,
      recognizedPhrase: rawPhrase,
      timestamp: Date.now()
    });
  }, [onSwitchSection, onSelectCompanion, onOpenChat, onToggleOffline, onOpenModal, triggerFeedback]);

  // Start speech recognition
  const startListening = useCallback(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) {
      setIsSupported(false);
      setStatus('unsupported');
      triggerFeedback({
        type: 'error',
        message: 'Speech Recognition is not supported by this browser. Use Chrome, Edge, or Safari.',
        recognizedPhrase: '',
        timestamp: Date.now()
      });
      return;
    }

    // Stop any existing instance
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // noop
      }
    }

    try {
      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setStatus('listening');
        keepListeningRef.current = true;
        playConfirmationChime('listening');
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const res = event.results[i];
          const transcriptText = res[0].transcript;
          if (res.isFinal) {
            final += transcriptText;
          } else {
            interim += transcriptText;
          }
        }

        setInterimTranscript(interim);
        if (interim) {
          setVolumeLevel(Math.min(100, Math.max(25, interim.length * 8)));
        } else {
          setVolumeLevel(0);
        }

        if (final.trim()) {
          setInterimTranscript('');
          setVolumeLevel(0);
          processVoiceCommand(final.trim());
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        if (event.error === 'no-speech') {
          // Ignore no-speech errors in continuous mode
          return;
        }
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          keepListeningRef.current = false;
          setIsListening(false);
          setStatus('error');
          playConfirmationChime('error');
          triggerFeedback({
            type: 'error',
            message: 'Microphone permission denied. Please allow microphone access in your browser settings.',
            recognizedPhrase: '',
            timestamp: Date.now()
          });
          return;
        }

        // Other recoverable errors
        setStatus('error');
      };

      recognition.onend = () => {
        // If continuous listening is desired and user did not explicitly stop
        if (keepListeningRef.current) {
          try {
            recognition.start();
          } catch {
            setIsListening(false);
            setStatus('inactive');
          }
        } else {
          setIsListening(false);
          setStatus('inactive');
          setInterimTranscript('');
          setVolumeLevel(0);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.warn('SpeechRecognition start failed:', err);
      setIsListening(false);
      setStatus('error');
      triggerFeedback({
        type: 'error',
        message: 'Could not initialize microphone speech recognition.',
        recognizedPhrase: '',
        timestamp: Date.now()
      });
    }
  }, [processVoiceCommand, triggerFeedback]);

  // Stop speech recognition
  const stopListening = useCallback(() => {
    keepListeningRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // noop
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
    setStatus('inactive');
    setInterimTranscript('');
    setVolumeLevel(0);
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      keepListeningRef.current = false;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // noop
        }
      }
      if (feedbackTimeoutRef.current) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    };
  }, []);

  return {
    isSupported,
    isListening,
    status,
    transcript,
    interimTranscript,
    feedback,
    volumeLevel,
    startListening,
    stopListening,
    toggleListening,
    triggerFeedback
  };
}
