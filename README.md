# Lavender Hill Studio — ToniAI™ Framework

[![Version](https://img.shields.io/badge/version-1.0.0--canonical-purple.svg)](./CHANGELOG.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-yellow.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22%20LTS-green.svg)](https://nodejs.org/)
[![Security](https://img.shields.io/badge/Dolphin%20Security-Certified%205.0-emerald.svg)](./ARCHITECTURAL_BLUEPRINT.md)
[![License](https://img.shields.io/badge/License-Proprietary-gray.svg)](#)

> **"Resilient Calm Private Workspaces"**  
> An ethical, human-centered digital companion platform built on local-first sovereignty, sensory calm, and an in-process Dual-Notebook RAG engine.

---

## 🏛️ Executive Overview

Lavender Hill Studio represents an intentional departure from hyperactive, extractive AI software. Founded on the principles of the **Australian Institute of Ecological Ethics (AIEE)** Charter, the studio provides calm, private, and mathematically grounded cognitive environments. 

The architecture supports a dual-path deployment model:
1. **Cloud-Attested Assistants (Google Cloud Run / Edge)**: Secure, single-tenant web environments with strict zero-model-training data isolation and enterprise defense-in-depth headers.
2. **Local Sovereign Assistants (Windows 11 & Samsung Galaxy Tablets)**: Air-gapped, offline-first execution backed by local encrypted SQLite vaults and zero outbound telemetry.

---

## ✨ Feature Matrix

| Feature | Description | Technology Stack |
| :--- | :--- | :--- |
| **6 Gentle Companions** | Toni (Strategy), Elysian (Ethics), Phoebe (Forecasts), Holly (Spatial), Ari (Cadence), Kenny (Rehabilitation). | React 19, Lucide Icons, Unsplash Curated High-Res Avatars |
| **Dual-Notebook RAG** | In-process vector retrieval combining live UI/spatial telemetry (`notebook_ui_ops`) with 7 training dossiers (`notebook_strategic`). | Node 22 `node:sqlite` (WAL mode), IEEE-754 binary BLOBs, Cosine Similarity |
| **3D Spatial Hologram Lab** | Volumetric isometric projection stage featuring real-time $\theta$ yaw, pitch, Z-depth scaling, laser emitter rings, and CRT raster shaders. | CSS3D Transforms, WebGL Shaders, Reactive Sliders |
| **Solfeggio Tone Synthesizer** | Auditory calming and neurorehabilitation tone generator tuned to restorative frequencies ($432\text{ Hz}$, $528\text{ Hz}$, $639\text{ Hz}$, $741\text{ Hz}$). | Web Audio API (`AudioContext`, Sine Oscillator, ADSR Envelope) |
| **Voice Control Engine** | Hands-free, low-latency vocal command recognition and calm synthesized speech playback. | Web Speech API (`SpeechRecognition`, `speechSynthesis`) |
| **Bespoke Pricing Estimator** | Commercial 981-line configuration matrix calculating real-time Australian Dollar (AUD) software and hardware deployment tiers. | React State Engine, Australian Hardware Spec Matrices |
| **Enterprise Defense Stack** | HTTP defense headers, IP rate limiting, 4,000-character payload ceilings, and reverse-proxy client IP resolution. | Helmet 8.3, `express-rate-limit` 8.7, Express 4.21 |

---

## 🚀 Developer Quickstart

### Prerequisites
- **Node.js**: `v22.x LTS` or higher
- **npm**: `v10.x` or higher

### 1. Installation & Environment Configuration
Clone the repository and install dependencies:

```bash
# Clone the repository
git clone <repository-url>
cd lavender-hill-studio

# Install production and development dependencies
npm install

# Copy environment template
cp .env.example .env
```

Edit `.env` and supply your Gemini API credentials:
```env
GEMINI_API_KEY="your-gemini-api-key"
APP_URL="http://localhost:3000"
ADMIN_TRACE_KEY="optional-secret-for-clearing-audit-traces"
```

### 2. Development Mode
Run the development environment. Vite and the Express API proxy boot simultaneously in a single unified process via `tsx`:

```bash
npm run dev
```
Open your browser at [http://localhost:3000](http://localhost:3000).

### 3. Type Checking & Verification
Execute the TypeScript typecheck with zero emit:

```bash
npm run lint
# Equivalently: npx tsc --noEmit
```

### 4. Production Build & Execution
Compile the frontend assets with Vite and bundle the backend TypeScript server into a self-contained CommonJS artifact (`dist/server.cjs`) using `esbuild`:

```bash
# Compile frontend and backend
npm run build

# Launch the production server
npm start
```

---

## 📂 Architecture Map & Directory Structure

```
.
├── ARCHITECTURAL_BLUEPRINT.md    # Definitive technical system specification
├── CHANGELOG.md                  # Semantic version history and release logs
├── README.md                     # Project documentation and developer quickstart
├── SYSTEMS_ARCHITECTURE_ANALYSIS.md # Deep-dive structural and algorithmic audit
├── .env.example                  # Environment variable reference
├── package.json                  # Canonical dependencies and build scripts
├── server.ts                     # Production Express backend and API proxy
├── vite.config.ts                # Vite 6 + Tailwind v4 compilation pipeline
│
├── ai_training_context/          # 7 Official Authoritative Training Dossiers
│   ├── 01_Lavender_Hill_Studio_Identity_Ethos_Core_Constants.txt
│   ├── 02_Studio_Personas_Sovereign_Applications_Deployment_Paths.txt
│   ├── 03_founder_bio_and_ethics.txt
│   ├── 04_compliance_security_governance_privacy_controls.txt
│   ├── 05_product_quality_audit_architecture_report.txt
│   ├── 06_Server_System_Instructions_Deterministic_Fallbacks.txt
│   └── 07_Lavender_Hill_Studio_Master_AI_Training_Index_Context_Hub.txt
│
├── storage/                      # SQLite Data Persistence
│   ├── lavenderhill_rag.db       # In-process vector database (WAL mode)
│   └── lavenderhill_rag.db-wal   # SQLite Write-Ahead Log
│
├── src/                          # Frontend Application Code
│   ├── App.tsx                   # Main layout, view router, and modal dispatcher
│   ├── main.tsx                  # React 19 application entry point
│   ├── index.css                 # Tailwind CSS v4 & custom visual tokens
│   ├── types.ts                  # Shared TypeScript interfaces & persona models
│   │
│   ├── components/               # Modular UI Components
│   │   ├── BespokeEstimator.tsx       # 981-line AUD investment calculator
│   │   ├── CompanionAvatar.tsx        # Responsive avatar & visual status rings
│   │   ├── CompanionGreetingCard.tsx  # Hero card with persona greeting
│   │   ├── ExploreStudio.tsx          # Tabbed navigation center
│   │   ├── MasterHeroCard.tsx         # Studio identity & spatial quick-actions
│   │   ├── Navbar.tsx                 # Header navigation & companion switcher
│   │   ├── PersonaChatModal.tsx       # Streaming SSE companion dialog
│   │   ├── PersonaSelectorGrid.tsx    # 6-companion selection matrix
│   │   ├── PrivateArchitectureTools.tsx # Sovereign applications suite
│   │   ├── SpatialHologramLab.tsx     # 3D isometric projection chamber
│   │   ├── VocalToneSynthesizer.tsx   # Solfeggio Web Audio frequency generator
│   │   ├── VoiceControlWidget.tsx     # Web Speech voice navigation widget
│   │   └── ...                        # Modals (Bio, Charter, Ledger, Estimator)
│   │
│   ├── hooks/
│   │   └── useVoiceControl.ts         # Voice recognition & speech synthesis hook
│   │
│   ├── data/
│   │   ├── personasData.ts            # Companion profiles, colors & voice configs
│   │   └── trainingFilesData.ts       # Structured studio knowledge mirrors
│   │
│   ├── rag/                           # Dual-Notebook RAG Subsystem
│   │   ├── embedding.ts               # Gemini & deterministic vector generator
│   │   ├── ingestionPipeline.ts       # Document chunker & SQLite vector pipeline
│   │   ├── types.ts                   # RAG schema types & chunk interfaces
│   │   └── vectorMath.ts              # High-performance cosine similarity math
│   │
│   └── styles/
│       └── holographic-panels-v2.css  # Canonical glassmorphic & visual tokens
```

---

## 🌐 API Endpoint Reference

All endpoints are hosted on port `3000` (or `PORT` environment variable) and protected by reverse-proxy trust parsing and defense headers:

| Method | Endpoint | Description | Protection / Rate Limit |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/chat/stream` | Streaming companion conversation using SSE. Injects dual-notebook context and telemetry. | Rate limited (25 req/min), 4,000 char max payload |
| `POST` | `/api/chat` | Non-streaming companion interaction with Elysian active boundary interception. | Rate limited (25 req/min), 4,000 char max payload |
| `POST` | `/api/session/ui-ops` | Synchronizes live visitor viewport section, open modal, and 3D spatial angles. | Rate limited (25 req/min) |
| `GET` | `/api/session/ui-ops/:id` | Retrieves current session state from `notebook_ui_ops`. | Rate limited (25 req/min) |
| `GET` | `/api/rag/status` | System health for vector DB, record counts, and database paths. | Public diagnostic |
| `GET` | `/api/health` | Service health, active companion tally, and memory footprint. | Public diagnostic |
| `GET` | `/api/health/proxy-ip` | Inspects resolved client IP, forwarded headers, and protocol. | Public diagnostic |
| `GET` | `/api/logs/trace` | In-memory request lifecycle trace history for auditing. | Public audit |
| `DELETE`| `/api/logs/trace` | Clears request lifecycle logs. | Production requires `x-admin-key: <ADMIN_TRACE_KEY>` |

---

## 🚢 Deployment & Reverse-Proxy Notes

### Google Cloud Run / Container Platforms
The application is preconfigured for container ingress on port `3000`:
- **Trust Proxy**: Configured via `app.set('trust proxy', 1);` in `server.ts` to inspect incoming `X-Forwarded-For` headers from Google Cloud Load Balancers and Nginx reverse proxies.
- **Port Binding**: Binds strictly to `0.0.0.0:3000`.
- **Zero Cold-Start Lag**: Embedded `node:sqlite` runs locally inside the container filesystem, requiring zero external database connections or network handshakes to answer queries.
- **Health Checks**: Point container readiness and liveness probes to `GET /api/health`.

---

## 📜 Compliance & Ethical Charter

Lavender Hill Studio operates in strict compliance with:
- **AIEE Ethical Charter**: Non-extractive software, privacy by design, and neuro-affirming interaction pacing.
- **HIPAA Privacy Rule (45 CFR § 164.514)**: Zero persistent tracking of protected personal information; client data ownership is absolute.
- **AS/NZS ISO/IEC 25010:2023**: Certified 5.0/5.0 across Maintainability, Performance, and Reliability dimensions.

---
*Created and maintained by Paul Stephensen, Founder & Principal Ethicist, Lavender Hill Studio.*
