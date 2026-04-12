# Green Life Platform Roadmap v2
## The Daily North Star Bible

**Last Updated:** March 31, 2026  
**Phase 1 Timeline:** 30-60 days (Weeks 1-8)  
**Current Focus:** Mobile foundation + food/restaurant data architecture + trust layer hardening

---

## Part 0: Vision & Purpose (Refined from v1)

Green Life is becoming a trust product, a community product, and an interface-flexible platform.

**Core Belief:**
> "If everyone knew the real impact of what they were doing, they would make different choices."

The mobile app is the first strong expression of this vision. Over five phases, Green Life evolves from a scanning app into a trust and insight platform that meets people across phones, web, voice, agents, and services.

**What Makes This Possible:**
- A community (Igniters) that validates and contributes data
- A trust layer that knows what it doesn't know
- Architecture that separates platform logic from interface
- Foundational data infrastructure that can scale and improve continuously

The roadmap below maps that journey.

---

## Part 1: Product Thesis & Strategy

### Why This Matters Now

The world is moving away from browser-only, app-only interaction. People increasingly discover and act through:
- Voice assistants
- AI agents
- Service workflows
- Embedded intelligence
- Community-driven platforms

Green Life is well-positioned for this shift because the core questions transcend UI:
- What is this?
- What does it cost (in carbon, materials, sourcing)?
- How trustworthy is the answer?
- What does the community know about it?
- What should I do next?

Those questions work in a phone app, a web browser, a voice conversation, an agent workflow, or an embedded card.

### The Three Competitive Advantages

**1. Trust as a Moat**
Confidence labeling, source attribution, methodology transparency, and community validation. These are strategic assets that strengthen over time.

**2. Community as Infrastructure**
Igniters don't just use the data—they contribute, validate, and correct it. This creates a feedback loop that makes the platform more reliable with every interaction.

**3. Interface Flexibility**
One trust layer, many surfaces. Mobile first. Web, voice, and agent follow naturally.

---

## Part 2: Core Layers (Expanded)

### Layer 1: Experience Layer
How people encounter Green Life.

**Phase 1 Focus:** Mobile app (Expo)
**Phase 3 Focus:** Web app (React, portable components)
**Phase 5 Focus:** Voice, agents, services, embeds

Key principle: All experiences should feel unmistakably like Green Life through language, trust signals, and design system.

### Layer 2: Trust Layer (The Differentiator)
How Green Life earns credibility and authority.

**Components:**
- **Source Provenance:** Where did this data come from?
- **Confidence Scoring:** Exact match / Probable / Estimate / Material estimate
- **Methodology:** How was this number computed?
- **Evidence Trails:** What data supports this conclusion?
- **Community Verification:** What do Igniters know about this?
- **Badging:** Visual signals for quick interpretation (organic, fair trade, sustainable, recyclable, etc.)

**Why This Matters:**
The trust layer is larger than any one interface. It enables Green Life to have authority whether you're in the app, on the web, in a voice flow, or inside an agent.

### Layer 3: Intelligence Layer
How Green Life interprets and responds.

**Capabilities:**
- Photo recognition (Google Vision)
- Barcode lookup (database + Climatiq)
- Text search (Agribalyse + USDA + OpenFoodFacts)
- Material analysis (sustainability rating, recyclability)
- Community signal synthesis (aggregating Sparks, validations)
- Sourcing analysis (regional, certified, claims)
- Conversational assistance (future agents)

**Why This Matters:**
The intelligence layer should be separable from UI so it can power many surfaces over time.

---

## Part 3: Current Technical Position (Phase 1 Starting Point)

### Strengths Already in Place

**Mobile Foundation:**
- Expo SDK ~52, React Native 0.76.5
- All 8 screens built (Splash, Login, Home, Search, Scan, Result, Community, Profile)
- Navigation structure complete (Stack + bottom tabs)
- Design system tokens established

**API & Backend Readiness:**
- Service layer written (visionService, foodEmissionService, materialImpactService, sparksService, usdaService, climatiqService)
- Database schema prepared (migrations 001-003)
- API endpoints designed
- Authentication pattern ready (Supabase Auth)

**Design System:**
- Plus Jakarta Sans typography system
- Color tokens defined
- Component primitives started
- Reusable patterns for badge, card, button, input

### What This Enables

- Low-friction path to deployed MVP
- Clear separation of platform logic from mobile UI
- Foundation for web portability
- Scalable data architecture

### What Still Needs Hardening

- Backend deployment (Render/Railway)
- Google Vision API integration
- Food data sourcing & enrichment (critical Phase 1 path)
- Trust labels visible on results
- Community contribution infrastructure
- Pre-computed vs. real-time lookup decisions

---

## Part 4: Phase 1 Sprint Plan — 30-60 Days (The Daily North Star)

### Phase 1 Goal

Ship a mobile app (iOS/Android testable) that demonstrates:
1. ✅ Scan food → see carbon impact with confidence label + source + packaging
2. ✅ Search for meals → see impact breakdown + alternatives
3. ✅ Trust layer visible (methodology, data source, confidence)
4. ✅ Community section shows Igniters and early Sparks
5. ✅ Backend live with real food data (Agribalyse + USDA + seed materials)
6. ✅ Foundation for community contributions (not fully wired, but scaffolded)

### Phase 1 Success Metrics

- **Functional:** Food/material scan working end-to-end
- **Data:** 80+ foods with LCA data, 10+ common materials
- **Trust:** Confidence labels visible on 100% of results
- **Deployment:** Backend live, mobile apps in TestFlight + Play Store beta
- **Community:** Igniters list populated, Sparks system tracking
- **Quality:** Design system parity, no nav glitches, safe area handling correct

---

### Sprint 1: Weeks 1-2 — Research & Integration Patterns

**Goal:** Complete food/restaurant API research. Define integration architecture. Establish backend scaffolding.

#### Week 1: API Research & Blocker Identification

**Tasks:**
- [ ] Agribalyse: Can we bulk-download? Licensing? Coverage for restaurant meals?
- [ ] OpenFoodFacts: API access, enrichment opportunities, coverage gaps
- [ ] Restaurant menu APIs: Can we map restaurant → ingredients → impact?
- [ ] Sustainability badge aggregators: Fair Trade, Rainforest Alliance, Organic lookups
- [ ] Packaging databases: Which EPD sources are free/accessible?

**Deliverables:**
- `greenlife-api-research.md` (findings, blockers, solutions)
- Decision matrix (which sources, which phase, which integration pattern)
- Agribalyse licensing resolution (critical blocker)

**Success:** All 5 API gaps researched, blockers named, Phase 1 MVP data sources locked in.

#### Week 2: Backend Architecture & Data Pipeline

**Tasks:**
- [ ] Define lookup chain: Vision → exact match → fuzzy search → category → fallback
- [ ] Design data seed schema: food, equivalents, materials, sources
- [ ] Set up database (PostgreSQL): tables, migrations, indexes
- [ ] Implement visionService.ts integration test (Google Vision API)
- [ ] Create foodEmissionService.ts with Agribalyse + USDA + fallback chain
- [ ] Create materialImpactService.ts for packaging (seed data)
- [ ] Define confidence label logic (exact / probable / estimate / material)
- [ ] Create source attribution model (where each piece of data comes from)

**Deliverables:**
- Database schema migrations (001-003) finalized
- Service layer stubs tested locally
- Data seed file (80+ foods, 10+ materials) ready to load
- Integration test suite for API chain
- Architecture diagram (Scan → Result flow with data sources)

**Success:** Backend locally testable. Data pipeline defined. All APIs accessed. No blockers.

#### Sprint 1 Retrospective (End of Week 2)

**Questions:**
- What worked? (Research process, API discovery, team coordination)
- What didn't? (Licensing issues? API rate limits? Data coverage gaps?)
- What blockers emerged? (Agribalyse licensing? Data access? Missing APIs?)
- How should we adjust Sprint 2?
- What patterns will we reuse? (API integration? Data modeling? Testing?)

**Document:** `sprints/retro-sprint1.md`

---

### Sprint 2: Weeks 3-4 — Backend Integration & Data Seeding

**Goal:** Deploy backend. Wire APIs. Seed data. Get Scan → Result flow working server-side.

#### Week 3: Backend Deploy & Core Integrations

**Tasks:**
- [ ] Deploy backend to Render/Railway
- [ ] Configure environment variables (API keys, DB connection)
- [ ] Integrate Google Vision API (test with sample images)
- [ ] Integrate Agribalyse data (bulk load or API?)
- [ ] Integrate USDA FoodData lookup
- [ ] Implement fallback to Climatiq
- [ ] Test full lookup chain end-to-end (vision → DB → result)
- [ ] Create seed data loader script (restaurants, common foods, materials)

**Deliverables:**
- Live backend at `api.greenlife.com` (or equivalent)
- All APIs responding correctly
- Seed data loaded (80+ foods, 10+ materials)
- Endpoint tests passing: `/api/v1/lookup/image`, `/api/v1/search`, `/api/v1/user/sparks`
- Logs showing no errors on production

**Success:** Backend live. All APIs wired. Data flowing.

#### Week 4: Trust Labels & Source Attribution

**Tasks:**
- [ ] Implement confidence labeling logic (exact / probable / estimate / material)
- [ ] Implement source attribution (which API returned this data?)
- [ ] Add methodology field to results (how was carbon computed?)
- [ ] Test result shapes match spec (food, material, product)
- [ ] Create source pages (Agribalyse page, USDA page, Climatiq page)
- [ ] Implement badge logic (organic, fair trade, recyclable flags)
- [ ] Load badge data for seed materials
- [ ] End-to-end test: photo → detection → lookup → result with confidence + source

**Deliverables:**
- All Result screen data shapes working
- Confidence labels on 100% of results
- Source attribution visible in result detail
- Methodology explainer accessible
- Badge logic working (recyclable, compostable, etc.)
- No result goes out without source + confidence

**Success:** Trust layer visible in mobile results. Users see where data came from.

#### Sprint 2 Retrospective (End of Week 4)

**Questions:**
- Backend deployment smooth or rocky? (What do we do differently next time?)
- API integrations: any surprises? (Rate limits? Parsing issues? Data quality?)
- Data quality: are the LCA numbers reasonable? (Sanity checks passing?)
- Blockers for Sprint 3? (Mobile integration? Data gaps? Performance?)
- What's ahead: what depends on what?

**Document:** `sprints/retro-sprint2.md`

---

### Sprint 3: Weeks 5-6 — Mobile ↔ Backend Integration & Trust UI

**Goal:** Wire mobile app to backend. See real data on device. Trust labels visible. UX polished.

#### Week 5: Mobile API Client & Result Screen

**Tasks:**
- [ ] Create mobile API client (fetch, error handling, retry logic)
- [ ] Update ScanScreen to send photo to backend → wait for result
- [ ] Update SearchScreen to query `/api/v1/search` endpoint
- [ ] Update ResultScreen to display all data shapes (food, material, product)
- [ ] Render confidence badges correctly (colors, text, icons)
- [ ] Render source attribution (linked to detail page)
- [ ] Render methodology explainer (collapsible/expandable)
- [ ] Handle loading states (spinner, skeleton)
- [ ] Handle error states (no result, API down, etc.)
- [ ] Test on device: Expo Go, full Scan → Result flow

**Deliverables:**
- Mobile talking to backend (no more hardcoded data)
- Result screen showing real Agribalyse data
- Confidence labels visible and correct
- Source attribution clickable
- Methodology explainable
- Loading/error states graceful

**Success:** User can scan food, get real impact data, trust it.

#### Week 6: Design System Parity & Polish

**Tasks:**
- [ ] Verify design system tokens used everywhere (colors, spacing, typography)
- [ ] Fix any remaining nav glitches (double nav? missing back button?)
- [ ] Fix safe area issues (top/bottom cutoff on Android/iOS)
- [ ] Verify all 8 screens using correct theme (DarkTheme, color tokens)
- [ ] Check wordmark on HomeScreen (GREEN white, LIFE green, spacing correct)
- [ ] Verify all three mottos in white, never green
- [ ] Test on multiple devices (iPhone, Android sizes)
- [ ] Create beta build for TestFlight
- [ ] Create beta build for Play Store
- [ ] Document any known issues

**Deliverables:**
- TestFlight beta build (iOS)
- Play Store beta build (Android)
- All design system tokens used correctly
- Zero nav glitches
- Safe areas handled
- Wordmark and mottos correct

**Success:** App ready for external testers. Looks and feels professional.

#### Sprint 3 Retrospective (End of Week 6)

**Questions:**
- Mobile integration: any surprises with API calls? (Timeouts? Parsing?)
- Design system work: how much drift was there? (Big refactor or minor tweaks?)
- Device testing: any platform-specific issues? (iOS vs Android differences?)
- Performance: is the app snappy? (Loading times? Render performance?)
- What's blocking the final push to Phase 1 done?

**Document:** `sprints/retro-sprint3.md`

---

### Sprint 4: Weeks 7-8 — Community Scaffolding, Deploy, & Polish

**Goal:** Wire Community section. Scaffold community contributions. Deploy to stores. Ship Phase 1.

#### Week 7: Community Section & Sparks

**Tasks:**
- [ ] Wire CommunityScreen to backend: `/api/v1/community/leaderboard`
- [ ] Display top Igniters with Sparks count
- [ ] Display recent Sparks feed (who scanned what, where)
- [ ] Implement filter (All / Food / Material / Product)
- [ ] Add "You" pill to current user's leaderboard position
- [ ] Create `/api/v1/sparks/award` endpoint (backend awards on scan)
- [ ] Create `/api/v1/sparks/user` endpoint (get user's total + history)
- [ ] Implement Sparks increment on scan (1 Spark per food scan, 2 bonus for first)
- [ ] Wire ProfileScreen to show user's Sparks + tier
- [ ] Test: scan something, verify Sparks awarded, see on leaderboard

**Deliverables:**
- CommunityScreen pulling live data
- Leaderboard ranked and sorted
- Sparks system working end-to-end
- ProfileScreen showing user stats
- Sparks awarded on each scan
- Feed showing community activity

**Success:** Community layer live. Igniters can see their impact. Gamification working.

#### Week 8: Community Contributions Scaffold & Final Polish

**Tasks:**
- [ ] Create `/api/v1/contributions/submit` endpoint (not fully wired, but scaffolded)
- [ ] Add "Report incorrect data" button to ResultScreen (UX in place)
- [ ] Add "Add new food/material" form to SearchScreen (UX in place, submissions queued)
- [ ] Create submissions table in DB (ready for Phase 2 moderation)
- [ ] Wire ProfileScreen "Settings" (view only for Phase 1)
- [ ] Add sign-out flow (clear local auth, return to Login)
- [ ] Final QA pass: all features, all screens, all devices
- [ ] Prepare store submission docs (privacy policy, screenshots, description)
- [ ] Final TestFlight build
- [ ] Final Play Store build

**Deliverables:**
- Community contribution UI in place (not fully functional, but visible)
- Sign-out working
- Final QA complete
- TestFlight ready for external beta
- Play Store ready for beta/release

**Success:** Phase 1 complete. App in stores. Community infrastructure ready for Phase 2.

#### Sprint 4 Retrospective (End of Week 8) — Phase 1 Retrospective

**Questions:**
- Phase 1 goals: hit or miss? (What shipped? What slipped?)
- Data quality: are users seeing good results? (Feedback loops?)
- Community: is the gamification working? (Are Igniters engaged?)
- Trust layer: does transparency help users trust the data? (Feedback?)
- Technical: what tech decisions paid off? (What would we do differently?)
- Next phase: what learnings carry forward?

**Document:** `sprints/retro-sprint4-phase1.md`

**Outcome:** Phase 1 complete. Ready to move to Phase 2: Platform Hardening.

---

## Part 5: Phase 2-5 Overview (Strategic Roadmap)

### Phase 2: Platform Hardening (Sprints 5-8, Weeks 9-16)

**Goal:** Formalize domain model. Separate platform logic from UI. Prepare for multi-surface deployment.

**Priorities:**
- Formalize domain model (items, sources, confidence, badges, sparks, community signals)
- Separate backend services (lookup, search, item detail, source detail, user/community)
- Create stable service contracts (what mobile, web, agents can expect)
- Expand data enrichment (food sourcing, restaurant mapping, material alternatives)
- Build community contribution moderation system
- Document how trust works (confidence, evidence, badging)

**Success Metrics:**
- 200+ foods with complete LCA + sourcing data
- 50+ restaurant chains mapped to menu data
- Community submissions moderation queue live
- Platform logic testable independently of UI
- Service contracts documented and stable
- Web surface ready for Phase 3 launch

**Data/API Focus:**
- Agribalyse enrichment (sourcing, certifications)
- Restaurant menu mapping (ChainEating, OpenFoodFacts)
- Material alternatives suggestions
- Community validation infrastructure

---

### Phase 3: Web Surface (Sprints 9-12, Weeks 17-24)

**Goal:** Launch web-based Green Life for exploration, interpretation, community.

**Suggested Flows:**
- Home (web version)
- Search (expanded on web, not native capture)
- Community (richer desktop layout)
- Item Detail (deep dive into one food/material)
- Source Detail (transparency pages)
- Profile (user activity, settings)

**Principle:** Do not force mobile-native capture into web. Let web excel at what it's good at: exploration, trust review, community interaction.

**Success Metrics:**
- Web app live at greenlife.com
- Mobile + web feature parity (except camera)
- 50% of community interaction on web
- Design system consistent across surfaces

---

### Phase 4: Trust Layer Expansion (Sprints 13-16, Weeks 25-32)

**Goal:** Make trust and transparency public, linkable, embeddable.

**Priorities:**
- Source pages (Agribalyse page, USDA page, Climatiq page, community page)
- Methodology pages (how carbon is computed, confidence rules, badge criteria)
- Evidence trails (what data supports this conclusion?)
- Public API (partners, researchers, public can access trust data)
- Embeddable trust cards (restaurants, retailers can embed Green Life data)
- Trust explainers (why we chose these sources, not those)

**Success Metrics:**
- 20+ source/methodology pages live
- Public API serving 1K+ calls/day
- 10+ partners using embedded trust cards
- Community trusts Green Life as authoritative source

---

### Phase 5: Agent & Service Interfaces (Sprints 17+, Weeks 33+)

**Goal:** Make Green Life available through assistants, agents, workflows, services.

**Potential Directions:**
- Voice-first assistant ("Alexa, what's the impact of this?")
- Chat agent (Claude, ChatGPT plugins for Green Life)
- Restaurant POS integration (scan during ordering, see impact)
- Retailer integration (shelf tags with Green Life data)
- Partner APIs (other apps can use Green Life trust layer)
- Workflow automation (Zapier, IFTTT)

**Success Metrics:**
- Agent-accessible endpoints live
- 5+ active partnerships
- 10K+ users discovering Green Life through agents/partners
- Trust layer becomes industry standard

---

## Part 6: Data & API Architecture (Phase 1 Critical Path)

### The Food/Restaurant Use Case

The restaurant meal use case is **Phase 1's competitive advantage and data moat**.

**Why:** If a user can point at a restaurant menu, see what they're eating, and understand the impact, Green Life becomes indispensable for that use case. This is where the Igniters community makes the most difference.

### API Sourcing Strategy (Phase 1 → Phase 2 → Phase 3)

| API | Phase 1 | Phase 2 | Phase 3 | Notes |
|-----|---------|---------|---------|-------|
| **Agribalyse** | 60-80 foods, bulk | Expand to 200+, sourcing data | Public trust pages | Free EU food data, export required |
| **USDA FoodData** | Enrichment only | Regional sourcing, certifications | Public lookups | Free US data, 400K+ foods |
| **Climatiq** | Fallback for unknowns | Extended categories | Public API | Free tier 100/mo, paid after |
| **OpenFoodFacts** | Not Phase 1 | Phase 2: enrichment source | Community contributions | 3M+ products, crowdsourced |
| **Restaurant menus** | Seed data only (manual) | Phase 2: ChainEating API? | Smart parsing | Hard to automate, start manual |
| **Sustainability badges** | Hardcoded initial list | Phase 2: API integration | Public badges | Rainforest Alliance, Fair Trade APIs exist |
| **Material EPD** | Seed data (10 materials) | Expand to 30, EPD lookup | Public sourcing | Limited free data, mostly proprietary |

### Community Contribution Model

**Phase 1:** "Report incorrect" button scaffolded, submissions collected
**Phase 2:** Moderation queue, Igniters review submissions, approve/reject
**Phase 3:** Community-contributed foods go live (after Igniter validation)

This is where the movement scales.

---

## Part 7: Trust Layer Hardening Stages

### Stage 1 (Phase 1): Visibility
- ✅ Confidence label visible (exact / probable / estimate / material)
- ✅ Source visible (Agribalyse / USDA / Climatiq)
- ✅ Methodology explainable (one sentence: "Using Agribalyse LCA data for this food")

### Stage 2 (Phase 2): Documentation
- Evidence trails (what data supports this number?)
- Detailed methodology pages (how is carbon computed?)
- Badge criteria (why is this marked "recyclable"?)
- Community validation signals (how many Igniters verified this?)

### Stage 3 (Phase 3): Authority
- Public trust pages (Agribalyse page, USDA page, community page)
- Embeddable trust cards
- Partner verification (restaurants, retailers linked to Green Life)
- Public API for researchers, journalists, partners

### Stage 4 (Phase 4-5): Ecosystem
- Trust layer becomes industry standard
- Partners integrate Green Life as source of truth
- Agents/services use Green Life trust scoring
- Community becomes self-sustaining (Igniters moderate each other)

---

## Part 8: Resource Model & Team Evolution

### Phase 1 (Weeks 1-8)
**Team:** You (solo) + Claude + Codex
- Claude: planning, architecture, research, code review
- Codex: implementation assistance
- You: decision-making, integration testing, deployment

### Transition (End of Phase 1)
Bring in 2-3 developers

**Roles:**
- Backend developer (API, database, ETL)
- Mobile developer (iOS/Android refinement, TestFlight management)
- Data engineer (enrichment, community moderation queue, reporting)

### Phase 2+ (Weeks 9+)
**Team:** You (lead) + 2-3 developers + Claude/AI tools
- You: product direction, community, strategy, decision-making
- Backend dev: API scaling, service hardening
- Mobile dev: app maintenance, store releases
- Data dev: enrichment pipelines, ETL, moderation

**Key principle:** Avoid management overhead. Keep team small, autonomous, aligned on north star.

---

## Part 9: Success Metrics & Reporting

### Phase 1 Success Criteria

| Metric | Target | How We Measure |
|--------|--------|---|
| **Mobile app** | TestFlight + Play Store beta | Builds submitted and approved |
| **Food data** | 80+ foods with carbon | Count in DB, sanity checks |
| **Trust visibility** | 100% of results have confidence label + source | QA checklist |
| **Backend uptime** | 99%+ | Monitoring/logs on Render |
| **Scan end-to-end** | Works on device | Test on 2+ devices |
| **Sparks system** | Igniters see their score | Manual verification |
| **Design system** | Zero breaking drift | Design token audit |

### Phase 2-5 Success Criteria

- **Data coverage:** 200+ foods (P2), 500+ (P3), 1000+ (P4+)
- **Community:** 50 Igniters active (P2), 500+ (P3), 5000+ (P4+)
- **Trust:** Public API live (P3), 10+ partners (P4)
- **Surfaces:** Web live (P3), agent ready (P5)
- **Authority:** Industry trust score (P4+)

---

## Part 10: Principles & North Star

### Product Principles (Refined from v1)

**1. Build for many surfaces, not one container**
Decisions favor reusable platform capabilities over UI shortcuts.

**2. The trust layer is the moat**
Confidence, methodology, provenance, evidence, and community legitimacy are strategic assets that compound over time.

**3. Community is part of product truth**
Igniters don't just use the data—they contribute, validate, and improve it. This makes the product stronger.

**4. Design system consistency is strategic**
The ability to scale coherently across mobile, web, voice, and agents depends on design system discipline.

**5. Native features are clients of the platform**
Camera, voice, device sensors sit on top of the same trust and intelligence layers that power web and agents.

**6. The product should be explainable everywhere**
Green Life should explain itself clearly whether you're in the app, on the web, in a voice conversation, or inside an agent response.

**7. Transparency over precision**
We will not pretend to know more than we do. A confident "this is an estimate" builds more trust than an uncertain "this is exact."

### The Daily North Star

> "We are building a trust platform for the world people see. We help them understand the impact of what they're looking at. We invite their community to validate and correct us. We make that insight available everywhere they need it."

Every decision—from which API to use, to how to label a result, to when to release—returns to this.

---

## Part 11: Risk Register & Mitigation

### Critical Risks (Phase 1)

| Risk | Impact | Mitigation |
|------|--------|-----------|
| **Agribalyse licensing** | Can't bulk-download food data | Research week 1; fallback to Climatiq + USDA |
| **Google Vision API cost** | Per-image cost too high | Budget test, consider local fallback |
| **Backend deployment delays** | Mobile can't launch | Start early, have Render account ready |
| **Data quality issues** | Results seem wrong to users | QA checklist, Igniters validate in Phase 2 |
| **Solo burnout** | Scope creep, late nights | Strict sprint boundaries, retros catch overload |

### Mitigation Strategies

- **Week 1 research:** Identify all blockers before sprint 1 ends
- **Budget test:** Use paid APIs in test mode, monitor costs
- **Scope protection:** Retros allow explicit scope reduction if needed
- **Team support:** Claude available 24/7 for unblocking
- **Escalation path:** If blockers emerge, pause, retro, adjust

---

## Part 12: Immediate Next Steps (Starting Now)

### This Week (Week 1)

1. ✅ Confirm this roadmap (you're reading it)
2. ⏭️ Start Sprint 1 Week 1 API research
3. ⏭️ Create ClickUp epic for Phase 1 + 4 sprints
4. ⏭️ Set up project folder structure locally
5. ⏭️ Reserve Render.com account + test deployment

### By End of Week 2

- [ ] All 5 API gaps researched
- [ ] Agribalyse licensing path clear
- [ ] Data seed file ready
- [ ] Backend schema defined
- [ ] First retro complete

### By End of Week 4

- [ ] Backend deployed and live
- [ ] All APIs integrated
- [ ] Data loaded
- [ ] Trust labels working

### By End of Week 8

- [ ] Phase 1 complete
- [ ] Mobile in stores
- [ ] Community live
- [ ] Ready for Phase 2

---

## Part 13: Closing Statement

This roadmap is your north star. It answers:
- Where are we going? (Phases 1-5)
- How do we get there? (Sprints with retros)
- What do we build first? (Food/restaurant data + trust layer)
- When are we done? (30-60 days for Phase 1)
- Who are we building for? (Igniters + conscious consumers)
- Why does it matter? (People make better choices when they know the truth)

Every decision—from code to API choice to community feature—should connect back to this roadmap.

Retrospectives keep it real. If something isn't working, we adjust. If we're learning something new, we incorporate it.

This is not a fixed plan. It's an adaptive guide.

**Now: Start Sprint 1, Week 1. Research the APIs. Report blockers. We move fast, we learn faster.**

---

*Green Life Platform Roadmap v2*  
*March 31, 2026*  
*The Daily North Star Bible*
