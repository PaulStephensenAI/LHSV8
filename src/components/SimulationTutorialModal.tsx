import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  X, 
  Maximize2, 
  Sparkles, 
  Sliders, 
  Grid, 
  Scan, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  BookOpen, 
  Video, 
  Headphones, 
  Radio, 
  Layers, 
  ExternalLink, 
  Copy, 
  Check, 
  Info,
  Tv,
  Film
} from 'lucide-react';
import { CompanionId } from '../types';
import { PERSONAS } from '../data/personasData';

export type SimulationToolType = 'vocal-tones' | 'spatial-lab';

interface SimulationTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTool?: SimulationToolType;
  onSelectCompanion?: (id: CompanionId) => void;
  onApplyPresetAction?: (action: string) => void;
}

interface TutorialStep {
  id: string;
  stepNumber: number;
  title: string;
  timeOffset: number; // in seconds
  summary: string;
  instructions: string[];
  actionPrompt?: string;
  actionPayload?: string;
}

interface ToolTutorialConfig {
  toolId: SimulationToolType;
  toolName: string;
  categoryBadge: string;
  videoDuration: number; // in seconds
  videoTitle: string;
  videoSubtitle: string;
  accentColor: string;
  bgGradient: string;
  googleToolRecommendation: string;
  notebookLmOverviewPrompt: string;
  googleVidsStoryboardPrompt: string;
  chapters: { title: string; time: number }[];
  steps: TutorialStep[];
}

const TUTORIAL_DATA: Record<SimulationToolType, ToolTutorialConfig> = {
  'vocal-tones': {
    toolId: 'vocal-tones',
    toolName: 'Vocal Tone & Acoustic Synthesizer',
    categoryBadge: 'Acoustic Identity & Pacing Lab',
    videoDuration: 140, // 2:20
    videoTitle: 'Tutorial: Calibrating Acoustic Pacing & Diaphragmatic Rhythms',
    videoSubtitle: 'Master tone characteristics, pitch/rate modulation, sample phrasing, and AIEE safety guardrails.',
    accentColor: '#7B5C9E',
    bgGradient: 'from-[#1A1528] via-[#120F1D] to-[#0A0812]',
    googleToolRecommendation: 'Generated using Google Vids Storyboards & NotebookLM Neuro-Acoustics Audio Overview',
    notebookLmOverviewPrompt: `Generate a 2-minute conversational audio overview between two audio engineers discussing Lavender Hill Studio's Vocal Tone Synthesizer:
1. Explain why Toni uses a warm, neutral 1.0x cadence to prevent sensory overstimulation.
2. Explain how Holly uses whisper synthesis to mitigate vocal fatigue for non-speaking or soft-spoken adults.
3. Contrast this with conventional AI voice assistants that use peppy, hyper-energetic inflections that cause cognitive exhaustion.
4. Walk the listener through adjusting pitch/rate sliders and triggering sample phrases.`,
    googleVidsStoryboardPrompt: `Google Vids Prompt: A 90-second instructional tutorial for the Lavender Hill Studio Vocal Tone Synthesizer:
- Scene 1 (0:00-0:15): Opening title card with Warm Linen aesthetic. Close-up on the 6 Companion identity cards (Toni, Elysian, Phoebe, Kenny, Holly, Ari).
- Scene 2 (0:15-0:40): Zoom into the Acoustic Calibrator. Show mouse dragging the Speech Pitch (0.9x) and Speech Rate (0.85x) sliders.
- Scene 3 (0:40-1:05): Click on Sample Phrase #1. The oscilloscope bars pulse in soft gold and purple. The browser synthesizes gentle voice delivery.
- Scene 4 (1:05-1:30): Typing into Custom Synthesizer. Show the real-time AIEE Shield intercepting hostile/parasocial phrasing with an emerald-to-amber badge.
- Scene 5 (1:30-1:40): Summary card highlighting 100% on-device Web Audio execution with zero cloud voice tracking.`,
    chapters: [
      { title: '0:00 Overview & Persona Selection', time: 0 },
      { title: '0:30 Pitch & Speed Calibration', time: 30 },
      { title: '1:00 Sample Phrasing & Audio Stream', time: 60 },
      { title: '1:35 AIEE Safety Boundary Intercept', time: 95 }
    ],
    steps: [
      {
        id: 'vt-step-1',
        stepNumber: 1,
        title: 'Select a Companion Acoustic Identity',
        timeOffset: 0,
        summary: 'Each of the 6 studio companions has an acoustically calibrated voice profile engineered for specific sensory profiles.',
        instructions: [
          'Click any companion card in the top ribbon (Toni, Elysian, Phoebe, Kenny, Holly, or Ari).',
          'Notice how the Acoustic Profile Description, tone tags (e.g., "Warm Velvet", "Low Sensory Stimulation"), and default pitch change instantly.',
          'Holly is tuned for soothing whisper synthesis, while Toni provides balanced executive clarity.'
        ],
        actionPrompt: 'Select Toni Profile',
        actionPayload: 'select-toni'
      },
      {
        id: 'vt-step-2',
        stepNumber: 2,
        title: 'Calibrate Diaphragmatic Pitch & Rate Sliders',
        timeOffset: 30,
        summary: 'Fine-tune the speech cadence to match your cognitive processing speed and auditory comfort.',
        instructions: [
          'Locate the Acoustic Calibrator on the right panel.',
          'Adjust the Pitch Offset slider (-0.5 to +0.5): lower values create grounded warmth; higher values add conversational brightness.',
          'Adjust the Speed / Pacing Offset slider: slowing down to -0.15x provides cognitive breathing space for neurodivergent listeners.'
        ],
        actionPrompt: 'Reset Sliders to Neutral',
        actionPayload: 'reset-sliders'
      },
      {
        id: 'vt-step-3',
        stepNumber: 3,
        title: 'Audition Sample Phrases & Custom Text',
        timeOffset: 60,
        summary: 'Play calibrated phrases or type custom text to test real-time speech output.',
        instructions: [
          'Click on any numbered sample phrase (1, 2, or 3) or click the play button.',
          'Observe the real-time visualizer waveform bar pulsing at the top right.',
          'Type custom text into the "Custom Text Synthesizer" input and press "Synthesize Audio Phrase".'
        ],
        actionPrompt: 'Load Sample Phrase',
        actionPayload: 'play-phrase'
      },
      {
        id: 'vt-step-4',
        stepNumber: 4,
        title: 'Observe AIEE Shield & Dignity Protection',
        timeOffset: 95,
        summary: 'The synthesizer runs a real-time heuristic guardrail that safeguards your privacy and prevents parasocial attachment traps.',
        instructions: [
          'Notice the "AIEE Shield Active" badge on the top right of the calibrator.',
          'If someone enters exploitative, romantic-simulation, or prompt-injection phrases, the shield triggers an immediate boundary deflection.',
          'The companion politely deflects back to collaborative workspace goals to maintain authentic human dignity.'
        ]
      }
    ]
  },
  'spatial-lab': {
    toolId: 'spatial-lab',
    toolName: '3D Spatial Hologram Lab',
    categoryBadge: 'Volumetric Projection & Empathy Chamber',
    videoDuration: 150, // 2:30
    videoTitle: 'Tutorial: Positioning Avatars in 3D Spatial Workspaces',
    videoSubtitle: 'Learn how to calibrate 45° side-by-side positioning, wireframe HUD vectors, and scanline sweeps on your desk.',
    accentColor: '#D4A373',
    bgGradient: 'from-[#1B1713] via-[#14100D] to-[#0A0806]',
    googleToolRecommendation: 'Generated using Google Vids Cinematic Projections & NotebookLM Spatial Ergonomics Notes',
    notebookLmOverviewPrompt: `Generate a 2-minute conversational audio overview between a neuro-ergonomist and a 3D interface designer discussing Lavender Hill Studio's 3D Spatial Hologram Lab:
1. Explain the "45-Degree Side-by-Side Anchor" rule: why head-on AI avatars create confrontational gaze pressure, while side-by-side positioning simulates a collaborative partner sitting next to you.
2. Discuss the Volumetric Photon Glow and how CRT scanlines provide tactile visual depth without causing eye strain.
3. Describe how this runs inside modern browsers via CSS perspective and WebGL coordinates, optimized for Samsung Galaxy Tab S10 and desktop monitors.`,
    googleVidsStoryboardPrompt: `Google Vids Prompt: A 90-second instructional tutorial for the Lavender Hill Studio 3D Spatial Hologram Lab:
- Scene 1 (0:00-0:20): Wide shot of the 3D Projection Chamber with dark purple floor grid. The camera pans around Toni's avatar centered on the virtual desk.
- Scene 2 (0:20-0:45): Close-up on the Spatial Angle slider moving from 0° (face-to-face) to 45° (side-by-side companion alignment). On-screen caption: "Mitigates Confrontational Gaze Pressure".
- Scene 3 (0:45-1:10): Toggling the Wireframe Vector Grid and Volumetric Glow buttons. Vector rings pulse with cyan and sunset gold highlights.
- Scene 4 (1:10-1:35): The mouse clicks directly into the projection stage. A cyan ripple shockwave radiates across the grid floor with audio feedback.
- Scene 5 (1:35-1:50): End screen showing the Tab S10 desk boundary anchor and Dolphin Barrier status.`,
    chapters: [
      { title: '0:00 Introduction to Spatial Anchors', time: 0 },
      { title: '0:35 The 45° Side-by-Side Angle Rule', time: 35 },
      { title: '1:05 Wireframe Grid & Photon Glow', time: 65 },
      { title: '1:35 CRT Scanlines & Interactive Ripples', time: 95 }
    ],
    steps: [
      {
        id: 'sl-step-1',
        stepNumber: 1,
        title: 'Understand the Spatial Anchor Concept',
        timeOffset: 0,
        summary: 'Conventional AI apps lock avatars in a tiny circle. The Spatial Lab projects companions into your physical desk space.',
        instructions: [
          'Notice the "USER LOCAL WORKSPACE DESK (TAB S10)" marker at the bottom of the stage.',
          'The avatar sits on an isometric 3D plane projecting forward into your workspace.',
          'Click different personas in the ribbon to inspect their specific anchor positions (e.g., Toni at Left Lateral, Holly at Peripheral Ground).'
        ],
        actionPrompt: 'Select Ari (Spatial Engineer)',
        actionPayload: 'select-ari'
      },
      {
        id: 'sl-step-2',
        stepNumber: 2,
        title: 'Calibrate the 45° Side-by-Side Angle (θ)',
        timeOffset: 35,
        summary: 'Face-to-face eye contact triggers confrontational autonomic arousal in neurodivergent users. Side-by-side positioning restores calm.',
        instructions: [
          'Locate the "Spatial Angle (θ)" slider at the bottom left.',
          'Slide between 0° (direct confrontation), 45° (natural collaborative partner), and 90° (gentle flank).',
          'Notice how the floor grid and avatar coordinate cage smoothly pivot in 3D perspective.'
        ],
        actionPrompt: 'Set to 45° Recommended Angle',
        actionPayload: 'set-45-deg'
      },
      {
        id: 'sl-step-3',
        stepNumber: 3,
        title: 'Toggle Wireframe Grid & Volumetric Glow',
        timeOffset: 65,
        summary: 'Enhance depth cues and mitigate ocular strain by adjusting visual layer modes.',
        instructions: [
          'Click "Wireframe Grid: ON/OFF" to toggle the HUD geometric perspective rings.',
          'Click "Volumetric Glow: ON/OFF" to soften the photon dispersion halo around the avatar.',
          'On OLED screens, soft glow eliminates harsh edges and creates soothing ambient immersion.'
        ],
        actionPrompt: 'Toggle Wireframe + Glow',
        actionPayload: 'toggle-wireframe-glow'
      },
      {
        id: 'sl-step-4',
        stepNumber: 4,
        title: 'Click Stage for Laser Scanline Ripples',
        timeOffset: 95,
        summary: 'The projection field is interactive: clicking or tapping anywhere pulses physical shockwave ripples.',
        instructions: [
          'Ensure "Scanlines: ON" is activated in the top toolbar.',
          'Click or tap anywhere inside the dark projection stage.',
          'Listen for the gentle 560Hz harmonic frequency chime and watch the cyan ripple spread across the floor grid.',
          'Hover your cursor over the stage to inspect live telemetry in the top left diagnostics HUD.'
        ]
      }
    ]
  }
};

export const SimulationTutorialModal: React.FC<SimulationTutorialModalProps> = ({
  isOpen,
  onClose,
  defaultTool = 'vocal-tones',
  onSelectCompanion,
  onApplyPresetAction
}) => {
  const [activeTool, setActiveTool] = useState<SimulationToolType>(defaultTool);
  const [activeTab, setActiveTab] = useState<'video' | 'steps' | 'google-tools'>('video');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  
  // Video Player Simulation State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isAudioNarratorActive, setIsAudioNarratorActive] = useState<boolean>(false);
  const [isCopiedPrompt, setIsCopiedPrompt] = useState<string | null>(null);
  const [customVideoUrl, setCustomVideoUrl] = useState<string>('');
  const [isUsingCustomVideo, setIsUsingCustomVideo] = useState<boolean>(false);
  
  const timerRef = useRef<number | null>(null);

  // Sync active tool if defaultTool changes
  useEffect(() => {
    setActiveTool(defaultTool);
    setCurrentStepIndex(0);
    setCurrentTime(0);
    setIsPlaying(false);
  }, [defaultTool]);

  const toolConfig = TUTORIAL_DATA[activeTool];

  // Video playback simulation ticker
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= toolConfig.videoDuration) {
            setIsPlaying(false);
            return 0;
          }
          const nextTime = prev + 1;
          
          // Auto sync step with current time
          const matchingStepIdx = toolConfig.steps.findIndex((s, idx) => {
            const nextStep = toolConfig.steps[idx + 1];
            return nextTime >= s.timeOffset && (!nextStep || nextTime < nextStep.timeOffset);
          });
          if (matchingStepIdx !== -1 && matchingStepIdx !== currentStepIndex) {
            setCurrentStepIndex(matchingStepIdx);
          }
          
          return nextTime;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, toolConfig.videoDuration, toolConfig.steps, currentStepIndex]);

  // Audio narrator simulation via Web Speech API
  useEffect(() => {
    if (isAudioNarratorActive && isPlaying && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const currentStep = toolConfig.steps[currentStepIndex];
      if (currentStep) {
        const text = `${currentStep.title}. ${currentStep.summary}`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    } else if (!isPlaying && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [currentStepIndex, isAudioNarratorActive, isPlaying, toolConfig.steps]);

  if (!isOpen) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
    const matchingStepIdx = toolConfig.steps.findIndex((s, idx) => {
      const nextStep = toolConfig.steps[idx + 1];
      return time >= s.timeOffset && (!nextStep || time < nextStep.timeOffset);
    });
    if (matchingStepIdx !== -1) {
      setCurrentStepIndex(matchingStepIdx);
    }
  };

  const handleCopyPrompt = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setIsCopiedPrompt(type);
    setTimeout(() => setIsCopiedPrompt(null), 3000);
  };

  const handleExecuteStepAction = (payload?: string) => {
    if (!payload) return;
    if (payload === 'select-toni' && onSelectCompanion) {
      onSelectCompanion('toni');
    } else if (payload === 'select-ari' && onSelectCompanion) {
      onSelectCompanion('ari');
    } else if (onApplyPresetAction) {
      onApplyPresetAction(payload);
    }
  };

  const activeStep = toolConfig.steps[currentStepIndex] || toolConfig.steps[0];
  const progressPercent = (currentTime / toolConfig.videoDuration) * 100;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#12101C] border border-[#3B3450] rounded-3xl max-w-5xl w-full shadow-2xl text-stone-200 relative max-h-[94vh] flex flex-col overflow-hidden">
        
        {/* Top Multi-Tone Aesthetic Accent Bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#7B5C9E] via-[#234F56] to-[#D4A373] w-full shrink-0" />

        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-stone-800 shrink-0 space-y-3 bg-[#171424]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center shrink-0 shadow-md">
                <Video className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-700 font-bold uppercase tracking-wider">
                    Interactive Video & Guide
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-700 font-bold">
                    NotebookLM & Google Vids Ready
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white font-display mt-0.5">
                  Simulation Tools Video Masterclass
                </h2>
                <p className="text-xs text-stone-400">
                  Step-by-step interactive video walkthroughs and control explanations for each studio tool.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-all cursor-pointer"
              aria-label="Close tutorial guide"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tool Selector Tabs & Navigation */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1 border-t border-stone-800/80">
            <div className="flex items-center gap-1.5 p-1 bg-stone-900/80 rounded-2xl border border-stone-800 overflow-x-auto max-w-full">
              <button
                onClick={() => {
                  setActiveTool('vocal-tones');
                  setCurrentStepIndex(0);
                  setCurrentTime(0);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTool === 'vocal-tones'
                    ? 'bg-[#7B5C9E] text-white shadow-md'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Vocal Tone Synthesizer</span>
              </button>

              <button
                onClick={() => {
                  setActiveTool('spatial-lab');
                  setCurrentStepIndex(0);
                  setCurrentTime(0);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTool === 'spatial-lab'
                    ? 'bg-[#D4A373] text-stone-950 font-bold shadow-md'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>3D Spatial Hologram Lab</span>
              </button>
            </div>

            {/* View Mode Pills (Video Walkthrough vs Text Steps vs Google AI Exports) */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setActiveTab('video')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'video'
                    ? 'bg-purple-900/80 text-purple-200 border border-purple-600 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Tv className="w-3.5 h-3.5" />
                <span>Video Player</span>
              </button>

              <button
                onClick={() => setActiveTab('steps')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'steps'
                    ? 'bg-purple-900/80 text-purple-200 border border-purple-600 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Full Steps</span>
              </button>

              <button
                onClick={() => setActiveTab('google-tools')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'google-tools'
                    ? 'bg-purple-900/80 text-purple-200 border border-purple-600 font-bold'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>NotebookLM & Vids</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: INTERACTIVE SIMULATION VIDEO PLAYER */}
          {activeTab === 'video' && (
            <div className="space-y-4">
              
              {/* Main Simulated Video Screen */}
              <div className="relative rounded-3xl bg-black border border-[#2F2942] overflow-hidden shadow-2xl aspect-video max-h-[380px] w-full flex flex-col justify-between">
                
                {/* Simulated Visual Animation Canvas (Changes dynamically per chapter & step) */}
                <div className="absolute inset-0 z-10 flex items-center justify-center p-6 select-none pointer-events-none">
                  
                  {activeTool === 'vocal-tones' ? (
                    // Vocal Tones Simulated Screen
                    <div className="w-full max-w-xl space-y-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-purple-600/30 border border-purple-400/60 flex items-center justify-center shadow-lg">
                          <Volume2 className="w-6 h-6 text-purple-300 animate-pulse" />
                        </div>
                        <div className="text-left">
                          <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">
                            Step {activeStep.stepNumber} of 4: {activeStep.title}
                          </span>
                          <h4 className="text-base font-bold text-white font-serif">
                            {currentStepIndex === 0 && 'Tone Matrix: 6 Companion Soundscapes'}
                            {currentStepIndex === 1 && 'Calibrating Diaphragmatic Pitch (0.9x) & Pacing'}
                            {currentStepIndex === 2 && 'Harmonic Oscilloscope Waveform Active'}
                            {currentStepIndex === 3 && 'AIEE Shield: Invariant Dignity Protection'}
                          </h4>
                        </div>
                      </div>

                      {/* Animated Oscilloscope Bars */}
                      <div className="flex items-center justify-center gap-1.5 h-16 pt-2">
                        {[45, 80, 60, 95, 70, 90, 50, 85, 65, 100, 55, 75, 85, 60, 40].map((h, i) => (
                          <div
                            key={i}
                            className={`w-1.5 rounded-full transition-all duration-200 ${
                              isPlaying ? 'bg-gradient-to-t from-purple-600 to-amber-400 animate-pulse' : 'bg-stone-700'
                            }`}
                            style={{
                              height: isPlaying ? `${Math.max(10, (h * ((currentTime % 4) + 1)) / 4)}px` : '12px',
                              animationDelay: `${i * 60}ms`
                            }}
                          />
                        ))}
                      </div>

                      {/* On-Screen Caption Card */}
                      <div className="bg-stone-900/90 border border-stone-700/80 rounded-2xl p-3 text-xs text-stone-200 max-w-md mx-auto shadow-xl backdrop-blur-sm">
                        <span className="text-purple-400 font-bold font-mono text-[10px] mr-1.5 uppercase">
                          Action Guide:
                        </span>
                        <span>{activeStep.summary}</span>
                      </div>
                    </div>
                  ) : (
                    // Spatial Lab Simulated Screen
                    <div className="w-full max-w-xl space-y-4 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-600/30 border border-amber-400/60 flex items-center justify-center shadow-lg">
                          <Maximize2 className="w-6 h-6 text-amber-300 animate-pulse" />
                        </div>
                        <div className="text-left">
                          <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                            Step {activeStep.stepNumber} of 4: {activeStep.title}
                          </span>
                          <h4 className="text-base font-bold text-white font-serif">
                            {currentStepIndex === 0 && '3D Desk Perimeter: Tab S10 Physical Anchor'}
                            {currentStepIndex === 1 && '45° Side-by-Side Ergonomic Vector Alignment'}
                            {currentStepIndex === 2 && 'Volumetric Photon Glow & Depth Perspective'}
                            {currentStepIndex === 3 && 'Harmonic CRT Scanline Sweeps & Ripple Pulses'}
                          </h4>
                        </div>
                      </div>

                      {/* 3D Wireframe Vector Grid Simulation */}
                      <div className="relative h-20 w-48 mx-auto flex items-center justify-center">
                        <div 
                          className="absolute inset-0 border-2 border-dashed border-amber-400/40 rounded-full animate-spin"
                          style={{ animationDuration: isPlaying ? '6s' : '30s' }}
                        />
                        <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-amber-300" />
                        </div>
                      </div>

                      {/* On-Screen Caption Card */}
                      <div className="bg-stone-900/90 border border-stone-700/80 rounded-2xl p-3 text-xs text-stone-200 max-w-md mx-auto shadow-xl backdrop-blur-sm">
                        <span className="text-amber-400 font-bold font-mono text-[10px] mr-1.5 uppercase">
                          Action Guide:
                        </span>
                        <span>{activeStep.summary}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Top Overlay Badge */}
                <div className="relative z-20 p-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 bg-black/60 px-3 py-1 rounded-full border border-stone-700/80 backdrop-blur-sm">
                    <Film className="w-3.5 h-3.5 text-purple-400" />
                    <span className="font-mono text-[11px] text-white font-bold">{toolConfig.videoTitle}</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-full border border-stone-700/80 text-[11px] font-mono text-stone-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{formatTime(currentTime)} / {formatTime(toolConfig.videoDuration)}</span>
                  </div>
                </div>

                {/* Bottom Video Controls Bar */}
                <div className="relative z-20 p-3 sm:p-4 bg-gradient-to-t from-black via-black/80 to-transparent space-y-2">
                  
                  {/* Scrubber Progress Bar */}
                  <div 
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickPos = (e.clientX - rect.left) / rect.width;
                      handleSeek(clickPos * toolConfig.videoDuration);
                    }}
                    className="relative h-2 w-full bg-stone-800 rounded-full cursor-pointer group"
                  >
                    <div 
                      className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-purple-500 to-amber-400 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                    {/* Chapter Marker Ticks */}
                    {toolConfig.chapters.map((ch, idx) => (
                      <div 
                        key={idx}
                        className="absolute top-0 bottom-0 w-0.5 bg-white/60"
                        style={{ left: `${(ch.time / toolConfig.videoDuration) * 100}%` }}
                        title={ch.title}
                      />
                    ))}
                  </div>

                  {/* Playback Controls & Toggles */}
                  <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-8 h-8 rounded-xl bg-purple-600 hover:bg-purple-500 text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
                        title={isPlaying ? 'Pause video guide' : 'Play video guide'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                      </button>

                      <button
                        onClick={() => handleSeek(0)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-all cursor-pointer"
                        title="Restart from beginning"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>

                      {/* Narration Audio Toggle */}
                      <button
                        onClick={() => setIsAudioNarratorActive(!isAudioNarratorActive)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                          isAudioNarratorActive
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                            : 'bg-stone-900 text-stone-400 border-stone-700 hover:text-white'
                        }`}
                        title="Toggle Browser Voice Narration of tutorial steps"
                      >
                        {isAudioNarratorActive ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                        <span>AI Narration: {isAudioNarratorActive ? 'ON' : 'OFF'}</span>
                      </button>
                    </div>

                    {/* Speed Selector */}
                    <div className="flex items-center gap-1.5 text-[11px] font-mono">
                      <span className="text-stone-400">Speed:</span>
                      {[0.75, 1.0, 1.25, 1.5].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => setPlaybackSpeed(spd)}
                          className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                            playbackSpeed === spd
                              ? 'bg-purple-600 text-white font-bold'
                              : 'text-stone-400 hover:text-white'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Chapter Markers Quick-Seek Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {toolConfig.chapters.map((ch, idx) => {
                  const isCurrent = currentTime >= ch.time && (!toolConfig.chapters[idx + 1] || currentTime < toolConfig.chapters[idx + 1].time);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSeek(ch.time)}
                      className={`p-2.5 rounded-2xl border text-left transition-all text-xs cursor-pointer ${
                        isCurrent
                          ? 'bg-purple-950/60 border-purple-600/80 text-white shadow-md'
                          : 'bg-stone-900/60 border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-purple-400 font-bold mb-1">
                        <span>CHAPTER {idx + 1}</span>
                        <span>{formatTime(ch.time)}</span>
                      </div>
                      <p className="font-semibold text-stone-200 truncate">{ch.title.split(' ').slice(1).join(' ')}</p>
                    </button>
                  );
                })}
              </div>

              {/* Active Step Interactive Action Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#1A1826] border border-[#342D45] space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0">
                      {activeStep.stepNumber}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white font-serif">
                        {activeStep.title}
                      </h4>
                      <span className="text-[10px] font-mono text-stone-400">
                        Timestamp {formatTime(activeStep.timeOffset)}
                      </span>
                    </div>
                  </div>

                  {activeStep.actionPrompt && (
                    <button
                      onClick={() => handleExecuteStepAction(activeStep.actionPayload)}
                      className="px-3 py-1.5 rounded-xl bg-[#234F56] hover:bg-[#2C626A] text-[#F5F2EB] text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                      <span>{activeStep.actionPrompt}</span>
                    </button>
                  )}
                </div>

                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  {activeStep.summary}
                </p>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
                    Execution Steps:
                  </span>
                  <ul className="space-y-1 text-xs text-stone-300">
                    {activeStep.instructions.map((inst, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: STEP-BY-STEP CHECKLIST */}
          {activeTab === 'steps' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 text-xs text-stone-300">
                <span className="font-bold text-white block mb-1">
                  Complete Reference Guide for {toolConfig.toolName}:
                </span>
                Review all operational guidelines at your own pace, or test features right inside the simulation environment.
              </div>

              <div className="space-y-3">
                {toolConfig.steps.map((step, idx) => (
                  <div
                    key={step.id}
                    className="p-4 rounded-2xl bg-[#171424] border border-[#2F2942] space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-300 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                          0{step.stepNumber}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-white font-serif">
                            {step.title}
                          </h4>
                          <span className="text-[10px] font-mono text-purple-400">
                            Video chapter: {formatTime(step.timeOffset)}
                          </span>
                        </div>
                      </div>

                      {step.actionPrompt && (
                        <button
                          onClick={() => handleExecuteStepAction(step.actionPayload)}
                          className="px-3 py-1 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-stone-700"
                        >
                          <span>{step.actionPrompt}</span>
                          <ChevronRight className="w-3 h-3 text-purple-400" />
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-stone-300 leading-relaxed font-sans">
                      {step.summary}
                    </p>

                    <div className="space-y-1.5 pl-2 border-l-2 border-purple-800/60">
                      {step.instructions.map((inst, i) => (
                        <div key={i} className="text-xs text-stone-400 flex items-start gap-2">
                          <span className="text-purple-400 font-bold">•</span>
                          <span>{inst}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: GOOGLE VIDS & NOTEBOOKLM GENERATION SCRIPTS */}
          {activeTab === 'google-tools' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-[#1A1826] border border-[#342D45] space-y-2">
                <div className="flex items-center gap-2 text-amber-300">
                  <Sparkles className="w-4 h-4" />
                  <h4 className="font-bold text-sm text-white font-serif">
                    Generate Videos & Podcasts via Google's AI Studio Ecosystem
                  </h4>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  You can use Google’s generative tools to produce customized voiceovers, 2-host audio deep dives, and video walkthroughs using these pre-calibrated prompts.
                </p>
              </div>

              {/* Google Vids Storyboard Card */}
              <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="w-4 h-4 text-purple-400" />
                    <h5 className="font-bold text-xs text-white font-mono uppercase tracking-wider">
                      1. Google Vids Video Storyboard Prompt
                    </h5>
                  </div>

                  <button
                    onClick={() => handleCopyPrompt(toolConfig.googleVidsStoryboardPrompt, 'vids')}
                    className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 border border-stone-700 transition-all cursor-pointer"
                  >
                    {isCopiedPrompt === 'vids' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{isCopiedPrompt === 'vids' ? 'Copied Prompt!' : 'Copy Vids Prompt'}</span>
                  </button>
                </div>

                <p className="text-xs text-stone-400">
                  Paste into <strong>Google Vids</strong> (vids.google.com) to automatically generate timed video chapters, on-screen text animations, and screen captures:
                </p>

                <div className="p-3.5 rounded-xl bg-black/60 border border-stone-800 font-mono text-[11px] text-stone-300 leading-relaxed max-h-36 overflow-y-auto">
                  {toolConfig.googleVidsStoryboardPrompt}
                </div>
              </div>

              {/* NotebookLM Audio Overview Card */}
              <div className="p-5 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-teal-400" />
                    <h5 className="font-bold text-xs text-white font-mono uppercase tracking-wider">
                      2. Google NotebookLM Audio Overview Prompt
                    </h5>
                  </div>

                  <button
                    onClick={() => handleCopyPrompt(toolConfig.notebookLmOverviewPrompt, 'notebooklm')}
                    className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center gap-1.5 border border-stone-700 transition-all cursor-pointer"
                  >
                    {isCopiedPrompt === 'notebooklm' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{isCopiedPrompt === 'notebooklm' ? 'Copied Prompt!' : 'Copy NotebookLM Prompt'}</span>
                  </button>
                </div>

                <p className="text-xs text-stone-400">
                  Upload your studio training context or paste this into <strong>NotebookLM</strong> (notebooklm.google.com) to create a conversational 2-host audio podcast:
                </p>

                <div className="p-3.5 rounded-xl bg-black/60 border border-stone-800 font-mono text-[11px] text-stone-300 leading-relaxed max-h-36 overflow-y-auto">
                  {toolConfig.notebookLmOverviewPrompt}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-800 bg-[#0E0C16] shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-400">
            <Info className="w-4 h-4 text-purple-400 shrink-0" />
            <span>
              All tutorials run with <strong>100% on-device Web Audio & Canvas</strong> execution, compliant with the AIEE Charter.
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-md cursor-pointer shrink-0"
          >
            Ready to Practice
          </button>
        </div>

      </div>
    </div>
  );
};
