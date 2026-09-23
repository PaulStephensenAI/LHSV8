import React, { useState, useEffect } from 'react';
import { 
  Database, 
  ShieldCheck, 
  Clock, 
  Lock, 
  Tablet, 
  Cloud, 
  RefreshCw, 
  CheckCircle2, 
  X,
  Copy,
  Check
} from 'lucide-react';
import { ChronusLedgerEntry } from '../types';

interface DolphinSecurityLedgerProps {
  isOpen: boolean;
  onClose: () => void;
  isOfflineMode: boolean;
  onToggleOffline: () => void;
}

export const DolphinSecurityLedger: React.FC<DolphinSecurityLedgerProps> = ({
  isOpen,
  onClose,
  isOfflineMode,
  onToggleOffline
}) => {
  const [entries, setEntries] = useState<ChronusLedgerEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      fetchLedger();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const fetchLedger = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/chronus-ledger');
      const data = await res.json();
      if (data.ledger) {
        setEntries(data.ledger);
      }
    } catch (e) {
      console.error('Failed to fetch ledger:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 1500);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[85vh] rounded-3xl bg-stone-950 border border-stone-800 p-6 overflow-y-auto shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-300">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-stone-100 font-display">
                  Dolphin Security & Chronus Temporal Ledger
                </h3>
                <p className="text-xs text-stone-400">
                  Shared Memory Architecture • SQLite Localized WASM Engine
                </p>
              </div>
            </div>

            <button
              id="close-dolphin-ledger-btn"
              onClick={onClose}
              aria-label="Close Dolphin Security Ledger"
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

          {/* Interoperability & Hardware Migration Banner */}
          <div className="mt-4 p-4 rounded-2xl bg-stone-900/70 border border-stone-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                <Lock className="w-4 h-4" />
                <span>Shared Memory Architecture</span>
              </div>
              <p className="text-stone-300 leading-relaxed text-[11px]">
                Every persona in the ToniAI™ suite shares unified context and consent boundaries via our localized SQLite database. Switching between cloud and offline tablet preserves your conversation history and trust parameters without leaking data to public training servers.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-stone-400 font-mono text-[10px]">ENVIRONMENT MIGRATION:</span>
                <span className="font-mono text-cyan-300 font-bold text-[11px]">
                  {isOfflineMode ? '100% OFFLINE (SAMSUNG GALAXY TAB S10)' : 'SECURE CLOUD (VERCEL ATTRIBUTED)'}
                </span>
              </div>
              <button
                onClick={onToggleOffline}
                className="w-full py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isOfflineMode ? <Cloud className="w-3.5 h-3.5 text-cyan-400" /> : <Tablet className="w-3.5 h-3.5 text-amber-400" />}
                <span>{isOfflineMode ? 'Switch to Secure Cloud Mode' : 'Switch to 100% Offline Tab S10 Mode'}</span>
              </button>
            </div>
          </div>

          {/* Chronus Ledger Table */}
          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider font-mono flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                Immutable Chronus Versioning Stream
              </h4>
              <button
                onClick={fetchLedger}
                className="text-xs text-stone-400 hover:text-stone-200 flex items-center gap-1 font-mono"
              >
                <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Refresh Logs</span>
              </button>
            </div>

            <div className="rounded-xl border border-stone-800 overflow-hidden bg-stone-950">
              <div className="max-h-60 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-900/90 text-stone-400 font-mono text-[10px] uppercase border-b border-stone-800 sticky top-0">
                    <tr>
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">Companion</th>
                      <th className="p-3">Action Recorded</th>
                      <th className="p-3">Chronus Hash</th>
                      <th className="p-3">Sync Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-900 font-sans text-stone-300">
                    {entries.map((entry) => (
                      <tr key={entry.id} className="hover:bg-stone-900/40 transition-colors">
                        <td className="p-3 text-[11px] text-stone-400 whitespace-nowrap font-mono">
                          {new Date(entry.timestamp).toLocaleTimeString()}
                        </td>
                        <td className="p-3 font-medium uppercase font-mono text-purple-300 text-[11px]">
                          {entry.personaId}
                        </td>
                        <td className="p-3 text-xs text-stone-200 max-w-xs truncate">
                          {entry.action}
                        </td>
                        <td className="p-3 font-mono text-cyan-300 text-[11px]">
                          <button
                            onClick={() => handleCopy(entry.hash)}
                            className="hover:text-cyan-200 flex items-center gap-1"
                            title="Click to copy hash"
                          >
                            <span>{entry.hash}</span>
                            {copiedHash === entry.hash ? (
                              <Check className="w-2.5 h-2.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-2.5 h-2.5 text-stone-500" />
                            )}
                          </button>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                            <CheckCircle2 className="w-2.5 h-2.5" /> Sealed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#234F56] hover:bg-[#2C626A] text-[#F5F2EB] border border-[#4A7C84] text-xs font-semibold transition-all shadow-md flex items-center gap-1.5"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close Console & Return to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
