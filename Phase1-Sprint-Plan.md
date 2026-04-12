# Phase 1 Sprint Plan: Detailed Execution Guide
## 30-60 Days to Shipped Mobile App

**Timeline:** Weeks 1-8 (flexible to 4-8 weeks based on velocity)  
**Resource:** You (solo) + Claude + Codex  
**Goal:** Mobile app in TestFlight/Play Store beta with real food data, trust labels, and Igniters community

---

## How to Use This Document

Each sprint has:
- **Weekly breakdown** (what ships when)
- **Daily standup prompts** (check in, flag blockers)
- **Deliverable checklists** (verify shipping)
- **Risk flags** (what could go wrong)
- **Retro prompts** (what to capture at sprint end)

This is your daily reference. Print it, bookmark it, live in it.

---

# SPRINT 1: RESEARCH & ARCHITECTURE (Weeks 1-2)

## Sprint 1 Goal
**Complete food/restaurant API research. Identify all blockers. Define backend integration patterns. Lock in Phase 1 data sources.**

**Success Definition:**
- [ ] All 5 API gaps researched and documented
- [ ] Agribalyse licensing path clear (or fallback identified)
- [ ] Data seed file (80+ foods, 10+ materials) ready to load
- [ ] Backend schema designed and ready to implement
- [ ] No surprises. All blockers named and solutions ready.

---

## WEEK 1: API RESEARCH & BLOCKER IDENTIFICATION

### Week 1 Goal
Map the food/restaurant data landscape. Find blockers. Establish access to each API. Determine what Phase 1 MVP can realistically use.

### Daily Standup Prompts (Check-in each morning or EOD)

**Monday Week 1:**
- [ ] Agribalyse research started — can we bulk download? Licensing terms? EU export allowed?
- [ ] Claude researching OpenFoodFacts API — structure, coverage, how to enrich with LCA?
- [ ] Blocker found? Document in `greenlife-api-research.md`

**Tuesday Week 1:**
- [ ] Restaurant menu APIs — can ChainEating, OpenTable, Seamless expose ingredient data?
- [ ] Sustainability badge aggregators — Rainforest Alliance, Fair Trade, Organic APIs exist?
- [ ] CSV/JSON samples captured from each API? (Save for integration testing)

**Wednesday Week 1:**
- [ ] Packaging material databases — which are free/accessible?
- [ ] Climatiq fallback path — confirm free tier limits, cost if exceeded
- [ ] Decision made: Phase 1 MVP data sources locked in

**Thursday Week 1:**
- [ ] Licensing review — Agribalyse, OpenFoodFacts, USDA. Attribution requirements clear?
- [ ] Fallback paths documented — if API X fails, use Y
- [ ] Integration priority order defined — what gets wired first?

**Friday Week 1:**
- [ ] API research doc complete (`greenlife-api-research.md`)
- [ ] Decision matrix ready (sources, phase allocation, effort)
- [ ] No surprises. All blockers surfaced and solved.
- [ ] Ready for Week 2 architecture work

### Week 1 Deliverables Checklist

**Must Ship:**
- [ ] `greenlife-api-research.md` — documented findings for all 5 APIs (A-E)
  - Agribalyse: bulk access? licensing? coverage for restaurants?
  - OpenFoodFacts: API structure? enrichment opportunities?
  - Restaurant menus: can we map menu → ingredients → impact?
  - Sustainability badges: Rainforest Alliance, Fair Trade, Organic API access?
  - Packaging materials: which EPD sources are free?
- [ ] Decision matrix (source → phase → integration effort → licensing)
- [ ] Agribalyse licensing resolution (critical blocker)
- [ ] Sample data files from each API (for testing)
- [ ] Fallback strategy documented (if X fails, use Y)

**Nice to Have:**
- [ ] Cost estimate for paid APIs (Google Vision, Climatiq, etc.)
- [ ] Rate limit analysis (how many scans per day before cost?)
- [ ] Example food entries (20-30 foods with full LCA data)

### Week 1 Risk Flags

| Risk | Probability | Mitigation |
|------|-------------|-----------|
| Agribalyse locked behind licensing | HIGH | Start with USDA/Climatiq, approach Agribalyse for academic access |
| Restaurant menu APIs blocked | MEDIUM | Fall back to manual seed data (ChainEating, major chains) |
| Sustainability badge APIs non-existent | MEDIUM | Create hardcoded list of 50 common certifications |
| Material EPD data behind paywall | HIGH | Use open EPD database, supplement with material supplier data |
| API rate limits too restrictive | LOW | Budget for paid tiers, or implement aggressive caching |

### Week 1 Retro Prep

At end of Friday, capture:
- [ ] What worked? (Research process? Claude's assistance? Discovery speed?)
- [ ] What didn't? (Hit any dead ends? Licensing walls?)
- [ ] Surprises? (Found an API that's better than expected?)
- [ ] Confidence level on Phase 1 data sources? (High/Medium/Low?)
- [ ] Blockers ready to solve in Week 2?

---

## WEEK 2: BACKEND ARCHITECTURE & DATA PIPELINE

### Week 2 Goal
Define the lookup chain, data model, and database schema. Establish integration test suite. Get ready to implement in Sprint 2.

### Daily Standup Prompts

**Monday Week 2:**
- [ ] Lookup chain defined: Vision → exact match → fuzzy → category → Climatiq
- [ ] Data seed schema designed: food table, equivalents, materials, sources
- [ ] Database (PostgreSQL): tables, migrations, indexes ready for implementation
- [ ] Questions documented for Claude (architecture decisions need review)

**Tuesday Week 2:**
- [ ] visionService.ts: interface designed (input/output clear)
- [ ] foodEmissionService.ts: lookup chain logic designed (no code yet)
- [ ] materialImpactService.ts: schema for materials, recyclability flags
- [ ] Confidence label logic: exact / probable / estimate / material (rules documented)

**Wednesday Week 2:**
- [ ] Source attribution model designed (every result tracks: source API, confidence, methodology)
- [ ] Result shapes finalized: food result vs material result vs product result
- [ ] API response contracts documented: `/api/v1/lookup/image`, `/api/v1/search`
- [ ] Error handling strategy: what if no match? fallback chain?

**Thursday Week 2:**
- [ ] Database migrations written (001, 002, 003 from prior deliverable)
- [ ] Schema review: food, materials, sources, confidence, badges tables
- [ ] Indexes defined for fuzzy search performance
- [ ] Data seed file structure finalized (80+ foods ready to import)

**Friday Week 2:**
- [ ] Architecture diagram complete (Scan → Vision → Lookup → Result → Trust Label)
- [ ] Integration test plan ready (what will we test first?)
- [ ] Backend scaffold ready for Week 3 implementation
- [ ] Sprint 1 Retrospective held

### Week 2 Deliverables Checklist

**Must Ship:**
- [ ] Architecture diagram: Scan input → detection → lookup chain → result (with data sources marked)
- [ ] Database schema: tables, relationships, migrations (001-003)
- [ ] Service layer interface definitions: visionService, foodEmissionService, materialImpactService, sparksService
- [ ] Lookup chain logic documented: exact → fuzzy → category → fallback
- [ ] Confidence label rules: when exact? when probable? when estimate?
- [ ] Source attribution model: every result knows where it came from
- [ ] Result shape specs: what food result includes, what material result includes, what product result includes
- [ ] API endpoint contracts: `/api/v1/lookup/image {mode, imageBase64} → {result, confidence, source, methodology}`
- [ ] Data seed file ready: 80+ foods, 10+ materials with complete LCA/sustainability data
- [ ] Integration test checklist: what will be tested first in Sprint 2?

**Nice to Have:**
- [ ] Cost model: per-scan cost (Vision API + DB query + fallback chain)
- [ ] Performance targets: <500ms for lookup, <1s for Climatiq fallback
- [ ] Caching strategy: what to cache, how long?

### Week 2 Risk Flags

| Risk | Probability | Mitigation |
|------|-------------|-----------|
| Lookup chain too slow | MEDIUM | Implement aggressive caching, pre-compute common queries |
| Fuzzy search with PostgreSQL hard | MEDIUM | Use SQLite initially, migrate to pg_trgm if needed |
| Data seed file incomplete | LOW | Start with 30 foods, expand to 80 in Phase 2 |
| Confidence label logic complex | LOW | Start simple (exact or not), refine in Phase 2 |

### Week 2 Retro Prompts

**At end of Friday, hold Sprint 1 Retrospective:**

- [ ] **What worked?** (Research process? API discovery? Architecture planning?)
- [ ] **What didn't?** (Hit licensing walls? Dead-end APIs? Design rework?)
- [ ] **Blockers?** (Agribalyse licensing? Data access? Cost surprises?)
- [ ] **Adjustments for Sprint 2?** (Cut scope? Extend timeline? Change approach?)
- [ ] **Lessons?** (What pattern will we reuse? What do we do differently next time?)
- [ ] **Team confidence?** (Can we execute Sprint 2 as designed, or do we need to rescope?)

**Document as:** `sprints/retro-sprint1.md`

---

# SPRINT 2: BACKEND INTEGRATION & DATA SEEDING (Weeks 3-4)

## Sprint 2 Goal
**Deploy backend. Wire all APIs. Seed Phase 1 data. Get Scan → Result flow working server-side.**

**Success Definition:**
- [ ] Backend live on Render/Railway
- [ ] All APIs integrated and tested
- [ ] Phase 1 data loaded (80+ foods, 10+ materials)
- [ ] `/api/v1/lookup/image` endpoint working
- [ ] Confidence labels + source attribution working
- [ ] No surprises. Backend production-ready for mobile integration.

---

## WEEK 3: BACKEND DEPLOY & CORE INTEGRATIONS

### Week 3 Goal
Deploy backend. Get Google Vision, Agribalyse, USDA, Climatiq wired. Test lookup chain end-to-end.

### Daily Standup Prompts

**Monday Week 3:**
- [ ] Render/Railway account set up. Database (PostgreSQL) provisioned.
- [ ] Environment variables configured: API keys, DB connection, auth.
- [ ] First deploy of skeleton backend (no logic yet, just server responding).
- [ ] Test: `GET /api/v1/health` returns 200.

**Tuesday Week 3:**
- [ ] Google Vision API integrated. Test with sample image. Returns detection results.
- [ ] Agribalyse data loaded into PostgreSQL. Can query by food name.
- [ ] Lookup chain: Vision result → search Agribalyse table → return match.
- [ ] Log test image with Vision detection and Agribalyse match.

**Wednesday Week 3:**
- [ ] USDA FoodData lookup integrated. Test enrichment flow.
- [ ] Climatiq fallback wired. Test when no Agribalyse match.
- [ ] Full lookup chain tested: Vision → Agribalyse → USDA → Climatiq.
- [ ] Sample lookups logged (what does a food image return now?).

**Thursday Week 3:**
- [ ] `/api/v1/lookup/image` endpoint implemented. Input: image base64. Output: result object.
- [ ] `/api/v1/search` endpoint implemented. Input: query string. Output: search results.
- [ ] Error handling: what if image has no food? Fallback?
- [ ] Rate limiting: protect against abuse.

**Friday Week 3:**
- [ ] All core integrations tested. No errors in logs.
- [ ] Data quality check: are Agribalyse numbers reasonable? Sanity checks?
- [ ] Performance check: how long does a lookup take?
- [ ] Ready for Week 4 trust label + attribution work.

### Week 3 Deliverables Checklist

**Must Ship:**
- [ ] Backend deployed to Render/Railway
- [ ] Database (PostgreSQL) live with food/material tables populated
- [ ] Google Vision API integrated and tested
- [ ] Agribalyse data loaded (80+ foods with LCA data)
- [ ] USDA FoodData integration (enrichment lookups working)
- [ ] Climatiq fallback wired (unknown food → category estimate)
- [ ] `/api/v1/lookup/image` endpoint working
- [ ] `/api/v1/search` endpoint working
- [ ] Rate limiting implemented
- [ ] Error handling for all edge cases (no match, API down, etc.)
- [ ] Seed data loader script (can reload data without manual SQL)
- [ ] Endpoint tests passing: lookup, search, health check
- [ ] Logs clean (no errors on production)

**Nice to Have:**
- [ ] Performance benchmarks (ms per lookup)
- [ ] Cache strategy implemented (avoid repeated Vision calls)
- [ ] Monitoring set up (Render logs, error tracking)

### Week 3 Risk Flags

| Risk | Probability | Mitigation |
|------|-------------|-----------|
| Backend deployment issues | MEDIUM | Have local mock server ready, test locally first |
| Google Vision API key issues | LOW | Get key early, test in development |
| Data load fails | LOW | Script tested locally before production |
| Agribalyse lookup too slow | MEDIUM | Add indexes, implement caching |
| Climatiq rate limit hit | LOW | Monitor usage, budget for paid tier if needed |

### Week 3 Retro Prep

Capture blockers, surprises, and adjustments needed for Week 4.

---

## WEEK 4: TRUST LABELS & SOURCE ATTRIBUTION

### Week 4 Goal
Implement confidence labeling. Add source attribution. Ensure every result is trustworthy and explainable. Ready for mobile integration.

### Daily Standup Prompts

**Monday Week 4:**
- [ ] Confidence labeling logic implemented: exact / probable / estimate / material
- [ ] Rules clear: when is match "exact"? (perfect name match + data from Agribalyse?)
- [ ] Test: food lookup → result includes confidence label
- [ ] Source field added to result: which API/table provided this data?

**Tuesday Week 4:**
- [ ] Methodology field added: short explanation of how carbon was computed
- [ ] Example: "Using Agribalyse LCA data for this food, per serving"
- [ ] Badge logic implemented: organic, fair trade, recyclable, compostable flags
- [ ] Test: material lookup → result includes sustainability rating + badge flags

**Wednesday Week 4:**
- [ ] Result shapes finalized: food result, material result, product result
- [ ] Food result includes: name, carbon, impact tier, confidence, source, methodology, badges, equivalents
- [ ] Material result includes: name, sustainability rating, recyclable, compostable, disposal guidance, better alternative
- [ ] Source pages created: endpoints for Agribalyse detail, USDA detail, Climatiq detail, community page
- [ ] Test: access `/api/v1/source/agribalyse` → returns methodology + attribution

**Thursday Week 4:**
- [ ] End-to-end test: photo → Vision detection → Agribalyse lookup → result with confidence + source + methodology
- [ ] Data quality check: do the numbers make sense? Sanity checks?
- [ ] Trust audit: does a user reading the result understand where it came from and how confident we are?
- [ ] Edge cases tested: partial match, no match, fallback chain

**Friday Week 4:**
- [ ] All trust fields present in results (confidence, source, methodology, badges)
- [ ] No result goes out without confidence + source
- [ ] Backend production-ready for mobile integration
- [ ] Sprint 2 Retrospective held

### Week 4 Deliverables Checklist

**Must Ship:**
- [ ] Confidence labeling system: exact / probable / estimate / material (rules documented)
- [ ] Source attribution system: every result tracks source API + confidence
- [ ] Methodology field: short, clear explanation of how data was computed
- [ ] Badge system: recyclable, compostable, organic, fair trade, etc.
- [ ] Result shape contracts finalized: food, material, product specs
- [ ] Source detail endpoints: `/api/v1/source/{source_type}` returns methodology + attribution
- [ ] End-to-end test results documented (photo → result with all trust fields)
- [ ] Data sanity checks complete (LCA numbers reasonable? Comparisons make sense?)
- [ ] Trust audit: does every result earn user confidence?
- [ ] Backend documentation: how to add new foods, how confidence rules work, how to add badges

**Nice to Have:**
- [ ] Confidence score (0-100) vs labels?
- [ ] Community validation signals (if Igniters approved, boost confidence?)
- [ ] Evidence trails (why is this confidence level, not another?)

### Week 4 Risk Flags

| Risk | Probability | Mitigation |
|------|-------------|-----------|
| Confidence logic too rigid | MEDIUM | Start simple, refine based on mobile feedback |
| Source attribution confusing | LOW | Keep it simple: "From Agribalyse" not "Retrieved via Agribalyse API v2.1" |
| Badge data incomplete | LOW | Start with common 5-10, expand in Phase 2 |
| Missing edge cases | LOW | Mobile testing will surface issues, Phase 2 fixes |

### Week 4 Retro Prompts

**At end of Friday, hold Sprint 2 Retrospective:**

- [ ] **What worked?** (Backend deployment smooth? API integrations easy? Data loading?)
- [ ] **What didn't?** (Rate limits? API access issues? Data quality surprises?)
- [ ] **Blockers?** (Still stuck on anything? Need more time?)
- [ ] **Data quality feedback?** (Are LCA numbers reasonable? Do results make sense?)
- [ ] **Adjustments for Sprint 3?** (Mobile integration on track? Trust labels good enough for MVP?)
- [ ] **Lessons?** (What made backend work smooth? Reuse this pattern?)
- [ ] **Team confidence?** (Ready to wire mobile to backend, or need more backend work?)

**Document as:** `sprints/retro-sprint2.md`

---

# SPRINT 3: MOBILE ↔ BACKEND INTEGRATION & TRUST UI (Weeks 5-6)

## Sprint 3 Goal
**Wire mobile app to backend. See real food data on device. Trust labels visible. UX polished. App ready for beta testing.**

**Success Definition:**
- [ ] Mobile app calls backend for food/material lookups (no hardcoded data)
- [ ] Result screen displays all data shapes (food, material, product) correctly
- [ ] Confidence labels visible and styled correctly
- [ ] Source attribution clickable (links to detail page)
- [ ] Methodology explainable (expandable section)
- [ ] Loading/error states graceful
- [ ] TestFlight + Play Store builds created
- [ ] Design system audit complete (no drift, consistent styling)
- [ ] All 8 screens working on device

---

## WEEK 5: MOBILE API CLIENT & RESULT SCREEN

### Week 5 Goal
Connect mobile app to backend. Display real food data. Make trust labels visible. Test on device.

### Daily Standup Prompts

**Monday Week 5:**
- [ ] Mobile API client created (`src/api/client.ts`). Fetches from backend.
- [ ] Error handling: network errors, API timeouts, malformed responses.
- [ ] Retry logic: handle transient failures gracefully.
- [ ] Test: `POST /api/v1/lookup/image` from mobile → returns food result.

**Tuesday Week 5:**
- [ ] ScanScreen wired to backend. Photo → POST → wait for result → navigate to ResultScreen.
- [ ] SearchScreen wired to backend. Query → GET /search → display results.
- [ ] ResultScreen updated to display real backend data (no more hardcoded).
- [ ] Test on device: scan food → see Agribalyse data.

**Wednesday Week 5:**
- [ ] Confidence badge styled correctly (color, text, icon per design system).
- [ ] Source attribution displayed (clickable link to source detail).
- [ ] Methodology section expandable (short text on result, full text on detail page).
- [ ] Impact tier colors correct (high = red, medium = gold, low = green).

**Thursday Week 5:**
- [ ] Loading states implemented (spinner, skeleton, "Looking up...").
- [ ] Error states handled (no result, API error, etc.). User sees clear message.
- [ ] Material result shape tested (if material scan, show sustainability rating).
- [ ] Product result shape tested (if barcode scan, show product data).
- [ ] Test on device: multiple scans, multiple result types.

**Friday Week 5:**
- [ ] Full Scan → Result flow working on device (food + material + barcode).
- [ ] Trust labels visible on all results.
- [ ] No crashes. Logs clean.
- [ ] Ready for Week 6 design system polish.

### Week 5 Deliverables Checklist

**Must Ship:**
- [ ] Mobile API client (`src/api/client.ts`) with fetch, error handling, retry logic
- [ ] ScanScreen → backend integration (photo lookup working)
- [ ] SearchScreen → backend integration (text search working)
- [ ] ResultScreen displaying all backend data shapes (food, material, product)
- [ ] Confidence badges styled correctly (colors, text, icons per design system)
- [ ] Source attribution clickable (navigates to source detail page)
- [ ] Methodology section expandable (collapsible/expandable text)
- [ ] Loading states (spinners, skeleton screens)
- [ ] Error states (clear user messages for no result, API error, etc.)
- [ ] Test on 2+ devices (iOS + Android, or multiple sizes)
- [ ] No hardcoded data. All data from backend.
- [ ] Logs clean (no console errors or warnings)

**Nice to Have:**
- [ ] Offline mode scaffolding (save recent results to device)
- [ ] Cache optimization (don't re-lookup same food)
- [ ] Accessibility (alt text, color contrast, touch targets)

### Week 5 Risk Flags

| Risk | Probability | Mitigation |
|------|-------------|-----------|
| Mobile ↔ backend communication glitchy | MEDIUM | Test locally first (mock server), then production |
| Result shapes don't match backend spec | LOW | Verify API contracts in Sprint 2 |
| Performance slow (image processing takes 5+ sec) | MEDIUM | Accept for MVP, optimize in Phase 2 |
| Device-specific issues (iOS/Android differs) | MEDIUM | Test on both platforms early |

---

## WEEK 6: DESIGN SYSTEM PARITY & POLISH

### Week 6 Goal
Audit design system. Fix all styling/nav issues. Create production builds for TestFlight/Play Store. App ready for external testing.

### Daily Standup Prompts

**Monday Week 6:**
- [ ] Design system audit: are all colors using CSS variables (not hardcoded)?
- [ ] Typography audit: Plus Jakarta Sans used everywhere? Font weights correct?
- [ ] Spacing audit: padding/margin using design tokens (space-4, space-8, etc.)?
- [ ] Wordmark audit on HomeScreen: GREEN white, LIFE green, spacing correct?

**Tuesday Week 6:**
- [ ] Navigation audit: double nav bar? Missing back buttons? Stack navigation clean?
- [ ] Safe area audit: top/bottom cutoff on iOS/Android? insets applied?
- [ ] Theme audit: all screens using DarkTheme? Colors consistent?
- [ ] StatusBar audit: light/dark correct per platform?

**Wednesday Week 6:**
- [ ] All 8 screens verified on device (Splash, Login, Home, Search, Scan, Result, Community, Profile).
- [ ] No nav glitches. Transitions smooth.
- [ ] All buttons clickable, links work.
- [ ] Text readable (contrast, font size).
- [ ] Mottos on Splash/Login: all white, never green?

**Thursday Week 6:**
- [ ] Create TestFlight build (iOS). Upload to App Store Connect.
- [ ] Create Play Store build (Android). Upload to Google Play Console (internal testing first).
- [ ] Test builds on fresh device (not dev environment).
- [ ] Fix any last-minute issues (crash on splash? nav broken?).

**Friday Week 6:**
- [ ] TestFlight ready for external testers (beta link shareable).
- [ ] Play Store ready for beta/release (review submitted or staged).
- [ ] Known issues documented (what's not perfect, what will be Phase 2).
- [ ] Sprint 3 Retrospective held.

### Week 6 Deliverables Checklist

**Must Ship:**
- [ ] Design system audit complete (colors, typography, spacing, theme)
- [ ] Navigation audit: no double nav, back buttons present, stack navigation clean
- [ ] Safe area handling: no cutoff on iOS/Android
- [ ] Wordmark correct: GREEN white, LIFE green, spacing 4-6 between
- [ ] All mottos white, never green
- [ ] All 8 screens tested on device
- [ ] No crashes on startup or navigation
- [ ] TestFlight build created and uploaded
- [ ] Play Store build created and ready (internal testing or beta)
- [ ] Known issues list (what's not perfect, what's Phase 2)

**Nice to Have:**
- [ ] App icon finalized (matches design system)
- [ ] App screenshots prepared (for store listings)
- [ ] App description written (what's Green Life, 150 words)
- [ ] Privacy policy published (required for stores)

### Week 6 Risk Flags

| Risk | Probability | Mitigation |
|------|-------------|-----------|
| App Store review rejection | MEDIUM | Privacy policy, app description, no beta features |
| Play Store review slow | LOW | Submit early, follow guidelines |
| Build errors | LOW | Test builds locally before upload |
| Device compatibility | LOW | Test on 2-3 devices |

### Week 6 Retro Prompts

**At end of Friday, hold Sprint 3 Retrospective:**

- [ ] **What worked?** (Mobile integration smooth? Design system audit easy? Builds successful?)
- [ ] **What didn't?** (Design drift found? Nav issues? Performance problems?)
- [ ] **Device testing?** (Any platform-specific issues? iOS vs Android differs?)
- [ ] **User experience?** (Does the app feel polished? Responsive? Fast?)
- [ ] **Adjustments for Sprint 4?** (Community section ready? Sparks system ready?)
- [ ] **Lessons?** (What design patterns worked? Reuse in web surface?)
- [ ] **Team confidence?** (App looks ready for beta testers, or need more polish?)

**Document as:** `sprints/retro-sprint3.md`

---

# SPRINT 4: COMMUNITY SCAFFOLDING, DEPLOY, & POLISH (Weeks 7-8)

## Sprint 4 Goal
**Wire Community section. Scaffold community contributions. Deploy to stores. Ship Phase 1.**

**Success Definition:**
- [ ] CommunityScreen pulling live leaderboard data
- [ ] Sparks system working end-to-end (awarded on scan, visible in profile)
- [ ] Community contribution UX in place (report, add, edit buttons)
- [ ] Final QA passed. No crashes.
- [ ] TestFlight open for external beta.
- [ ] Play Store beta live.
- [ ] Phase 1 shipped.

---

## WEEK 7: COMMUNITY SECTION & SPARKS

### Week 7 Goal
Wire Community section. Implement Sparks system. Show Igniters leaderboard. Get community live.

### Daily Standup Prompts

**Monday Week 7:**
- [ ] CommunityScreen wired to backend. Fetches `/api/v1/community/leaderboard`.
- [ ] Top Igniters displayed with Sparks count. Gold medals top 3.
- [ ] Test: leaderboard loads, displays correctly.
- [ ] "You" pill shows current user's position on leaderboard.

**Tuesday Week 7:**
- [ ] Sparks feed implemented. Shows recent scans (who scanned what, where).
- [ ] Filterable feed (All / Food / Material / Product).
- [ ] Test: feed loads, filters work, shows community activity.
- [ ] Backend tracks: user_id, food_name, timestamp, sparks_awarded.

**Wednesday Week 7:**
- [ ] Sparks awarded on scan: `/api/v1/sparks/award` endpoint wired.
- [ ] 1 Spark per food scan. 1 Spark per menu text lookup. 2 bonus for first scan ever.
- [ ] Sparks visible in ProfileScreen. User sees their total + history.
- [ ] Test: scan food → Sparks increment → see on leaderboard.

**Thursday Week 7:**
- [ ] Material scans award Sparks. Barcode scans award Sparks.
- [ ] Sparks persist across sessions (stored in DB, not just local).
- [ ] Leaderboard updates in real-time (or near real-time, <30s refresh).
- [ ] Edge case: first user ever → gets 2 bonus Sparks?

**Friday Week 7:**
- [ ] Community section fully functional. All Igniters features live.
- [ ] Sparks system tested end-to-end: scan → award → leaderboard update.
- [ ] Ready for Week 8 community contribution scaffolding + final polish.

### Week 7 Deliverables Checklist

**Must Ship:**
- [ ] CommunityScreen wired to backend `/api/v1/community/leaderboard`
- [ ] Leaderboard displayed (Igniters ranked by Sparks)
- [ ] Gold/silver/bronze medals (top 3)
- [ ] "You" pill showing current user's rank/sparks
- [ ] Sparks feed (recent community scans filtered by type)
- [ ] Sparks awarded on scan (`/api/v1/sparks/award` endpoint)
- [ ] Sparks visible in ProfileScreen (user's total + history)
- [ ] Database tracks sparks per user per scan
- [ ] Leaderboard updates after scan (within 30s)
- [ ] No hardcoded leaderboard data

**Nice to Have:**
- [ ] Sparks animation when awarded ("You earned 1 Spark!")
- [ ] Share Sparks achievement (social sharing in Phase 2)
- [ ] Sparks history detail (what earned each spark?)

### Week 7 Risk Flags

| Risk | Probability | Mitigation |
|------|-------------|-----------|
| Leaderboard slow to load | LOW | Cache, pagination if 1000+ users |
| Sparks not incrementing | LOW | Test transaction handling in DB |
| Real-time update too slow | MEDIUM | Accept eventual consistency, Phase 2 optimizes |

---

## WEEK 8: COMMUNITY CONTRIBUTIONS SCAFFOLD & FINAL POLISH

### Week 8 Goal
Scaffold community contribution UX. Polish all features. Final QA. Deploy to stores. Ship Phase 1.

### Daily Standup Prompts

**Monday Week 8:**
- [ ] "Report incorrect data" button added to ResultScreen.
- [ ] Users can submit corrections (food name, carbon value, source, etc.).
- [ ] Backend: `/api/v1/contributions/submit` endpoint scaffolded (accepts submissions).
- [ ] Submissions stored in DB (moderation queue for Phase 2).

**Tuesday Week 8:**
- [ ] "Add new food/material" form added to SearchScreen.
- [ ] Users can suggest new foods (name, photo, carbon estimate, source).
- [ ] Submissions queued (not immediately live, pending Igniter review).
- [ ] Test: submit contribution → see confirmation message.

**Wednesday Week 8:**
- [ ] ProfileScreen "Settings" button functional (sign-out, edit profile, etc.).
- [ ] Sign-out flow: clear auth token, return to LoginScreen.
- [ ] Profile shows user's stats: total scans, total Sparks, tier/badge if applicable.
- [ ] Re-login: returns to HomeScreen.

**Thursday Week 8:**
- [ ] Final QA pass: all features, all screens, all devices (iOS + Android).
- [ ] Checklist: navigation, styling, performance, edge cases, error handling.
- [ ] No crashes on any screen transition.
- [ ] All buttons clickable, all links work.
- [ ] Text legible, colors correct, spacing consistent.

**Friday Week 8:**
- [ ] Final TestFlight build created. External testers invited.
- [ ] Final Play Store build. Beta live or staged for release.
- [ ] Known issues documented (what's Phase 2).
- [ ] Sprint 4 / Phase 1 Retrospective held.
- [ ] **Phase 1 SHIPPED.**

### Week 8 Deliverables Checklist

**Must Ship:**
- [ ] "Report incorrect" button on ResultScreen
- [ ] Contribution form on SearchScreen (add new food/material)
- [ ] Backend endpoint: `/api/v1/contributions/submit` (scaffolded)
- [ ] Submissions table in DB (moderation queue ready for Phase 2)
- [ ] ProfileScreen: sign-out working, user stats visible
- [ ] Final QA checklist completed (all screens, all devices)
- [ ] Final TestFlight build (external testers can install)
- [ ] Final Play Store build (beta or ready for release)
- [ ] Known issues list (phase 2 backlog)
- [ ] Phase 1 Retrospective document

**Nice to Have:**
- [ ] Contribution success screen (thank you message, Sparks preview)
- [ ] Community guidelines (what can you contribute?)
- [ ] Beta tester onboarding doc

### Week 8 Risk Flags

| Risk | Probability | Mitigation |
|------|-------------|-----------|
| Last-minute crashes | MEDIUM | QA early in week, not end |
| Store review rejection | LOW | Privacy policy, age rating, no beta features |
| Performance degrades with data | LOW | Monitor during beta, Phase 2 optimizes |

### Week 8 Retro Prompts

**At end of Friday, hold Phase 1 Final Retrospective:**

- [ ] **Phase 1 goals: hit or miss?** (What shipped? What slipped? Why?)
- [ ] **Data quality:** Are users seeing good results? Confidence labels helping?
- [ ] **Community:** Is gamification working? Do Igniters feel engaged?
- [ ] **Trust layer:** Does transparency help users trust the data? Feedback?
- [ ] **Technical:** What tech decisions paid off? What would we do differently?
- [ ] **Velocity:** 8 weeks realistic? Faster/slower? How to plan Phase 2?
- [ ] **Surprises:** What was easier than expected? Harder?
- [ ] **Ready for Phase 2?** (Platform hardening, web surface, data expansion)
- [ ] **Lessons for team:** (When you bring in 2-3 devs, what should they know?)

**Document as:** `sprints/retro-sprint4-phase1.md`

**Outcome:** Phase 1 complete. Mobile app shipped. Community live. Ready to scale.

---

## MANAGING RETROSPECTIVES

### Retro Format (Hold Friday EOD, 30-45 min)

1. **What worked?** (Celebrate wins. What should we keep doing?)
2. **What didn't?** (Be honest. What broke? What slowed us down?)
3. **Blockers?** (What was hardest? How did we solve it?)
4. **Adjustments?** (What should Sprint N+1 do differently?)
5. **Lessons?** (What patterns reuse? What patterns avoid?)

### Retro Output

Document each retro in:
```
sprints/retro-sprint{N}.md
```

Include:
- Answers to 5 questions above
- Risk factors that emerged
- Adjustments to next sprint plan
- Decisions made
- Lessons for onboarding team members

### Using Retros to Adapt

If Sprint 2 teaches us that API integration is faster than expected:
- Expand Phase 1 scope (add more foods, more materials)
- Compress timeline (ship Phase 1 in 6 weeks instead of 8)

If Sprint 3 discovers design system is 40% drifted:
- Allocate extra time in Sprint 4
- Adjust Phase 2 timeline upward

Retros keep the plan honest and adaptive.

---

## EXECUTION TIPS

### Stay Sane (Solo + AI Help Model)

1. **Timeblock:** 2 hours coding, 30 min standup check-in, 30 min async with Claude (code review, architectural questions)
2. **Async-first:** Most work happens async (you code, Claude reviews, Codex helps). No waiting for real-time.
3. **One task at a time:** Finish a deliverable before starting next. No context thrashing.
4. **Block-blocking decisions:** If something blocks you, pause, ask Claude, get answer within 2 hours. Don't spin.
5. **Deploy early, deploy often:** Ship to backend by end of Week 3. Wire mobile by end of Week 5. Don't wait for "perfect."

### Risk Management

1. **Weekly blockers check-in:** Every Monday, name what could go wrong this week. Have mitigation ready.
2. **Escalate fast:** If something takes >2 hours to solve, ask Claude. Don't waste time.
3. **Data quality spot checks:** Every Friday, randomly verify results (does this carbon number make sense?).
4. **Device testing early:** Don't wait until Week 6. Test on device by end of Week 3.

### Team Handoff (When 2-3 Devs Join)

Document clearly:
- What worked (keep doing)
- What didn't (don't repeat)
- Tech decisions and why
- Retro learnings
- Next sprint priorities

Make it easy for new devs to join and contribute immediately.

---

## Quick Reference: Deliverables by Sprint

| Sprint | Week | Key Deliverable |
|--------|------|---|
| **1** | 1 | `greenlife-api-research.md` (all 5 APIs researched) |
| **1** | 2 | Architecture diagram, database schema, decision matrix |
| **2** | 3 | Backend deployed, APIs integrated, data loaded |
| **2** | 4 | Trust labels working, source attribution clear |
| **3** | 5 | Mobile ↔ backend integration, real data on device |
| **3** | 6 | TestFlight + Play Store builds, design system audit |
| **4** | 7 | Community section live, Sparks system working |
| **4** | 8 | Phase 1 shipped, external beta live, retrospective |

---

## One More Thing

**This plan is adaptive, not fixed.** If you discover something better (a faster API, a smarter architecture), you adjust. If you hit a blocker, you pause, solve it, and retro on what you learned.

Retrospectives are your friend. They turn a plan into learning.

**Now go build.**

---

*Phase 1 Sprint Plan v1*  
*March 31, 2026*  
*Your daily north star for 30-60 days*
