import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  X, 
  Search, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Cpu, 
  Sparkles,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { STUDIO_TRAINING_FILES, StudioTrainingFile } from '../data/trainingFilesData';

interface TrainingContextModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrainingContextModal: React.FC<TrainingContextModalProps> = ({ isOpen, onClose }) => {
  const [selectedFileId, setSelectedFileId] = useState<string>(STUDIO_TRAINING_FILES[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

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

  const filteredFiles = STUDIO_TRAINING_FILES.filter(file => 
    file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeFile = STUDIO_TRAINING_FILES.find(f => f.id === selectedFileId) || STUDIO_TRAINING_FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="w-full max-w-6xl h-[90vh] max-h-[850px] bg-white rounded-[28px] shadow-2xl flex flex-col overflow-hidden border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#7A578E] text-white flex items-center justify-between border-b border-[#684A87]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-serif text-lg font-bold">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-xl leading-none">Studio Embodied Notebook Repository</h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-mono bg-white/20 border border-white/30 text-white">
                  Baseline Corpus • 7 Context Files
                </span>
              </div>
              <p className="text-xs text-white/85 mt-0.5">
                Baseline Embodied Notebook files loaded at runtime to shape persona cadence, data dignity, and domain expertise.
              </p>
            </div>
          </div>

          <button
            id="close-training-modal-btn"
            onClick={onClose}
            aria-label="Close training repository card"
            className="px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 border border-white/30 text-white text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer group"
            title="Close card & return to Home Workspace (Esc)"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
            <span>Close</span>
            <kbd className="hidden md:inline-block ml-0.5 px-1.5 py-0.2 text-[10px] font-mono bg-black/20 text-white/90 rounded border border-white/20">
              Esc
            </kbd>
          </button>
        </div>

        {/* Search & Stats Ribbon */}
        <div className="bg-[#FAF9FC] border-b border-stone-200 px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-600 w-full sm:w-auto">
            <Search className="w-4 h-4 text-purple-700" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search training files, personas, or directives..."
              className="bg-white border border-stone-200 rounded-lg px-3 py-1 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-purple-600 w-full sm:w-64"
            />
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-stone-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Zero Telemetry Rule Active
            </span>
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-purple-600" /> Injected into Gemini 2.5/2.0
            </span>
          </div>
        </div>

        {/* Body: Left List + Right Viewer */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-stone-50">
          {/* File Selector Sidebar */}
          <div className="w-full md:w-80 bg-white border-r border-stone-200 flex flex-col overflow-y-auto divide-y divide-stone-100">
            {filteredFiles.map((file) => {
              const isSelected = file.id === activeFile.id;
              return (
                <button
                  key={file.id}
                  onClick={() => setSelectedFileId(file.id)}
                  className={`p-4 text-left transition-all flex flex-col gap-1.5 ${
                    isSelected
                      ? 'bg-purple-50/80 border-l-4 border-[#7A578E]'
                      : 'hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-700 font-bold">
                      File {file.id} • {file.category}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
                      file.priority === 'HIGH' 
                        ? 'bg-amber-100 text-amber-800' 
                        : file.priority === 'MEDIUM' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-stone-100 text-stone-700'
                    }`}>
                      {file.priority}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-stone-900 line-clamp-1">
                    {file.title}
                  </h4>

                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {file.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Document Viewer */}
          <div className="flex-1 bg-white p-6 overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
              <div>
                <span className="text-xs font-mono text-purple-700 uppercase tracking-widest font-semibold">
                  {activeFile.filename}
                </span>
                <h2 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                  {activeFile.title}
                </h2>
              </div>

              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-xs text-stone-700 flex items-center gap-1.5 transition-all shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Content'}</span>
              </button>
            </div>

            <div className="flex-1 bg-[#FAF9FC] border border-stone-200 rounded-xl p-5 overflow-y-auto font-mono text-xs text-stone-800 leading-relaxed whitespace-pre-wrap selection:bg-purple-200">
              {activeFile.content}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white border-t border-stone-200 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
          <span>Target Architecture: Dual-Path (Vercel Serverless Edge + Windows 11 / Samsung Galaxy Tablets)</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#234F56] hover:bg-[#2C626A] text-[#F5F2EB] border border-[#4A7C84] text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5"
          >
            <X className="w-3.5 h-3.5" />
            <span>Close & Return to Home</span>
          </button>
        </div>

      </div>
    </div>
  );
};
