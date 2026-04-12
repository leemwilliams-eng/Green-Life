# Green Life Phase 1 Sprint Plan
## Detailed Execution Guide (30-60 Days)

**Last Updated**: March 31, 2026  
**Owned by**: Lee Williams  
**Audience**: Daily reference. Track progress week-by-week.

---

## Overview: Phase 1 at a Glance

**Duration**: 8 weeks (30-60 days)  
**Goal**: Ship mobile app to TestFlight/Play Store with food/restaurant impact data integrated and trust layer visible.  
**Team**: Lee (solo) + Claude + Codex AI help + 2-3 recruited developers (starting mid-Phase 1)  
**Success**: User can scan menu → see impact + confidence + source + materials + community input.

### Phase 1 Structure
- **Sprint 1** (Weeks 1-2): Research complete. Integration patterns defined.
- **Sprint 2** (Weeks 3-4): Backend wired. Data sources integrated.
- **Sprint 3** (Weeks 5-6): Mobile ↔ backend working. Trust labels visible.
- **Sprint 4** (Weeks 7-8): Community scaffolding. Polish. Deploy.

Each sprint ends with a **retrospective** (30 min). Capture learnings. Adjust next sprint.

---

# SPRINT 1: Research & Integration Patterns
## Weeks 1-2 (March 31 - April 13)

### Sprint Goal
Define the data architecture. Identify all API sources. Document integration patterns. Unblock Phase 1.

### Deliverables (What Ships)

#### Deliverable 1.1: Food/Restaurant API Research Complete
**Owner**: Lee + Claude  
**Timeline**: Week 1 (March 31 - April 6)

**What to Research** (in order of priority):
1. **Agribalyse** (food LCA database)
   - [ ] Access model: Free download? API? License terms?
   - [ ] Coverage: How many foods? European focus?
   - [ ] Data structure: What fields available? How detailed?
   - [ ] Integration effort: 1-10 scale
   - [ ] Blockers: Any licensing red flags?
   - [ ] Phase allocation: Phase 1 or Phase 2?

2. **USDA FoodData Central** (nutritional + food composition)
   - [ ] API access: Documented? Rate limits?
   - [ ] Coverage: How detailed? All 400K foods?
   - [ ] Data structure: Match to Agribalyse?
   - [ ] Integration effort: 1-10 scale
   - [ ] Phase allocation: Phase 1 or Phase 2?

3. **OpenFoodFacts** (crowdsourced food database)
   - [ ] API available? Free? Rate limits?
   - [ ] Coverage: 3M+ products. Useful for restaurant foods?
   - [ ] Data quality: Consistent? Complete nutrition?
   - [ ] Integration effort: 1-10 scale
   - [ ] Phase allocation: Phase 1 or Phase 2?

4. **Climatiq** (carbon fallback API)
   - [ ] Already using this. Document phase allocation.
   - [ ] Coverage: What categories work? What gaps?
   - [ ] Fallback chain: When does Climatiq get called?
   - [ ] Phase allocation: Phase 1 (already in use)

5. **Restaurant Menu APIs** (ChowNow, OpenTable, Eat24, etc.)
   - [ ] Is there a free/affordable restaurant menu source?
   - [ ] Can you map restaurant → menu → ingredients?
   - [ ] Coverage: How many restaurants?
   - [ ] Integration effort: 1-10 scale
   - [ ] Phase allocation: Phase 1 (basic) or Phase 2 (rich)?

6. **Packaging Material Impact** (EPA EPD, sustainable materials databases)
   - [ ] Where does material LCA data live?
   - [ ] What's available for common restaurant items?
   - [ ] Integration effort: 1-10 scale
   - [ ] Phase allocation: Phase 1 (seed data) or Phase 2 (rich)?

**Acceptance Criteria**:
- [ ] All 6 sources researched. Notes captured.
- [ ] Integration effort estimated (1-10) for each.
- [ ] Licensing red flags identified (or cleared).
- [ ] Phase allocation decided (1 vs 2).
- [ ] At least 3 blockers identified + potential solutions.
- [ ] Research doc written + shared (see Deliverable 1.3).

---

#### Deliverable 1.2: Integration Patterns Documented
**Owner**: Lee + Claude  
**Timeline**: Week 1 (concurrent with research)

For each API source, document:

**Template** (repeat for each source):

```
## [API Name]
**Status**: Research [COMPLETE / IN PROGRESS]
**Phase**: Phase 1 or Phase 2
**Integration Pattern**: [Choose: Direct API | Batch Pre-compute | Seed Data | Community-Contributed]
**Effort**: [1-10 scale]

### Access Model
- URL: 
- Rate limits: 
- Authentication: API key? OAuth? Free tier?
- Cost: 

### Data Structure
- Key fields: 
- Example response: 

### Lookup Chain Integration
Where does this fit in the flow?
- Food photo → Google Vision → [THIS SOURCE?]
- Material photo → Google Vision → [THIS SOURCE?]
- Text search → [THIS SOURCE?]

### Blockers & Solutions
- Blocker 1: [Description] → Solution: [Workaround]
- Blocker 2: [Description] → Solution: [Workaround]

### Phase 1 MVP Scope
What's the minimum this source provides for Phase 1?
- [Specific foods/materials/restaurants]

### Phase 2+ Enrichment
What's the full vision?
- [Expansion, ETL, community validation]
```

**Acceptance Criteria**:
- [ ] Integration pattern documented for each of 6 sources.
- [ ] Blockers & solutions clear.
- [ ] Phase 1 vs Phase 2 scope explicit.
- [ ] At least one path identified (e.g., "Use Agribalyses + USDA fallback").

---

#### Deliverable 1.3: Data Architecture Diagram + Flow
**Owner**: Lee + Claude  
**Timeline**: Week 1-2 (concurrent)

**Create a visual + text flow**:

```
INPUT: User scans menu item (photo or text)
  ↓
DETECTION: Google Vision API identifies item (chicken, salmon, etc.)
  ↓
LOOKUP CHAIN (for food):
  1. Exact match in Agribalyse? → Return with confidence="exact"
  2. Fuzzy match in USDA? → Return with confidence="probable"
  3. Category match? → Return with confidence="estimate"
  4. Climatiq fallback? → Return with confidence="estimate" + "fallback_source"
  5. Not found? → Show "no_data_found" + "manual_search"
  ↓
TRUST LAYER:
  - Confidence badge rendered
  - Source attributed ("Data from Agribalyse" / "USDA" / "Community")
  - Methodology explainer linked ("How was this computed?")
  ↓
RESULT: User sees impact + confidence + source + alternatives + community input

MATERIALS LOOKUP CHAIN (parallel):
  Packaging detected → material type → EPA material impact data → sustainability rating
```

**Include**:
- [ ] Text flow (above format)
- [ ] Visual diagram (Figma or Mermaid)
- [ ] Decision points (where does the chain branch?)
- [ ] Fallback paths (what happens if a source times out?)
- [ ] Community contribution points (where do Igniters add data?)
- [ ] Error states (what if nothing matches?)

**Acceptance Criteria**:
- [ ] Diagram understood by Lee. Could explain to new developer.
- [ ] All 6 API sources positioned in the chain.
- [ ] Fallback paths clear + unambiguous.
- [ ] Community contribution points identified.

---

#### Deliverable 1.4: Community Contribution Model (Phase 1 MVP)
**Owner**: Lee + Claude  
**Timeline**: Week 2

**Define the minimal version Igniters can do in Phase 1**:

- **What can Igniters submit?**
  - [ ] Corrections to existing food/material data ("This salmon is wild-caught, not farmed")
  - [ ] New foods/materials ("Add this local restaurant dish")
  - [ ] Sourcing info ("This restaurant sources eggs from local farm")
  - [ ] Material flags ("This straw is actually bamboo, not plastic")

- **What's the submission flow?**
  - [ ] Button on Result screen: "Is this wrong? Help us improve."
  - [ ] Form captures: [What was wrong] + [Correction] + [Source/photo]
  - [ ] Submitted to moderation queue

- **Moderation**:
  - [ ] Phase 1: Manual review by Lee (quick turnaround)
  - [ ] Phase 2: Automated validation + community voting

- **Sparks**:
  - [ ] +1 Spark per accepted contribution
  - [ ] +2 bonus for first contribution
  - [ ] Visible in leaderboard

- **Trust signal**:
  - [ ] "Verified by [N] Igniters" badge appears on validated data

**Acceptance Criteria**:
- [ ] Model documented.
- [ ] Submission flow clear (no ambiguity).
- [ ] Moderation process defined.
- [ ] Sparks incentive structure clear.
- [ ] Ready to implement in Sprint 3-4.

---

#### Deliverable 1.5: Seed Data Prepared
**Owner**: Lee + Claude  
**Timeline**: Week 2

**Prepare Phase 1 launch data**:

- **Foods** (100-150):
  - [ ] Most common restaurant dishes (chicken, salmon, beef, pasta, rice, vegetables)
  - [ ] Pull from Agribalyses (if accessible) or create lookup table manually
  - [ ] Include: Name, serving size, kg CO₂e, confidence level, source
  - [ ] Format: JSON/CSV ready for database import

- **Materials** (20-30):
  - [ ] Plastic straw, paper straw, bamboo straw
  - [ ] Styrofoam cup, paper cup, ceramic cup
  - [ ] Plastic fork/spoon/knife, wooden, stainless steel
  - [ ] Paper napkin, cloth napkin
  - [ ] Plastic bag, paper bag, cloth bag
  - [ ] Include: Material, environmental impact, recyclability, alternatives

**Acceptance Criteria**:
- [ ] Food data formatted + ready for import.
- [ ] Material data formatted + ready for import.
- [ ] All data has source attribution (where did this come from?).
- [ ] Ready to insert into database in Sprint 2.

---

### Sprint 1 Blockers & Risk Mitigation

| Blocker | Risk | Mitigation |
|---------|------|-----------|
| Agribalyses not accessible | High | Use USDA + Climatiq fallback. Manual lookup table for common dishes. |
| Restaurant menu API not available | Medium | Start with manual restaurant mapping (top 10 chains). Expand Phase 2. |
| Material impact data scattered | Medium | Create seed data manually from EPA + public sources. Expand Phase 2. |
| Time estimate too optimistic | Medium | Prioritize research in order. Get blockers day 1. Don't get stuck on perfection. |

---

### Sprint 1 Retrospective (End of Week 2)
**Schedule**: Tuesday, April 13, 2pm (30 min)

**Questions to answer**:

1. **What went well?**
   - Which research sources were easiest to access?
   - Did the research uncover anything surprisingly useful?
   - Was the priority order right (Agribalyzes → USDA → OpenFoodFacts → Climatiq → Restaurants → Materials)?

2. **What didn't go as expected?**
   - Which sources were harder/slower to research?
   - Any licensing surprises?
   - Any data gaps bigger than expected?

3. **Blockers & decisions**:
   - What's the #1 blocker heading into Sprint 2?
   - If Agribalyzes is inaccessible, do we pivot to USDA-only + manual lookup?
   - Do we delay restaurant APIs to Phase 2, or push them to Sprint 2?

4. **Confidence going into Sprint 2**:
   - Do we have enough data to start integration, or do we need more research?
   - Are the integration patterns clear enough to start coding?
   - What do we need from Lee before Sprint 2 kick-off?

5. **Learnings**:
   - Did we discover any unexpected sources or opportunities?
   - Should the data architecture diagram be adjusted?
   - Any patterns that will help future sprints?

**Output**:
- [ ] Retro notes captured in ClickUp + Project_knowledge.md
- [ ] Sprint 2 scope adjusted (if needed)
- [ ] Decision on top blockers + solutions
- [ ] Go/no-go decision for Sprint 2 start

---

# SPRINT 2: Backend Wiring & Data Integration
## Weeks 3-4 (April 14 - April 27)

### Sprint Goal
Integrate food/material data sources into backend. Wire the Scan → Result lookup chain.

### Deliverables (What Ships)

#### Deliverable 2.1: Backend Service Files Enhanced
**Owner**: Lee + recruited dev (if available) + Claude Code  
**Timeline**: Week 3

**Files to enhance**:
- `visionService.ts` (Google Vision API)
- `foodEmissionService.ts` (food lookup)
- `materialImpactService.ts` (material lookup)

**For foodEmissionService.ts**:
```
Implement lookup chain:
1. exactMatch(foodName) → check Agribalyzes exact foods
2. aliases(foodName) → check synonym table (e.g., "filet mignon" → "beef")
3. fuzzyMatch(foodName) → PostgreSQL trgm extension (fuzzy search)
4. categoryMatch(foodName) → fall back to category (e.g., "beef" → beef category avg)
5. climatiqFallback(foodName) → call Climatiq API
6. noDataFound() → return empty result with confidence="no_data"

Return shape:
{
  matched_name: string
  kg_co2e_per_serving: number
  impact_tier: "high" | "medium" | "low"
  confidence: "exact" | "probable" | "estimate" | "no_data"
  serving_size_g: number
  food_category: string
  source_citation: string
  equivalents: [{label, value, unit, icon}]
}
```

**For materialImpactService.ts**:
```
Implement lookup:
1. exactMatch(materialType) → check materials table
2. categoryMatch(materialType) → fallback to material category
3. returnImpact()

Return shape:
{
  matched_name: string
  sustainability_rating: "critical" | "moderate" | "good"
  recyclable: boolean
  compostable: boolean
  decomposition_label: string
  disposal_guidance: string
  better_alternative: string | null
  kg_co2e_per_unit: number
  source_citation: string
}
```

**Acceptance Criteria**:
- [ ] foodEmissionService lookup chain working (local testing)
- [ ] materialImpactService lookup chain working (local testing)
- [ ] Both services return correct data shapes
- [ ] Fallback paths tested (what if API times out?)
- [ ] Error handling in place (no uncaught exceptions)

---

#### Deliverable 2.2: Data Sources Imported
**Owner**: Lee + Claude  
**Timeline**: Week 3

**Import workflow**:

1. **Agribalyzes data** (if accessible):
   - [ ] Download dataset
   - [ ] Parse into JSON/CSV
   - [ ] Import into `food_emissions` table
   - [ ] Validate import (spot-check 10 random rows)

2. **USDA FoodData Central**:
   - [ ] Query API for 400+ common foods
   - [ ] Extract: name, serving_size, nutrition
   - [ ] Map to `food_emissions` table
   - [ ] Validate (sampling)

3. **Material impact data**:
   - [ ] Create `materials` table
   - [ ] Seed with 20-30 common materials
   - [ ] Fields: material_type, sustainability_rating, recyclable, compostable, decomposition_days, co2e_per_unit
   - [ ] Validate

4. **Aliases table** (food synonyms):
   - [ ] "Filet mignon" → "beef"
   - [ ] "Sockeye salmon" → "salmon"
   - [ ] "Arugula" → "leafy greens"
   - [ ] Build 50+ common aliases

5. **Source citations**:
   - [ ] Every food row has source: "agribalyses" | "usda" | "climatiq" | "community"
   - [ ] Every material row has source
   - [ ] Validate (no null sources)

**Acceptance Criteria**:
- [ ] At least 150+ foods in database (Phase 1 target)
- [ ] 20+ materials seeded
- [ ] Aliases populated
- [ ] Sources attributed
- [ ] Database queries fast (<100ms for typical lookup)

---

#### Deliverable 2.3: Confidence Labeling System
**Owner**: Lee + Claude  
**Timeline**: Week 3-4

**Implement confidence logic**:

```
function assignConfidence(lookup_result):
  if lookup_result.source === "exact_match":
    return "exact"
  else if lookup_result.source === "probable_match":
    return "probable"
  else if lookup_result.source === "category_estimate":
    return "estimate"
  else if lookup_result.source === "climatiq_fallback":
    return "estimate"  // + flag "fallback_source"
  else if lookup_result.source === "community_validated":
    return lookup_result.confidence  // inherit from community submission
  else:
    return "no_data"

function badgeColor(confidence):
  if confidence === "exact":
    return { bg: "#1A3D1F", text: "#4A9B5F", border: "#2A5030" }
  else if confidence === "probable":
    return { bg: "#1A2A3D", text: "#5B8FCC", border: "#223650" }
  else if confidence === "estimate":
    return { bg: "#2E2410", text: "#C8A96E", border: "#3D3015" }
  else:
    return { bg: "#F2F4F7", text: "#6B7280", border: "#D1D5DB" }
```

**Acceptance Criteria**:
- [ ] Confidence assigned correctly for all data sources
- [ ] Badge colors match design system
- [ ] Logic documented (non-obvious decisions explained)
- [ ] Tests covering happy path + edge cases

---

#### Deliverable 2.4: Source Attribution
**Owner**: Lee + Claude  
**Timeline**: Week 4

**For each result, attribute the source**:

```
{
  food: "Salmon, grilled",
  kg_co2e_per_serving: 2.1,
  confidence: "exact",
  source: {
    data_source: "agribalyses",  // where the number came from
    methodology: "LCA (lifecycle assessment)",
    link: "https://agribalyses.org/..." // public documentation
    last_updated: "2024-01-15"
  }
}
```

**Create a "methodology" page per source**:
- Agribalyzes: "Lifecycle assessment covering production, transport, packaging, disposal"
- USDA: "Food composition database, no environmental impact modeling"
- Climatiq: "Industry-standard carbon factors, simplified model"
- Community: "Crowdsourced data, validated by N Igniters"

**Acceptance Criteria**:
- [ ] Every result includes source attribution
- [ ] Methodology page written + linked
- [ ] Links are public + readable
- [ ] Source attribution is always honest (no overstating precision)

---

#### Deliverable 2.5: API Contract Documentation
**Owner**: Lee + Claude  
**Timeline**: Week 4

**Document the backend API contracts**:

```
POST /api/v1/lookup/image
Request:
  {
    mode: "food" | "material",
    image: base64_encoded_image,
    uri: file_path
  }
Response:
  {
    type: "food" | "material" | "no_match",
    confidence: "exact" | "probable" | "estimate" | "no_data",
    data: {
      // Food or Material data shape
    },
    source: {
      data_source: string,
      methodology: string,
      link: string
    },
    alternatives: [{...}]  // for materials
  }

GET /api/v1/search?q=salmon&mode=food
Request:
  {
    q: search query,
    mode: "food" | "material"
  }
Response:
  {
    results: [{...}],
    total_found: number
  }
```

**Acceptance Criteria**:
- [ ] All endpoints documented
- [ ] Request/response shapes clear
- [ ] Error codes documented
- [ ] Rate limits documented (if any)
- [ ] Ready for mobile to consume

---

### Sprint 2 Blockers & Risk Mitigation

| Blocker | Risk | Mitigation |
|---------|------|-----------|
| Agribalyzes data not accessible | High | Use USDA-only. Pre-compute common foods manually. |
| Database queries slow | Medium | Add indexes. Use caching (Redis). Monitor query performance. |
| Confidence labeling logic unclear | Low | Document with examples. Test extensively. |
| Source attribution adds overhead | Low | Minimal overhead. Built into data model. |

---

### Sprint 2 Retrospective (End of Week 4)
**Schedule**: Sunday, April 27, 2pm (30 min)

**Questions**:

1. **What went well?**
   - Which data source integrated smoothest?
   - Did the lookup chain work as designed?
   - Any pleasant surprises in the data quality?

2. **What was harder than expected?**
   - Which source caused friction?
   - Did database performance need optimization?
   - Were there data gaps we didn't anticipate?

3. **Current state**:
   - How many foods are in the database now? (Target: 150+)
   - How many materials? (Target: 20+)
   - Lookup latency? (Target: <500ms p95)
   - Any critical bugs found?

4. **Confidence going into Sprint 3**:
   - Is the backend ready for mobile to consume?
   - Do we need to fix anything before Sprint 3?
   - Are there obvious gaps the mobile team will hit?

5. **Data observations**:
   - Are there obvious foods/materials missing that users will scan first?
   - Should we expand the seed data before launch?
   - Any patterns in the data that suggest Phase 2 work?

**Output**:
- [ ] Retro notes in ClickUp
- [ ] Bug list + priority
- [ ] Seed data expansion (if needed)
- [ ] Sprint 3 readiness confirmation

---

# SPRINT 3: Mobile ↔ Backend Integration & Trust Visibility
## Weeks 5-6 (April 28 - May 11)

### Sprint Goal
Wire the mobile app to the backend. Make trust signals visible in the UI.

### Deliverables (What Ships)

#### Deliverable 3.1: Scan Screen → Backend Integration
**Owner**: Lee + developer(s) + Claude  
**Timeline**: Week 5

**Wire the photo flow**:

1. **ScanScreen.tsx** calls backend:
   ```
   POST /api/v1/lookup/image
   with: { mode: "food", image: base64, uri: file_uri }
   ```

2. **Result received**:
   ```
   {
     type: "food",
     confidence: "exact",
     food: { matched_name, kg_co2e_per_serving, ... },
     source: { data_source, methodology, link }
   }
   ```

3. **Navigate to ResultScreen** with params:
   ```
   navigation.navigate('Result', {
     type: 'photo',
     mode: 'food',
     image: base64,
     uri: file_uri,
     result: {...}
   })
   ```

**Acceptance Criteria**:
- [ ] Photo capture → backend request working
- [ ] Result received in correct shape
- [ ] Error handling (timeout, 500, no_match)
- [ ] Loading state shown during request
- [ ] Result persisted (so ResultScreen can display it)

---

#### Deliverable 3.2: Result Screen Components
**Owner**: Lee + developer(s) + Claude  
**Timeline**: Week 5

**Build result display components**:

**FoodResultCard.tsx**:
```
Displays:
- Matched food name
- kg CO₂e per serving
- Impact tier color (high/medium/low)
- Confidence badge (exact/probable/estimate)
- Source attribution ("Data from Agribalyzes")
- Equivalents strip (miles driven, phone charges, tree days, streaming hours)
- Methodology link ("How was this computed?")
```

**MaterialResultCard.tsx**:
```
Displays:
- Material name
- Sustainability rating (critical/moderate/good)
- Recyclability status (yes/no)
- Compostability status (yes/no)
- Decomposition time
- Better alternatives (if exists)
- Source attribution
```

**ConfidenceBadge.tsx**:
```
Colors:
- Exact: bg #1A3D1F, text #4A9B5F
- Probable: bg #1A2A3D, text #5B8FCC
- Estimate: bg #2E2410, text #C8A96E
- No Data: bg #F2F4F7, text #6B7280
```

**Acceptance Criteria**:
- [ ] All components render correctly
- [ ] Colors match design system (verify against greenlife-design-system.md)
- [ ] Text is readable (contrast ratio 4.5:1 minimum)
- [ ] Components responsive (mobile + future web)

---

#### Deliverable 3.3: Trust Signal Rendering
**Owner**: Lee + Claude  
**Timeline**: Week 5-6

**Make trust explicit in every result**:

1. **Confidence badge** (always visible):
   - Color + label (Exact Match / Probable / Estimate / No Data)
   - Tooltip on tap: "Exact Match: We identified this specific food in our database"

2. **Source attribution** (always visible):
   - "Data from: Agribalyzes" / "USDA" / "Climatiq" / "Community"
   - Link to methodology page

3. **Methodology explainer** (expandable):
   - "How was this number computed?"
   - Expands to explain: "This is an LCA (lifecycle assessment) that includes production, transport, packaging, and disposal"
   - Links to full methodology

4. **Alternatives** (if exists):
   - For materials: "Paper straw instead of plastic would reduce impact by X"
   - For food: (Phase 2+) "Local salmon instead of imported would reduce impact by X"

**Acceptance Criteria**:
- [ ] Confidence badge visible + correct
- [ ] Source attributed on every result
- [ ] Methodology link clickable + functional
- [ ] Alternatives displayed for materials
- [ ] No overstating precision anywhere

---

#### Deliverable 3.4: Profile Screen Real Stats
**Owner**: Lee + developer(s)  
**Timeline**: Week 6

**ProfileScreen.tsx** connected to backend:

```
Display (fetch from /api/v1/user/stats):
- Scans this week: [N]
- Foods scanned: [N]
- Materials scanned: [N]
- CO₂e surfaced: [X kg]
- Sparks earned: [N]
- Contributions: [N]
- Impact tier: Sprout | Seedling | Sapling | Oak | Wildfire
  (gamification ranks based on Sparks)
```

**Also display**:
- User's own Igniter badge (if earned)
- Contributions made (list of corrections/additions accepted)
- Leaderboard position (where am I ranked?)

**Acceptance Criteria**:
- [ ] Stats fetched from backend
- [ ] Data refreshes on screen load
- [ ] Numbers are correct (spot-check queries)
- [ ] Impact tier calculated correctly

---

#### Deliverable 3.5: Community Screen Live Wiring
**Owner**: Lee + developer(s)  
**Timeline**: Week 6

**CommunityScreen.tsx** connected to backend:

```
Fetch:
- GET /api/v1/community/impact → banner stats
- GET /api/v1/community/igniters?limit=10 → leaderboard
- GET /api/v1/community/sparks?limit=20&filter=all → feed

Display:
1. Impact banner (aggregate stats)
   - Total scans
   - Total CO₂e surfaced
   - Igniters (count)
   - Impact tier distribution

2. Top Igniters leaderboard
   - Ranked by Sparks
   - Top 3 get gold medals
   - "You" pill on your row

3. Recent Sparks feed
   - Filterable by All / Food / Material / Product
   - Shows: [Igniter] scanned [item] in [location] • [time ago]
   - Tappable to see more details
```

**Acceptance Criteria**:
- [ ] Data fetched from backend
- [ ] Leaderboard correctly ranked
- [ ] Feed shows recent activity
- [ ] Filters work correctly
- [ ] Performance acceptable (no lag)

---

### Sprint 3 Blockers & Risk Mitigation

| Blocker | Risk | Mitigation |
|---------|------|-----------|
| Backend latency too high | Medium | Implement caching. Pre-compute results. Profile queries. |
| Trust labels confusing users | Low | Test with actual users. Refine copy. Add tooltips. |
| Result screen too dense | Medium | Prioritize what's visible. Hide methodology behind expand. |
| Performance issues on device | Medium | Profile app. Optimize image handling. Lazy-load results. |

---

### Sprint 3 Retrospective (End of Week 6)
**Schedule**: Sunday, May 11, 2pm (30 min)

**Questions**:

1. **What went well?**
   - Did the mobile ↔ backend integration work smoothly?
   - Which components rendered best?
   - Any pleasant surprises in user experience?

2. **What surprised us?**
   - Were trust labels clear to test users?
   - Did the methodology explainer land, or confuse?
   - Any performance issues that caught us off-guard?

3. **User friction**:
   - What's the most common confusion?
   - Did the result screen feel like the right amount of info?
   - Did users understand confidence badges?

4. **Quality**:
   - Are there obvious bugs?
   - Did we find data accuracy issues (e.g., wrong food matching)?
   - Any crashes or errors?

5. **Readiness for Sprint 4**:
   - Is the app stable enough to add community contribution?
   - Do we need to refine anything before public beta?
   - What's the top bug to fix before launch?

**Output**:
- [ ] UX feedback captured
- [ ] Bug list + priority
- [ ] Copy refinements (if needed)
- [ ] Go/no-go for community contribution in Sprint 4

---

# SPRINT 4: Community Contribution + Polish + Deploy
## Weeks 7-8 (May 12 - May 25)

### Sprint Goal
Wire community contribution. Polish the app. Deploy to TestFlight/Play Store. Complete Phase 1.

### Deliverables (What Ships)

#### Deliverable 4.1: Community Contribution Flow
**Owner**: Lee + developer(s) + Claude  
**Timeline**: Week 7

**Add "Help us improve" button on ResultScreen**:

```
When user taps "Help us improve":
1. Open modal
2. Show options:
   - "This data is wrong"
   - "Add a new food/material"
   - "Report bad match"

If "This data is wrong":
   - Pre-fill: item name, current impact, source
   - User enters: correction + evidence (photo or citation)
   - Submit button: "Send correction"
   - Confirm: "Thanks for improving Green Life"

If "Add a new food/material":
   - Form: name, type, impact, source, evidence
   - Submit: "Submit"
   - Confirm: "Waiting for verification"

If "Report bad match":
   - Form: what was wrong, suggestion
   - Submit: "Report"
```

**Moderation queue** (backend + UI):
- [ ] Store submissions in `contributions` table
- [ ] Lee can review in a moderation UI
- [ ] Accept / Reject / Ask for clarification
- [ ] Approved contributions go live
- [ ] User notified via notification + Sparks awarded

**Acceptance Criteria**:
- [ ] Contribution form working
- [ ] Submissions stored correctly
- [ ] Moderation queue functional
- [ ] Sparks awarded on acceptance
- [ ] User notifications working

---

#### Deliverable 4.2: Sparks System Live
**Owner**: Lee + developer(s)  
**Timeline**: Week 7

**Implement Sparks rewards**:

```
Awards:
- Scan any food: +1 Spark
- Scan any material: +1 Spark
- Submit accepted correction: +1 Spark
- Submit accepted new item: +1 Spark
- First scan ever: +2 bonus Sparks

Tracking:
- User sparks count (visible in Profile)
- Sparks leaderboard (Community screen)
- Sparks feed (recent activity)
```

**Acceptance Criteria**:
- [ ] Sparks awarded correctly
- [ ] Leaderboard ranked correctly
- [ ] Feed shows recent awards
- [ ] Notifications sent when milestones hit

---

#### Deliverable 4.3: Onboarding Flow
**Owner**: Lee + developer(s)  
**Timeline**: Week 7

**Improve first-time user experience**:

```
Splash → Login → First-Time Tutorial

Tutorial:
1. "Point at food" (show screenshot)
2. "See the impact" (show example result)
3. "Join the movement" (show Community screen)
4. "Ready? Tap to start"
```

**Acceptance Criteria**:
- [ ] Tutorial clear + engaging
- [ ] No friction points (users completing tutorial 80%+)
- [ ] Routes to home on completion

---

#### Deliverable 4.4: Bug Fixes + Polish
**Owner**: Lee + developer(s)  
**Timeline**: Week 7-8

**Fix issues from Sprints 1-3**:
- [ ] All P0 bugs fixed (crashes, critical UX)
- [ ] P1 bugs fixed (important but not blocking)
- [ ] P2 bugs triaged (nice-to-fix, backlog to Phase 2)

**Polish**:
- [ ] Copy refined (grammar, clarity, tone)
- [ ] Accessibility audit passed (WCAG AA compliance)
- [ ] Performance optimized (app load <2s, result <3s)
- [ ] Dark mode verified (all text readable)
- [ ] Orientation changes handled (portrait + landscape)

**Acceptance Criteria**:
- [ ] Zero critical bugs
- [ ] Accessibility score >90
- [ ] Performance meets targets
- [ ] Ready for public beta

---

#### Deliverable 4.5: Backend Deployment
**Owner**: Lee  
**Timeline**: Week 7

**Deploy API to production**:

- [ ] Choose platform: Render.com (recommended, easiest)
- [ ] Set up PostgreSQL database (Render-managed or external)
- [ ] Deploy backend code
- [ ] Configure environment variables (API keys, database URL)
- [ ] Run database migrations (001 → 002 → 003)
- [ ] Seed data imported
- [ ] Test endpoints in production
- [ ] Monitor logs + uptime

**Acceptance Criteria**:
- [ ] Backend accessible at production URL
- [ ] All endpoints responding
- [ ] Database queries fast (<500ms p95)
- [ ] No errors in logs

---

#### Deliverable 4.6: App Store Submission
**Owner**: Lee  
**Timeline**: Week 7-8

**Build + submit to TestFlight + Play Store**:

**iOS**:
- [ ] Build signed for App Store
- [ ] Create app entry in App Store Connect
- [ ] Add screenshots + description
- [ ] Submit for review
- [ ] Respond to reviewer feedback (typically 1-3 days)
- [ ] Approved → release to TestFlight

**Android**:
- [ ] Build signed for Play Store
- [ ] Create app entry in Google Play Console
- [ ] Add screenshots + description
- [ ] Submit for review
- [ ] Approved → release to internal testing, then public

**Acceptance Criteria**:
- [ ] App available on TestFlight
- [ ] App available on Play Store (or internal testing)
- [ ] App downloads + installs correctly
- [ ] First-time user experience smooth

---

#### Deliverable 4.7: Phase 1 Documentation & Handoff
**Owner**: Lee + Claude  
**Timeline**: Week 8

**Document for future team**:

- [ ] **README.md**: How to build, test, deploy
- [ ] **ARCHITECTURE.md**: System design, API contracts, data flows
- [ ] **ONBOARDING.md**: For new developers (what they need to know)
- [ ] **ROADMAP.md**: This document + status (what shipped, what's next)
- [ ] **LESSONS.md**: What we learned in Phase 1 (patterns, mistakes, shortcuts)
- [ ] **API_DOCS.md**: Backend API reference + examples
- [ ] **DATABASE.md**: Schema, migrations, seed data

**Acceptance Criteria**:
- [ ] All docs written + reviewed
- [ ] No ambiguity (anyone could onboard from these docs)
- [ ] Lessons captured (prevent repeated mistakes)

---

### Sprint 4 Blockers & Risk Mitigation

| Blocker | Risk | Mitigation |
|---------|------|-----------|
| App Store approval delayed | Medium | Submit early. Have contingency (internal testing on TestFlight). |
| Community moderation queue overloads | Low | Start manual. Monitor. Automate Phase 2 if needed. |
| Performance issues emerge | Medium | Profile. Optimize hot paths. Cache aggressively. |
| Bugs found late | Medium | Have QA checklist. Test on real devices. |

---

### Sprint 4 Retrospective (End of Week 8 / Phase 1 Complete)
**Schedule**: Sunday, May 25, 4pm (60 min — this is the big one)

**Questions**:

1. **Phase 1 Completion**:
   - Did we ship everything we committed to?
   - What got cut, and why?
   - What surprised us (good and bad)?

2. **Product Quality**:
   - Is the app stable? Any critical bugs?
   - Are users understanding the trust model?
   - Are Igniters engaging with contributions?

3. **Metrics Check**:
   - Data coverage: How many foods? Materials?
   - User engagement: How many scans per user?
   - Community: How many Igniters? Contributions?
   - Technical: API uptime? Response times? Errors?

4. **Team & Process**:
   - How did solo + AI help model work?
   - What should we do differently with 2-3 developers onboarded?
   - Did retrospectives help? How?
   - What rituals should we keep?

5. **Learning & Lessons**:
   - Top 3 things we learned (technical + product)?
   - Top 3 mistakes (and how we'll avoid them)?
   - Top 3 surprises (good or bad)?
   - What patterns are repeatable?

6. **Phase 2 Readiness**:
   - What needs to happen in Phase 2?
   - What's the top priority for data enrichment?
   - Are we ready to scale to 500+ foods?
   - Should we pause new features to harden?

**Output** (Critical — this informs Phase 2):
- [ ] Phase 1 complete (all deliverables shipped or documented)
- [ ] Phase 1 metrics captured + analyzed
- [ ] Lessons doc updated in Project_knowledge.md
- [ ] Phase 2 priorities prioritized
- [ ] Team onboarding plan (if recruiting developers)
- [ ] Decision: move to Phase 2, or extend Phase 1?

---

## Post-Sprint 4: Phase 1 → Phase 2 Transition

**Timing**: Week 8-9

**Activities**:

1. **Retrospective complete** (by Sunday)
2. **Lessons captured** (by Monday)
3. **Phase 2 epic created in ClickUp** (by Tuesday)
4. **Developers onboarded** (if recruiting, start immediately)
5. **Phase 2 Sprint 1 planned** (by Wednesday)
6. **Phase 2 kick-off** (by Friday)

**What's in Phase 2**:
- Data enrichment (expand food/material coverage to 500+)
- ETL pipelines (automated data refresh)
- Community validation (more sophisticated moderation)
- Backend refactor (service layer + cleaner contracts)
- Performance optimization
- Web surface preparation (reusable components for Phase 3)

---

## Appendix: Key Success Criteria Summary

### Phase 1 MVP (by end of Week 8)

**Product**:
- [ ] Mobile app ships to TestFlight + Play Store
- [ ] User can scan food photo → see impact + confidence + source + packaging
- [ ] User can search foods + materials
- [ ] Community can submit corrections (Sparks awarded)
- [ ] Profile shows real stats
- [ ] Community leaderboard live

**Data**:
- [ ] 150+ foods in database
- [ ] 20+ materials seeded
- [ ] All data attributed (source + methodology)
- [ ] Confidence labels accurate

**Trust**:
- [ ] Confidence badges visible + correct
- [ ] Source attribution on every result
- [ ] Methodology explainable
- [ ] No overstating precision

**Technical**:
- [ ] Backend deployed + stable
- [ ] API latency <500ms p95
- [ ] Uptime 99%+
- [ ] No critical bugs
- [ ] Tests passing

**Community**:
- [ ] Igniter contribution flow live
- [ ] Sparks system working
- [ ] 5+ Igniters testing (recruiting goal)
- [ ] Moderation queue functional

---

**End of Phase 1 Sprint Plan**

*This document is your daily guide. Update it weekly. Live by it. Build it.*
