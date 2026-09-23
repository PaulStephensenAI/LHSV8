import React, { useState, useEffect } from 'react';
import { X, Calendar, CheckCircle2, Tablet, Cloud, Lock, Send } from 'lucide-react';
import { CompanionId } from '../types';
import { PERSONAS } from '../data/personasData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCompanionId: CompanionId;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  activeCompanionId
}) => {
  const [selectedPersona, setSelectedPersona] = useState<CompanionId>(activeCompanionId);
  const [deploymentPreference, setDeploymentPreference] = useState<'cloud' | 'offline-tablet' | 'hybrid'>('offline-tablet');
  const [consultationTopic, setConsultationTopic] = useState<'neurodiversity' | 'privacy-audit' | 'spatial-setup' | 'ndis-autonomy'>('neurodiversity');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-[#12111A] border border-[#2B283A] rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-[#2B283A] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1E3E42] border border-emerald-500/40 flex items-center justify-center text-emerald-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
                Lavender Hill Studio
              </div>
              <h3 className="text-xl font-bold text-[#F3F3F7] font-display">
                Request Private Consultation
              </h3>
            </div>
          </div>
          <button
            id="close-consultation-modal-btn"
            onClick={onClose}
            aria-label="Close consultation card"
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

        {isSubmitted ? (
          <div className="py-10 text-center space-y-3 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#F3F3F7]">
              Consultation Request Stamped
            </h4>
            <p className="text-xs text-[#9E9AA8] max-w-sm mx-auto">
              Your consultation preferences have been registered in our local offline ledger. Our lead architects will prepare your custom sovereign setup.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Companion Focus */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-[#9E9AA8] block">
                Primary Companion Archetype:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {PERSONAS.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPersona(p.id)}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      selectedPersona === p.id
                        ? 'bg-purple-950/70 border-purple-500 text-white shadow-sm'
                        : 'bg-[#0A090F] border-[#2B283A] text-[#9E9AA8] hover:border-stone-700'
                    }`}
                  >
                    <div className="font-bold text-xs">{p.name}</div>
                    <div className="text-[10px] text-[#9E9AA8] line-clamp-1">{p.codename}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Deployment Target */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-[#9E9AA8] block">
                Target Architecture & Hardware:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDeploymentPreference('offline-tablet')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    deploymentPreference === 'offline-tablet'
                      ? 'bg-emerald-950/70 border-emerald-500 text-white'
                      : 'bg-[#0A090F] border-[#2B283A] text-[#9E9AA8]'
                  }`}
                >
                  <Tablet className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                  <span className="font-semibold block">Offline Tablet</span>
                  <span className="text-[10px] text-stone-400">Samsung Tab S10</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeploymentPreference('cloud')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    deploymentPreference === 'cloud'
                      ? 'bg-cyan-950/70 border-cyan-500 text-white'
                      : 'bg-[#0A090F] border-[#2B283A] text-[#9E9AA8]'
                  }`}
                >
                  <Cloud className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                  <span className="font-semibold block">Cloud Node</span>
                  <span className="text-[10px] text-stone-400">Vercel / Deno Edge</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeploymentPreference('hybrid')}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    deploymentPreference === 'hybrid'
                      ? 'bg-purple-950/70 border-purple-500 text-white'
                      : 'bg-[#0A090F] border-[#2B283A] text-[#9E9AA8]'
                  }`}
                >
                  <Lock className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                  <span className="font-semibold block">Hybrid Sovereign</span>
                  <span className="text-[10px] text-stone-400">Encrypted Bridge</span>
                </button>
              </div>
            </div>

            {/* Topic & Notes */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-[#9E9AA8] block">
                Workspace Objective / Requirements:
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe your workspace goals, cognitive pacing needs, or offline tablet deployment setup..."
                rows={3}
                className="w-full bg-[#0A090F] border border-[#2B283A] rounded-xl p-3 text-xs text-[#E0E0E0] placeholder-stone-600 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-semibold transition-all border border-stone-800 flex items-center justify-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel & Return to Home</span>
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-[#1E3E42] hover:bg-[#162F32] text-white text-xs font-semibold transition-all shadow-lg flex items-center justify-center gap-2 border border-emerald-500/40"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm & Send Request</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
