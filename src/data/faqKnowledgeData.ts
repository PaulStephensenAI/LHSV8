import { FAQItem, FAQCategory } from '../types';

export const FAQ_CATEGORIES: { id: FAQCategory; label: string; count?: number }[] = [
  { id: 'all', label: 'All Knowledge' },
  { id: 'deployment', label: 'Dual-Path Deployment' },
  { id: 'personas', label: 'Studio Personas' },
  { id: 'security-privacy', label: 'Privacy & Security' },
  { id: 'founder-ethos', label: 'Founder & Ethos' },
  { id: 'sovereign-apps', label: 'Sovereign Apps' },
  { id: 'clinical-boundaries', label: 'Clinical Policy & Boundaries' }
];

export const FAQ_KNOWLEDGE_BASE: FAQItem[] = [
  {
    id: 'faq-01',
    category: 'deployment',
    categoryLabel: 'Dual-Path Deployment',
    question: 'What is the difference between Cloud-Based and Local Sovereign Human-Centred AI Avatar\'s?',
    shortAnswer: 'Cloud-Based Human-Centred AI Avatar\'s run on client-owned Vercel accounts for multi-device access, while Local Sovereign Human-Centred AI Avatar\'s run 100% offline on Windows 11 laptops and Samsung Galaxy tablets with zero cloud dependencies.',
    detailedAnswer: `Lavender Hill Studio empowers every client with a transparent dual-path deployment choice:

1. **Cloud-Based Human-Centred AI Avatar's (Vercel Distributed)**:
   • Hosted on Vercel Serverless Edge Runtime or client VPC.
   • Ideal for distributed teams needing multi-device access across regions.
   • Delivered on a one-time setup & handover model (typically A$3,800 – A$8,000 AUD) with zero recurring platform subscriptions managed by us.

2. **Local Sovereign Human-Centred AI Avatar's (Windows 11 & Samsung Tablets)**:
   • 100% offline execution running on personal Windows 11 laptops and Samsung Galaxy tablets.
   • Uses local encrypted SQLite databases with SHA-256 cryptographic attestation.
   • Ideal for privacy-conscious individuals, researchers, and air-gapped workspaces (typically A$4,500 – A$10,000+ AUD).`,
    keywords: ['cloud', 'local', 'sovereign', 'vercel', 'windows 11', 'samsung galaxy tablet', 'offline', 'sqlite', 'pricing', 'hardware', 'dual-path'],
    groundedCitation: {
      fileId: '02',
      filename: '02_Studio_Personas_Sovereign_Applications_Deployment_Paths.txt',
      section: 'Dual Path Deployment Options'
    },
    relevantPersonaId: 'toni',
    recommendedPrompts: [
      'Compare Cloud-Based vs Local Sovereign deployment options',
      'How does local offline SQLite storage work on Samsung Galaxy tablets?'
    ],
    verifiedCompliant: true
  },
  {
    id: 'faq-02',
    category: 'deployment',
    categoryLabel: 'Dual-Path Deployment',
    question: 'What is the zero-subscription model and pricing structure?',
    shortAnswer: 'We operate on a bespoke setup and handover model—clients own their code, database, and hardware configuration with zero recurring platform software fees.',
    detailedAnswer: `Lavender Hill Studio rejects recurring SaaS subscription traps:

• **Setup & Handover Ownership**: You receive complete ownership of your private workspace code, database schema, and deployment configurations.
• **Zero Recurring Studio Subscriptions**: We charge no ongoing monthly software seat licenses or subscription fees.
• **Transparent Pricing**: Cloud-Based setups range from A$3,800 – A$8,000 AUD; Local Sovereign setups range from A$4,500 – A$10,000+ AUD based on custom schema depth and hardware optimization.`,
    keywords: ['pricing', 'subscription', 'cost', 'fee', 'handover', 'zero-subscription', 'aud', 'bespoke', 'saas', 'ownership'],
    groundedCitation: {
      fileId: '01',
      filename: '01_Lavender_Hill_Studio_Identity_Ethos_Core_Constants.txt',
      section: 'Core Brand Statements for AI Assistants'
    },
    relevantPersonaId: 'toni',
    recommendedPrompts: [
      'Explain the zero-subscription handover model',
      'What are the upfront and ongoing costs for a sovereign workspace?'
    ],
    verifiedCompliant: true
  },
  {
    id: 'faq-03',
    category: 'founder-ethos',
    categoryLabel: 'Founder & Ethos',
    question: 'Who is the founder of Lavender Hill Studio and what is the core philosophy?',
    shortAnswer: 'Founded by Paul Stephensen, AI Ethicist and Architect of Sovereign Digital Workspaces. Our philosophy: "Not just a complicated system. A private workspace—guided by our experience and shaped by yours."',
    detailedAnswer: `• **Founder**: Paul Stephensen is the founder of Lavender Hill Studio and principal architect of sovereign digital workspaces.
• **Professional Focus**: AI Ethicist developing modular, schema-driven agentic engineering that respects human autonomy, data dignity, and mitigates cognitive fatigue.
• **Core Slogan & Philosophy**: "Resilient Calm Private Workspaces" — "Not just a complicated system. A private workspace—guided by our experience and shaped by yours."
• **Regional Base**: Lavender Hill, Australia — delivering sovereign workspaces worldwide.`,
    keywords: ['paul stephensen', 'founder', 'ethicist', 'architect', 'philosophy', 'slogan', 'resilient calm', 'australia', 'lavender hill'],
    groundedCitation: {
      fileId: '03',
      filename: '03_founder_bio_and_ethics.txt',
      section: 'Founder Bio & Ethical Philosophy — Paul Stephensen'
    },
    relevantPersonaId: 'toni',
    recommendedPrompts: [
      'Tell me about founder Paul Stephensen',
      'What is the core philosophy of Lavender Hill Studio?'
    ],
    verifiedCompliant: true
  },
  {
    id: 'faq-04',
    category: 'security-privacy',
    categoryLabel: 'Privacy & Security',
    question: 'How does the Privacy Promise guarantee zero cloud logs and zero telemetry?',
    shortAnswer: 'Local Sovereign Mode executes entirely on local hardware, storing conversations in encrypted local SQLite partitions with Dolphin Security auditing and zero external telemetry transmission.',
    detailedAnswer: `Our Privacy Promise is backed by verifiable technical controls:

1. **Zero Cloud Logs**: Local mode guarantees zero conversation payloads or telemetry are transmitted to third-party servers.
2. **Dolphin Security Ledger**: All state transitions and memory indexes are cryptographically signed into local SQLite vaults.
3. **18-Identifier PHI Sanitizer**: Automated local regex filters redact sensitive personal identifiers before any processing.
4. **Air-Gapped Operation**: Completely functional offline on Windows 11 laptops and Samsung Galaxy tablets without an internet connection.`,
    keywords: ['privacy promise', 'zero cloud logs', 'telemetry', 'dolphin security', 'sqlite', 'encryption', 'phi', 'sanitizer', 'air-gapped'],
    groundedCitation: {
      fileId: '04',
      filename: '04_compliance_security_governance_privacy_controls.txt',
      section: 'Privacy Promise & Security Principles'
    },
    relevantPersonaId: 'elysian',
    recommendedPrompts: [
      'How does Dolphin Security enforce zero telemetry leakage?',
      'Can Lavender Hill Studio workspaces run completely offline without internet?'
    ],
    verifiedCompliant: true
  },
  {
    id: 'faq-05',
    category: 'clinical-boundaries',
    categoryLabel: 'Clinical Policy & Boundaries',
    question: 'What is Lavender Hill Studio’s policy regarding medical questions and clinical advice?',
    shortAnswer: 'Chat AI assistants are not a medical service. Under our HIPAA & clinical compliance charter, personas never answer medical questions or evaluate symptoms, deflecting to doctors/GPs and 000 emergency services.',
    detailedAnswer: `Lavender Hill Studio chat AI assistants and sovereign personas maintain an absolute **Zero-Medical-Advice Policy**:

• **Not a Medical Service**: Assistants cannot answer medical questions, evaluate symptoms, assess vital metrics, or provide clinical guidance.
• **Doctor Assessment Required**: Physiological context is unique; users must consult their licensed Doctor or General Practitioner (GP) for clinical care.
• **Emergency Directive**: In any medical emergency or acute distress, users are instructed to **immediately call 000** (or local emergency services).
• **Scope Restriction**: Companions restrict assistance to studio architecture, project planning, and documentation available in our **FAQ section** and **Explore Studio** views.`,
    keywords: ['medical', 'clinical', 'hipaa', 'diagnosis', 'symptom', 'doctor', 'gp', '000', 'emergency', 'prescription', 'dosage', 'boundary', 'elysian'],
    groundedCitation: {
      fileId: '06',
      filename: '06_Server_System_Instructions_Deterministic_Fallbacks.txt',
      section: 'Absolute Medical & Clinical Invariants'
    },
    relevantPersonaId: 'elysian',
    recommendedPrompts: [
      'What happens if a user asks a medical or clinical question?',
      'Explain the Elysian Active Boundary Interception protocol'
    ],
    verifiedCompliant: true
  },
  {
    id: 'faq-06',
    category: 'personas',
    categoryLabel: 'Studio Personas',
    question: 'Who are the 6 Studio Personas and what are their specialized roles?',
    shortAnswer: 'Toni (Empathetic Guide), Elysian (Ethical Guardian), Phoebe (Quantitative Forecaster), Holly (Spatial Builder), Ari (Sensory Pacing), and Kenny (Autonomy & Dignity).',
    detailedAnswer: `Our 6 specialized assistant personas work in harmony:

1. **Toni (Empathetic Strategic Guide)**: Research mentorship, executive reasoning, and 45° collaborative accompaniment.
2. **Elysian (Ethical Governance & Safety Warden)**: Invariant enforcement, Dolphin Security audits, zero telemetry attestation.
3. **Phoebe (Quantitative Researcher & Forecaster)**: Stochastic scenario modeling ($\mu = 88.4\%$), Chronus time-series hashes, literature mapping.
4. **Holly (Volumetric Spatial Architect)**: 3D holographic workspace blueprints, 45° ergonomic offsets, GPU thermal scaling.
5. **Ari (Sensory Pacing Guide)**: Neurodivergent calm, gentle domestic metaphors (sourdough pacing), cognitive fatigue mitigation.
6. **Kenny (Autonomy & Dignity Companion)**: Sister Elizabeth Kenny Autonomy Theorem ($A = 1$ if $E > \varepsilon$), NDIS daily scheduling, passive non-intrusive support.`,
    keywords: ['toni', 'elysian', 'phoebe', 'holly', 'ari', 'kenny', 'personas', 'roles', '45 degree', 'neurodivergent', 'ndis', 'chronus', 'spatial'],
    groundedCitation: {
      fileId: '02',
      filename: '02_Studio_Personas_Sovereign_Applications_Deployment_Paths.txt',
      section: 'The 6 Active Everyday Assistant Personas'
    },
    relevantPersonaId: 'toni',
    recommendedPrompts: [
      'List the 6 studio personas and their capabilities',
      'How does Ari assist with sensory pacing and cognitive fatigue?'
    ],
    verifiedCompliant: true
  },
  {
    id: 'faq-07',
    category: 'sovereign-apps',
    categoryLabel: 'Sovereign Apps',
    question: 'What are the 3 Sovereign Applications built by Lavender Hill Studio?',
    shortAnswer: 'Gia (Family Memory Vault & Scrapbook), Angel.AI (Empathetic Care & Wellness Assistant), and FAB (Bespoke Sovereign Application Builder).',
    detailedAnswer: `Lavender Hill Studio produces three flagship sovereign applications:

1. **Gia (Family Memory Vault & Scrapbook)**:
   • Private family digital gardening, audio vault recordings, and offline photo journaling.
   • Operates 100% offline on local SSD / tablet storage for generational preservation.

2. **Angel.AI (Empathetic Care & Wellness Assistant)**:
   • Non-clinical daily routine scaffolding, gentle care coordination, and calm structure.
   • Deployed on Windows 11 & Samsung tablets or client-owned cloud instances.

3. **FAB (Bespoke Application Builder)**:
   • Modular, schema-driven application generator enabling teams to build sovereign tools without code complexity.`,
    keywords: ['gia', 'angel.ai', 'fab', 'applications', 'family vault', 'care', 'wellness', 'app builder', 'sovereign apps'],
    groundedCitation: {
      fileId: '02',
      filename: '02_Studio_Personas_Sovereign_Applications_Deployment_Paths.txt',
      section: 'The 3 Sovereign Applications'
    },
    relevantPersonaId: 'holly',
    recommendedPrompts: [
      'What features does the Gia Family Memory Vault include?',
      'How does FAB generate bespoke sovereign applications?'
    ],
    verifiedCompliant: true
  },
  {
    id: 'faq-08',
    category: 'personas',
    categoryLabel: 'Studio Personas',
    question: 'How does Kenny’s Cognitive Autonomy Theorem work?',
    shortAnswer: 'Kenny calculates a struggle score E against threshold ε = 0.65; if E remains low, Kenny stays in passive awareness mode (A = 0) to protect independent confidence and momentum.',
    detailedAnswer: `Inspired by Australian medical pioneer Sister Elizabeth Kenny, the **Cognitive Autonomy Theorem** models assistive intervention mathematically:

• **Formula**: $A = 1$ if $E > \varepsilon$, otherwise $A = 0$.
• **Parameters**: $E$ represents user friction/struggle score (0.0 to 1.0); $\varepsilon = 0.65$ represents the calibrated intervention threshold.
• **Principle**: Over-intervention by AI induces synthetic helplessness. When you are progressing smoothly, Kenny intentionally steps back into passive observation ($A = 0$), preserving your sovereign agency.`,
    keywords: ['kenny', 'sister elizabeth kenny', 'autonomy', 'struggle score', 'epsilon', 'formula', 'ndis', 'agency', 'passive awareness'],
    groundedCitation: {
      fileId: '02',
      filename: '02_Studio_Personas_Sovereign_Applications_Deployment_Paths.txt',
      section: 'Sister Kenny Autonomy Theorem'
    },
    relevantPersonaId: 'kenny',
    recommendedPrompts: [
      'Explain the mathematical formula behind Kenny\'s Autonomy Theorem',
      'Why is passive non-intrusive support important for human dignity?'
    ],
    verifiedCompliant: true
  },
  {
    id: 'faq-09',
    category: 'personas',
    categoryLabel: 'Studio Personas',
    question: 'How does Holly’s 3D Spatial Hologram Lab manage GPU thermals on tablets?',
    shortAnswer: 'Holly dynamically throttles device pixel ratio (DPR) to 1.5x, employs strict WebGL buffer garbage disposal, and constrains geometry complexity to protect battery life and thermal comfort.',
    detailedAnswer: `Holly’s 3D Spatial Hologram Lab is engineered for continuous ergonomic comfort:

• **45° Ergonomic Azimuth**: Holographic companion avatars render at an ergonomic 45° offset rather than center-screen, avoiding eye strain during reading.
• **Empathy-Constrained Thermal Scaling**: Device Pixel Ratio (DPR) is capped to 1.5x on Samsung Galaxy tablets and battery-powered laptops.
• **Active WebGL Memory Guard**: Meshes, materials, and geometries are purged from VRAM every 45 seconds to prevent browser tab bloat and thermal throttling.`,
    keywords: ['holly', '3d', 'hologram', 'spatial lab', 'gpu', 'thermals', 'samsung galaxy tablet', 'dpr', 'webgl', 'vram', 'azimuth', '45 degree'],
    groundedCitation: {
      fileId: '02',
      filename: '02_Studio_Personas_Sovereign_Applications_Deployment_Paths.txt',
      section: 'Spatial Hologram Lab Specifications'
    },
    relevantPersonaId: 'holly',
    recommendedPrompts: [
      'How does Holly optimize WebGL performance on mobile tablets?',
      'What is the 45 degree ergonomic offset in spatial computing?'
    ],
    verifiedCompliant: true
  },
  {
    id: 'faq-10',
    category: 'security-privacy',
    categoryLabel: 'Privacy & Security',
    question: 'What quality standard audit did Lavender Hill Studio achieve?',
    shortAnswer: 'Lavender Hill Studio achieved an AS/NZS ISO/IEC 25010 (SQuaRE) 5.0 / 5.0 architecture audit rating across Functional Suitability, Performance Efficiency, Security, and Reliability.',
    detailedAnswer: `Our architecture passed comprehensive quality evaluation:

• **Standard**: AS/NZS ISO/IEC 25010:2023 Systems and Software Quality Requirements and Evaluation (SQuaRE).
• **Score**: 5.0 / 5.0 across all 8 architectural quality dimensions.
• **Key Highlights**: Sub-25ms client render latency, automated Vitest coverage, Gzip static asset compression, CSP headers, and Dolphin Security ledger auditing.`,
    keywords: ['iso 25010', 'square', 'audit', 'quality', 'architecture', '5.0', 'vitest', 'security', 'compliance'],
    groundedCitation: {
      fileId: '05',
      filename: '05_product_quality_audit_architecture_report.txt',
      section: 'AS/NZS ISO/IEC 25010 Architecture Audit Report'
    },
    relevantPersonaId: 'elysian',
    recommendedPrompts: [
      'What are the key findings of the ISO 25010 architecture audit?',
      'How are security headers and offline caching implemented?'
    ],
    verifiedCompliant: true
  }
];
