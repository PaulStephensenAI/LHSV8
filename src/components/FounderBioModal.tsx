import React, { useEffect } from 'react';
import { 
  X, 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  Heart, 
  ArrowRight,
  Quote,
  Scale,
  Cpu,
  Lock,
  Boxes,
  Database,
  Camera,
  Upload
} from 'lucide-react';
import { PaulStephensenPhoto } from './PaulStephensenPhoto';

interface FounderBioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChat: () => void;
}

export const FounderBioModal: React.FC<FounderBioModalProps> = ({
  isOpen,
  onClose,
  onOpenChat
}) => {
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

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-[#12111A] border border-[#2B283A] rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-950/30 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#2B283A] pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-950/80 border border-purple-800/60 flex items-center justify-center text-purple-300">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">
                Lavender Hill Studio
              </div>
              <h3 className="text-xl font-bold text-[#F3F3F7] font-display">
                Founder Portfolio & Principal Researcher
              </h3>
            </div>
          </div>
          <button
            id="close-founder-bio-btn"
            onClick={onClose}
            aria-label="Close founder bio card"
            className="px-3 py-1.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer group"
            title="Close card & return to Home Workspace (Esc)"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
            <span className="hidden sm:inline">Close</span>
            <kbd className="hidden md:inline-block ml-0.5 px-1.5 py-0.2 text-[10px] font-mono bg-stone-950 text-stone-400 rounded border border-stone-800">
              Esc
            </kbd>
          </button>
        </div>

        {/* Scrollable Bio Content */}
        <div className="space-y-5 text-xs sm:text-sm text-[#9E9AA8] leading-relaxed overflow-y-auto pr-1">
          {/* Founder Identity Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#171424] border border-purple-800/40 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Founder Portrait Photo (Locked) */}
              <div className="flex flex-col items-center gap-1.5 shrink-0">
                <PaulStephensenPhoto size="md" shape="rounded" allowUpload={false} showBadge={false} />
              </div>
              
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-700/50 text-purple-300 text-[10px] font-mono uppercase tracking-wider font-semibold">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>Founder & Principal Researcher</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                  Paul Stephensen
                </h4>
                <p className="text-xs sm:text-sm text-purple-200/90 font-medium">
                  AI Ethicist and Architect of Sovereign Digital Workspaces
                </p>
                <p className="text-[11px] font-mono text-stone-400 pt-0.5">
                  Paul Stephensen • AI Ethicist & Systems Researcher
                </p>
              </div>
            </div>
          </div>

          {/* Quote Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#0E0C16] border border-amber-500/30 text-xs relative overflow-hidden">
            <div className="flex items-start gap-3">
              <Quote className="w-6 h-6 text-[#D4A373] shrink-0 mt-0.5 opacity-80" />
              <div className="space-y-2">
                <div className="text-[10px] font-mono text-[#D4A373] uppercase tracking-wider font-semibold">
                  Lavender Hill Studio Ethos
                </div>
                <blockquote className="font-serif italic text-white text-sm sm:text-base leading-snug">
                  "Software should be a calm, sovereign extension of human cognition—never a landlord extracting rent for access to your own thoughts and memories."
                </blockquote>
                <div className="text-right text-xs font-semibold text-amber-200/90 font-mono">
                  — Paul Stephensen
                </div>
              </div>
            </div>
          </div>

          {/* Research & Engineering Pillars */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold px-1">
              <Boxes className="w-3.5 h-3.5 text-purple-400" />
              <span>Research & Engineering Pillars</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {/* Pillar 1 */}
              <div className="p-3.5 rounded-2xl bg-[#0A090F] border border-[#2B283A] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-950/80 border border-purple-800/60 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                  <Scale className="w-4 h-4 text-purple-400" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-white">
                    AI Ethics & Governance
                  </div>
                  <p className="text-[11px] text-[#9E9AA8] leading-relaxed">
                    Formalizing human-centered ethical constraints into autonomous agentic workflows.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="p-3.5 rounded-2xl bg-[#0A090F] border border-[#2B283A] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-white">
                    Schema-Driven Architectures
                  </div>
                  <p className="text-[11px] text-[#9E9AA8] leading-relaxed">
                    Building modular, deterministic AI models that guarantee predictable execution.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="p-3.5 rounded-2xl bg-[#0A090F] border border-[#2B283A] flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5">
                  <Database className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-white">
                    Data Dignity
                  </div>
                  <p className="text-[11px] text-[#9E9AA8] leading-relaxed">
                    Championing user-owned memory vaults with zero third-party telemetry or surveillance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Genesis & Foundation */}
          <div className="p-3.5 rounded-2xl bg-[#0A090F]/70 border border-[#2B283A]/80 space-y-2 text-xs">
            <p>
              <strong className="text-purple-300 font-semibold font-display">Lavender Hill Studio</strong> derives its name from <strong className="text-white font-semibold">Lavender Street in Griffin (Queensland, Australia)</strong>, where Paul and his wife, Carmel, established their "forever home"—anchoring our craft in permanence, sanctuary, and resilient calm.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-[#2B283A] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-[11px] font-mono text-stone-400">
            Founded on Lavender St, Griffin, QLD, Australia
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-semibold transition-all border border-stone-800 flex items-center justify-center gap-1.5"
            >
              <X className="w-3.5 h-3.5" />
              <span>Close & Return to Home</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenChat();
              }}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#234F56] hover:bg-[#2C626A] text-[#F5F2EB] text-xs font-semibold transition-all border border-[#4A7C84] shadow-md flex items-center justify-center gap-2"
            >
              <span>Chat with Toni Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
