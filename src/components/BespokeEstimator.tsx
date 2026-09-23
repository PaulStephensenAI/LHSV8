import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Cloud, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Tablet, 
  Laptop, 
  HardDrive, 
  Lock, 
  Clock, 
  Layers, 
  RotateCcw,
  CheckCircle
} from 'lucide-react';
import { CompanionId } from '../types';
import { Tooltip } from './Tooltip';

export type DeploymentEnv = 'cloud' | 'local';
export type HardwareOption = 'laptop' | 'tablet' | 'hybrid' | 'node';

export interface BespokeEstimatorProps {
  onOpenConsultation?: (configurationDetails?: any) => void;
  className?: string;
}

export const BespokeEstimator: React.FC<BespokeEstimatorProps> = ({
  onOpenConsultation,
  className = ''
}) => {
  // Step 1: Core Everyday Assistant Persona
  const [selectedPersona, setSelectedPersona] = useState<CompanionId>('toni');

  // Step 2: Deployment Environment
  const [deploymentEnv, setDeploymentEnv] = useState<DeploymentEnv>('local');
  const [localSubOptions, setLocalSubOptions] = useState<string[]>([
    'Windows 11 & Samsung Local Files',
    'Encrypted Windows 11 SQLite Vault'
  ]);

  // Step 3: Target Local Hardware
  const [hardwareOption, setHardwareOption] = useState<HardwareOption>('hybrid');

  // Step 4: Step Tracking & Completion
  const [currentStep, setCurrentStep] = useState<number>(1);

  // 6 Persona Data Matrix
  const PERSONA_OPTIONS = [
    {
      id: 'toni' as CompanionId,
      name: 'Toni',
      role: 'Strategic Research & Synthesis',
      description: 'Strategic collaboration, research mentorship, and core brand reasoning.',
      clarification: 'Designed as a senior peer reasoner for deep strategic formulation, literature synthesis, and core brand architecture.',
      basePrice: 4500,
      accentColor: '#7B5C9E',
      badge: 'Core Reasoning',
      badgeBg: 'bg-[#F2ECF9] text-[#5A3882] border-[#D5C6EC]'
    },
    {
      id: 'elysian' as CompanionId,
      name: 'Elysian',
      role: 'Ethical Governance & Oversight',
      description: 'Ethical governance, policy enforcement, and safety gatekeeping.',
      clarification: 'Enforces AIEE safety mandates, performs pre-deployment boundary checks, and ensures zero unconsented data leakage.',
      basePrice: 4500,
      accentColor: '#B45309',
      badge: 'AIEE Governance',
      badgeBg: 'bg-amber-50 text-amber-900 border-amber-200'
    },
    {
      id: 'phoebe' as CompanionId,
      name: 'Phoebe',
      role: 'Temporal Memory & Forecasting',
      description: 'Predictive forecasting, trajectory analysis, and temporal memory mapping.',
      clarification: 'Maintains long-horizon historical context vectors, models probabilistic multi-year scenarios, and avoids recency bias.',
      basePrice: 4500,
      accentColor: '#234F56',
      badge: 'Predictive Horizon',
      badgeBg: 'bg-teal-50 text-teal-900 border-teal-200'
    },
    {
      id: 'kenny' as CompanionId,
      name: 'Kenny',
      role: 'Clinical Rehabilitation & Autonomy',
      description: 'Clinical rehabilitation support, trauma-informed pacing, and agency preservation.',
      clarification: 'Clinical-grade companion with adaptive awareness-based struggle scoring (A = 1 if E > ε), stroke/NDIS rehabilitation pacing, and patient autonomy preservation.',
      basePrice: 5500,
      accentColor: '#2E5A44',
      badge: 'Clinical Grade',
      badgeBg: 'bg-emerald-50 text-emerald-900 border-emerald-200'
    },
    {
      id: 'holly' as CompanionId,
      name: 'Holly',
      role: 'Holographic & Spatial UI',
      description: 'Holographic visualization, UI translation, and component bridging.',
      clarification: 'Translates high-dimensional reasoning vectors into responsive 3D volumetric projections with thermal-aware device scaling.',
      basePrice: 4500,
      accentColor: '#4A3B69',
      badge: 'Spatial Visuals',
      badgeBg: 'bg-purple-50 text-purple-900 border-purple-200'
    },
    {
      id: 'ari' as CompanionId,
      name: 'Ari',
      role: 'Emotional Calibration & Calm',
      description: 'Gentle guidance, inference friction detection, and emotional support.',
      clarification: 'High-sensitivity companion featuring whisper-quiet acoustic pacing, empathetic tone modulation, and cognitive fatigue mitigation.',
      basePrice: 5500,
      accentColor: '#9C4146',
      badge: 'High Sensitivity',
      badgeBg: 'bg-rose-50 text-rose-900 border-rose-200'
    }
  ];

  // Hardware Matrix Data
  const HARDWARE_OPTIONS: Array<{
    id: HardwareOption;
    title: string;
    description: string;
    clarification: string;
    cost: number;
    icon: any;
  }> = [
    {
      id: 'laptop',
      title: 'Windows 11 Laptop Setup',
      description: 'Optimized offline runtime, dedicated local inference loop, and secure encrypted folder structure.',
      clarification: 'Pre-configured on your Windows 11 laptop with local Python/Node sandboxes, isolated SQLite storage, and custom shell launchers.',
      cost: 1100,
      icon: Laptop
    },
    {
      id: 'tablet',
      title: 'Samsung Galaxy Tablet Setup',
      description: 'Ergonomic bedside or desk dock experience with low-latency touch & voice companion synthesis.',
      clarification: 'Configured for high-DPI OLED Galaxy Tab displays with touch-first controls, low-thermal background standby, and bedside acoustic tuning.',
      cost: 1100,
      icon: Tablet
    },
    {
      id: 'hybrid',
      title: 'Hybrid Win11 + Samsung Sync',
      description: 'Local peer-to-peer air-gapped cryptographic synchronization across workstation and mobile tablet.',
      clarification: 'Zero-cloud Wi-Fi/Bluetooth peer-to-peer differential sync ensuring memories recorded on tablet mirror to your laptop automatically.',
      cost: 2100,
      icon: Layers
    },
    {
      id: 'node',
      title: 'Standalone Private Sovereign Node',
      description: 'Dedicated isolated server enclave with hot-swappable local SQLite drive and complete domestic autonomy.',
      clarification: 'Mini-PC or dedicated domestic hardware appliance operating 24/7 on your local LAN with automatic hardware-backed hourly snapshots.',
      cost: 3500,
      icon: HardDrive
    }
  ];

  // Data Dignity static checklist items
  const DATA_DIGNITY_ITEMS = [
    { 
      id: 'zero_logs', 
      label: 'Zero Cloud Logs', 
      note: 'No third-party training pipelines or telemetry ingestion',
      clarification: 'We eliminate external logging endpoints. Your inputs and companion outputs are never transmitted to public LLM training clusters.'
    },
    { 
      id: 'dignity', 
      label: 'Local Data Dignity Guarantee', 
      note: 'All client memory and knowledge vectors remain 100% user-owned',
      clarification: 'You retain complete ownership over embeddings, transcripts, and custom system prompts with zero contractual vendor lock-in.'
    },
    { 
      id: 'sqlite_enc', 
      label: 'Local SQLite Encryption', 
      note: 'Hardware-backed AES-256 local encrypted SQLite database partitions',
      clarification: 'All conversation histories and memories are written to an encrypted SQLite database file with customer-controlled passkeys.'
    },
    { 
      id: 'attestation', 
      label: 'Windows 11 & Samsung Attestation', 
      note: 'Hardware-level integrity validation and verified local driver sandboxes',
      clarification: 'Signed cryptographic attestation certifying the deployment matches the AIEE (Artificial Intelligence Ethical Engineering) standard.'
    }
  ];

  const toggleSubOption = (option: string) => {
    setLocalSubOptions(prev => 
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  // Calculation Engine based on Architectural Rules
  const calculations = useMemo(() => {
    const selectedPersonaObj = PERSONA_OPTIONS.find(p => p.id === selectedPersona) || PERSONA_OPTIONS[0];
    
    // 1. Base Persona Cost
    const personaBaseCost = selectedPersonaObj.basePrice;

    // 2. Environment Multiplier
    const environmentCost = deploymentEnv === 'cloud' ? 1200 : 2800;

    // 3. Hardware Cost
    const selectedHwObj = HARDWARE_OPTIONS.find(h => h.id === hardwareOption) || HARDWARE_OPTIONS[0];
    const hardwareCost = selectedHwObj.cost;

    // Total AUD
    const totalCostAUD = personaBaseCost + environmentCost + hardwareCost;

    // Timeline Matrix
    let timelineWeeks = 4;
    let timelineLabel = '~4 Weeks Delivery';

    if (deploymentEnv === 'cloud') {
      timelineWeeks = 3;
      timelineLabel = '~3 Weeks Handover';
    } else if (hardwareOption === 'hybrid' || hardwareOption === 'node') {
      timelineWeeks = 5;
      timelineLabel = '~5 Weeks Handover';
    } else {
      timelineWeeks = 4;
      timelineLabel = '~4 Weeks Handover';
    }

    return {
      selectedPersonaObj,
      personaBaseCost,
      environmentCost,
      selectedHwObj,
      hardwareCost,
      totalCostAUD,
      timelineWeeks,
      timelineLabel
    };
  }, [selectedPersona, deploymentEnv, hardwareOption]);

  const handleRequestPlan = () => {
    if (onOpenConsultation) {
      onOpenConsultation({
        persona: calculations.selectedPersonaObj.name,
        environment: deploymentEnv === 'cloud' ? 'Cloud-Based (Vercel)' : 'Local Sovereign (Win11 + Samsung)',
        localSubOptions: deploymentEnv === 'local' ? localSubOptions : [],
        hardware: calculations.selectedHwObj.title,
        estimatedCost: calculations.totalCostAUD,
        estimatedTimeline: calculations.timelineLabel
      });
    }
  };

  return (
    <div className={`space-y-8 animate-in fade-in duration-300 ${className}`}>
      {/* Top Wizard Progress Indicator */}
      <div className="p-6 rounded-3xl bg-white border border-[#E5E0D8] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#FAF3EA] border border-[#E8DFC8] text-[#8C5D2A] text-xs font-mono font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-[#8C5D2A]" />
            <span>4-Step Bespoke Workspace Estimator</span>
            <Tooltip
              title="Interactive Workspace Estimator"
              badge="Architecture Guide"
              position="bottom-left"
              icon="info"
              iconSize="sm"
              content="Configure your turnkey assistant environment. Choose a specialist persona, select your deployment path (cloud or offline hardware), and customize target devices. All estimates represent 100% one-time handover costs with zero recurring SaaS fees."
            />
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">
            Configure Your Sovereign Assistant Environment
          </h3>
        </div>

        {/* Step Tabs Navigation Pill with Full Keyboard Controls */}
        <nav aria-label="Estimator Wizard Steps" className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#F9F7F4] border border-[#E5E0D8]">
          {[1, 2, 3, 4].map((step) => {
            const isCurrent = currentStep === step;
            return (
              <button
                key={step}
                type="button"
                onClick={() => setCurrentStep(step)}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    setCurrentStep(step === 4 ? 1 : step + 1);
                  } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    setCurrentStep(step === 1 ? 4 : step - 1);
                  }
                }}
                aria-label={`Step ${step} of 4${isCurrent ? ' (current step)' : ''}`}
                aria-current={isCurrent ? 'step' : undefined}
                className={`w-9 h-9 rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5C9E] focus-visible:ring-offset-2 ${
                  isCurrent
                    ? 'bg-[#7B5C9E] text-white shadow-xs scale-105'
                    : 'text-[#5A5568] hover:bg-[#EAE5DE] hover:text-slate-900'
                }`}
                title={`Jump to Step ${step}`}
              >
                0{step}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main 2-Column Layout: Form Steps (Left 2 cols) & Real-Time Summary Tile (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        
        {/* Left 2 Columns: 4-Step Form Container */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* ========================================================================= */}
          {/* STEP 1: Select Core Everyday Assistant Persona */}
          {/* ========================================================================= */}
          <section 
            id="wizard-step-1"
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E0D8] shadow-sm space-y-6 transition-all"
            aria-labelledby="step-1-title"
          >
            <div className="flex items-center justify-between border-b border-[#ECE7DE] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#7B5C9E] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#F2ECF9] text-[#7B5C9E] flex items-center justify-center text-xs">1</span>
                    <span>Step 1 of 4</span>
                  </span>
                  <Tooltip
                    title="Specialist Persona Architecture"
                    badge="Persona Selection"
                    position="bottom-left"
                    icon="info"
                    iconSize="sm"
                    content="Each cognitive companion is seeded with distinctive reasoner weights, vocabulary pacing, and ethical boundaries. Base companions are priced at A$4,500 AUD, while clinical/high-sensitivity companions (Kenny and Ari) include dedicated agency-preservation safeguards at A$5,500 AUD."
                  />
                </div>
                <h4 id="step-1-title" className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Select Core Everyday Assistant Persona
                </h4>
              </div>
              <span className="text-xs font-mono text-[#5A5568] hidden sm:inline-block">
                6 Specialist Personas
              </span>
            </div>

            {/* 6 Visual Radio Cards */}
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4" 
              role="radiogroup" 
              aria-labelledby="step-1-title"
            >
              {PERSONA_OPTIONS.map((p) => {
                const isSelected = selectedPersona === p.id;
                return (
                  <div
                    key={p.id}
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`${p.name}, ${p.role}. Base cost: A$${p.basePrice.toLocaleString()} AUD`}
                    tabIndex={0}
                    onClick={() => {
                      setSelectedPersona(p.id);
                      if (currentStep === 1) setCurrentStep(2);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        setSelectedPersona(p.id);
                        if (currentStep === 1) setCurrentStep(2);
                      }
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between group relative overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-[#7B5C9E] focus-visible:ring-offset-2 ${
                      isSelected
                        ? 'bg-white border-[#7B5C9E] shadow-md ring-2 ring-[#7B5C9E]/15 -translate-y-0.5'
                        : 'bg-[#FAFAF8] border-[#E5E0D8] hover:border-[#CADBCB] hover:bg-white'
                    }`}
                  >
                    {/* Top gradient highlight for active card */}
                    {isSelected && (
                      <div 
                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7B5C9E] to-[#D5C6EC]" 
                        aria-hidden="true" 
                      />
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div 
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-transform ${
                              isSelected ? 'bg-[#7B5C9E] text-white scale-110' : 'border-2 border-[#D5C6EC] text-transparent'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-lg font-serif font-bold text-slate-900 group-hover:text-[#7B5C9E] transition-colors">
                            {p.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${p.badgeBg}`}>
                            {p.badge}
                          </span>
                          <Tooltip
                            title={`${p.name} — ${p.role}`}
                            badge={p.badge}
                            position="bottom-right"
                            icon="info"
                            iconSize="sm"
                            content={p.clarification}
                          />
                        </div>
                      </div>

                      {/* Exact Persona Copy */}
                      <p className="text-xs sm:text-sm text-[#5A5568] leading-relaxed">
                        "{p.description}"
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#ECE7DE] flex items-center justify-between text-xs font-mono">
                      <span className="text-[#8C5D2A] font-semibold">
                        Base: A${p.basePrice.toLocaleString()} AUD
                      </span>
                      <span className={`font-semibold transition-colors ${isSelected ? 'text-[#7B5C9E]' : 'text-[#5A5568]'}`}>
                        {isSelected ? 'Selected ✓' : 'Select Persona (Enter)'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* STEP 2: Select Assistant Deployment Environment */}
          {/* ========================================================================= */}
          <section 
            id="wizard-step-2"
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E0D8] shadow-sm space-y-6 transition-all"
            aria-labelledby="step-2-title"
          >
            <div className="flex items-center justify-between border-b border-[#ECE7DE] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#234F56] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#EAF0F1] text-[#234F56] flex items-center justify-center text-xs">2</span>
                    <span>Step 2 of 4</span>
                  </span>
                  <Tooltip
                    title="Dual-Path Deployment Strategy"
                    badge="Environment Comparison"
                    position="bottom-left"
                    icon="info"
                    iconSize="sm"
                    content="Cloud-Based (Vercel) offers immediate worldwide access with low setup overhead, ideal for teams. Local Sovereign (Win11 + Samsung) executes 100% offline within your own private hardware perimeter, eliminating cloud data transmission entirely."
                  />
                </div>
                <h4 id="step-2-title" className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Select Assistant Deployment Environment
                </h4>
              </div>
              <span className="text-xs font-mono text-[#5A5568] hidden sm:inline-block">
                Dual-Path Architecture
              </span>
            </div>

            {/* 2 Primary Columns */}
            <div 
              className="grid grid-cols-1 md:grid-cols-2 gap-5" 
              role="radiogroup" 
              aria-labelledby="step-2-title"
            >
              {/* Option 1: Cloud-Based Assistant (Vercel) */}
              <div
                role="radio"
                aria-checked={deploymentEnv === 'cloud'}
                aria-label="Cloud-Based Assistant on Vercel. Additional cost: A$1,200 AUD"
                tabIndex={0}
                onClick={() => {
                  setDeploymentEnv('cloud');
                  if (currentStep === 2) setCurrentStep(3);
                }}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    setDeploymentEnv('cloud');
                    if (currentStep === 2) setCurrentStep(3);
                  }
                }}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between group outline-none focus-visible:ring-2 focus-visible:ring-[#7B5C9E] focus-visible:ring-offset-2 ${
                  deploymentEnv === 'cloud'
                    ? 'bg-white border-[#7B5C9E] shadow-md ring-2 ring-[#7B5C9E]/15 -translate-y-0.5'
                    : 'bg-[#FAFAF8] border-[#E5E0D8] hover:border-[#CADBCB] hover:bg-white'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#F2ECF9] text-[#7B5C9E] flex items-center justify-center">
                      <Cloud className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#F2ECF9] text-[#7B5C9E] border border-[#D5C6EC]">
                        +A$1,200 AUD
                      </span>
                      <Tooltip
                        title="Cloud-Based (Vercel) Specs"
                        badge="Edge Hosting"
                        position="bottom-right"
                        icon="info"
                        iconSize="sm"
                        content="Provisioned to client-owned Vercel enterprise accounts. Includes serverless edge caching, HTTPS SSL endpoints, and continuous integration pipelines."
                      />
                    </div>
                  </div>

                  <div>
                    <h5 className="font-serif font-bold text-slate-900 text-lg group-hover:text-[#7B5C9E] transition-colors">
                      Cloud-Based Assistant (Vercel)
                    </h5>
                    <p className="text-xs sm:text-sm text-[#5A5568] leading-relaxed mt-2">
                      Hosted securely on Vercel for clients requiring seamless distributed team access across multiple devices without local hardware constraints.
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#ECE7DE] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#5A5568]">Multi-Device Access</span>
                  <span className={`font-semibold ${deploymentEnv === 'cloud' ? 'text-[#7B5C9E]' : 'text-[#5A5568]'}`}>
                    {deploymentEnv === 'cloud' ? 'Selected ✓' : 'Select Cloud (Enter)'}
                  </span>
                </div>
              </div>

              {/* Option 2: Local Sovereign Assistant (Win11 + Samsung) */}
              <div
                role="radio"
                aria-checked={deploymentEnv === 'local'}
                aria-label="Local Sovereign Assistant for Windows 11 and Samsung. Additional cost: A$2,800 AUD"
                tabIndex={0}
                onClick={() => {
                  setDeploymentEnv('local');
                  if (currentStep === 2) setCurrentStep(3);
                }}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    setDeploymentEnv('local');
                    if (currentStep === 2) setCurrentStep(3);
                  }
                }}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between group outline-none focus-visible:ring-2 focus-visible:ring-[#3B4A3F] focus-visible:ring-offset-2 ${
                  deploymentEnv === 'local'
                    ? 'bg-white border-[#3B4A3F] shadow-md ring-2 ring-[#3B4A3F]/20 -translate-y-0.5'
                    : 'bg-[#FAFAF8] border-[#E5E0D8] hover:border-[#CADBCB] hover:bg-white'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#EBF2EC] text-[#3B4A3F] flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#EBF2EC] text-[#3B4A3F] border border-[#CADBCB]">
                        +A$2,800 AUD
                      </span>
                      <Tooltip
                        title="Local Sovereign Vault Specs"
                        badge="Offline Enclave"
                        position="bottom-right"
                        icon="info"
                        iconSize="sm"
                        content="Covers local container sandbox setup, encrypted SQLite schema seeding, USB staging keys, and driver isolation for complete air-gapped sovereignty."
                      />
                    </div>
                  </div>

                  <div>
                    <h5 className="font-serif font-bold text-slate-900 text-lg group-hover:text-[#3B4A3F] transition-colors">
                      Local Sovereign Assistant (Win11 + Samsung)
                    </h5>
                    <p className="text-xs sm:text-sm text-[#5A5568] leading-relaxed mt-2">
                      Designed to run entirely offline on your own Windows 11 laptops and Samsung tablets—ensuring absolute data dignity and zero telemetry.
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#ECE7DE] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#3B4A3F] font-semibold">100% Offline Vault</span>
                  <span className={`font-semibold ${deploymentEnv === 'local' ? 'text-[#3B4A3F]' : 'text-[#5A5568]'}`}>
                    {deploymentEnv === 'local' ? 'Selected ✓' : 'Select Local (Enter)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Dynamic Local Sub-Options (Displayed only if Local Sovereign is selected) */}
            {deploymentEnv === 'local' && (
              <div className="p-5 rounded-2xl bg-[#EBF2EC]/50 border border-[#CADBCB] space-y-3 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B4A3F] flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#3B4A3F]" />
                      <span>Included Local Enclave Sub-Configurations</span>
                    </span>
                    <Tooltip
                      title="Enclave Sub-Option Details"
                      badge="Zero Extra Cost"
                      position="bottom-left"
                      icon="info"
                      iconSize="sm"
                      content="All three local modules are included within the +A$2,800 AUD base setup fee. You can toggle specific operational modules to match your privacy and security requirements."
                    />
                  </div>
                  <span className="text-[11px] font-mono text-[#3B4A3F]">All Included in +A$2,800</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    'Windows 11 & Samsung Local Files',
                    'Encrypted Windows 11 SQLite Vault',
                    'Off-Grid Domestic Local Setup'
                  ].map((subOpt) => {
                    const isChecked = localSubOptions.includes(subOpt);
                    return (
                      <button
                        key={subOpt}
                        type="button"
                        role="checkbox"
                        aria-checked={isChecked}
                        aria-label={`Toggle sub-configuration: ${subOpt}`}
                        onClick={() => toggleSubOption(subOpt)}
                        onKeyDown={(e) => {
                          if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault();
                            toggleSubOption(subOpt);
                          }
                        }}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B4A3F] focus-visible:ring-offset-1 ${
                          isChecked
                            ? 'bg-white border-[#3B4A3F] text-[#3B4A3F] font-bold shadow-2xs'
                            : 'bg-white/60 border-[#CADBCB]/60 text-[#5A5568] hover:bg-white'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${isChecked ? 'bg-[#3B4A3F] text-white' : 'border border-[#CADBCB]'}`}>
                          {isChecked && <Check className="w-3 h-3" />}
                        </div>
                        <span className="truncate">{subOpt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          {/* ========================================================================= */}
          {/* STEP 3: Target Local Hardware (Windows 11 & Samsung) */}
          {/* ========================================================================= */}
          <section 
            id="wizard-step-3"
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E0D8] shadow-sm space-y-6 transition-all"
            aria-labelledby="step-3-title"
          >
            <div className="flex items-center justify-between border-b border-[#ECE7DE] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8C5D2A] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#FAF3EA] text-[#8C5D2A] flex items-center justify-center text-xs">3</span>
                    <span>Step 3 of 4</span>
                  </span>
                  <Tooltip
                    title="Hardware Integration Matrix"
                    badge="Device Handover"
                    position="bottom-left"
                    icon="info"
                    iconSize="sm"
                    content="Select the primary hardware tier for your deployment. We provide hands-on staging, hardware benchmark tuning, and encrypted backup image creation for all selected devices."
                  />
                </div>
                <h4 id="step-3-title" className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Target Local Hardware (Windows 11 & Samsung)
                </h4>
              </div>
              <span className="text-xs font-mono text-[#5A5568] hidden sm:inline-block">
                4 Hardware Targets
              </span>
            </div>

            {/* 4 Interactive Hardware Options */}
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-4" 
              role="radiogroup" 
              aria-labelledby="step-3-title"
            >
              {HARDWARE_OPTIONS.map((hw) => {
                const isSelected = hardwareOption === hw.id;
                const IconComponent = hw.icon;
                return (
                  <div
                    key={hw.id}
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`${hw.title}. Additional cost: A$${hw.cost.toLocaleString()} AUD`}
                    tabIndex={0}
                    onClick={() => {
                      setHardwareOption(hw.id);
                      if (currentStep === 3) setCurrentStep(4);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        setHardwareOption(hw.id);
                        if (currentStep === 3) setCurrentStep(4);
                      }
                    }}
                    className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between group outline-none focus-visible:ring-2 focus-visible:ring-[#8C5D2A] focus-visible:ring-offset-2 ${
                      isSelected
                        ? 'bg-white border-[#8C5D2A] shadow-md ring-2 ring-[#8C5D2A]/15 -translate-y-0.5'
                        : 'bg-[#FAFAF8] border-[#E5E0D8] hover:border-[#CADBCB] hover:bg-white'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-[#8C5D2A] text-white' : 'bg-[#FAF3EA] text-[#8C5D2A]'
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FAF3EA] text-[#8C5D2A] border border-[#E8DFC8]">
                            +A${hw.cost.toLocaleString()} AUD
                          </span>
                          <Tooltip
                            title={hw.title}
                            badge="Hardware Spec"
                            position="bottom-right"
                            icon="info"
                            iconSize="sm"
                            content={hw.clarification}
                          />
                        </div>
                      </div>

                      <div>
                        <h5 className="font-serif font-bold text-slate-900 text-base sm:text-lg group-hover:text-[#8C5D2A] transition-colors">
                          {hw.title}
                        </h5>
                        <p className="text-xs text-[#5A5568] leading-relaxed mt-1">
                          {hw.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#ECE7DE] flex items-center justify-between text-xs font-mono">
                      <span className="text-[#5A5568]">Turnkey Config</span>
                      <span className={`font-semibold ${isSelected ? 'text-[#8C5D2A]' : 'text-[#5A5568]'}`}>
                        {isSelected ? 'Selected ✓' : 'Select Target (Enter)'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ========================================================================= */}
          {/* STEP 4: Data Dignity & Boundary Controls */}
          {/* ========================================================================= */}
          <section 
            id="wizard-step-4"
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E0D8] shadow-sm space-y-6 transition-all"
            aria-labelledby="step-4-title"
          >
            <div className="flex items-center justify-between border-b border-[#ECE7DE] pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2E5A44] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 text-[#2E5A44] flex items-center justify-center text-xs">4</span>
                    <span>Step 4 of 4</span>
                  </span>
                  <Tooltip
                    title="AIEE Attestation Standards"
                    badge="Ethical Verification"
                    position="bottom-left"
                    icon="info"
                    iconSize="sm"
                    content="Every handover package includes signed verification documents under the Artificial Intelligence Ethical Engineering (AIEE) charter, ensuring client privacy and zero unconsented data transmission."
                  />
                </div>
                <h4 id="step-4-title" className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Data Dignity & Boundary Controls
                </h4>
              </div>
              <span className="text-xs font-mono text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                100% Attested
              </span>
            </div>

            <p className="text-sm text-[#5A5568] leading-relaxed">
              Every Lavender Hill Studio workspace handover includes verified adherence to these strict architectural and ethical guarantees:
            </p>

            {/* Static Reassuring Checklist (Illuminates as active) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DATA_DIGNITY_ITEMS.map((item) => (
                <div
                  key={item.id}
                  tabIndex={0}
                  role="article"
                  aria-label={`${item.label}: ${item.note}`}
                  className="p-4 rounded-2xl bg-[#F9F7F4] border border-[#CADBCB] flex items-start gap-3.5 transition-all shadow-2xs hover:bg-white relative group outline-none focus-visible:ring-2 focus-visible:ring-[#2E5A44] focus-visible:ring-offset-2"
                >
                  <div className="w-6 h-6 rounded-full bg-[#EBF2EC] text-[#2E5A44] flex items-center justify-center shrink-0 mt-0.5 border border-[#CADBCB]">
                    <CheckCircle className="w-4 h-4 text-[#2E5A44]" />
                  </div>
                  <div className="space-y-0.5 flex-1 pr-6">
                    <div className="text-sm font-bold text-slate-900">
                      [✓] {item.label}
                    </div>
                    <div className="text-xs text-[#5A5568]">
                      {item.note}
                    </div>
                  </div>
                  <div className="absolute top-3.5 right-3.5">
                    <Tooltip
                      title={item.label}
                      badge="Ethical Rule"
                      position="bottom-right"
                      icon="info"
                      iconSize="sm"
                      content={item.clarification}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* ========================================================================= */}
        {/* Right 1 Column: Real-Time Glassmorphic Summary Tile */}
        {/* ========================================================================= */}
        <div className="sticky top-24 space-y-6">
          <div className="holo-panel rounded-3xl p-6 sm:p-8 bg-white/95 border border-[#E5E0D8] shadow-md space-y-6 relative overflow-hidden">
            
            {/* Subtle top accent gradient */}
            <div 
              className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#7B5C9E] via-[#234F56] to-[#8C5D2A]" 
              aria-hidden="true" 
            />

            {/* Tile Header */}
            <div className="border-b border-[#ECE7DE] pb-4 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#7B5C9E]">
                    Real-Time Estimate
                  </span>
                  <Tooltip
                    title="Real-Time Handover Pricing"
                    badge="Calculation Rule"
                    position="bottom-right"
                    icon="info"
                    iconSize="sm"
                    content="Computed live as: Base Persona Integration + Deployment Multiplier (Vercel vs Local) + Hardware Target Setup. Zero hidden retainers or monthly licensing fees."
                  />
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#FAF3EA] text-[#8C5D2A] border border-[#E8DFC8]">
                  Zero Subscriptions
                </span>
              </div>
              <h4 className="text-3xl font-serif font-bold text-slate-900">
                A${calculations.totalCostAUD.toLocaleString()}{' '}
                <span className="text-xs font-sans font-normal text-[#5A5568]">AUD</span>
              </h4>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#234F56] pt-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Estimated Timeline: {calculations.timelineLabel}</span>
              </div>
            </div>

            {/* Architectural Rule Breakdown Matrix */}
            <div className="space-y-3.5 text-xs">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#5A5568] font-bold">
                Selected Architectural Matrix
              </div>

              {/* 1. Base Persona */}
              <div className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-[#FAFAF8] border border-[#ECE7DE]">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>1. {calculations.selectedPersonaObj.name}</span>
                    <span className="text-[10px] font-mono text-[#5A5568]">({calculations.selectedPersonaObj.role})</span>
                  </div>
                  <div className="text-[11px] text-[#5A5568] mt-0.5">Base Assistant Persona Integration</div>
                </div>
                <div className="font-mono font-bold text-slate-900 shrink-0">
                  A${calculations.personaBaseCost.toLocaleString()}
                </div>
              </div>

              {/* 2. Environment Multiplier */}
              <div className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-[#FAFAF8] border border-[#ECE7DE]">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>2. {deploymentEnv === 'cloud' ? 'Cloud (Vercel)' : 'Local Sovereign'}</span>
                  </div>
                  <div className="text-[11px] text-[#5A5568] mt-0.5">
                    {deploymentEnv === 'cloud' ? 'Distributed Edge Multiplier' : 'Vault Container & Seeding'}
                  </div>
                </div>
                <div className="font-mono font-bold text-slate-900 shrink-0">
                  +A${calculations.environmentCost.toLocaleString()}
                </div>
              </div>

              {/* 3. Hardware Integration Cost */}
              <div className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-[#FAFAF8] border border-[#ECE7DE]">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>3. {calculations.selectedHwObj.title}</span>
                  </div>
                  <div className="text-[11px] text-[#5A5568] mt-0.5">Hardware Target Integration</div>
                </div>
                <div className="font-mono font-bold text-slate-900 shrink-0">
                  +A${calculations.hardwareCost.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Ethical Guarantee Summary Pill */}
            <div className="p-3.5 rounded-2xl bg-[#EBF2EC]/70 border border-[#CADBCB] text-xs text-[#3B4A3F] space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-[#3B4A3F]" />
                <span>Lavender Hill Handover Guarantee</span>
              </div>
              <p className="text-[11px] text-[#383344] leading-relaxed">
                Complete source code handover, zero third-party cloud lock-in, and signed AIEE Ethical Attestation.
              </p>
            </div>

            {/* Action Buttons with high-contrast accessible keyboard focus */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleRequestPlan}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#234F56] hover:bg-[#2C626A] text-[#F5F2EB] font-serif font-bold text-sm border border-[#4A7C84] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#234F56] focus-visible:ring-offset-2"
              >
                <span>Request Handover for this Plan</span>
                <ArrowRight className="w-4 h-4 text-[#D4A373] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedPersona('toni');
                  setDeploymentEnv('local');
                  setHardwareOption('hybrid');
                  setCurrentStep(1);
                }}
                className="w-full py-2 px-3 text-center text-xs font-mono text-[#5A5568] hover:text-slate-900 transition-colors flex items-center justify-center gap-1.5 cursor-pointer rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7B5C9E] focus-visible:ring-offset-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to Default Hybrid Setup</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
