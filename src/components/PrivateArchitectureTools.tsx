import React, { useState } from 'react';
import { 
  Boxes, 
  FolderHeart, 
  HeartHandshake, 
  Wrench, 
  ShieldCheck, 
  Database, 
  Lock, 
  Sparkles, 
  ArrowRight, 
  Tablet, 
  Laptop, 
  CheckCircle2, 
  FileText, 
  Layers, 
  ExternalLink,
  Info,
  Terminal,
  Activity,
  HardDrive
} from 'lucide-react';
import { Tooltip } from './Tooltip';

interface PrivateArchitectureToolsProps {
  onOpenLedger?: () => void;
  onOpenCharter?: () => void;
  onOpenTrainingFiles?: () => void;
  onOpenConsultation?: () => void;
}

export const PrivateArchitectureTools: React.FC<PrivateArchitectureToolsProps> = ({
  onOpenLedger,
  onOpenCharter,
  onOpenTrainingFiles,
  onOpenConsultation
}) => {
  const [selectedAppId, setSelectedAppId] = useState<'gia' | 'angel' | 'fab'>('gia');

  const SOVEREIGN_APPS = [
    {
      id: 'gia' as const,
      name: 'Gia',
      tagline: 'Family Memory Vault & Digital Scrapbook',
      badge: '100% Offline Vault',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
      icon: FolderHeart,
      themeColor: '#B45309',
      bgGradient: 'from-amber-50/80 to-stone-50',
      hardwareTarget: 'Windows 11 & Samsung Galaxy Tab S10',
      description: 'Private family digital memory gardening, audio voice recording vaults, offline photo journals, and generational family legacy curation.',
      keyCapabilities: [
        'Voice memoir capture with local waveform transcription (zero cloud latency)',
        'Encrypted generational photo journals with offline facial tag clustering',
        'Local SQLite timeline indexed chronologically by family milestone',
        'Zero cloud synchronization requirements — 100% air-gapped data dignity'
      ],
      technicalSpec: 'AES-256 local encrypted SQLite database • Local Whisper model • Multi-generational export (PDF / Vault Archive)'
    },
    {
      id: 'angel' as const,
      name: 'Angel.AI',
      tagline: 'Empathetic Wellness & Care Coordination Assistant',
      badge: 'Clinical & Daily Calm',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
      icon: HeartHandshake,
      themeColor: '#234F56',
      bgGradient: 'from-teal-50/80 to-stone-50',
      hardwareTarget: 'Samsung Galaxy Tablet Stand & Windows 11',
      description: 'Gentle care coordination, personal wellness tracking, and calm daily routines engineered with trauma-informed cognitive ergonomics.',
      keyCapabilities: [
        'Cognitive fatigue and stress mitigation pacing with gentle audio chimes',
        'Offline routine reminders with zero third-party telemetry or notification spam',
        'Encrypted health notes vault adhering strictly to AIEE non-diagnostic boundaries',
        'Dual-path deployment: available as local sovereign tablet app or private VPC'
      ],
      technicalSpec: 'Zero PHI retention protocol • BAA-isolated training guards • Local ambient voice synthesizer'
    },
    {
      id: 'fab' as const,
      name: 'FAB',
      tagline: 'Bespoke Sovereign Application Builder',
      badge: 'Schema-Driven Framework',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
      icon: Wrench,
      themeColor: '#7B5C9E',
      bgGradient: 'from-purple-50/80 to-stone-50',
      hardwareTarget: 'Windows 11 Workstations & Samsung Galaxy Tablets',
      description: 'Modular, schema-driven application generator allowing professionals, clinics, and families to design tailored tools on sovereign hardware.',
      keyCapabilities: [
        'Deterministic schema generation with guaranteed JSON contract validation',
        'Custom local dashboard synthesizer for bespoke research and business workflows',
        'Direct connection to localized SQLite datastores and vector indexes',
        'One-time handover with complete source code ownership and zero vendor lock-in'
      ],
      technicalSpec: 'TypeScript / React / Node CJS bundles • Local SQL migrations • Modular micro-frontends'
    }
  ];

  const currentApp = SOVEREIGN_APPS.find(a => a.id === selectedAppId) || SOVEREIGN_APPS[0];

  return (
    <div id="panel-tools" role="tabpanel" aria-labelledby="tab-tools" className="space-y-8 animate-in fade-in duration-300">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E0D8] shadow-sm">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#EAF0F1] border border-[#CADBCB] text-[#234F56] text-xs font-mono font-bold uppercase tracking-wider">
            <Boxes className="w-3.5 h-3.5 text-[#234F56]" />
            <span>Standalone Workspaces & Frameworks</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            3 Sovereign Applications
          </h3>
          <p className="text-[#5A5568] text-sm sm:text-base leading-relaxed">
            Beyond our 6 collaborative cognitive personas, Lavender Hill Studio crafts complete standalone application environments tailored for family archives, daily wellness, and custom workspace generation.
          </p>
        </div>

        {/* Action Triggers */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0">
          {onOpenLedger && (
            <button
              onClick={onOpenLedger}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 border border-[#E5E0D8] text-[#234F56] text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5"
            >
              <Database className="w-3.5 h-3.5 text-[#234F56]" />
              <span>Dolphin SQLite Ledger</span>
            </button>
          )}
          {onOpenCharter && (
            <button
              onClick={onOpenCharter}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 border border-[#E5E0D8] text-[#7B5C9E] text-xs font-semibold shadow-2xs transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#7B5C9E]" />
              <span>AIEE Charter</span>
            </button>
          )}
        </div>
      </div>

      {/* 3 App Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SOVEREIGN_APPS.map((app) => {
          const Icon = app.icon;
          const isSelected = selectedAppId === app.id;
          return (
            <div
              key={app.id}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onClick={() => setSelectedAppId(app.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedAppId(app.id);
                }
              }}
              className={`cursor-pointer text-left p-6 rounded-3xl transition-all duration-300 border flex flex-col justify-between group relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#234F56] ${
                isSelected
                  ? 'bg-white border-[#234F56] shadow-md ring-2 ring-[#234F56]/15 -translate-y-1'
                  : 'bg-white/80 border-[#E5E0D8] hover:border-[#CADBCB] hover:bg-white hover:shadow-xs'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-[#234F56] text-[#F5F2EB]' : 'bg-[#FAFAF8] text-[#5A5568] border border-[#ECE7DE] group-hover:text-[#234F56]'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${app.badgeColor}`}>
                      {app.badge}
                    </span>
                    <Tooltip
                      title={app.name}
                      badge={app.badge}
                      position="top-right"
                      content={app.description}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-serif font-bold text-slate-900 group-hover:text-[#234F56] transition-colors">
                    {app.name}
                  </h4>
                  <p className="text-xs text-[#5A5568] font-medium line-clamp-2 mt-0.5">
                    {app.tagline}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#ECE7DE] flex items-center justify-between text-xs font-mono">
                <span className="text-[#8C5D2A] font-semibold">{app.id.toUpperCase()} • V4.2</span>
                <span className={`inline-flex items-center gap-1 font-semibold ${isSelected ? 'text-[#234F56]' : 'text-[#7B5C9E]'}`}>
                  {isSelected ? 'Active Details' : 'View Spec'} <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active App Detailed Specification Sheet */}
      <div className="rounded-3xl bg-white border border-[#E5E0D8] shadow-sm p-6 sm:p-8 lg:p-10 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#ECE7DE]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#F5F2EB] border border-[#E5E0D8] flex items-center justify-center text-[#234F56] shrink-0">
              <currentApp.icon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  {currentApp.name}
                </h4>
                <span className={`text-xs font-mono px-3 py-0.5 rounded-full border ${currentApp.badgeColor}`}>
                  {currentApp.badge}
                </span>
              </div>
              <p className="text-sm sm:text-base text-[#5A5568] font-medium">
                {currentApp.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onOpenConsultation && (
              <button
                onClick={onOpenConsultation}
                className="px-5 py-2.5 rounded-2xl bg-[#234F56] hover:bg-[#2C626A] text-[#F5F2EB] text-xs font-serif font-bold border border-[#4A7C84] shadow-xs hover:shadow-sm transition-all flex items-center gap-2"
              >
                <span>Request {currentApp.name} Deployment</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4A373]" />
              </button>
            )}
          </div>
        </div>

        {/* Overview & Key Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#7B5C9E]">
              Application Overview & Purpose
            </h5>
            <p className="text-base text-[#181524] leading-relaxed">
              {currentApp.description}
            </p>

            <div className="p-4 rounded-2xl bg-[#FAFAF8] border border-[#ECE7DE] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#3B4A3F]">
                <HardDrive className="w-4 h-4 text-[#3B4A3F]" />
                <span>Target Hardware & Environment</span>
              </div>
              <p className="text-xs text-[#5A5568]">
                {currentApp.hardwareTarget}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#234F56]">
              Architectural Invariants & Capabilities
            </h5>
            <ul className="space-y-3 text-sm text-[#181524]">
              {currentApp.keyCapabilities.map((cap, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#234F56] shrink-0 mt-0.5" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technical Guarantee Footnote */}
        <div className="p-4 rounded-2xl bg-[#F5F2EB] border border-[#E0D8CB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#5A5568]">
            <Lock className="w-4 h-4 text-[#7B5C9E] shrink-0" />
            <span className="font-mono font-medium">
              Technical Stack: {currentApp.technicalSpec}
            </span>
          </div>
          <span className="font-mono text-[#8C5D2A] font-bold">
            Zero Recurring Fees • Bespoke Handover
          </span>
        </div>
      </div>
    </div>
  );
};
