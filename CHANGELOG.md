# Changelog

All notable changes to the Lavender Hill Studio — ToniAI™ Framework platform are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.3] - 2026-10-08

### Security & Hardening
- **Deactivated Photo Update Feature & Locked Author Portrait (`FounderBioModal.tsx`, `PersonaSelectorGrid.tsx`, `PaulStephensenPhoto.tsx`):**
  - Turned off photo upload and editing capabilities per founder directive after successful photo update.
  - Removed all camera icons, hover overlays, "Update Photo" buttons, and modal triggers from public UI cards and dialogs.
  - Decommissioned file picker and OS file manager triggers to eliminate any attack surface or unauthorized manipulation.
  - Verified author portrait displays the updated photo immediately from local browser storage with resilient error fallback (`onError` handler) to the high-fidelity vector rendering.
  - Permanently affixed the tamper-proof emerald `ShieldCheck` author identity verification badge.

---

## [1.1.2] - 2026-10-08

### Added & Enhanced
- **Author Profile Photo Customization (`AuthorPhotoModal.tsx` & `PaulStephensenPhoto.tsx`):**
  - Re-enabled profile photo customization for Paul Stephensen via a dedicated, focused modal interface (`AuthorPhotoModal.tsx`).
  - Added client-side HTML5 Canvas optimization pipeline: automatically validates image types and downscales pictures to 600px square (JPEG/WebP) for optimal browser storage and instant rendering.
  - Added instant auto-closing behavior: upon image selection and saving, the modal displays a clear confirmation checkmark and automatically closes within 850ms so users never experience a stuck dialog.
  - Implemented multi-layered modal exit mechanics: prominent top-right `X` button, explicit `Cancel` button, background click backdrop dismissal, and `Esc` key handling.
  - Added "Reset to Default" feature to seamlessly restore the handcrafted vector portrait at any time.
  - Enabled live multi-component synchronization via synchronous browser storage events across `FounderBioModal` and `PersonaSelectorGrid`.

---

## [1.1.1] - 2026-10-08

### Security & Hardening
- **Decommissioned Profile Photo Upload Tool (`PaulStephensenPhoto.tsx`):**
  - Completely removed `<input type="file">` file-picker elements, drag-and-drop dropzones, and operating system file manager triggers from the public client codebase.
  - Eliminated any potential client-side file injection or unauthorized photo alteration risks on public deployments.
  - Locked Paul Stephensen's author portrait to verified identity status with an immutable `ShieldCheck` security badge.
- **Author Bio Modal Dismissal & Accessibility Enhancements (`FounderBioModal.tsx`):**
  - Enhanced modal dismissal responsiveness: reinforced top and bottom high-contrast close buttons, enabled ESC key dismissal, and backdrop click closure.
  - Added semantic `role="dialog"` and `aria-modal="true"` dialog attributes for accessibility compliance.

---

## [1.1.0] - 2026-10-08

### Summary
Production infrastructure milestone establishing turnkey Google Cloud Run containerization, custom domain mapping (`https://lavenderhill.studio`) with Vercel DNS Anycast routing, ambient environmental scanning with hardware camera access, and founder portrait security hardening.

### Added
- **Production Containerization (`Dockerfile` & `.dockerignore`):**
  - Multi-stage Node 22 slim container optimized for Cloud Run serverless execution.
  - Dynamic `process.env.PORT` resolution in `server.ts` with local fallback to port `3000`.
- **Cloud Run Custom Domain & Anycast Edge DNS (`lavenderhill.studio`):**
  - Configured apex domain mapping for `lavenderhill.studio` to Cloud Run service `lavender-hill-studio-toniai-framework` in `asia-southeast1`.
  - Configured Vercel DNS nameserver with 4 Google Anycast IPv4 `A` records and 4 IPv6 `AAAA` records.
  - Configured `www` CNAME to `ghs.googlehosted.com.`, Google site verification TXT, and CAA SSL authorizations for `pki.goog` and `letsencrypt.org`.
  - Verified edge routing: Google Frontend edge automatically serving HTTP-to-HTTPS 302 redirects with managed TLS/SSL issuance.
- **Ambient Environmental Room Scanner (`AmbientRoomScanner.tsx`):**
  - Integrated hardware Camera API (`navigator.mediaDevices.getUserMedia`) for spatial environment capture.
  - Translates ambient workspace lighting and physical context into companion sensory cadence recommendations.

### Security & Hardening
- **Founder Visual Identity Lock (`PaulStephensenPhoto.tsx`):**
  - Hardened public visitor interfaces (`PersonaSelectorGrid.tsx`, `FounderBioModal.tsx`) with strict `allowUpload={false}` and `showBadge={false}` flags.
  - Prevents accidental or unauthorized visitor modifications to the founder portrait while preserving authenticated local developer workflows.

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
