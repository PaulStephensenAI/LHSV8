import React, { useState } from 'react';
import { 
  Maximize2, 
  Layers, 
  RotateCw, 
  Sparkles, 
  Eye, 
  Cpu, 
  ShieldCheck, 
  Tablet,
  Compass,
  Waves,
  Activity,
  Stethoscope,
  Scan,
  Grid,
  Radio,
  Sliders,
  Check,
  X,
  Info,
  Video,
  BookOpen,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CompanionId } from '../types';
import { PERSONAS } from '../data/personasData';
import { CompanionAvatar } from './CompanionAvatar';
import { Tooltip } from './Tooltip';
import { SimulationTutorialModal } from './SimulationTutorialModal';

interface SpatialHologramLabProps {
  activeCompanionId: CompanionId;
  onSelectCompanion: (id: CompanionId) => void;
  onClose?: () => void;
}

export const SpatialHologramLab: React.FC<SpatialHologramLabProps> = ({
  activeCompanionId,
  onSelectCompanion,
  onClose
}) => {
  const [rotationAngle, setRotationAngle] = useState<number>(45);
  const [isWireframe, setIsWireframe] = useState<boolean>(true);
  const [spatialDepth, setSpatialDepth] = useState<number>(1.2);
  const [ambientGlow, setAmbientGlow] = useState<boolean>(true);
  const [showScanlines, setShowScanlines] = useState<boolean>(true);
  const [isIntensified, setIsIntensified] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [interferenceTelemetry, setInterferenceTelemetry] = useState<string | null>(null);
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [showQuickGuide, setShowQuickGuide] = useState<boolean>(true);

  const activePersona = PERSONAS.find(p => p.id === activeCompanionId) || PERSONAS[0];

  // Active interaction handler for click / tap on the scanlines overlay
  const handleScanlinesClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsIntensified(true);
    setInterferenceTelemetry('INTERFERENCE PULSE: +28.4 kHz (INTENSIFIED)');

    // Emit subtle acoustic synthesizer tone
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(560, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1120, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch {
      // AudioContext fallback
    }

    // Spawn localized holographic ripple at click position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples(prev => [...prev.slice(-4), newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1100);

    setTimeout(() => {
      setIsIntensified(false);
      setInterferenceTelemetry(null);
    }, 900);
  };

  return (
    <div className="rounded-3xl border border-[#E5E0D8] bg-white p-6 lg:p-8 space-y-6 shadow-md relative overflow-hidden">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#ECE7DE] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono text-[#7B5C9E] uppercase tracking-widest bg-[#F2ECF9] px-2.5 py-0.5 rounded-full border border-[#D5C6EC] font-bold">
              3D Spatial Hologram Lab
            </span>
            <span className="text-xs text-[#5A5568] font-sans">Embodied Collaboration Architecture</span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-[#181524] font-serif">
            Spatial Anchor & Holographic Projection Chamber
          </h3>
          <p className="text-xs text-[#5A5568] max-w-xl font-sans mt-0.5">
            Simulating side-by-side companion placement, wireframe vector grids, Scenario Wave volumetric glow, and empathy-constrained WebGL render bounds.
          </p>
        </div>

        {/* Spatial Toolbar & Modes */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Wireframe Grid Toggle */}
          <div className="flex items-center gap-1">
            <button
              id="toggle-wireframe-grid-btn"
              onClick={() => setIsWireframe(!isWireframe)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 shadow-2xs ${
                isWireframe
                  ? 'bg-[#7B5C9E] border-[#653E8A] text-white shadow-xs'
                  : 'bg-white border-[#E0DACF] text-[#5A5568] hover:text-[#181524]'
              }`}
            >
              <Grid className="w-4 h-4" />
              <span>{isWireframe ? 'Wireframe Grid: ON' : 'Wireframe Grid: OFF'}</span>
            </button>
            <Tooltip
              title="Wireframe Vector Grid"
              badge="Perspective HUD"
              position="bottom-left"
              content="Enables real-time 3D isometric plane projection vectors, anchoring the companion into realistic spatial dimensions."
            />
          </div>

          {/* Volumetric Glow Toggle */}
          <div className="flex items-center gap-1">
            <button
              id="toggle-volumetric-glow-btn"
              onClick={() => setAmbientGlow(!ambientGlow)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 shadow-2xs ${
                ambientGlow
                  ? 'bg-[#234F56] border-[#4A7C84] text-[#F5F2EB] shadow-xs'
                  : 'bg-white border-[#E0DACF] text-[#5A5568] hover:text-[#181524]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#D4A373]" />
              <span>{ambientGlow ? 'Volumetric Glow: ON' : 'Volumetric Glow: OFF'}</span>
            </button>
            <Tooltip
              title="Volumetric Ambient Glow"
              badge="Atmospheric"
              position="bottom-left"
              content="Simulates soft photon dispersion around the avatar, eliminating stark contrast and mitigating ocular strain."
            />
          </div>

          {/* Scanline Sweep Toggle */}
          <div className="flex items-center gap-1">
            <button
              id="toggle-scanlines-btn"
              onClick={() => setShowScanlines(!showScanlines)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 shadow-2xs ${
                showScanlines
                  ? 'bg-[#7B5C9E] border-[#653E8A] text-white shadow-xs'
                  : 'bg-white border-[#E0DACF] text-[#5A5568] hover:text-[#181524]'
              }`}
            >
              <Scan className="w-4 h-4 text-[#D4A373]" />
              <span>{showScanlines ? 'Scanlines: ON' : 'Scanlines: OFF'}</span>
            </button>
            <Tooltip
              title="Scanline Sweep & Interference"
              badge="Interactive Field"
              position="bottom-left"
              content="Displays subtle holographic CRT scanlines. Click or tap anywhere inside the projection chamber to pulse harmonic interference."
            />
          </div>

          {/* Video Guide & Tutorial Button */}
          <button
            id="open-spatial-tutorial-btn"
            onClick={() => setIsTutorialOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-[#7B5C9E] hover:bg-[#653E8A] active:scale-95 text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs border border-[#9575CD] cursor-pointer"
            title="Watch step-by-step video tutorial and 3D spatial guidelines"
          >
            <Video className="w-4 h-4 text-[#F5F2EB]" />
            <span>Video Guide & Tutorial</span>
          </button>

          {onClose && (
            <button
              id="close-spatial-lab-btn"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 active:scale-95 border border-[#D8D2C6] text-[#181524] text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer group"
              title="Close Holographic Lab and return to Home Workspace"
            >
              <X className="w-4 h-4 text-[#5A5568] group-hover:rotate-90 transition-transform duration-200" />
              <span>Close Lab</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick User Instructions & Tutorial Accordion Banner */}
      <div className="rounded-2xl border border-[#E5E0D8] bg-[#FAF8F5] p-4 transition-all shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#F2ECF9] border border-[#D5C6EC] flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-[#7B5C9E]" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#181524] font-serif flex items-center gap-2">
                <span>How to Use the 3D Spatial Hologram Lab</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F2ECF9] text-[#7B5C9E] border border-[#D5C6EC] font-semibold">
                  Quick Guide
                </span>
              </h4>
              <p className="text-[11px] text-[#5A5568]">
                Position companions with 45° side-by-side angles, calibrate depth zoom, and interact with the projection chamber.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTutorialOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-[#7B5C9E] hover:bg-[#653E8A] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <Video className="w-3.5 h-3.5 text-[#F5F2EB]" />
              <span>Watch Video Walkthrough</span>
            </button>

            <button
              onClick={() => setShowQuickGuide(!showQuickGuide)}
              className="p-1.5 rounded-xl bg-white hover:bg-stone-100 text-[#5A5568] hover:text-[#181524] transition-all cursor-pointer border border-[#E0DACF]"
              title={showQuickGuide ? 'Collapse instructions' : 'Expand instructions'}
            >
              {showQuickGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {showQuickGuide && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 mt-3 border-t border-[#ECE7DE] text-xs">
            <div className="p-3 rounded-xl bg-white border border-[#E5E0D8] space-y-1">
              <div className="flex items-center gap-1.5 text-[#7B5C9E] font-mono text-[11px] font-bold">
                <span className="w-4 h-4 rounded-full bg-[#F2ECF9] flex items-center justify-center text-[10px]">1</span>
                <span>Adjust 45° Angle (θ)</span>
              </div>
              <p className="text-[11px] text-[#5A5568]">
                Use the slider below to set 45° side-by-side positioning. This eliminates confrontational gaze pressure for neurodivergent focus.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#E5E0D8] space-y-1">
              <div className="flex items-center gap-1.5 text-[#234F56] font-mono text-[11px] font-bold">
                <span className="w-4 h-4 rounded-full bg-[#E6F0F2] flex items-center justify-center text-[10px]">2</span>
                <span>Toggle Grid & Glow</span>
              </div>
              <p className="text-[11px] text-[#5A5568]">
                Enable Wireframe Vector Grid for HUD perspective anchoring, and Volumetric Glow to eliminate stark ocular contrast.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#E5E0D8] space-y-1">
              <div className="flex items-center gap-1.5 text-[#8C5D2A] font-mono text-[11px] font-bold">
                <span className="w-4 h-4 rounded-full bg-[#FAF0E6] flex items-center justify-center text-[10px]">3</span>
                <span>Click Stage for Ripples</span>
              </div>
              <p className="text-[11px] text-[#5A5568]">
                Click or tap anywhere inside the dark stage to pulse harmonic 560Hz acoustic ripples across the holographic plane.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Persona Quick Selector Ribbon in the Lab */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-mono text-[#5A5568] whitespace-nowrap font-medium mr-1">Project Persona:</span>
        {PERSONAS.map((persona) => {
          const isSelected = persona.id === activeCompanionId;
          return (
            <button
              key={persona.id}
              onClick={() => onSelectCompanion(persona.id)}
              className={`px-3 py-1.5 rounded-2xl border transition-all flex items-center gap-2 whitespace-nowrap text-xs font-semibold ${
                isSelected
                  ? 'bg-[#F2ECF9] border-[#7B5C9E] text-[#181524] shadow-xs ring-1 ring-[#7B5C9E]/30'
                  : 'bg-white border-[#E0DACF] text-[#5A5568] hover:text-[#181524] hover:bg-[#FAF8F5]'
              }`}
            >
              <CompanionAvatar
                persona={persona}
                size="xs"
                showStatusRing={false}
                borderGlow={isSelected}
                shape="circle"
              />
              <span>{persona.name}</span>
              {isSelected && <Check className="w-3 h-3 text-[#7B5C9E]" />}
            </button>
          );
        })}
      </div>

      {/* Main 3D Stage Simulation Canvas Container */}
      <div className="relative h-96 w-full rounded-3xl bg-[#0F0D16] border border-[#2B263B] overflow-hidden flex items-center justify-center p-6 select-none shadow-xl">
        {/* Isometric Grid Floor */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(123,92,158,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(123,92,158,0.25)_1px,transparent_1px)] bg-[size:36px_36px] opacity-40 transition-transform duration-300"
          style={{
            transform: `perspective(600px) rotateX(60deg) rotateZ(${rotationAngle - 45}deg) scale(${spatialDepth})`,
            transformOrigin: 'center 75%'
          }}
        />

        {/* Secondary Wireframe Radial Floor Ring */}
        {isWireframe && (
          <div 
            className="absolute w-[420px] h-[420px] rounded-full border border-dashed border-purple-500/30 pointer-events-none transition-all duration-500"
            style={{
              transform: `perspective(600px) rotateX(60deg) rotateZ(${rotationAngle}deg) scale(${spatialDepth})`,
              transformOrigin: 'center 75%'
            }}
          />
        )}

        {/* Dynamic Holographic Scanline Raster & Laser Sweep Bar */}
        {showScanlines && (
          <div 
            id="holo-scanlines-container"
            className="absolute inset-0 z-20 overflow-hidden"
          >
            {/* Interactive Hologram Scanlines Overlay (with click & hover interaction) */}
            <div 
              id="holo-scanlines-overlay"
              onClick={handleScanlinesClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`holo-scanlines-overlay absolute inset-0 cursor-crosshair select-none ${
                isIntensified ? 'is-intensified animate-interference-flicker' : ''
              } ${isHovered ? 'opacity-75' : 'opacity-40'}`}
              title="Click or tap to pulse scanlines & trigger grid ripple wave"
            />

            {/* Stage-Wide Hologram Scanline Raster Cyan Tint */}
            <div className="absolute inset-0 holo-scanlines-cyan opacity-30 pointer-events-none" />

            {/* Glowing Laser Scanline Sweep Bar that travels vertically */}
            <div className={`absolute inset-x-0 h-16 -top-16 pointer-events-none bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent border-b-2 border-cyan-300/90 shadow-[0_0_20px_rgba(56,189,248,0.7)] ${
              isIntensified ? 'animate-scanline-sweep duration-700' : 'animate-scanline-sweep'
            }`} />

            {/* Interactive Grid Shockwave Ripples spawned by clicks */}
            {ripples.map((ripple) => (
              <div
                key={ripple.id}
                className="absolute pointer-events-none rounded-full border-2 border-cyan-400 bg-cyan-400/20 animate-grid-ripple z-25 shadow-[0_0_25px_rgba(56,189,248,0.8)]"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: '140px',
                  height: '140px',
                }}
              />
            ))}

            {/* Interactive Hover Hint Banner in top center */}
            {isHovered && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/60 text-[10px] font-mono text-cyan-200 shadow-lg pointer-events-none animate-pulse flex items-center gap-1.5 z-30 backdrop-blur-sm">
                <Scan className="w-3 h-3 text-cyan-300 animate-spin" />
                <span>Scanline Field Ready • Click anywhere to pulse grid ripple</span>
              </div>
            )}

            {/* Top & Bottom CRT Vignette Rim */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(15,13,22,0.85)_100%)]" />
          </div>
        )}

        {/* User Screen Desk Boundary */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
          <div className="px-4 py-1 rounded-xl bg-stone-900/90 border border-stone-700 shadow-xl flex items-center gap-2">
            <Tablet className="w-3 h-3 text-[#D4A373]" />
            <span className="text-[10px] font-mono text-stone-200 font-bold tracking-wider">
              USER LOCAL WORKSPACE DESK (TAB S10)
            </span>
          </div>
          <div className="w-24 h-1 bg-[#D4A373]/60 rounded-full mt-1" />
        </div>

        {/* Holographic Companion Entity Projected at theta angle */}
        <div 
          className="relative transition-all duration-500 flex flex-col items-center z-20 cursor-pointer"
          style={{
            transform: `perspective(700px) rotateY(${rotationAngle - 45}deg) translateZ(${spatialDepth * 40}px)`,
          }}
          title={`${activePersona.name} Holographic Anchor (${activePersona.identity.spatialAnchor})`}
        >
          {/* Hologram Rings with Wireframe Coordinate Cage */}
          <div 
            className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full flex items-center justify-center transition-all duration-500"
          >
            {/* Volumetric Glow Multi-Layer Halo (Positioned strictly BEHIND the avatar) */}
            {ambientGlow && (
              <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
                {/* Outer Diffuse Radiant Aura */}
                <div 
                  className="w-64 h-64 rounded-full filter blur-3xl opacity-35 animate-pulse"
                  style={{ backgroundColor: activePersona.themeColor.primary }}
                />
                {/* Inner Concentric Glow Rim */}
                <div 
                  className="absolute w-44 h-44 rounded-full filter blur-xl opacity-45"
                  style={{ backgroundColor: activePersona.themeColor.primary }}
                />
              </div>
            )}

            {/* Outer Rotating Dashed Ring (Wireframe Mode) */}
            <div 
              className={`absolute inset-0 rounded-full border transition-all duration-700 pointer-events-none ${
                isWireframe ? 'border-dashed border-purple-400/80 animate-spin-slow' : 'border-stone-700/40'
              }`}
              style={{ borderColor: isWireframe ? activePersona.themeColor.primary : undefined }}
            />

            {/* Inner Concentric Spatial Ring */}
            <div 
              className="absolute inset-4 rounded-full border pointer-events-none transition-all duration-300"
              style={{
                borderColor: isWireframe ? 'rgba(56, 189, 248, 0.6)' : 'rgba(255, 255, 255, 0.12)'
              }}
            />

            {/* Wireframe Grid Crosshairs & Hologram Ticks */}
            {isWireframe && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Crosshairs */}
                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-purple-400/30" />
                <div className="absolute inset-y-0 left-1/2 w-[1px] bg-purple-400/30" />
                
                {/* 4 Corner Hologram Coordinate Brackets */}
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400/80" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-400/80" />
                <div className="absolute bottom-2 left-2 w-3 h-2 border-b-2 border-l-2 border-cyan-400/80" />
                <div className="absolute bottom-2 right-2 w-3 h-2 border-b-2 border-r-2 border-cyan-400/80" />
              </div>
            )}

            {/* Subtle Scanlines Layer (Non-blocking) */}
            {showScanlines && (
              <div className="absolute inset-2 rounded-full overflow-hidden pointer-events-none z-10 opacity-20">
                <div className="w-full h-full bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.6)_51%)] bg-[size:100%_4px]" />
              </div>
            )}

            {/* PERSONA AVATAR CENTERPIECE (Always front and center, crisp and unobstructed) */}
            <div className="relative z-30 transition-transform duration-300 hover:scale-105">
              <CompanionAvatar
                persona={activePersona}
                size="3xl"
                showStatusRing={true}
                isOnline={true}
                borderGlow={ambientGlow}
                shape="circle"
              />

              {/* Wireframe Matrix Tag Badge */}
              {isWireframe && (
                <div className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-md bg-purple-950/95 border border-purple-400 text-[9px] font-mono text-purple-200 font-bold shadow-md z-40">
                  GRID
                </div>
              )}
            </div>

            {/* Orbiting Spatial Vector Nodes */}
            <div className="absolute top-2 right-6 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping pointer-events-none z-30" />
            <div className="absolute bottom-3 left-6 w-2 h-2 rounded-full bg-amber-400 pointer-events-none z-30" />
            <div className="absolute top-1/2 left-1 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-400 pointer-events-none z-30" />
          </div>

          {/* Spatial Anchor Pill & Name Tag */}
          <div className="mt-3 flex flex-col items-center gap-1 z-30">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg text-white tracking-tight drop-shadow-md">
                {activePersona.name}
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-stone-900/90 border border-stone-700 text-stone-200">
                {activePersona.codename}
              </span>
            </div>

            <div className="px-3.5 py-1 rounded-full bg-stone-900/90 border border-stone-700 text-[10px] font-mono text-stone-200 backdrop-blur shadow-md flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activePersona.themeColor.primary }} />
              <span>Anchor: {activePersona.identity.spatialAnchor}</span>
            </div>
          </div>
        </div>

        {/* Spatial HUD Diagnostics Insets */}
        <div className="absolute top-4 left-4 bg-stone-950/90 border border-stone-800 p-3 rounded-2xl text-[10px] font-mono space-y-1 backdrop-blur pointer-events-none shadow-lg">
          <div className="text-purple-400 font-bold flex items-center gap-1">
            <Radio className="w-3 h-3 text-purple-400 animate-pulse" />
            <span>SPATIAL MATRIX VECTORS:</span>
          </div>
          <div className="text-stone-200">ACTIVE: <strong className="text-white">{activePersona.name} ({activePersona.id.toUpperCase()})</strong></div>
          <div className="text-stone-300">ROTATION: {rotationAngle}° (Side-by-Side)</div>
          <div className="text-stone-400">DEPTH COEFFICIENT: {spatialDepth.toFixed(1)}z</div>
          <div className="text-stone-400">WIREFRAME: {isWireframe ? 'ENGAGED' : 'SOLID'}</div>
          <div className="text-stone-400">GLOW: {ambientGlow ? 'VOLUMETRIC' : 'FLAT'}</div>
          <div className="text-cyan-300">
            SCANLINES: {showScanlines ? (interferenceTelemetry || (isHovered ? 'FIELD ARMED (HOVER)' : 'ACTIVE SWEEP')) : 'STANDBY'}
          </div>
          {interferenceTelemetry && (
            <div className="text-amber-300 font-bold animate-pulse text-[9px] bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/40">
              ⚡ {interferenceTelemetry}
            </div>
          )}
          <div className="text-emerald-400 font-bold">DOLPHIN BARRIER: SEALED</div>
        </div>

        <div className="absolute top-4 right-4 bg-stone-950/90 border border-stone-800 p-3 rounded-2xl text-[10px] font-mono space-y-1 backdrop-blur text-right pointer-events-none shadow-lg">
          <div className="text-cyan-400 font-bold">VOLUMETRIC OPTICS:</div>
          <div className="text-stone-200">{activePersona.role}</div>
          <div className="text-stone-300">ARCHETYPE: {activePersona.identity.archetype}</div>
          <div className="text-stone-400">POSITION: {activePersona.identity.frameworkPosition}</div>
          <div className="text-cyan-300">AIEE COMPLIANCE: 100%</div>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1 text-xs">
        <div className="space-y-1.5 p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE]">
          <div className="flex justify-between text-[#5A5568]">
            <span className="font-semibold">Spatial Angle (θ):</span>
            <span className="font-mono text-[#7B5C9E] font-bold">{rotationAngle}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="90"
            value={rotationAngle}
            onChange={(e) => setRotationAngle(Number(e.target.value))}
            className="w-full accent-[#7B5C9E] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#5A5568] font-mono">
            <span>0° (Face-to-Face)</span>
            <span>45° (Side-by-Side)</span>
            <span>90° (Flank)</span>
          </div>
        </div>

        <div className="space-y-1.5 p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE]">
          <div className="flex justify-between text-[#5A5568]">
            <span className="font-semibold">Spatial Depth Zoom:</span>
            <span className="font-mono text-[#7B5C9E] font-bold">{spatialDepth.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.8"
            max="2.0"
            step="0.1"
            value={spatialDepth}
            onChange={(e) => setSpatialDepth(Number(e.target.value))}
            className="w-full accent-[#7B5C9E] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#5A5568] font-mono">
            <span>Near (0.8x)</span>
            <span>Comfort (1.2x)</span>
            <span>Far (2.0x)</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#ECE7DE] flex flex-col justify-between space-y-2">
          <span className="text-[#5A5568] text-[11px] font-semibold block">Quick Holographic Presets & Navigation:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setRotationAngle(45); setSpatialDepth(1.2); setIsWireframe(true); setAmbientGlow(true); }}
              className="flex-1 py-1.5 px-3 rounded-xl bg-white hover:bg-stone-50 border border-[#E0DACF] text-[#181524] text-[11px] font-semibold transition-colors text-center shadow-2xs whitespace-nowrap"
            >
              45° Wireframe + Glow
            </button>
            <button
              onClick={() => { setRotationAngle(15); setSpatialDepth(1.6); setIsWireframe(false); setAmbientGlow(true); }}
              className="flex-1 py-1.5 px-3 rounded-xl bg-white hover:bg-stone-50 border border-[#E0DACF] text-[#181524] text-[11px] font-semibold transition-colors text-center shadow-2xs whitespace-nowrap"
            >
              Phoebe Wave Glow
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="py-1.5 px-3 rounded-xl bg-[#234F56] hover:bg-[#2C626A] text-[#F5F2EB] border border-[#4A7C84] text-[11px] font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-2xs whitespace-nowrap"
                title="Close Holographic Lab and return to Home Workspace"
              >
                <X className="w-3.5 h-3.5" />
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
        defaultTool="spatial-lab"
        onSelectCompanion={onSelectCompanion}
        onApplyPresetAction={(action) => {
          if (action === 'set-45-deg') {
            setRotationAngle(45);
            setSpatialDepth(1.2);
          } else if (action === 'toggle-wireframe-glow') {
            setIsWireframe(true);
            setAmbientGlow(true);
          }
        }}
      />
    </div>
  );
};

