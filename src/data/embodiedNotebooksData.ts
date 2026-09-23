import { CompanionId } from '../types';

export interface EmbodiedNotebookItem {
  id: string;
  name: string;
  domainTitle: string;
  subtitle: string;
  companionAffinity: CompanionId;
  description: string;
  corpusSummary: string;
  documentCount: number;
  totalTokens: string;
  vectorPartition: 'notebook_ui_ops' | 'notebook_strategic';
  sourceTypes: string[];
  keyInvariants: string[];
  sampleCitations: {
    reference: string;
    excerpt: string;
  }[];
  interactiveDemo: {
    suggestedPrompt: string;
    sampleResponse: {
      intro: string;
      groundedPoints: {
        title: string;
        body: string;
        citation: string;
      }[];
      closing: string;
      offlineVerification: string;
    };
  };
}

export const EMBODIED_NOTEBOOKS: EmbodiedNotebookItem[] = [
  {
    id: 'executive-strategy',
    name: 'Executive Strategy & Capital Governance Notebook',
    domainTitle: 'Executive M&A, Capital Allocation & Board Diligence',
    subtitle: 'Proprietary enterprise playbook for unhurried strategic decision-making.',
    companionAffinity: 'toni',
    description: 'Binds Toni’s strategic mentorship with an organization’s proprietary board minutes, M&A playbooks, investor covenants, and operational roadmaps.',
    corpusSummary: '240 proprietary documents including quarterly investor decks, venture debt structures, post-merger integration protocols, and neurodivergent executive pacing guidelines.',
    documentCount: 240,
    totalTokens: '1.8M Tokens',
    vectorPartition: 'notebook_strategic',
    sourceTypes: ['Board Transcripts', 'M&A Playbooks', 'Financial Models', 'Governance By-Laws'],
    keyInvariants: [
      'Strictly ground all valuation metrics in client-specified EBITDA multiples.',
      'Never recommend dilutive capital structures without presenting a non-dilutive alternative.',
      'Present executive summaries in scannable, bold-keyed hierarchies to prevent cognitive fatigue.'
    ],
    sampleCitations: [
      {
        reference: '[Lavender Hill Strategic Manual §4.2: Capital Guardrails]',
        excerpt: 'Equity dilution for bridge financing must not exceed 6.5% without unanimous board governance ratification.'
      },
      {
        reference: '[Post-Merger Cultural Integration Protocol p. 73]',
        excerpt: 'Engineering leadership must maintain sovereign repository access for 90 days post-transaction.'
      }
    ],
    interactiveDemo: {
      suggestedPrompt: 'How should our executive team approach the Series B term sheet to protect our core research charter?',
      sampleResponse: {
        intro: 'I’ve reviewed your Series B term sheet against your proprietary Capital Governance Notebook (§4.2). Here is your strategic breakdown in clear, unhurried steps:',
        groundedPoints: [
          {
            title: '1. Protective Charter Clause (Section 6.1)',
            body: 'Your notebook establishes an inviolable charter: 15% of annual net computing power is reserved for ethical public-good research. Ensure investor board approval thresholds exclude charter modifications.',
            citation: 'Capital Governance Notebook §6.1 • p. 112'
          },
          {
            title: '2. Liquidation Preference Invariant',
            body: 'Investors are requesting a 1.5x participating preference. According to your historical covenant benchmarks, this violates your conservative capital policy. Counter with a standard 1.0x non-participating preference.',
            citation: 'Investor Covenant Archive 2024 • File 18-B'
          },
          {
            title: '3. Executive Cognitive Pacing',
            body: 'Negotiations require calm clarity. Do not accept a 48-hour exploding deadline; your bylaws stipulate a minimum 5-business-day board review cycle.',
            citation: 'Executive Pacing Manual §2.4'
          }
        ],
        closing: 'Would you like me to prepare a non-confrontational redline email for lead counsel citing these three sections?',
        offlineVerification: 'Verified via Local SQLite Partition • Zero Cloud Logs • Encrypted at Rest'
      }
    }
  },
  {
    id: 'clinical-protocols',
    name: 'Trauma-Informed Clinical Protocols & Care Notebook',
    domainTitle: 'Clinical Neuro-Affirmation & Patient Sensory Pathways',
    subtitle: 'Air-gapped clinical reference notebook for evidence-based empathetic care.',
    companionAffinity: 'kenny',
    description: 'Binds Kenny’s clinical empathy and calm somatic voice to proprietary mental health protocols, sensory de-escalation manuals, and practitioner journals.',
    corpusSummary: '185 clinical guides, neurodivergent sensory calibration scales, non-violent communication rubrics, and practitioner burnout prevention notes.',
    documentCount: 185,
    totalTokens: '1.2M Tokens',
    vectorPartition: 'notebook_strategic',
    sourceTypes: ['Clinical SOPs', 'Sensory De-escalation Guides', 'Psychiatric Research', 'Therapist Binders'],
    keyInvariants: [
      'Maintain an unconditional non-judgmental stance with zero dismissive language.',
      'Never prescribe medical regimens; provide empathetic emotional scaffolding and grounded evidence.',
      'Strict HIPAA & clinical confidentiality: all queries remain 100% on the practitioner’s local device.'
    ],
    sampleCitations: [
      {
        reference: '[Clinical Protocol 104: Acute Overwhelm Scaffolding]',
        excerpt: 'When sensory input exceeds tolerance threshold, transition immediately to slow paced vocal rhythm (50-60 BPM).'
      },
      {
        reference: '[Sensory De-escalation Index §3.8]',
        excerpt: 'Soft warm light (2700K) and lateral 45-degree seating significantly reduce sympathetic nervous system arousal.'
      }
    ],
    interactiveDemo: {
      suggestedPrompt: 'A patient is reporting intense executive paralysis and sensory overload at work. What protocol should we follow?',
      sampleResponse: {
        intro: 'Drawing directly from your Clinical Care Notebook (Protocol 104), here is the structured, gentle response pathway for this clinical session:',
        groundedPoints: [
          {
            title: '1. Somatic Down-Regulation First',
            body: 'Before addressing work tasks, guide the patient through a 90-second sensory grounding exercise: anchor sight on two neutral textures and lower room illumination to under 300 lux.',
            citation: 'Clinical Protocol 104 • Section 2'
          },
          {
            title: '2. Dismantle the Task Avalanche',
            body: 'Executive paralysis occurs when all tasks are weighted with equal emergency. Ask: “What is one tiny mechanical motion we can complete right now, like closing 10 browser tabs?”',
            citation: 'Executive Paralysis Care Index §7'
          },
          {
            title: '3. Remove Guilt & Moral Failure Framing',
            body: 'Reassure them that paralysis is a biological freeze response to neurochemical saturation, not laziness or lack of discipline.',
            citation: 'Neurodiversity Affirming Care Handbook p. 44'
          }
        ],
        closing: 'I can generate a gentle, printed take-home card summarizing this 3-step sequence if that would be helpful for the patient.',
        offlineVerification: 'Air-Gapped Sovereign Tablet Vault • 100% Local Processing • No External Telemetry'
      }
    }
  },
  {
    id: 'ethical-governance',
    name: 'Sovereign AI Ethics, EU AI Act & Data Dignity Notebook',
    domainTitle: 'Algorithmic Compliance, Human Rights & Auditing Charters',
    subtitle: 'Rigorous legal & ethical corpus ensuring absolute compliance and human safety.',
    companionAffinity: 'elysian',
    description: 'Binds Elysian’s vigilant ethical reasoning to international AI regulations, institutional review board (IRB) guidelines, and the Lavender Hill AIEE Charter.',
    corpusSummary: '310 legal texts, EU AI Act technical standards, ISO/IEC 42001 governance matrices, and algorithmic bias testing documentation.',
    documentCount: 310,
    totalTokens: '2.4M Tokens',
    vectorPartition: 'notebook_strategic',
    sourceTypes: ['EU AI Act Text', 'AIEE Charter Art. 1-12', 'ISO/IEC Standards', 'Legal Compliance Memos'],
    keyInvariants: [
      'Reject any operation that compromises user data sovereignty or introduces clandestine surveillance.',
      'Enforce human-in-the-loop validation for all high-risk autonomous classifications.',
      'Provide full mathematical citation trails for every ethical determination.'
    ],
    sampleCitations: [
      {
        reference: '[AIEE Charter Art. 3: Unconditional Data Dignity]',
        excerpt: 'Client data and vector embeddings shall not be utilized to tune third-party foundation models under any commercial pretext.'
      },
      {
        reference: '[EU AI Act Annex IV: Technical Documentation Invariant]',
        excerpt: 'High-risk systems must maintain continuous logging of confidence intervals and bias calibration metrics.'
      }
    ],
    interactiveDemo: {
      suggestedPrompt: 'Does our internal customer support avatar qualify as high-risk under the EU AI Act, and what documentation is required?',
      sampleResponse: {
        intro: 'Based on the legal corpus in your Ethical Governance Notebook (EU AI Act Annex III & AIEE Charter):',
        groundedPoints: [
          {
            title: '1. Classification Assessment: Non-High-Risk (With Transparency Duties)',
            body: 'Standard customer support workflows fall under Title IV transparency obligations (Article 50) rather than Annex III high-risk classification, provided the AI does not determine access to essential services (e.g. credit, healthcare triage, or employment screening).',
            citation: 'EU AI Act Article 50 & Annex III §1.2'
          },
          {
            title: '2. Mandatory Transparency Disclosure',
            body: 'Users must be explicitly informed that they are interacting with an AI avatar at the outset of the session in clear, plain language.',
            citation: 'EU AI Act Art. 50(1) • AIEE Charter Art. 5'
          },
          {
            title: '3. Sovereign Local Log Invariant',
            body: 'To satisfy future audit readiness, ensure interaction logs are hashed locally into your Dolphin Security Ledger with immutable zero-knowledge timestamps.',
            citation: 'Dolphin Security Protocol §9.1'
          }
        ],
        closing: 'Shall I run a compliance audit scan against your current API endpoints to verify zero cloud data leakage?',
        offlineVerification: 'Cryptographically Verified • Zero Third-Party API Exfiltration • Dolphin Ledger Guarded'
      }
    }
  },
  {
    id: 'quantitative-risk',
    name: 'Quantitative Risk Modeling & Volatility Matrix Notebook',
    domainTitle: 'Quantitative Finance, Econometrics & Risk Engineering',
    subtitle: 'Deterministic mathematical notebook for institutional portfolio defense.',
    companionAffinity: 'phoebe',
    description: 'Binds Phoebe’s empirical precision to proprietary trading logs, stochastic volatility models, Monte Carlo frameworks, and liquidity stress tests.',
    corpusSummary: '420 statistical papers, Value-at-Risk (VaR) formulations, algorithmic latency benchmarks, and proprietary backtest results.',
    documentCount: 420,
    totalTokens: '3.1M Tokens',
    vectorPartition: 'notebook_strategic',
    sourceTypes: ['LaTeX Papers', 'Python Quant Libraries', 'Risk Matrices', 'Backtest Datasets'],
    keyInvariants: [
      'Provide formulaic derivations for all statistical confidence intervals.',
      'Highlight fat-tail probabilities and structural break risks rather than assuming Gaussian normality.',
      'Refuse speculative hype; state exact sample sizes and p-values.'
    ],
    sampleCitations: [
      {
        reference: '[Phoebe Quant Theory: Eq. 14.2 Tail-Risk Decay]',
        excerpt: 'When kurtosis exceeds 4.8, standard Gaussian VaR understates tail drawdown risk by a factor of 2.7x.'
      },
      {
        reference: '[Liquidity Stress Test Handbook p. 89]',
        excerpt: 'Simulate liquidity contraction of 40% across secondary markets to verify margin call solvency.'
      }
    ],
    interactiveDemo: {
      suggestedPrompt: 'How should we adjust our portfolio hedge given the recent volatility spike in interest rate swaps?',
      sampleResponse: {
        intro: 'Executing deterministic lookup across your Quantitative Risk Notebook (Section 14.2 & Stress Model B):',
        groundedPoints: [
          {
            title: '1. Kurtosis Expansion & Non-Gaussian Tail Risk',
            body: 'Current swap variance exhibits excess kurtosis of 5.12. Using standard Black-Scholes assumptions will underprice out-of-the-money put protection by approximately 31%.',
            citation: 'Quant Risk Manual §14.2 • Eq. 3'
          },
          {
            title: '2. Dynamic Delta-Gamma Rebalancing',
            body: 'Adjust hedge ratios from 0.65 to 0.82 to insulate net asset value against a potential 50 bps parallel curve shift, targeting neutral gamma exposure.',
            citation: 'Hedging Strategy Matrix 2025 • Tab 4'
          },
          {
            title: '3. Liquidity Cushion Buffer',
            body: 'Maintain a 14% unencumbered cash buffer in overnight sovereign paper to prevent forced liquidation during intraday spread widening.',
            citation: 'Liquidity Protocol §3.1'
          }
        ],
        closing: 'I have prepared the Python/NumPy recalculation script ready for execution in your local Jupyter sandbox.',
        offlineVerification: 'Local Matrix Execution • No Market Intel Shared with Public Servers'
      }
    }
  },
  {
    id: 'sensory-ergonomics',
    name: 'Adaptive Sensory & Neurodivergent Ergonomics Notebook',
    domainTitle: 'Sensory Calibration, ADHD/Autism Pacing & UI Dynamics',
    subtitle: 'Human-centred guidelines for designing gentle, non-overwhelming digital environments.',
    companionAffinity: 'ari',
    description: 'Binds Ari’s sensory pacing expertise to ergonomic biometrics, neurodivergent accessibility guidelines, and kinetic UI state specifications.',
    corpusSummary: '160 ergonomic studies, color temperature vs cortisol research, cognitive load testing suites, and ADHD attention scaffolding patterns.',
    documentCount: 160,
    totalTokens: '950K Tokens',
    vectorPartition: 'notebook_ui_ops',
    sourceTypes: ['Ergonomic Field Notes', 'Accessibility Audits', 'Sensory Research', 'CSS/Design Tokens'],
    keyInvariants: [
      'Strictly avoid flashing animations, aggressive red alerts, or unprompted audio notifications.',
      'Prioritize pastel lavender, sage green, and warm cream palettes over stark high-contrast blues.',
      'Synchronize UI state with the user’s real-time cognitive pacing preferences.'
    ],
    sampleCitations: [
      {
        reference: '[Ari Sensory Invariant: Luminance Threshold §2]',
        excerpt: 'Background luminance should remain between 180 and 220 cd/m² with subtle parchment texture to prevent visual strain.'
      },
      {
        reference: '[ADHD Pacing Codex §5.4]',
        excerpt: 'Long documents must contain visually distinct cognitive rest stops every 400 words.'
      }
    ],
    interactiveDemo: {
      suggestedPrompt: 'How can we redesign our internal dashboard so developers with ADHD don’t feel overwhelmed by notification spam?',
      sampleResponse: {
        intro: 'Drawing from your Sensory Ergonomics Notebook (ADHD Pacing Codex §5.4 & UI Ops Token System):',
        groundedPoints: [
          {
            title: '1. Batched Calm Delivery (Async Pulses)',
            body: 'Eliminate real-time red badges. Batch all non-critical notifications into a twice-daily calm summary digest styled in muted lavender tones.',
            citation: 'Sensory Ergonomics Notebook §5.4'
          },
          {
            title: '2. Cognitive Rest Stops & Visual Breathing Room',
            body: 'Introduce 24px padding between data tables with soft neutral backgrounds (#FAF8F5) to eliminate visual crowding.',
            citation: 'UI Ops Token Spec V2 • Line 48'
          },
          {
            title: '3. Focus Mode Toggle',
            body: 'Provide a single-key shortcut (e.g. Cmd+Shift+F) that instantly collapses sidebar navigations and dims peripheral telemetry.',
            citation: 'Accessibility Field Study 2024 • p. 29'
          }
        ],
        closing: 'Would you like me to inspect your current stylesheet and output a ready-to-merge Tailwind CSS calm config?',
        offlineVerification: 'Synchronized with notebook_ui_ops • Zero External Analytics'
      }
    }
  },
  {
    id: 'creative-narrative',
    name: 'Narrative Universe & Brand Voice Lore Notebook',
    domainTitle: 'Creative Synthesis, Worldbuilding & Polyphonic Lore',
    subtitle: 'Living storytelling bible preserving authentic human voice and cultural richness.',
    companionAffinity: 'holly',
    description: 'Binds Holly’s creative synthesis to proprietary fiction manuscripts, brand lore bibles, film treatments, and character relationship webs.',
    corpusSummary: '280 creative lore bibles, character psychological dossiers, dialogue cadence recordings, and cross-media narrative arcs.',
    documentCount: 280,
    totalTokens: '2.1M Tokens',
    vectorPartition: 'notebook_strategic',
    sourceTypes: ['Manuscripts', 'Worldbuilding Lore Bibles', 'Dialogue Transcripts', 'Tone Guides'],
    keyInvariants: [
      'Preserve individual character linguistic cadences across thousands of pages.',
      'Never introduce anachronisms or violate established historical or fictional world rules.',
      'Protect all client creative IP from public AI training databases.'
    ],
    sampleCitations: [
      {
        reference: '[Lore Bible Vol. 1: World Invariants §1.3]',
        excerpt: 'The central city prohibits combustion engines; all transit operates on kinetic counterbalance cables.'
      },
      {
        reference: '[Character Cadence Guide: Dialogue §8]',
        excerpt: 'Marcus speaks in terse 4-word declarative sentences; he never utilizes colloquial idioms or adverbs.'
      }
    ],
    interactiveDemo: {
      suggestedPrompt: 'Marcus is confronting the city council about the kinetic transit breakdown. How would he speak in this scene?',
      sampleResponse: {
        intro: 'Referencing your Creative Lore Notebook (Character Cadence Guide §8 & Transit Lore §1.3):',
        groundedPoints: [
          {
            title: '1. Cadence Adherence: Terse Declarative Syntax',
            body: 'Marcus does not plead or use rhetorical flourishes. His dialogue is short, rhythmic, and physically grounded.',
            citation: 'Character Cadence Guide §8'
          },
          {
            title: '2. Grounded Worldbuilding Detail',
            body: 'He references the exact mechanical failure: “The counterbalance cables snapped at dawn. Three carriages fell. Fix the iron pulleys.”',
            citation: 'Transit Lore Archive • Chapter 4'
          },
          {
            title: '3. Emotional Restraint',
            body: 'He stands motionless with hands behind his back, allowing the council’s silence to do the heavy emotional lifting.',
            citation: 'Physical Acting Notes • Dossier Marcus'
          }
        ],
        closing: 'I can draft the complete 3-page scene draft keeping Marcus strictly within these cadence invariants.',
        offlineVerification: 'Client Owns All Rights & Source Material • 100% Confidential Creative Vault'
      }
    }
  }
];
