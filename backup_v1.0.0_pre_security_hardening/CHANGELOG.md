# Changelog

All notable changes to the Lavender Hill Studio — ToniAI™ Framework platform are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-09-20

### Summary
Canonical release milestone establishing the converged architecture of Lavender Hill Studio. This release unifies the commercial frontend redesign from Version 2 with the audio/speech capabilities of Version 1, resolves interactive DOM hydration errors, prunes legacy prototype snapshots, and deploys the live in-process **Dual-Notebook RAG engine** powered by `node:sqlite`.

### Added
- **Dual-Notebook Edge RAG Engine:**
  - Implemented in-process vector retrieval and runtime state persistence via native `node:sqlite` in WAL mode (`storage/lavenderhill_rag.db`).
  - **`notebook_ui_ops`**: Dynamic tracking of live visitor spatial perspective, active viewport section (`workspace`, `spatial-lab`, `vocal-tones`), open modal dialogs, and visitor struggle metric ($E$ vs. $\varepsilon = 0.65$).
  - **`notebook_strategic`**: Embedded 7 authoritative studio training dossiers, AIEE charter invariants, and bespoke AUD estimator matrices with sub-500ms cosine similarity retrieval.
  - Added RESTful UI ops synchronization routes (`POST /api/session/ui-ops`, `GET /api/session/ui-ops/:sessionId`) and system status telemetry (`GET /api/rag/status`).
  - Automatic cold-start database integrity validation and auto-ingestion on server boot via `ragPipeline.ensureColdStartReady()`.
- **Bespoke Architecture Estimator (`BespokeEstimator.tsx`):**
  - Integrated 981-line commercial estimator calculating real-time AUD investment tiers, hardware sizing, and sovereign delivery timelines across Toni, Gia, and Master Studio configurations.
- **Explore Studio Navigation Hub (`ExploreStudio.tsx`):**
  - High-contrast, accessible tabbed navigation providing seamless transitions between the Companion Suite, Private Architecture Showcase, and Technical Specifications.
- **Interactive Onboarding & Tooltips:**
  - Integrated `SimulationTutorialModal.tsx` for guided walkthroughs.
  - Accessible, keyboard-friendly `Tooltip.tsx` system across all ecosystem components.

### Restored
- **Acoustic Tone Synthesizer (`VocalToneSynthesizer.tsx`):**
  - Restored the 847-line Web Audio API binaural frequency generator and vocal resonance simulator from the early prototype, enabling neurorehabilitation-safe acoustic pacing.
- **Voice Control Engine (`VoiceControlWidget.tsx` & `useVoiceControl.ts`):**
  - Restored the Web Speech API voice synthesis and speech recognition widget for hands-free studio navigation.

### Fixed
- **DOM Hydration Defect in `PrivateArchitectureTools.tsx`:**
  - Resolved `In HTML, <button> cannot be a descendant of <button>` error by converting outer application cards to semantic `<div role="button" tabIndex={0}>` containers with full keyboard activation (`Enter` / `Space`) and high-contrast focus rings.
- **Streaming RAG Context Binding in `PersonaChatModal.tsx`:**
  - Replaced hardcoded static testing context strings with live telemetry dispatch (`sessionId`, `activeView`, and `activeModal`), enabling dynamic persona grounding in Gemini system instructions.

### Changed & Cleaned
- **Dependency Hygiene:**
  - Pruned unused dependencies `recharts` and `canvas-confetti` (and `@types/canvas-confetti`) from `package.json`.
- **Stylesheet Consolidation:**
  - Removed duplicate import in `src/index.css` and purged deprecated `src/components/holographic-panels.css` in favor of canonical `src/styles/holographic-panels-v2.css`.
- **Repository Hygiene:**
  - Removed orphaned component `src/components/CompanionWorkspace.tsx`.
  - Removed root-level `bun.lock` to ensure npm/Node.js lockfile consistency.
  - Purged 4 stale prototype backup directories (`backup_post_avatars_and_spatial`, `backup_pre_avatars`, `backup_website_20260901_061041`, `backup_website_20260904_005123`).

---

### Release Declaration
- **Git Commit Message:**
  ```text
  release(v1.0.0): canonical convergence of dual-notebook RAG, bespoke estimator, and restored audio tools
  ```
- **Git Tag:**
  ```text
  v1.0.0
  ```
