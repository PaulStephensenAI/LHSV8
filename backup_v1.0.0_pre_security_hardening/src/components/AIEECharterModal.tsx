import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  HeartHandshake, 
  Lock, 
  Award, 
  Sparkles, 
  X, 
  CheckCircle2,
  Database,
  BrainCircuit,
  EyeOff,
  Compass
} from 'lucide-react';
import { OfficialLavenderHillIcon } from './BrandLogos';

interface AIEECharterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIEECharterModal: React.FC<AIEECharterModalProps> = ({
  isOpen,
  onClose
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[85vh] rounded-3xl bg-[#12111A] border border-[#2B283A] p-6 sm:p-8 overflow-y-auto shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#2B283A]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white p-1 shadow-md border border-[#D0C8BC] flex items-center justify-center">
                <OfficialLavenderHillIcon size={34} />
              </div>
              <div>
                <h3 className="font-bold text-xl text-stone-100 font-display">
                  The AIEE Framework Charter
                </h3>
                <p className="text-xs text-stone-400 font-companion-speech">
                  Artificial Intelligence with Experience and Empathy • Lavender Hill Studio
                </p>
              </div>
            </div>

            <button
              id="close-aiee-charter-btn"
              onClick={onClose}
              aria-label="Close AIEE Charter card"
              className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer group border border-stone-800"
              title="Close card & return to Home Workspace (Esc)"
            >
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
              <span className="hidden sm:inline">Close</span>
              <kbd className="hidden md:inline-block ml-0.5 px-1.5 py-0.2 text-[10px] font-mono bg-stone-950 text-stone-400 rounded border border-stone-800">
                Esc
              </kbd>
            </button>
          </div>

          {/* Core Philosophy Paragraph */}
          <div className="mt-5 space-y-4 text-xs text-stone-300 leading-relaxed">
            <div className="p-4 rounded-2xl bg-[#181524] border border-purple-800/40 space-y-2">
              <span className="font-mono text-[#D4A373] uppercase tracking-widest text-[10px] block">
                Foundational Constitution & Ethos: Resilient Calm
              </span>
              <p className="text-stone-100 font-serif italic text-sm">
                "Where calm intelligence meets handcrafted design."
              </p>
              <p className="text-stone-300 font-sans text-xs">
                Rather than acting as generic, one-size-fits-all chatbots, our six digital companions are stable, role-specific assistants engineered to support human capability without creating dependency or compromising data dignity.
              </p>
            </div>

            {/* 4 Pillars of AIEE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-[#0A090F] border border-[#2B283A] space-y-1.5">
                <div className="flex items-center gap-2 text-purple-300 font-semibold text-xs">
                  <HeartHandshake className="w-4 h-4 text-purple-400" />
                  <span>1. Anti-Parasocial Boundaries</span>
                </div>
                <p className="text-[11px] text-stone-400">
                  Companions explicitly affirm their synthetic nature. They never simulate artificial romantic attachment or foster emotional codependency that isolates users from real-world human support.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0A090F] border border-[#2B283A] space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-300 font-semibold text-xs">
                  <Lock className="w-4 h-4 text-cyan-400" />
                  <span>2. Absolute Data Dignity</span>
                </div>
                <p className="text-[11px] text-stone-400">
                  Enforced via Dolphin Security and localized SQLite tables. We build quiet, independent software that runs completely offline and stays right under your own roof.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0A090F] border border-[#2B283A] space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs">
                  <BrainCircuit className="w-4 h-4 text-emerald-400" />
                  <span>3. Neurodivergent Ergonomics</span>
                </div>
                <p className="text-[11px] text-stone-400">
                  The Scannability Guardrail and Ari’s cadence monitors actively prevent sensory overload and cognitive fatigue by transforming responses into structured, digestible takeaways.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0A090F] border border-[#2B283A] space-y-1.5">
                <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>4. Sister Elizabeth Kenny Autonomy</span>
                </div>
                <p className="text-[11px] text-stone-400">
                  Grounded in the Experience-Based Awareness Theorem. The companion steps back in silence when you are thriving, preserving your sovereign momentum.
                </p>
              </div>
            </div>

            {/* Interoperability & Epistemic Honesty Guarantee */}
            <div className="p-4 rounded-2xl bg-[#0A090F] border border-[#2B283A] space-y-1.5 text-[11px]">
              <div className="flex items-center gap-2 text-[#D4A373] font-semibold">
                <Database className="w-3.5 h-3.5" />
                <span>Epistemic Honesty & Shared Memory Interoperability</span>
              </div>
              <p className="text-stone-400">
                When transferring from cloud servers to an offline Samsung Galaxy tablet, the 6 personas maintain continuous synchronized context and safety parameters. Companions clearly state their limitations and never simulate false certainty.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-[#2B283A] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#234F56] hover:bg-[#2C626A] text-[#F5F2EB] border border-[#4A7C84] text-xs font-semibold transition-all shadow-md flex items-center gap-2"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close Charter & Return to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
