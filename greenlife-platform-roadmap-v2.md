# Green Life Platform Roadmap v2
## The Daily North Star & Bible

**Last Updated**: March 31, 2026  
**Version**: 2.0 — Enhanced with Sprint Structure, Metrics, & Data Architecture  
**Owner**: Lee Williams, Edelleye Digital  
**Audience**: Daily reference for Lee, future team members, investors, and community

---

## Executive Summary

Green Life is evolving from a mobile app into a **universal trust and insight platform** available across phones, web, agents, and services.

Phase 1 (30-60 days) establishes the mobile foundation and begins data architecture hardening with a focus on **food and restaurant impact visibility** — the first moat. Phases 2-5 scale the platform, deepen the trust layer, expand to new surfaces, and enable community and agent participation.

This roadmap is a **living document**. Each sprint ends with a retrospective that informs the next sprint. Success is measured through metrics, not just features shipped.

---

## Part 1: Core Product Vision (Unchanged)

### Product Thesis

Green Life helps people understand the world around them with real insights, clear trust signals, and community-powered meaning.

At its heart, Green Life is not only about scanning, searching, or looking up products. It is about:

- making hidden costs legible
- creating a trust layer around materials, sourcing, impact, and claims
- inviting community participation, interpretation, and correction
- turning everyday awareness into action
- making that capability available through whatever interface people are using

The product should be understood as a movement-oriented platform with multiple interfaces, not as a single mobile container.

### Core Layers (Unchanged)

#### 1. Experience Layer
How people encounter Green Life: mobile app, web, voice, agent, partner embeds, APIs.

#### 2. Trust Layer
The core differentiator: source provenance, methodology, confidence scoring, community verification, badging, evidence trails, transparent explanations, public data integrations.

#### 3. Intelligence Layer
How Green Life interprets: barcode lookup, image recognition, search, ranking, material analysis, conversational assistance, community signal synthesis, agent workflows.

### Strategic Position (Unchanged)

Green Life is positioned for a shift from page-based discovery to answer-based and agent-mediated discovery. The product's core questions work across all surfaces:

- What is this?
- What does it cost?
- How trustworthy is the answer?
- What does the community know?
- What should I do next?

---

## Part 2: The Competitive Moat — Food & Restaurant Impact

### Why This Matters

The food/restaurant space is uniquely positioned as Green Life's first defensible moat because:

1. **High-frequency decision point**: People eat 3x daily. Every meal is an impact decision.
2. **Hidden information**: Restaurant sourcing, material packaging, and supply chain are opaque. Green Life makes them visible.
3. **Community validates**: Igniters can photograph menus, materials, and contribute regional sourcing knowledge that no API provides.
4. **Multi-layer impact**: Food + packaging + restaurant materials + local context = rich data story.
5. **Movement alignment**: "What I eat determines the world I create" — aligns perfectly with the founding vision.

### Phase 1 MVP — The Moat in Action

By end of Phase 1 (60 days):

A user can:
1. **Open Green Life** in a restaurant
2. **Scan the menu** (photo or manual entry)
3. **See the impact**: Grilled salmon (0.8 kg CO₂e) + asparagus (0.05 kg CO₂e) + olive oil (0.12 kg CO₂e)
4. **See the confidence**: Exact match / Probable / Estimate badges with source attribution
5. **See the materials**: Plate (ceramic, reusable), napkin (paper, compostable), straw (plastic, harmful alternative shown)
6. **See community input**: "This restaurant sources cage-free eggs" — tagged by Igniter, verified
7. **See the methodology**: How the number was computed, what data sources fed it
8. **Contribute**: Scan the menu again, submit corrections, earn Sparks, help the fire spread

This is the **first expression of the moat**. Everything else builds on this.

### Data Architecture — The Hidden Engine

To deliver this, Phase 1 hardensthe data layer:

- **Tier 1**: Food LCA (Agribalyse + USDA enrichment + Climatiq fallback)
- **Tier 2**: Restaurant mapping (menu structure, sourcing commitments, sustainability badges)
- **Tier 3**: Packaging materials (seed data for common restaurant items: straws, cups, napkins, utensils)
- **Tier 4**: Community contributions (Igniters add/validate sourcing, materials, regional impacts)

The gaps in Tier 2 & 4 are where the **movement** does its work. The Igniters close the visibility gap. That's the moat.

---

## Part 3: Phases 1-5 With Sprint Structure & Metrics

### Phase 1: Mobile Foundation + Data Architecture Hardening
**Duration**: 30-60 days (Weeks 1-8)  
**Status**: IN PROGRESS  
**Owner**: Lee (solo + AI help, recruiting 2-3 developers by end)

#### Objective
Stabilize the mobile app as the first high-quality expression of the platform. Establish the food/restaurant data architecture and trust layer as the foundation for all future surfaces.

#### Key Priorities
1. ✅ Complete design-system parity (already mostly done)
2. 🔄 **Harden the API integration layer** (what this phase focuses on)
3. 🔄 **Integrate food/restaurant data sources** (Agribalyse, USDA, Climatiq, material seed data)
4. 🔄 **Make trust signals explicit** (confidence badges, source attribution, methodology explainers)
5. 🔄 **Wire community contribution** (basic scaffolding for Igniter submissions)
6. ✅ Deploy backend + mobile to TestFlight/Play Store

#### Sprint Breakdown

##### **Sprint 1: Research & Integration Patterns** (Weeks 1-2)
**Goal**: Define the data architecture and establish how APIs will connect to the platform.

**Deliverables**:
- [ ] Complete food/restaurant API research (Agribalyse, USDA, OpenFoodFacts, restaurant APIs, packaging materials)
- [ ] Document integration patterns for each source
- [ ] Identify critical blockers (licensing, data gaps, access)
- [ ] Create data flow diagram (input → detection → lookup → trust label → result)
- [ ] Define the community contribution model (what Igniters can add/validate in Phase 1)
- [ ] Seed data prepared for Phase 2 integration (100-150 foods + 20-30 materials)

**Success Criteria**:
- Research complete and blockers identified
- Integration patterns documented for each source
- Data diagram understood by Lee and any future team members
- No licensing red flags (or workarounds defined)

**Retrospective Slot** (End of Week 2):
- [ ] What research went smoothly? What took longer than expected?
- [ ] Which API should we prioritize first for integration?
- [ ] Are there unexpected data gaps? How do we address them?
- [ ] Does the community contribution model feel achievable in Phase 1?

---

##### **Sprint 2: Backend Wiring & Data Integration** (Weeks 3-4)
**Goal**: Integrate food/restaurant data sources into the backend. Wire the Scan → Result data flow.

**Deliverables**:
- [ ] Backend service files enhanced (visionService, foodEmissionService, materialImpactService)
- [ ] Agribalyse data imported + USDA enrichment wired
- [ ] Climatiq fallback integrated (for category estimates)
- [ ] Material impact database seeded (straws, cups, napkins, utensils, common materials)
- [ ] Food lookup chain working: Vision API → exact match → alias → fuzzy → category → Climatiq → NO_DATA
- [ ] Material lookup chain working: Vision API → match → sustainability rating → alternatives
- [ ] Confidence labeling system operational (exact / probable / estimate)
- [ ] Source attribution for each result (where did this data come from?)

**Success Criteria**:
- [ ] Scan food photo → Result shows impact + confidence label + source
- [ ] Scan material photo → Result shows sustainability rating + recyclability + alternatives
- [ ] Fallback chains working (no timeouts, graceful degradation)
- [ ] All APIs returning expected data structures
- [ ] Backend tests passing (happy path + error cases)

**Risks & Blockers**:
- Agribalyse access restricted? → Use USDA + Climatiq fallback
- Google Vision misidentifying foods? → Manual text search fallback active
- Rate limits on APIs? → Implement caching + batch pre-computation

**Retrospective Slot** (End of Week 4):
- [ ] Which data source integrated smoothest? Which was hardest?
- [ ] Did the lookup chain work as designed, or did we adjust?
- [ ] Are there obvious data gaps (foods we can't identify)?
- [ ] Should Sprint 3 focus on accuracy or coverage first?

---

##### **Sprint 3: Mobile → Backend Integration & Trust Visibility** (Weeks 5-6)
**Goal**: Wire the mobile app to the backend. Make trust signals visible in the UI.

**Deliverables**:
- [ ] Scan screen wired to backend (photo upload, detection, lookup)
- [ ] Result screen consuming backend results (food shape, material shape, product shape)
- [ ] Confidence badges rendering correctly (exact match / probable / estimate)
- [ ] Source attribution visible (data came from: Agribalyse / USDA / Climatiq / Community)
- [ ] Methodology explainer accessible ("How was this number computed?")
- [ ] Equivalents strip showing impact context (miles driven, phone charges, tree days, streaming hours)
- [ ] Material alternatives displayed (if plastic straw, show paper alternative)
- [ ] Profile screen showing real stats (scans count, Sparks earned, impact surfaced)
- [ ] Community screen wired to live backend (leaderboard, Sparks feed, impact banner)

**Success Criteria**:
- [ ] End-to-end flow works: photo → backend → result with all trust signals visible
- [ ] Confidence labels match the data confidence (not overstated)
- [ ] Sources attributed correctly (user can verify)
- [ ] Methodology is explainable without opening a textbook
- [ ] App performs smoothly (no lag in result rendering)

**Risks & Blockers**:
- Backend latency? → Implement caching + progressive loading
- Trust labels confusing to users? → Refine copy + add tooltips
- Result screen too information-dense? → Prioritize what's visible vs. expand-on-tap

**Retrospective Slot** (End of Week 6):
- [ ] Did the mobile ↔ backend integration work as expected?
- [ ] Are trust signals landing with users, or do they need refinement?
- [ ] What's the most common user confusion or friction?
- [ ] Are we ready to open community contribution in Sprint 4, or delay to Phase 2?

---

##### **Sprint 4: Community Contribution + Polish + Deploy** (Weeks 7-8)
**Goal**: Wire community contribution scaffolding. Polish the app. Deploy to TestFlight/Play Store. Complete Phase 1.

**Deliverables**:
- [ ] Igniter contribution flow designed + scaffolded (submit correction, add new food/material, flag bad data)
- [ ] Moderation queue infrastructure (backend + UI for review)
- [ ] Sparks awarded for contributions (1 Spark per contribution, +2 bonus for first)
- [ ] Bug fixes + UX polish based on Sprint 3 findings
- [ ] Performance optimization (load times, memory, battery)
- [ ] Accessibility audit (color contrast, text sizing, screen reader support)
- [ ] Trust layer documentation live (methodology, confidence labels, badge definitions)
- [ ] Backend deployed to Render (or Railway)
- [ ] App built + submitted to TestFlight (iOS) + Play Store (Android)
- [ ] Onboarding flow for new users (splash → login → first scan guidance)

**Success Criteria**:
- [ ] App ships to TestFlight + Play Store without critical bugs
- [ ] Community contribution flow is live (even if moderation is manual at first)
- [ ] Sparks system working + visible in Community screen
- [ ] Methodology + badge definitions are publicly readable
- [ ] Performance targets met (app loads in <2s, result in <3s)

**Risks & Blockers**:
- App review delays from Apple/Google? → Start submission early
- Community contribution model attracts spam? → Moderation queue ready
- Performance issues emerge? → Profile + optimize immediately

**Retrospective Slot** (End of Week 8 / End of Phase 1):
- [ ] Did Phase 1 ship on schedule? What slowed us down?
- [ ] What worked well that we should keep doing?
- [ ] What surprised us (good or bad)?
- [ ] What should Phase 2 prioritize?
- [ ] Are we ready to onboard developers? What are their onboarding priorities?
- [ ] How do we capture lessons for the team?

---

#### Phase 1 Success Metrics

By end of Phase 1, measure success:

| Metric | Target | How Measured |
|--------|--------|--------------|
| **Data Coverage** | 150+ foods in database, 20+ materials | Food/material lookup success rate |
| **Confidence Accuracy** | 85%+ of results show correct confidence label | Manual QA testing |
| **Performance** | App loads <2s, result renders <3s | App analytics + TestFlight feedback |
| **Community Ready** | Contribution flow live + 5+ Igniters testing | ClickUp + Slack feedback |
| **Trust Transparency** | Methodology + badge definitions live + readable | Public docs + user testing |
| **Deployment** | Backend live on Render, app on TestFlight/Play Store | Deploy logs + store pages |

---

### Phase 2: Platform Hardening & Data Enrichment
**Duration**: 60-90 days (Weeks 9-17)  
**Status**: BACKLOG  
**Owner**: Lee + 2-3 developers (recruited in Phase 1)

#### Objective
Clarify and strengthen the system beneath the UI. Enrich data with community input. Build the ETL pipelines that keep data fresh and accurate.

#### Key Priorities
1. Formalize the domain model (items, sources, confidence, badges, sparks, community signals)
2. Separate platform logic from screen logic
3. Define a stable service layer for all queries
4. Build ETL pipelines (data ingestion, validation, enrichment from community)
5. Create clearer contracts for backend + public API integration
6. Document how trust, evidence, and badging work

#### Deliverables (High Level)
- Domain model fully specified (schema design doc)
- Backend service layer refactored (clear contracts)
- ETL pipelines for data refresh (daily/weekly automated)
- Community contribution moderation fully automated
- Public API docs (future agent/service access)
- Test coverage >80%

#### Phase 2 Success Metrics
- Data coverage: 500+ foods, 50+ materials
- Community contributions: 20+ validated Igniters, 100+ corrections/additions
- ETL uptime: 99%+ pipeline success rate
- Test coverage: 80%+ code coverage
- API latency: p95 <500ms on all endpoints

---

### Phase 3: Web Surface
**Duration**: 45-60 days (Weeks 18-24)  
**Status**: BACKLOG  
**Owner**: Lee + team

#### Objective
Launch a web-based Green Life experience for exploration, interpretation, trust review, and community interaction.

#### First Web Surfaces
- Home (dashboard, recent scans)
- Search (ingredient/material/item lookup)
- Community (leaderboard, Sparks feed, impact stats)
- Item Detail (deep dive on any food/material)
- Source Detail (methodology + evidence + badge criteria)
- Profile (user stats, saved items, contribution history)

#### Design Principle
Do not force mobile-native capture behaviors into web. Let web be excellent at exploration, interpretation, and community.

#### Phase 3 Success Metrics
- Web traffic: 30% of mobile by end of phase
- Feature parity: All core flows from mobile available on web
- Performance: Web loads <1.5s, faster than app
- Retention: Web users engage 2+ times/week

---

### Phase 4: Trust Layer Expansion
**Duration**: 60-90 days (Weeks 25-34)  
**Status**: BACKLOG  
**Owner**: Lee + team

#### Objective
Make trust and transparency a first-class public capability. Build credibility through transparency.

#### Key Deliverables
- Richer source pages (where did this data come from? who validates it?)
- Clearer provenance trails (every number → data source → methodology → evidence)
- Methodology + evidence pages (open, readable, citable)
- Badge definitions + criteria (why did this get this badge?)
- Trust explanations linkable + embeddable (share a trust report)
- Public trust artifacts (trust scorecard, impact verification, community consensus)

#### Phase 4 Success Metrics
- Trust artifact views: 10K+ monthly
- Community citations: 50+ research institutions linking to Green Life methodology
- Badge trust: 90%+ user agreement that badges are fair
- Public data: 100+ datasets in open format

---

### Phase 5: Agent & Service Interfaces
**Duration**: 90+ days (Weeks 35+)  
**Status**: BACKLOG  
**Owner**: Lee + team

#### Objective
Allow Green Life to participate in a world where users increasingly act through assistants, agents, and service workflows.

#### Potential Directions
- Agent-accessible lookup + explanation endpoints
- Structured result objects designed for assistant consumption
- Embeddable trust + source cards (use Green Life trust in other apps)
- Partner API integrations (retailers, restaurants, delivery services)
- Voice-first + multimodal assistant experiences
- Workflow integrations (trust scoring for supplier selection, menu optimization, material sourcing)

#### Phase 5 Success Metrics
- API calls: 100K+ monthly from partner services
- Agent integrations: 3+ assistant platforms
- Voice queries: 1K+ daily
- Partner revenue: $10K+ MRR (if monetized)

---

## Part 4: Product Principles Going Forward

### 1. Build for Many Surfaces, Not One Container
Decisions increasingly favor reusable platform capabilities over UI-specific shortcuts. A food lookup works the same way whether the user is in the app, on the web, or asking a voice assistant.

### 2. The Trust Layer Is the Moat
Confidence, methodology, provenance, evidence, and community legitimacy are strategic assets. They're what create defensibility when every other product copies the feature set.

### 3. Community Is Part of Product Truth
Community input, sparks, rankings, contributions, and shared interpretation strengthen the product over time. Igniters aren't just users — they're the data engine.

### 4. Design System Consistency Is Strategic, Not Cosmetic
The design system is what allows Green Life to scale coherently across interfaces and teams. It's how mobile, web, and future services feel unmistakably like Green Life.

### 5. Native Features Are Clients of the Platform
Camera, voice, device sensors, and other hardware-led experiences sit on top of the same underlying trust and intelligence layers. The platform layer doesn't care how the user input arrived.

### 6. The Product Should Be Explainable Everywhere
Green Life should explain itself in a screen, in a browser, in a shared card, in a voice reply, or in an agent response. Trust signals are portable.

### 7. Retrospectives Drive Adaptation
Each sprint ends with a look back. What worked? What didn't? How do we adjust? This keeps the product honest and the team learning.

---

## Part 5: Immediate Execution Roadmap (Next 60 Days)

### Week 1-2: Sprint 1 — Research & Integration Patterns
**Deliverable**: Food/restaurant API research complete. Integration patterns defined.

### Week 3-4: Sprint 2 — Backend Wiring & Data Integration
**Deliverable**: Food/material lookup chains working. Confidence labels operational.

### Week 5-6: Sprint 3 — Mobile ↔ Backend Integration
**Deliverable**: End-to-end Scan → Result flow live with all trust signals.

### Week 7-8: Sprint 4 — Community + Polish + Deploy
**Deliverable**: App on TestFlight/Play Store. Community contribution scaffolding live. Phase 1 complete.

### Weeks 9-17: Phase 2 (Parallel Development)
As Phase 1 stabilizes, Phase 2 begins: data enrichment, ETL pipelines, service layer refactor.

---

## Part 6: Metrics Dashboard — North Star Indicators

Track these continuously. Adjust roadmap if metrics diverge:

### User & Adoption
- Weekly active users (target: 100+ by end of Phase 1, 1K+ by end of Phase 2)
- Scan volume per user (target: 3+ scans/week by end of Phase 1)
- Igniter sign-ups (target: 50+ by end of Phase 1, 500+ by end of Phase 2)
- Retention D7/D30 (target: 60%+ D7, 40%+ D30 by end of Phase 1)

### Data Quality & Coverage
- Food database coverage (target: 150+ foods Phase 1, 500+ Phase 2)
- Material database coverage (target: 20+ materials Phase 1, 50+ Phase 2)
- Community contributions (target: 50+ validated contributions by end of Phase 2)
- Data accuracy (target: 90%+ correct confidence labels by end of Phase 1)

### Trust & Transparency
- % results with source attribution (target: 100% by end of Phase 1)
- % results with methodology explainable (target: 90% by end of Phase 1)
- Methodology doc views (target: 1K+ monthly by end of Phase 1)
- Community trust score (target: 8.5+/10 by end of Phase 2)

### Platform Health
- API response time p95 (target: <500ms Phase 1, <300ms Phase 2)
- Uptime (target: 99.5% by end of Phase 1)
- Test coverage (target: 70% Phase 1, 85%+ Phase 2)
- Bug escape rate (target: <5% critical bugs reaching production)

---

## Part 7: Near-Term Execution Guidance

For the next 60 days, follow this sequence:

1. **Complete Sprint 1** (Weeks 1-2): Research done. Patterns defined.
2. **Verify with Lee before Sprint 2**: Any blockers? Adjust scope?
3. **Execute Sprint 2-4 in lockstep**: Data → backend → mobile → deploy
4. **Retro after each sprint**: Learn. Adjust. Move forward.
5. **Share updates weekly**: Metrics, blockers, morale, learnings

---

## Part 8: Closing View

Green Life is a universal trust and insight platform for the world people see.

The mobile app is essential, but it's the beginning, not the boundary.

If this direction is followed well, Green Life can become a product that meets people in many forms:

- in hand (mobile)
- on the web (browser)
- in conversation (voice/chat)
- inside an agent (assistant integration)
- inside a service (partner API)
- inside a movement (community-powered, Igniter-led)

**That** is the scale of the opportunity.

The food/restaurant space is the first moat. The trust layer is what makes it defensible. The community is what makes it unstoppable.

---

## Appendix A: ClickUp Mapping

This roadmap maps directly to ClickUp:

| Roadmap Item | ClickUp Type | ID (TBD) |
|--------------|--------------|----------|
| Phase 1 | Epic | TBD |
| Sprint 1-4 | Sprints | TBD |
| Each deliverable | Task | TBD |
| Research (5 gaps) | Subtasks | TBD |
| Retrospectives | Comments/Check-ins | TBD |

See separate ClickUp structure document for full task breakdown.

---

## Appendix B: Glossary & Key Terms

- **Igniter**: A founding community member who validates data, contributes sourcing info, and helps close the visibility gap.
- **Sparks**: Gamification currency earned per scan, community contribution, or community action. Visible in leaderboard.
- **Confidence Badge**: Trust signal (exact match / probable / estimate) showing how much precision the data supports.
- **Moat**: The defensible advantage. For Phase 1: restaurant meal impact visibility powered by community.
- **Trust Layer**: The set of design decisions (confidence labels, source attribution, methodology) that make Green Life trustworthy.
- **ETL**: Extract-Transform-Load. Pipelines that ingest, clean, and enrich data over time.
- **Igniters**: "Every picture throws a spark. Every spark can start a fire." Igniters are the fire-starters.

---

**End of Roadmap v2**

*This document is the daily north star. Update it weekly. Live by it. Build it.*
