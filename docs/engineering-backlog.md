# Green Life Engineering Backlog

Last updated: 2026-03-29

---

## Frontend

### Sprint 1 — Complete

- [x] Initialize Expo + TypeScript app shell
- [x] Set up React Navigation root stack and tab navigator
- [x] Add theme tokens from design system
- [x] Build shared UI primitives: `Screen`, `Button`, `SearchBar`, `Badge`
- [x] Build `HomeScreen`
- [x] Build `SearchScreen` with mock data
- [x] Build `ItemDetailScreen` with mock data

### Sprint 2 — Complete

- [x] Add API client and typed response models
- [x] Wire `GET /search` to `SearchScreen` (mock)
- [x] Wire `GET /items/{id}` to `ItemDetailScreen` (mock)
- [x] Build `SavedScreen`
- [x] Build `ProfileScreen`
- [x] Add loading, empty, and error states

### Sprint 3 — Complete

- [x] Implement barcode scanner with Expo camera
- [x] Implement `NoMatchScreen`
- [x] Implement source detail flow (`SourceDetailScreen`)
- [x] Implement save/remove item interactions (mock)
- [ ] Wire `POST /lookup/barcode` — blocked on backend deploy

### Sprint 4 — Complete (UI), Pending (wiring)

- [x] Implement photo capture and image upload flow (`PhotoCaptureScreen`)
- [x] Build `CandidateResultsScreen`
- [x] Add guest upgrade prompt for save attempts
- [ ] Wire `POST /lookup/image` — blocked on backend deploy
- [ ] Add analytics and error tracking hooks

### Sprint 5 — Complete (UI), Pending (env keys)

- [x] Build `VoiceAskScreen` — Ask tab in bottom nav, mic button, transcript + response bubbles
- [x] Build `useVoiceChat` hook — full state machine (idle/recording/transcribing/thinking/speaking/error)
- [x] Build `src/api/claude.ts` — Claude API integration (non-streaming)
- [x] Build `src/api/whisper.ts` — OpenAI Whisper STT
- [ ] **Activate Voice Ask** — add `EXPO_PUBLIC_ANTHROPIC_API_KEY` + `EXPO_PUBLIC_OPENAI_API_KEY` to `.env`. Independent of backend — can ship now.

### Sprint 6 — Community / Sparks

- [x] Build `SparksFeedScreen` — impact banner, Igniters leaderboard, filterable Sparks feed
- [ ] Wire live leaderboard — blocked on backend deploy
- [ ] Wire live Sparks feed — blocked on backend deploy

---

## Design System — Complete

- [x] Define color palette (Dark Forest: `#0D1F12` bg, `#10B981` emerald, `#F59E0B` spark)
- [x] Define typography scale — corrected to design system weights (display/h1: Light 300)
- [x] Define spacing scale — extended to 64px
- [x] Define border radius scale
- [x] Define icon system — Lucide React Native, size scale xs:12 → xl:32
- [x] Define badge confidence variants (Exact Match / Probable / Estimate / Material)
- [x] Define data visualization color sequence
- [x] Define motion spec
- [x] Write `DESIGN.md` — full design contract
- [x] Update `CLAUDE.md` — enforces DESIGN.md, links to design system URL
- [x] Correct `typography.ts` — display/h1 Light (300), h2 Regular (400), title Medium (500)
- [x] Extend `spacing.ts` — added xxxxl:48, xxxxxl:64
- [ ] Audit all screens against `DESIGN.md` post-integration — run `/gstack-design-review`
- [ ] Complete Figma foundations page
- [ ] Build Figma UI kit variants
- [ ] Complete high-fidelity MVP screens in Figma

---

## Backend

### Sprint 1 — Scaffolded, not deployed

- [x] Scaffold API service (`server/`)
- [x] Set up PostgreSQL schema — migrations 001, 002, 003 ready
- [x] Define auth strategy (guest + signed-in)
- [ ] **Deploy to Render or Railway** — primary blocker for all wiring
- [ ] Run migrations 001, 002, 003
- [ ] Seed minimal local dataset
- [ ] Implement `GET /health`

### Sprint 2 — Spec written, pending deploy

- [x] Spec: `visionService.ts`
- [x] Spec: `foodEmissionService.ts`
- [x] Spec: `materialImpactService.ts`
- [x] Spec: `sparksService.ts`
- [x] Spec: `usdaService.ts`
- [x] Spec: `climatiqService.ts`
- [ ] Implement `POST /lookup/barcode`
- [ ] Implement `GET /search`
- [ ] Implement `GET /items/{id}`
- [ ] Add source provenance serialization
- [ ] Add lookup history persistence
- [ ] Google Vision API key — required for image lookup

### Sprint 3

- [ ] Implement `GET /sources/{id}`
- [ ] Implement `GET /me/history`
- [ ] Implement `GET /me/saved-items`
- [ ] Implement `POST /me/saved-items`
- [ ] Implement `DELETE /me/saved-items/{itemId}`

### Sprint 4

- [ ] Implement image lookup ingestion endpoint
- [ ] Add OCR/image matching via Google Vision
- [ ] Add confidence score rules (exact vs estimated matches)
- [ ] Add admin endpoints for source record review
- [ ] Add mapping override support

### Authentication

- [ ] Wire Supabase Auth
- [ ] Guest login / freemium path (Onboarding tap-to-continue already sets this up)

---

## Data Workstream

- [ ] Finalize MVP categories
- [ ] Audit EPA-accessible datasets
- [ ] Audit EPD data sources and licensing
- [ ] Define canonical metric taxonomy
- [ ] Define match confidence rubric
- [ ] Build first ingestion pipeline
- [ ] Create source freshness policy

---

## Release Readiness

- [ ] Validate supported item categories with test set
- [ ] Review source attribution on every shown metric
- [ ] Confirm exact vs estimated labeling is consistent
- [ ] Run internal QA on scan, search, save, and source flows
- [ ] Design review pass — `/gstack-design-review` against DESIGN.md
- [ ] Prepare TestFlight and Android internal builds
