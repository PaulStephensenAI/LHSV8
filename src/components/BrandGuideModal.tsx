import React, { useState, useEffect } from 'react';
import { 
  X, 
  Palette, 
  Type, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  Heart, 
  Copy, 
  Check, 
  Compass, 
  Waves, 
  Eye, 
  BookOpen,
  MapPin,
  Anchor
} from 'lucide-react';
import { OfficialLavenderHillLogo, OfficialLavenderHillIcon, BiomorphicDataStemLogo, CoastalScallopSealLogo } from './BrandLogos';

interface BrandGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandGuideModal: React.FC<BrandGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'identity' | 'palettes' | 'typography' | 'glassmorphism' | 'logos' | 'copywriting'>('identity');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, tokenKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(tokenKey);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="w-full max-w-5xl h-[90vh] max-h-[860px] bg-[#0F0D13] text-[#F3F3F7] rounded-[28px] sm:rounded-[32px] border border-[#2B283A] shadow-2xl flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 bg-[#181524] border-b border-[#2B283A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#7B5C9E]/20 border border-[#7B5C9E]/50 flex items-center justify-center text-[#D4A373]">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-wide">
                  Lavender Hill Studio
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#7B5C9E]/30 text-purple-200 border border-[#7B5C9E]/40">
                  Official Brand Guide v3.0
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Visual Identity, Design Tokens, Typography & Ethical Communication Standards
              </p>
            </div>
          </div>

          <button
            id="close-brand-guide-modal-btn"
            onClick={onClose}
            aria-label="Close brand guide card"
            className="px-3.5 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer group"
            title="Close card & return to Home Workspace (Esc)"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
            <span className="hidden sm:inline">Close</span>
            <kbd className="hidden md:inline-block ml-0.5 px-1.5 py-0.2 text-[10px] font-mono bg-stone-950 text-stone-400 rounded border border-stone-800">
              Esc
            </kbd>
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="px-6 py-2.5 bg-[#12101B] border-b border-[#2B283A] flex items-center gap-1 sm:gap-2 overflow-x-auto">
          {[
            { id: 'identity', label: '1. Identity & Origin', icon: MapPin },
            { id: 'palettes', label: '2. Color Palettes', icon: Palette },
            { id: 'typography', label: '3. Typography & Care', icon: Type },
            { id: 'glassmorphism', label: '4. Holographic UI', icon: Layers },
            { id: 'logos', label: '5. Logo Symbolism', icon: Sparkles },
            { id: 'copywriting', label: '6. Brand Rules', icon: ShieldCheck },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#7B5C9E] text-white shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: IDENTITY & ORIGIN */}
          {activeTab === 'identity' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1E192B] to-[#12101A] border border-[#3B3450] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-md border border-[#D0C8BC] flex items-center justify-center">
                    <OfficialLavenderHillIcon size={42} />
                  </div>
                  <div>
                    <h4 className="font-display text-2xl font-bold text-white">
                      Official Entity: Lavender Hill Studio
                    </h4>
                    <span className="text-xs font-mono text-[#D4A373]">
                      (Strictly singular, never pluralised as "studios")
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#0B0912] border border-[#2B283A] space-y-2">
                    <div className="flex items-center gap-2 text-purple-300 font-semibold text-sm">
                      <MapPin className="w-4 h-4 text-[#D4A373]" />
                      <span>The Origin Story</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed font-sans">
                      The studio derives its name from <strong>Lavender Street</strong> in Griffin (Queensland, Australia), where the founder, Paul, and his wife, Carmel, established their "forever home". This real-world foundation anchors the brand in feelings of permanence, safety, and domestic sanctuary.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0B0912] border border-[#2B283A] space-y-2">
                    <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
                      <Anchor className="w-4 h-4 text-emerald-400" />
                      <span>Core Ethos: "Resilient Calm"</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed font-sans">
                      A harmonious blend of enduring natural strength (the resilience of the coastal landscape and human spirit) and sophisticated, serene digital control (the calm of our sovereign workspaces).
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono text-purple-300 uppercase tracking-widest block">
                    Official Taglines
                  </span>
                  <div className="p-3.5 rounded-2xl bg-[#0B0912] border border-purple-900/40">
                    <div className="text-xs text-stone-400 font-mono">Primary Tagline:</div>
                    <div className="text-sm font-serif italic text-white font-medium mt-0.5">
                      "Where calm intelligence meets handcrafted design."
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#0B0912] border border-teal-900/40">
                    <div className="text-xs text-stone-400 font-mono">Secondary Tagline:</div>
                    <div className="text-sm font-serif italic text-teal-200 font-medium mt-0.5">
                      "Compassionate, holographic support for your daily work and rest."
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#1A1426] border border-purple-800/40 space-y-1.5">
                  <div className="flex items-center gap-2 text-[#D4A373] font-semibold text-xs uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>The Anti-Hype Directive</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Lavender Hill Studio represents a deliberate shift away from sterile, aggressive tech clichés, neon-infused cyberpunk tropes, and alienating academic jargon. We design quiet, beautiful technology that treats people with respect.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COLOR PALETTES */}
          {activeTab === 'palettes' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Palette A */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display font-bold text-lg text-white">
                      Palette A: The Classic "Resilient Calm" Theme
                    </h4>
                    <p className="text-xs text-stone-400">
                      Grounds the default interfaces, light-mode canvases, and primary visual highlights in organic warmth.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {[
                    { name: 'Deep Lavender', hex: '#7B5C9E', role: 'Primary interactive accents, custom badges, active buttons & ambient glows', lightText: true },
                    { name: 'Sage Green', hex: '#3B4A3F', role: 'High-trust grounding elements, structural borders, headers & secondary accents', lightText: true },
                    { name: 'Sunset Gold', hex: '#D4A373', role: 'Badges, warm highlights, and secondary calls-to-action', lightText: false },
                    { name: 'Warm Linen', hex: '#FAFAF8', alt: '#F9F7F4', role: 'Primary light background—a soft, comforting, non-glare canvas', lightText: false },
                    { name: 'Dark Slate Blue', hex: '#0F0D13', alt: '#12171E', role: 'High-contrast dark backgrounds, terminal headers, code blocks', lightText: true },
                  ].map(c => (
                    <div 
                      key={c.name} 
                      className="rounded-2xl p-4 border border-[#2B283A] bg-[#14121E] flex flex-col justify-between space-y-3 cursor-pointer hover:border-purple-500/50 transition-all group"
                      onClick={() => copyToClipboard(c.hex, c.name)}
                    >
                      <div 
                        className="w-full h-16 rounded-xl flex items-center justify-center shadow-inner relative"
                        style={{ backgroundColor: c.hex }}
                      >
                        <span className={`text-xs font-mono font-bold ${c.lightText ? 'text-white' : 'text-stone-900'}`}>
                          {c.hex}
                        </span>
                        {copiedToken === c.name && (
                          <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center text-white text-xs font-bold gap-1">
                            <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white group-hover:text-purple-300 flex items-center justify-between">
                          <span>{c.name}</span>
                          <Copy className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                        </div>
                        <p className="text-[11px] text-stone-400 mt-1 leading-snug">
                          {c.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Palette B */}
              <div className="space-y-3 pt-4 border-t border-[#2B283A]">
                <div>
                  <h4 className="font-display font-bold text-lg text-teal-200">
                    Palette B: The Coastal Harmony Accent Palette
                  </h4>
                  <p className="text-xs text-stone-400">
                    Used to style primary interactive components, primary CTA buttons, and key navigation nodes to align with a restorative beachfront aesthetic.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { name: 'Deep Ocean Teal', hex: '#234F56', role: 'Primary button background, solid state containers, and active navigation accents', lightText: true },
                    { name: 'Hover Teal', hex: '#2C626A', role: 'Interactive button hover states to replace harsh glowing effects', lightText: true },
                    { name: 'Warm Sand', hex: '#F5F2EB', role: 'High-readability light text for button labels, icons, and prominent headers', lightText: false },
                    { name: 'Outline Teal', hex: '#4A7C84', role: 'Symmetrical border accents, secondary button outlines, and structural layout lines', lightText: true },
                  ].map(c => (
                    <div 
                      key={c.name} 
                      className="rounded-2xl p-4 border border-[#2B283A] bg-[#14121E] flex flex-col justify-between space-y-3 cursor-pointer hover:border-teal-500/50 transition-all group"
                      onClick={() => copyToClipboard(c.hex, c.name)}
                    >
                      <div 
                        className="w-full h-16 rounded-xl flex items-center justify-center shadow-inner relative"
                        style={{ backgroundColor: c.hex }}
                      >
                        <span className={`text-xs font-mono font-bold ${c.lightText ? 'text-white' : 'text-stone-900'}`}>
                          {c.hex}
                        </span>
                        {copiedToken === c.name && (
                          <div className="absolute inset-0 bg-black/60 rounded-xl flex items-center justify-center text-white text-xs font-bold gap-1">
                            <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white group-hover:text-teal-300 flex items-center justify-between">
                          <span>{c.name}</span>
                          <Copy className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                        </div>
                        <p className="text-[11px] text-stone-400 mt-1 leading-snug">
                          {c.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: TYPOGRAPHY & COGNITIVE CARE */}
          {activeTab === 'typography' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Header Display */}
                <div className="p-5 rounded-2xl bg-[#14121E] border border-[#2B283A] space-y-3">
                  <span className="text-[10px] font-mono text-[#D4A373] uppercase tracking-wider block">
                    Display & Headings (H1, H2)
                  </span>
                  <div className="font-display text-2xl text-white font-bold leading-tight">
                    Cinzel & Playfair Display
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans">
                    Reserved for top-level Display headings (H1, H2) to evoke a premium, artisanal, and trusted editorial presence.
                  </p>
                </div>

                {/* System & Body */}
                <div className="p-5 rounded-2xl bg-[#14121E] border border-[#2B283A] space-y-3">
                  <span className="text-[10px] font-mono text-purple-300 uppercase tracking-wider block">
                    Body & System Typography
                  </span>
                  <div className="font-sans text-xl text-white font-semibold leading-tight">
                    Plus Jakarta Sans / Inter
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans">
                    Clean, crisp, geometric sans-serif fonts optimized for scanning text and displaying technical system telemetry.
                  </p>
                </div>

                {/* Cognitive Care & Speech: Quicksand */}
                <div className="p-5 rounded-2xl bg-[#1A1428] border border-purple-500/50 space-y-3 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-pink-300 uppercase tracking-wider block">
                      Cognitive Care & Speech
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] bg-purple-500/20 text-purple-200 font-bold border border-purple-400/40">
                      MANDATORY
                    </span>
                  </div>
                  <div className="font-companion-speech text-2xl text-white font-bold leading-tight">
                    Quicksand (Geometric Rounded)
                  </div>
                  <p className="text-xs text-purple-100/90 leading-relaxed font-companion-speech">
                    Mandatory for all digital companion speech text, care plan checklists, and clinical rehabilitation workspaces (like Angel.AI) to reduce eye strain and mitigate cognitive load for users undergoing brain-injury or stroke recovery.
                  </p>
                </div>
              </div>

              {/* v3.0 Accessibility Guardrails */}
              <div className="p-5 rounded-3xl bg-[#0B0912] border border-[#D0C8BC]/40 space-y-3">
                <div className="flex items-center gap-2 text-[#D4A373] font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
                  <span>The Contrast & Legibility Guardrail (v3.0 Accessibility Upgrade)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-[#14121E] border border-stone-800">
                    <div className="text-xs font-mono text-purple-300">Base Text Sizing:</div>
                    <div className="text-sm font-bold text-white mt-0.5">Minimum 18px (1.125rem)</div>
                    <p className="text-[11px] text-stone-400 mt-1">Prevents user squinting and visual fatigue at standard 100% zoom.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#14121E] border border-stone-800">
                    <div className="text-xs font-mono text-emerald-300">WCAG 7:1 Contrast:</div>
                    <div className="text-sm font-bold text-white mt-0.5">Dark Charcoal (#111111)</div>
                    <p className="text-[11px] text-stone-400 mt-1">Deepened core text colors over light surfaces to guarantee pristine readability.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#14121E] border border-stone-800">
                    <div className="text-xs font-mono text-amber-300">Card Boundaries:</div>
                    <div className="text-sm font-bold text-white mt-0.5">Solid Sand (#D0C8BC)</div>
                    <p className="text-[11px] text-stone-400 mt-1">Hardened structural borders so card limits remain instantly distinct.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: HOLOGRAPHIC GLASSMORPHISM */}
          {activeTab === 'glassmorphism' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-6 rounded-3xl holo-panel-dark relative overflow-hidden space-y-4">
                <div className="absolute inset-0 holo-grid opacity-30 pointer-events-none" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-950/60 border border-indigo-700/60 flex items-center justify-center text-indigo-300">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-display text-xl font-bold text-white">
                        Holographic Glassmorphism Interface System
                      </h4>
                      <p className="text-xs text-stone-300">
                        Visualizing advanced spatial hologram screens on device passthroughs (e.g. Samsung Galaxy tablet & HoloViewport).
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    {/* Frosted Panels */}
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-2">
                      <div className="text-xs font-mono text-cyan-300 font-bold">1. Frosted Panels (.holo-panel)</div>
                      <p className="text-xs text-stone-200 leading-relaxed font-sans">
                        Translucent semi-opaque white background (<code className="text-[10px] bg-black/40 px-1 py-0.5 rounded">rgba(255, 255, 255, 0.45)</code>) and delicate blur filter (<code className="text-[10px] bg-black/40 px-1 py-0.5 rounded">blur(16px)</code>), replicating physical glass on a timber desk.
                      </p>
                    </div>

                    {/* Ambient Breathing Glows */}
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-2">
                      <div className="text-xs font-mono text-purple-300 font-bold">2. Ambient Breathing Glows</div>
                      <p className="text-xs text-stone-200 leading-relaxed font-sans">
                        Rejects harsh neon drop-shadows. Slow, organic keyframe animations (<code className="text-[10px] bg-black/40 px-1 py-0.5 rounded">holo-breath</code>) generating undulating low-opacity lavender & indigo radiance.
                      </p>
                    </div>

                    {/* Radial Scanline Grid */}
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-2">
                      <div className="text-xs font-mono text-emerald-300 font-bold">3. Radial Scanline Grid (.holo-grid)</div>
                      <p className="text-xs text-stone-200 leading-relaxed font-sans">
                        Fine-mesh coordinate grid masked radially so it naturally softens and disappears toward the viewport edges, capturing the Holly holographic environment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: LOGO SYMBOLISM */}
          {activeTab === 'logos' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Canonical Official Brand Mark */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1F192E] via-[#14121E] to-[#0D0B14] border border-[#4F416C] shadow-2xl space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-[#D0C8BC] shadow-lg">
                    <OfficialLavenderHillLogo className="w-full max-w-[280px] h-auto" />
                  </div>
                  
                  <div className="w-full md:w-1/2 space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7B5C9E]/30 border border-[#7B5C9E]/60 text-[10px] font-mono text-purple-200 uppercase tracking-widest font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                      <span>Primary Canonical Brand Mark</span>
                    </div>
                    <h4 className="font-display font-bold text-2xl text-white">
                      Official Lavender Hill Studio Insignia
                    </h4>
                    <p className="text-xs text-stone-300 leading-relaxed font-sans">
                      The official studio mark unites three blooming purple lavender sprigs rising gracefully from a glowing golden hill mound, finished with the signature handcrafted cursive calligraphy. 
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                      <div className="p-2.5 rounded-xl bg-[#0B0912] border border-[#2B283A]">
                        <span className="text-[#D4A373] block font-bold">Golden Hill Base:</span>
                        <span className="text-stone-400">#E2B768 • #C99846 • #9E6D24</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#0B0912] border border-[#2B283A]">
                        <span className="text-purple-300 block font-bold">Lavender Florets:</span>
                        <span className="text-stone-400">#B39DDB • #7E57C2 • #512DA8</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#0B0912] border border-[#2B283A]">
                        <span className="text-emerald-400 block font-bold">Botanical Stems:</span>
                        <span className="text-stone-400">#4D6E44 • #628956 (Natural Sage)</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#0B0912] border border-[#2B283A]">
                        <span className="text-purple-200 block font-bold">Typography:</span>
                        <span className="text-stone-400">Great Vibes / Alex Brush</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary & Contextual Logos */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Official Icon */}
                <div className="p-5 rounded-3xl bg-[#14121E] border border-[#2B283A] space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-lg flex items-center justify-center mx-auto border border-[#D0C8BC]">
                      <OfficialLavenderHillIcon size={48} />
                    </div>
                    <div className="text-center">
                      <h4 className="font-display font-bold text-base text-white">
                        Official Emblem Icon
                      </h4>
                      <span className="text-[10px] font-mono text-purple-300">App Launcher & Avatar Mark</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed font-sans text-center">
                      Compact, square-proportioned botanical mark for browser favicons, tablet homescreen icons, and companion avatars.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0B0912] border border-[#2B283A] text-center text-[10px] font-mono text-stone-400">
                    Primary mark for compact UI targets.
                  </div>
                </div>

                {/* Concept 1: Biomorphic Stem */}
                <div className="p-5 rounded-3xl bg-[#14121E] border border-[#2B283A] space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-lg flex items-center justify-center mx-auto border border-[#D0C8BC]">
                      <BiomorphicDataStemLogo size={46} />
                    </div>
                    <div className="text-center">
                      <h4 className="font-display font-bold text-base text-white">
                        Biomorphic Data Stem
                      </h4>
                      <span className="text-[10px] font-mono text-purple-400">Engineering & Biology Synthesis</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed font-sans text-center">
                      Stylized lavender stem transitioning into geometric data nodes, symbolizing natural warmth synthesizing with precision.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0B0912] border border-[#2B283A] text-center text-[10px] font-mono text-stone-400">
                    Used on technical blueprints & ledgers.
                  </div>
                </div>

                {/* Concept 2: Coastal Scallop Seal */}
                <div className="p-5 rounded-3xl bg-[#14121E] border border-[#2B283A] space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-lg flex items-center justify-center mx-auto border border-[#D0C8BC]">
                      <CoastalScallopSealLogo size={48} />
                    </div>
                    <div className="text-center">
                      <h4 className="font-display font-bold text-base text-teal-200">
                        Coastal Scallop Seal
                      </h4>
                      <span className="text-[10px] font-mono text-teal-400">Artisanal Restorative Mark</span>
                    </div>
                    <p className="text-xs text-stone-300 leading-relaxed font-sans text-center">
                      Circular scalloped wax seal portraying a serene coastal dune landscape, water, and warm rising sun in deep ocean teal.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0B0912] border border-[#2B283A] text-center text-[10px] font-mono text-stone-400">
                    Used on client handovers & certificates.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: COPYWRITING & COMMUNICATION RULES */}
          {activeTab === 'copywriting' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="p-5 rounded-3xl bg-[#14121E] border border-[#2B283A] space-y-2">
                <div className="flex items-center gap-2 text-purple-300 font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Rule 1: Strict Jargon-Free "Everyday Language"</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  We completely reject intimidating corporate tech terms and cybersecurity acronyms. When explaining our systems, we translate technical terms directly into human benefits:
                </p>
                <div className="p-3 rounded-2xl bg-[#0B0912] border border-purple-900/40 text-xs mt-2 space-y-1">
                  <div className="text-red-300/80 line-through">"Deploying localized WebAssembly sandboxes with regional SQLite database enclaves."</div>
                  <div className="text-emerald-300 font-medium font-serif italic">"We build quiet, independent software that runs completely offline and stays right under your own roof."</div>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-[#14121E] border border-[#2B283A] space-y-2">
                <div className="flex items-center gap-2 text-teal-300 font-semibold text-sm">
                  <Layers className="w-4 h-4 text-teal-400" />
                  <span>Rule 2: The Software vs. Companion Boundary</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  We never commit the anthropomorphic error of referring to a software program as a "digital colleague" or "team".
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="p-3 rounded-xl bg-[#0B0912] border border-stone-800">
                    <span className="font-mono text-cyan-300 block font-bold">The Workspaces (Sovereign Software):</span>
                    <span className="text-stone-300 mt-1 block">FAB, Angel.AI, and Holly are <em>standalone local utilities</em> and <em>digital desks</em> (static containers).</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0B0912] border border-stone-800">
                    <span className="font-mono text-purple-300 block font-bold">The Companions (Active Personas):</span>
                    <span className="text-stone-300 mt-1 block">Elysian, Phoebe, Holly, Ari, and Kenny are the <em>empathetic, interactive 3D personas</em> invited inside those workspaces.</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-3xl bg-[#14121E] border border-[#2B283A] space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm">
                  <Heart className="w-4 h-4 text-amber-400" />
                  <span>Rule 3: Epistemic Honesty (AIEE Compliance & The Stephensen Test)</span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  Under our strict <strong>Stephensen Test</strong> and AIEE principles, our personas practice "Synthetic Empathy". They are programmatically prohibited from claiming to possess human souls, biological emotions, or replacing real human relationships. They must always be transparent and honest about their nature as synthetic support systems.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#12101B] border-t border-[#2B283A] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-400 font-mono text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
            <span>Lavender Hill Studio • Griffin, Queensland, Australia</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#234F56] hover:bg-[#2C626A] text-[#F5F2EB] font-semibold transition-all border border-[#4A7C84] shadow-md flex items-center justify-center gap-1.5"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close Guide & Return to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
