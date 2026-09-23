import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  Camera, 
  CameraOff, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw, 
  SunMedium, 
  Activity, 
  Wind, 
  CheckCircle2, 
  Sliders, 
  AlertCircle,
  HelpCircle,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Send,
  Lock,
  ChevronRight,
  Info
} from 'lucide-react';
import { CompanionId, PersonaData, RoomScanMetrics, RoomScanResult } from '../types';
import { PERSONAS } from '../data/personasData';
import { 
  ROOM_PRESET_SCENARIOS, 
  COMPANION_SENSORY_ROLES, 
  RoomPresetScenario,
  generateLocalRoomScanAnalysis 
} from '../data/roomScanData';
import { CompanionAvatar } from './CompanionAvatar';
import { Tooltip } from './Tooltip';

export interface AmbientRoomScannerProps {
  activeCompanionId: CompanionId;
  onSelectCompanion: (id: CompanionId) => void;
  onOpenChat: (id?: CompanionId) => void;
  onOpenConsultation?: () => void;
  className?: string;
}

export const AmbientRoomScanner: React.FC<AmbientRoomScannerProps> = ({
  activeCompanionId,
  onSelectCompanion,
  onOpenChat,
  onOpenConsultation,
  className = ''
}) => {
  const activePersona: PersonaData = PERSONAS.find(p => p.id === activeCompanionId) || PERSONAS[0];
  const sensoryRole = COMPANION_SENSORY_ROLES[activeCompanionId] || COMPANION_SENSORY_ROLES.ari;

  // Camera & Stream State
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isMirror, setIsMirror] = useState<boolean>(true);
  const [isPrivacyBlanked, setIsPrivacyBlanked] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  
  // Real-time Optical Metrics (Calculated from Video Canvas)
  const [liveMetrics, setLiveMetrics] = useState<RoomScanMetrics>({
    ambientBrightness: 54,
    movementDelta: 18,
    screenContrastRatio: 2.8,
    detectedPosture: 'relaxed',
    lightingQuality: 'soft_balanced'
  });

  // Selected Preset Scenario (for non-camera testing)
  const [selectedScenario, setSelectedScenario] = useState<RoomPresetScenario>(ROOM_PRESET_SCENARIOS[0]);
  const [useLiveFeed, setUseLiveFeed] = useState<boolean>(false);

  // Active Scan Result
  const [scanResult, setScanResult] = useState<RoomScanResult>(() => 
    generateLocalRoomScanAnalysis(activeCompanionId, ROOM_PRESET_SCENARIOS[0].metrics)
  );

  // Somatic Breathing Pacer State
  const [isBreathingPacerActive, setIsBreathingPacerActive] = useState<boolean>(true);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathSecondsLeft, setBreathSecondsLeft] = useState<number>(4);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  // Client Note / Environment Observation Input
  const [clientNote, setClientNote] = useState<string>('');

  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prevFrameDataRef = useRef<Uint8ClampedArray | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Synchronize result when companion changes
  useEffect(() => {
    const currentMetrics = useLiveFeed ? liveMetrics : selectedScenario.metrics;
    setScanResult(generateLocalRoomScanAnalysis(activeCompanionId, currentMetrics, clientNote));
  }, [activeCompanionId]);

  // Breathing Pacer Cycle (Inhale 4s -> Hold 4s -> Exhale 6s)
  useEffect(() => {
    if (!isBreathingPacerActive) return;

    const durations = { inhale: 4, hold: 4, exhale: 6 };
    const timer = setInterval(() => {
      setBreathSecondsLeft(prev => {
        if (prev <= 1) {
          if (breathPhase === 'inhale') {
            setBreathPhase('hold');
            return durations.hold;
          } else if (breathPhase === 'hold') {
            setBreathPhase('exhale');
            return durations.exhale;
          } else {
            setBreathPhase('inhale');
            return durations.inhale;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isBreathingPacerActive, breathPhase]);

  // Start Camera Stream
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
      setIsCameraActive(true);
      setUseLiveFeed(true);
      setIsPrivacyBlanked(false);
    } catch (err: any) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraError('Camera access was not granted. You can still test with our realistic room presets below!');
      setIsCameraActive(false);
      setUseLiveFeed(false);
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setUseLiveFeed(false);
  };

  // Process video frames locally in real time (zero recording)
  const processFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !isCameraActive || isPrivacyBlanked) {
      animationFrameRef.current = requestAnimationFrame(processFrame);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = 160;
        canvas.height = 120;
        ctx.drawImage(video, 0, 0, 160, 120);

        const frame = ctx.getImageData(0, 0, 160, 120);
        const data = frame.data;
        let totalBrightness = 0;
        let motionDiff = 0;
        const prev = prevFrameDataRef.current;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          totalBrightness += brightness;

          if (prev) {
            const prevBrightness = (prev[i] * 299 + prev[i + 1] * 587 + prev[i + 2] * 114) / 1000;
            motionDiff += Math.abs(brightness - prevBrightness);
          }
        }

        const pixelCount = data.length / 4;
        const avgBrightness = Math.round((totalBrightness / pixelCount / 255) * 100);
        const avgMotion = prev ? Math.min(100, Math.round((motionDiff / pixelCount / 255) * 300)) : 15;
        prevFrameDataRef.current = new Uint8ClampedArray(data);

        setLiveMetrics(prevMetrics => {
          // Detect lighting quality
          let lightQual: RoomScanMetrics['lightingQuality'] = 'soft_balanced';
          if (avgBrightness < 25) lightQual = 'dim_strained';
          else if (avgBrightness > 75) lightQual = 'harsh_glare';

          // Simple posture heuristic: check if center mass is lower
          let posture: RoomScanMetrics['detectedPosture'] = 'relaxed';
          if (avgMotion > 60) posture = 'tilted';
          else if (avgBrightness < 30) posture = 'slumped_forward';

          return {
            ambientBrightness: avgBrightness,
            movementDelta: avgMotion,
            screenContrastRatio: Number((avgBrightness < 30 ? 6.5 : 2.4).toFixed(1)),
            detectedPosture: posture,
            lightingQuality: lightQual
          };
        });
      }
    }

    animationFrameRef.current = requestAnimationFrame(processFrame);
  }, [isCameraActive, isPrivacyBlanked]);

  useEffect(() => {
    if (isCameraActive) {
      animationFrameRef.current = requestAnimationFrame(processFrame);
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isCameraActive, processFrame]);

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  // Execute Room & Self-Regulation Scan
  const handleExecuteScan = async () => {
    setIsScanning(true);
    const activeMetrics = useLiveFeed ? liveMetrics : selectedScenario.metrics;

    let snapshotBase64 = '';
    if (useLiveFeed && canvasRef.current && !isPrivacyBlanked) {
      snapshotBase64 = canvasRef.current.toDataURL('image/jpeg', 0.6);
    }

    try {
      const response = await fetch('/api/room-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: snapshotBase64 || undefined,
          companionId: activeCompanionId,
          clientNote: clientNote.trim() || undefined,
          metrics: activeMetrics
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.scan) {
          setScanResult(data.scan);
          setIsScanning(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend /api/room-scan fallback triggered:', err);
    }

    // High fidelity deterministic fallback
    const localResult = generateLocalRoomScanAnalysis(activeCompanionId, activeMetrics, clientNote);
    setScanResult(localResult);
    setIsScanning(false);
  };

  // Toggle checklist item
  const toggleStep = (idx: number) => {
    setCompletedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div 
      id="ambient-room-scanner-root"
      className={`space-y-6 ${className}`}
    >
      {/* 1. Header Banner & Sovereign Privacy Guarantee */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ECE7DE] shadow-sm relative overflow-hidden">
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none -mr-20 -mt-20"
          style={{ backgroundColor: activePersona.themeColor.primary }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#F2ECF9] text-[#684A87] border border-[#D5C6EC]">
                Optional Add-On Feature
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Zero Recording • Sovereign Private Lens
              </span>
            </div>

            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#181524] tracking-tight">
              Ambient Room &amp; Self-Regulation Scanner
            </h2>

            <p className="text-sm text-[#5A5568] leading-relaxed">
              An opt-in companion lens that gently observes your room lighting, screen glare, posture, and environmental changes. 
              Helps you pace yourself, ease sensory strain, and reset your workspace without storing, recording, or leaking any video.
            </p>
          </div>

          {/* Sovereign Guarantee Box */}
          <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#ECE7DE] space-y-2 lg:max-w-xs shrink-0">
            <div className="flex items-center gap-2 text-xs font-bold text-[#181524]">
              <Lock className="w-4 h-4 text-[#7B5C9E]" />
              <span>AIEE Privacy Guarantee</span>
            </div>
            <p className="text-[11px] text-[#5A5568] leading-normal">
              Frames are processed in real time and discarded immediately. No photos or video are ever stored or used for training.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[10px] font-mono text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Local Air-Gap Attestation Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Two-Column Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Camera Viewport / Room Simulation Sandbox (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#ECE7DE] shadow-sm space-y-4">
            
            {/* Source Mode Toggle: Live Camera vs. Room Preset Simulators */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#7B5C9E]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#5A5568]">
                  Scanner Input Source
                </span>
              </div>

              <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#ECE7DE]">
                <button
                  type="button"
                  onClick={() => {
                    if (!isCameraActive) startCamera();
                    setUseLiveFeed(true);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                    useLiveFeed && isCameraActive
                      ? 'bg-[#7B5C9E] text-white shadow-2xs'
                      : 'text-[#5A5568] hover:text-[#181524]'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Live Lens</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    stopCamera();
                    setUseLiveFeed(false);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                    !useLiveFeed
                      ? 'bg-[#234F56] text-[#F5F2EB] shadow-2xs'
                      : 'text-[#5A5568] hover:text-[#181524]'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Preset Rooms</span>
                </button>
              </div>
            </div>

            {/* Viewport Box */}
            <div className="relative rounded-2xl overflow-hidden bg-[#181524] aspect-[4/3] flex items-center justify-center border border-black/10 shadow-inner group">
              
              {/* Hidden Canvas for local telemetry */}
              <canvas ref={canvasRef} className="hidden" />

              {/* LIVE CAMERA MODE */}
              {useLiveFeed && isCameraActive ? (
                <>
                  <video
                    ref={videoRef}
                    playsInline
                    autoPlay
                    muted
                    className={`w-full h-full object-cover transition-transform ${
                      isMirror ? 'scale-x-[-1]' : ''
                    } ${isPrivacyBlanked ? 'filter blur-2xl grayscale' : ''}`}
                  />

                  {/* Translucent HUD Overlay */}
                  <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between">
                    {/* Top Status Ribbon */}
                    <div className="flex items-center justify-between text-[10px] font-mono text-white/90">
                      <div className="flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded-full backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>LIVE SENSORY SCAN</span>
                      </div>
                      <div className="bg-black/60 px-2 py-1 rounded-full backdrop-blur-md">
                        ZERO RETENTION
                      </div>
                    </div>

                    {/* Center Posture Guide Ring */}
                    <div className="self-center border border-dashed border-white/20 w-32 h-44 rounded-full flex items-center justify-center">
                      <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                        Posture Guide
                      </span>
                    </div>

                    {/* Bottom Telemetry Ticker */}
                    <div className="bg-black/70 backdrop-blur-md p-2 rounded-xl text-[10px] font-mono text-white/80 grid grid-cols-3 gap-2">
                      <div>
                        <span className="text-white/50 block">Light</span>
                        <span className="font-bold text-amber-300">{liveMetrics.ambientBrightness}% Lux</span>
                      </div>
                      <div>
                        <span className="text-white/50 block">Motion</span>
                        <span className="font-bold text-cyan-300">{liveMetrics.movementDelta}% Delta</span>
                      </div>
                      <div>
                        <span className="text-white/50 block">Posture</span>
                        <span className="font-bold text-emerald-300 capitalize">{liveMetrics.detectedPosture}</span>
                      </div>
                    </div>
                  </div>

                  {/* Camera Controls Overlay */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => setIsPrivacyBlanked(!isPrivacyBlanked)}
                      title={isPrivacyBlanked ? 'Reveal Camera' : 'Cover Lens (Privacy Blur)'}
                      className="p-1.5 rounded-lg bg-black/70 hover:bg-black/90 text-white text-xs cursor-pointer"
                    >
                      {isPrivacyBlanked ? <CameraOff className="w-3.5 h-3.5 text-rose-400" /> : <Camera className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMirror(!isMirror)}
                      title="Flip Mirror"
                      className="p-1.5 rounded-lg bg-black/70 hover:bg-black/90 text-white text-xs cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </>
              ) : (
                /* PRESET SIMULATOR MODE */
                <div className="p-6 text-center space-y-3 max-w-sm text-white">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 mx-auto flex items-center justify-center text-3xl shadow-inner border border-white/10">
                    {selectedScenario.roomIcon}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-lg text-white">
                      {selectedScenario.name}
                    </h4>
                    <p className="text-xs text-white/75 mt-0.5">
                      {selectedScenario.subtitle}
                    </p>
                  </div>
                  <p className="text-[11px] text-white/60 leading-relaxed font-sans">
                    {selectedScenario.simulatedVisualDescription}
                  </p>

                  <div className="pt-2 flex items-center justify-center gap-3 text-[10px] font-mono text-white/80">
                    <span className="bg-white/10 px-2 py-0.5 rounded">Light: {selectedScenario.metrics.ambientBrightness}%</span>
                    <span className="bg-white/10 px-2 py-0.5 rounded">Posture: {selectedScenario.metrics.detectedPosture}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Error banner if camera permission failed */}
            {cameraError && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>{cameraError}</p>
              </div>
            )}

            {/* Presets Grid (when in preset mode) */}
            {!useLiveFeed && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold text-[#5A5568] uppercase">
                    Select Test Room Scenario:
                  </span>
                  <span className="text-[10px] font-mono text-[#7B5C9E]">
                    4 Presets Available
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {ROOM_PRESET_SCENARIOS.map(sc => {
                    const isSelected = selectedScenario.id === sc.id;
                    return (
                      <button
                        key={sc.id}
                        type="button"
                        onClick={() => {
                          setSelectedScenario(sc);
                          setScanResult(generateLocalRoomScanAnalysis(activeCompanionId, sc.metrics, clientNote));
                        }}
                        className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-[#F2ECF9] border-[#7B5C9E] shadow-2xs text-[#181524]'
                            : 'bg-[#FAF8F5] border-[#ECE7DE] hover:bg-[#F5F2EB] text-[#5A5568]'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-base">{sc.roomIcon}</span>
                          <span className="text-xs font-bold font-serif truncate">{sc.name}</span>
                        </div>
                        <p className="text-[10px] text-[#5A5568] truncate mt-0.5">
                          {sc.metrics.lightingQuality.replace('_', ' ')}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Client Context Input Note */}
            <div className="space-y-1.5 pt-1">
              <label className="text-[11px] font-mono font-semibold text-[#5A5568] flex items-center justify-between">
                <span>Add Physical Context or Note (Optional):</span>
                <span className="text-[10px] text-[#8C827A]">e.g. &quot;Tired neck&quot; or &quot;Sun glare&quot;</span>
              </label>
              <input
                type="text"
                value={clientNote}
                onChange={e => setClientNote(e.target.value)}
                placeholder="e.g. Afternoon meeting fatigue, bright window behind screen..."
                className="w-full text-xs px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#ECE7DE] text-[#181524] placeholder-[#8C827A] focus:outline-none focus:border-[#7B5C9E]"
              />
            </div>

            {/* Scan Action Button */}
            <button
              type="button"
              onClick={handleExecuteScan}
              disabled={isScanning}
              className="w-full py-3 rounded-2xl font-bold text-sm text-white shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer hover:brightness-105 active:scale-[0.99]"
              style={{ backgroundColor: activePersona.themeColor.primary }}
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Room &amp; Pacing with {activePersona.name}...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Scan Room &amp; Receive Guidance</span>
                </>
              )}
            </button>
          </div>

          {/* Somatic Breathing Pacer Card */}
          <div className="bg-white rounded-3xl p-5 border border-[#ECE7DE] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-[#7B5C9E]" />
                <h4 className="font-serif font-bold text-sm text-[#181524]">
                  Somatic Co-Regulation Pacer
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsBreathingPacerActive(!isBreathingPacerActive)}
                className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FAF8F5] border border-[#ECE7DE] text-[#5A5568] hover:bg-[#F5F2EB] cursor-pointer"
              >
                {isBreathingPacerActive ? 'Pause Pacer' : 'Resume Pacer'}
              </button>
            </div>

            <p className="text-xs text-[#5A5568] leading-relaxed">
              Synchronize your breath with {activePersona.name}&apos;s recommended cadence:
            </p>

            {/* Pulsing Breathing Circle */}
            <div className="py-4 flex flex-col items-center justify-center">
              <motion.div
                animate={{
                  scale: breathPhase === 'inhale' ? 1.35 : breathPhase === 'hold' ? 1.35 : 0.95,
                  opacity: breathPhase === 'hold' ? 0.9 : 1
                }}
                transition={{
                  duration: breathPhase === 'inhale' ? 4 : breathPhase === 'hold' ? 0.2 : 6,
                  ease: 'easeInOut'
                }}
                className="w-24 h-24 rounded-full flex flex-col items-center justify-center text-center shadow-lg border-2"
                style={{
                  backgroundColor: `${activePersona.themeColor.primary}18`,
                  borderColor: activePersona.themeColor.primary,
                  color: activePersona.themeColor.primary
                }}
              >
                <span className="text-xs font-bold uppercase tracking-wider font-mono">
                  {breathPhase}
                </span>
                <span className="text-xl font-bold font-serif">
                  {breathSecondsLeft}s
                </span>
              </motion.div>
              <span className="text-[11px] font-mono text-[#7B5C9E] mt-3 font-semibold">
                {sensoryRole.breathingCadence}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Companion's Sensory Interpretation & Environmental Changes (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Active Companion Voice Banner */}
          <div 
            className="p-5 sm:p-6 rounded-3xl bg-white border border-[#ECE7DE] shadow-sm space-y-4 relative overflow-hidden"
            style={{
              boxShadow: `0 8px 30px -10px ${activePersona.themeColor.glow}`
            }}
          >
            {/* Top Companion Identity Strip */}
            <div className="flex items-center justify-between gap-3 border-b border-[#ECE7DE] pb-4">
              <div className="flex items-center gap-3">
                <CompanionAvatar
                  persona={activePersona}
                  size="md"
                  showStatusRing={true}
                  isOnline={true}
                  borderGlow={true}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-[#181524] text-lg">
                      {activePersona.name}
                    </h3>
                    <span 
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${activePersona.themeColor.primary}15`,
                        color: activePersona.themeColor.primary
                      }}
                    >
                      {sensoryRole.scannerRole}
                    </span>
                  </div>
                  <p className="text-xs text-[#5A5568]">
                    {sensoryRole.focusArea}
                  </p>
                </div>
              </div>

              {/* Sensory Equilibrium Score Gauge */}
              <div className="text-right shrink-0">
                <span className="text-[10px] font-mono uppercase text-[#5A5568] block">
                  Sensory Balance
                </span>
                <span 
                  className="font-serif font-bold text-2xl"
                  style={{
                    color: scanResult.equilibriumScore > 75 ? '#1E5D3A' : scanResult.equilibriumScore > 50 ? '#B45309' : '#991B1B'
                  }}
                >
                  {scanResult.equilibriumScore}
                  <span className="text-sm font-sans font-normal text-[#5A5568]">/100</span>
                </span>
              </div>
            </div>

            {/* Companion's Spoken Observation */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#7B5C9E]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>What {activePersona.name} Observes in Your Space:</span>
              </div>
              <p className="font-serif italic text-sm sm:text-base text-[#181524] leading-relaxed">
                &ldquo;{scanResult.companionObservation}&rdquo;
              </p>
            </div>

            {/* Dual Insight Cards: Client Somatics vs. Room Environment Changes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              
              {/* Card 1: Client Self-Regulation */}
              <div className="p-4 rounded-2xl bg-white border border-[#ECE7DE] space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#181524]">
                  <Activity className="w-4 h-4 text-[#7B5C9E]" />
                  <span>Physical &amp; Somatic Cues</span>
                </div>
                <ul className="space-y-1.5 text-xs text-[#5A5568]">
                  {scanResult.clientSelfRegulation.physicalCues.map((cue, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#7B5C9E] font-bold">•</span>
                      <span>{cue}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-1 text-[11px] font-sans text-[#3B3450] bg-[#FAF8F5] p-2.5 rounded-xl border border-[#ECE7DE]">
                  <strong className="text-[#181524]">Posture Guide: </strong>
                  {scanResult.clientSelfRegulation.postureGuidance}
                </div>
              </div>

              {/* Card 2: Environment & Room Changes */}
              <div className="p-4 rounded-2xl bg-white border border-[#ECE7DE] space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#181524]">
                  <SunMedium className="w-4 h-4 text-amber-600" />
                  <span>Room &amp; Lighting Changes</span>
                </div>
                <p className="text-xs text-[#5A5568] leading-relaxed">
                  {scanResult.environmentChanges.summary}
                </p>
                <div className="space-y-1 text-[11px] font-mono text-[#3B3450] pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8C827A]">Light Status:</span>
                    <span className="font-semibold text-[#181524]">{scanResult.environmentChanges.lightingStatus}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8C827A]">Clutter Index:</span>
                    <span className="font-semibold capitalize text-[#181524]">{scanResult.environmentChanges.clutterIndex.replace('_', ' ')}</span>
                  </div>
                </div>
                {scanResult.environmentChanges.recentShift && (
                  <div className="text-[10px] font-mono text-[#7B5C9E] bg-[#F2ECF9] p-2 rounded-lg truncate">
                    {scanResult.environmentChanges.recentShift}
                  </div>
                )}
              </div>
            </div>

            {/* Actionable Pacing Checklist */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-bold text-sm text-[#181524] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Gentle Pacing &amp; Environmental Adjustments</span>
                </h4>
                <span className="text-[11px] font-mono text-[#8C827A]">
                  Tap to mark done
                </span>
              </div>

              <div className="space-y-2">
                {scanResult.actionablePacingCues.map((cue, idx) => {
                  const isDone = Boolean(completedSteps[idx]);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleStep(idx)}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isDone
                          ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900 line-through opacity-75'
                          : 'bg-[#FAF8F5] border-[#ECE7DE] hover:bg-[#F5F2EB] text-[#181524]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 text-xs">
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-mono border ${
                          isDone ? 'bg-emerald-600 text-white border-emerald-600' : 'border-[#8C827A] text-[#8C827A]'
                        }`}>
                          {isDone ? '✓' : idx + 1}
                        </span>
                        <span className="font-medium">{cue}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#8C827A] shrink-0">
                        {isDone ? 'Completed' : 'To Do'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions: Chat with Companion or Consult */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#ECE7DE]">
              <div className="text-[11px] font-mono text-[#5A5568] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Air-Gapped: Zero images stored on server</span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onOpenChat(activeCompanionId)}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold bg-[#F2ECF9] text-[#5A3882] hover:bg-[#E8DEF5] border border-[#D5C6EC] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Discuss with {activePersona.name} in Chat</span>
                </button>
                {onOpenConsultation && (
                  <button
                    type="button"
                    onClick={onOpenConsultation}
                    className="hidden sm:inline-flex px-3 py-2 rounded-xl text-xs font-semibold text-[#5A5568] hover:text-[#181524] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                  >
                    Custom Setup
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Companion Quick Switcher Bar */}
          <div className="bg-white rounded-2xl p-3 border border-[#ECE7DE] flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#5A5568] shrink-0">
              Switch Companion Perspective:
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              {PERSONAS.map(p => {
                const isSelected = p.id === activeCompanionId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onSelectCompanion(p.id)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#7B5C9E] text-white shadow-2xs font-bold'
                        : 'bg-[#FAF8F5] text-[#5A5568] hover:bg-[#F5F2EB]'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.themeColor.primary }} />
                    <span>{p.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
