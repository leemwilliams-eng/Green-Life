# Food & Restaurant API Research
## Closing Gaps A→E for Green Life Phase 1

**Date**: March 31, 2026  
**Owner**: Lee Williams + Claude  
**Phase 1 Status**: Research → Decision → Integration (Weeks 1-4)

---

## Research Objective

Green Life Phase 1 needs **100+ restaurant foods with LCA data + confidence labels** available in 60 days. This research identifies the APIs and data sources that make that possible, evaluates each for access, coverage, and integration effort, and proposes a phased data architecture.

**The Problem**: No single API provides "restaurant meal → carbon impact" with verified sourcing. We must combine multiple sources strategically.

**The Solution**: Layer Agribalyse (gold standard, limited) + USDA (broad, nutritional) + Climatiq (fallback, generic) + seed data (curated restaurant meals) + community (validation, fill gaps).

---

## Gap A: Agribalyse (Food LCA Database)

### What It Is
Agribalyse is a **peer-reviewed, European Life Cycle Assessment database** for food and agricultural products. Managed by ADEME (French environmental agency) + INRAE (agricultural research). ~2,500 products with detailed LCA data (carbon, water, land use, etc.). Gold standard for food impact.

### Access Model
**Status**: RESEARCH NEEDED  
**Hypothesis**: Bulk download exists; API may require licensing

**Action Items**:
- [ ] Check ADEME official documentation (https://www.agribalyse.fr/)
- [ ] Verify: Is data downloadable as CSV/JSON?
- [ ] Check: Licensing terms (CC-BY? Open? Restricted?)
- [ ] Estimate: How many foods cover "restaurant meals" (soups, proteins, prepared dishes)?
- [ ] Confirm: Can regional variants be distinguished (organic vs. conventional)?

### Known Coverage
- ~2,500 food items (mostly European)
- Strong on staples: grains, proteins, vegetables, dairy, processed
- Weak on: exotic ingredients, prepared restaurant dishes, regional variants
- **Carbon per 100g** (scalable to any serving size)

### Integration Effort
**Estimated**: 3-4 (medium-low)
- Parse CSV/JSON into PostgreSQL
- Index on food name (fuzzy matching via pg_trgm)
- Join with USDA for nutritional enrichment
- Fallback chain: exact match → fuzzy → category

### Licensing / Attribution
**Critical**: Verify this. CC-BY likely means:
- Can use freely with attribution
- Can redistribute if you cite source
- Include license statement on results

### Phase Allocation
**Phase 1**: Core. Pre-compute 60-100 most common restaurant foods + LCA from Agribalyse.  
**Phase 2**: Expand to 300+ foods. Add regional variants (organic, local sourcing adjustments).

### Red Flags & Mitigations
| Flag | Risk | Mitigation |
|------|------|-----------|
| Data not freely available | Can't access in Phase 1 | Use Climatiq only + seed 50 foods manually |
| Limited restaurant meal coverage | Missing common dishes | USDA enrichment + Climatiq fallback |
| European focus | Doesn't cover North American ingredients | Supplement with USDA FoodData + local seeds |

### Decision Gate
**Must decide by end of Week 1**: Is Agribalyse accessible and downloadable? If yes, prioritize. If no, pivot to Climatiq + USDA only.

---

## Gap B: USDA FoodData Central

### What It Is
USDA's **free, comprehensive food composition database**. ~400,000 foods (US-focused). Nutritional data (calories, protein, fat, fiber, etc.). No environmental data, but critical for enrichment (serving size, food category, aliases).

### Access Model
**Status**: VERIFIED ✅  
**Documentation**: https://fdc.nal.usda.gov/  
**API**: Yes, free, open

### API Endpoints
```
GET /fdc/v1/foods/search
  ?query=tomato
  &pageSize=10
  &api_key=DEMO_KEY (or your key)

Response:
{
  "foods": [
    {
      "fdcId": "167567",
      "description": "Tomatoes, red, ripe, raw, year round average",
      "foodNutrients": [
        {"nutrientId": 1003, "value": 18.9, "unitName": "g"}, // protein
        {"nutrientId": 1004, "value": 3.6, "unitName": "g"}   // fat
      ]
    }
  ]
}
```

### Coverage
- **Scope**: US foods + common imported foods
- **Depth**: 20+ nutrient fields per food (protein, fat, carbs, fiber, micronutrients)
- **Aliases**: Multiple descriptions per food (e.g., "tomato" = raw, canned, cooked)
- **Serving sizes**: Often missing or inconsistent

### Integration Effort
**Estimated**: 2-3 (low)
- Real-time API calls (no bulk download needed)
- Rate limit: 120 requests/minute (plenty for Phase 1)
- Query on food name
- Cache results (avoid duplicate API calls)
- Enrichment use case: serve size normalization, food category tagging

### Licensing
**Status**: Public domain (USDA)  
Attribution recommended but not required. Use freely.

### Phase Allocation
**Phase 1**: Mandatory. Use for food name validation, serving size lookup, category tagging.  
**Phase 2**: Cache and expand queries for richer enrichment.

### Integration Pattern
```
User scans "grilled chicken breast"
  ↓
Agribalyse exact match? (e.g., "Chicken, roasted, skinless")
  ↓
If not, query USDA for "chicken breast" (get serving size, nutrition)
  ↓
If Agribalyse has carbon for "chicken, roasted" → scale to user's portion
  ↓
If not, fallback to Climatiq generic "poultry" estimate
```

### Red Flags & Mitigations
| Flag | Risk | Mitigation |
|------|------|-----------|
| Serving sizes inconsistent | Can't normalize carbon to user's portion | Use closest match, confidence label as "Estimate" |
| Missing restaurant-specific foods | "Pasta primavera" not in database | Break into components (pasta + vegetables) + sum |
| Rate limits (120/min) | Could hit ceiling at scale | Cache aggressively; Phase 2 optimizes |

### Decision Gate
No blocker. Proceed with USDA integration in Week 2.

---

## Gap C: OpenFoodFacts

### What It Is
Crowdsourced, open-source food database. ~3 million products. Barcode-driven (UPC/EAN). Includes packaged foods, restaurants, regional items. **No official LCA data**, but community-contributed nutrition and allergen info. Strength: breadth and barcode coverage.

### Access Model
**Status**: VERIFIED ✅  
**API**: Yes, free, open  
**Documentation**: https://world.openfoodfacts.org/data

### API Endpoints
```
GET /api/v2/search
  ?query=tomato+sauce
  &sort_by=popularity

Response:
{
  "products": [
    {
      "code": "3574660123456",
      "name": "Tomato sauce, organic",
      "nutriments": {
        "energy": 340,
        "fat": 1.2,
        "carbohydrates": 7
      },
      "categories": "Sauces"
    }
  ]
}
```

### Coverage
- **Scope**: Global, but crowdsourced (quality varies)
- **Strength**: Barcode coverage (UPC/EAN), packaged foods, regional variants
- **Weakness**: Inconsistent data quality, missing fields, no LCA
- **Categories**: Available and searchable

### Integration Effort
**Estimated**: 2-3 (low-medium)
- API is straightforward
- Query by barcode or text search
- Cache results (avoid duplicate queries)
- Data quality check needed (handle missing fields gracefully)

### Licensing
**Status**: CC0 (public domain)  
Use freely.

### Phase Allocation
**Phase 1**: Optional. Use for barcode lookup + packaged food discovery (e.g., sauces, dressings).  
**Phase 2**: Expand as fallback for restaurant-provided packaged items.

### Use Case in Phase 1
```
User scans barcode of bottled salad dressing
  ↓
OpenFoodFacts barcode lookup (UPC) → product name + nutrition
  ↓
Query Climatiq for "salad dressing" category impact
  ↓
Result: estimated carbon + ingredient allergies + confidence "Estimate"
```

### Red Flags & Mitigations
| Flag | Risk | Mitigation |
|------|------|-----------|
| Data quality inconsistent | Some barcodes missing or wrong | Verify against Climatiq category before returning |
| No environmental data | Can't provide carbon directly | Use as trigger for Climatiq category lookup |
| Crowdsourced (relies on volunteers) | May be outdated | Accept this limitation, confidence label reflects it |

### Decision Gate
**Decision**: Include if Phase 1 barcode lookup is a priority. If not, defer to Phase 2.

---

## Gap D: Sustainability Badges & Certifications

### What It Is
Third-party certifications indicate sustainable/ethical sourcing:
- **Fair Trade**: Ensures farmer wages, environmental standards
- **Organic**: No synthetic pesticides, fertilizers
- **Rainforest Alliance**: Biodiversity, worker rights, sustainable practices
- **Certified Sustainable Seafood**: Overfishing prevention
- **Carbon Neutral / B-Corp**: Broader environmental commitments

### Access Model
**Status**: MIXED

| Source | Type | Access | API? |
|--------|------|--------|------|
| **Fair Trade USA** | Certification | Directory + search | Limited |
| **Rainforest Alliance** | Certification | Directory | No API |
| **USDA Organic** | Certification | Searchable database | Partial |
| **Seafood Watch** | Recommendation | Database + API | Free API ✅ |
| **B-Corp** | Certification | Directory | No API |

### Seafood Watch API (Most Useful)

```
GET https://www.seafoodwatch.org/api/recommendations/search
  ?name=salmon
  ?region=Alaska

Response:
{
  "recommendations": [
    {
      "species": "Salmon, wild-caught (Alaska)",
      "recommendation": "Best Choice",
      "reasons": ["Low impact", "Well-managed fishery"]
    }
  ]
}
```

### Integration Effort
**Estimated**: 4-5 (medium-high)
- **Seafood Watch API**: Low effort, free
- **Fair Trade/Organic/Rainforest**: Manual curation or screen-scraping (fragile)
- **Recommendation**: Start with Seafood Watch, manually seed common certifications (Fair Trade coffee, organic blueberries, etc.) into Phase 1 database

### Phase Allocation
**Phase 1**: Manual seed. Tag 20-30 products with certifications (organic tomato, Fair Trade coffee, wild Alaskan salmon).  
**Phase 2**: Integrate Seafood Watch API. Expand manual tagging + community submission.

### Use Case
```
Result shows: "Organic Tomato (certified)"
Clicking badge shows: Organic standards, environmental impact, source
```

### Red Flags & Mitigations
| Flag | Risk | Mitigation |
|------|------|-----------|
| No unified API for all certifications | Must integrate multiple sources | Phase 1: seed manually. Phase 2: build connectors |
| Certification data changes (new orgs, revocations) | Data staleness | Phase 2: community validation + monthly updates |
| How to verify a product's cert? | Can't always confirm programmatically | Require Igniter submission + voting to validate |

### Decision Gate
**Decision for Phase 1**: Manually seed 20-30 common certified foods. No API integration yet.

---

## Gap E: Packaging Materials & Sustainability

### What It Is
Data on environmental impact of common restaurant materials:
- **Single-use**: Straws (paper, plastic, metal), napkins, cups, utensils, bags
- **Environmental impact**: Carbon, decomposition time, recyclability, compostability
- **Alternatives**: Paper vs. plastic vs. metal straws; compostable cups vs. plastic

### Access Model
**Status**: SCATTERED (no single API)

| Source | Coverage | Format | Cost |
|--------|----------|--------|------|
| **EPA Sustainable Materials Management** | Broad (all materials) | Reports, databases | Free |
| **Sustainable Packaging Coalition** | Packaging-specific | Guidelines + case studies | Free |
| **Environmental Product Declarations (EPD)** | Individual products | Certified LCA | Paid database |
| **GreenBlue** | Packaging focus | Comparisons | Free reports |

### Phase 1 Strategy: Seed Data
Rather than source from an API, **create a curated seed table** of 10-15 common restaurant materials with estimated impact:

```
Straw (plastic, single-use):
  - carbon: 0.003 kg CO₂e per unit
  - recyclable: false
  - compostable: false
  - decomposition: 200+ years
  - alternative: paper straw (0.0015 kg CO₂e, compostable)

Straw (paper, compostable):
  - carbon: 0.0015 kg CO₂e per unit
  - recyclable: true
  - compostable: true
  - decomposition: 6 months
  - source: Sustainable Packaging Coalition

Napkin (paper):
  - carbon: 0.001 kg CO₂e per unit
  - recyclable: true
  - compostable: true
  - decomposition: 6 months
  - source: EPA SMM

Cup (plastic, single-use):
  - carbon: 0.015 kg CO₂e per cup
  - recyclable: false (typically)
  - compostable: false
  - decomposition: 50+ years
  - alternative: compostable cup (0.020 kg CO₂e, fully compostable in 90 days)
```

### Integration Pattern
```
User scans table with: plastic straw, paper napkin, plastic cup
  ↓
Material detection (vision or user input: "3 items on table")
  ↓
Lookup each material in seed table
  ↓
Sum impact: 0.003 + 0.001 + 0.015 = 0.019 kg CO₂e
  ↓
Show alternatives: "Paper straw saves 0.0015 kg CO₂e"
  ↓
Result: "Your table's impact: 0.019 kg CO₂e (equivalent to X miles driven)"
```

### Integration Effort
**Estimated**: 1-2 (very low)
- Create JSON seed table (~20 materials)
- Reference data in results
- Lookups are fast (hash table)
- Community can submit new materials (Phase 2)

### Coverage Goal
**Phase 1**: 10-15 common restaurant items  
**Phase 2**: Expand to 50+ materials, integrate EPA/SPC data for precision

### Sourcing Data
- EPA Sustainable Materials Management: https://www.epa.gov/smm/sustainable-materials-management-non-hazardous-materials-and-waste-management-hierarchy
- Sustainable Packaging Coalition: https://sustainablepackaging.org/
- GreenBlue: Packaging reports + comparisons (free PDF)

### Red Flags & Mitigations
| Flag | Risk | Mitigation |
|------|------|-----------|
| Seed data incomplete | Can't recognize all materials | Community submission + validation (Phase 2) |
| No vision model for materials | Manual user selection or text | Combine vision (rough category) + user confirmation |
| Estimates vary by region | "Plastic straw carbon" differs US vs. Europe | Use global average, note in confidence label |

### Decision Gate
**Decision for Phase 1**: Seed table ready by Week 2. Iterate based on community feedback.

---

## Summary: Data Sources by Phase

### Phase 1 (Weeks 1-8): Foundation
| Source | Status | Role | Effort | Blocker |
|--------|--------|------|--------|---------|
| **Agribalyse** | RESEARCH | Core LCA for 100+ foods | 3 | License check |
| **USDA FoodData** | READY | Enrichment + serving sizes | 2 | None |
| **Climatiq** | READY | Fallback for unknowns | 1 | None |
| **Certifications (seed)** | READY | Manual badge tagging | 2 | None |
| **Materials (seed)** | READY | 10-15 common items | 1 | None |
| **Google Vision** | READY | Photo detection | 1 | API key |

### Phase 2 (Weeks 9-20): Enrichment & Expansion
| Source | Status | Role | New Effort |
|--------|--------|------|-----------|
| **Agribalyse** | Mature | Expand to 300+ foods + variants | 2 |
| **OpenFoodFacts** | Mature | Barcode + packaged foods | 2 |
| **Seafood Watch API** | Mature | Sustainable seafood recs | 2 |
| **EPA SMM** | Integrate | Material LCA precision | 3 |
| **Restaurant APIs** | Research | Menu mapping (ChowNow, OpenTable) | 4 |
| **Community Data** | Live | User submissions + validation | Ongoing |

### Phase 3+ (Weeks 21+): Scale & Intelligence
- Public APIs, supply chain tracing, regional variants, academic LCA databases

---

## Critical Path Decision Matrix

| Gap | Phase 1 MVP | Phase 1 Blocker | Phase 2 Enhancement |
|-----|------------|-----------------|-------------------|
| **A (Agribalyse)** | 60-100 foods | License/access | +300 foods, regional variants |
| **B (USDA)** | Enrichment API | None | Caching, expanded queries |
| **C (OpenFoodFacts)** | Optional (barcode) | None | Full integration |
| **D (Certifications)** | Manual seed (20 items) | Data curation | API integration, community validation |
| **E (Materials)** | Seed table (10-15) | Estimation sourcing | EPA/SPC integration, 50+ items |

---

## Phase 1 Week-by-Week Integration Plan

### Week 1: Research + Decision
- [ ] Agribalyse access verification (contact ADEME if needed)
- [ ] Finalize data sources for Phase 1
- [ ] Identify fallback plan if Agribalyse unavailable
- [ ] ClickUp tasks created for Week 2-4

### Week 2: Backend Setup + Data Seeding
- [ ] PostgreSQL schema for foods, materials, certifications
- [ ] Agribalyse CSV/JSON import script
- [ ] USDA API client setup (caching layer)
- [ ] Climatiq client (already in place, verify)
- [ ] Seed table creation (materials, certifications)
- [ ] Unit tests for lookup chain

### Week 3-4: API Integration + Wiring
- [ ] Scan → Detection → Lookup chain wired
- [ ] Confidence label logic (exact/probable/estimate)
- [ ] Mobile ↔ backend communication verified
- [ ] Trust labels displaying on ResultScreen
- [ ] Community submission scaffolding (ready for Phase 2)

---

## How Community Closes Gaps (Phase 2+)

### Gap A (Agribalyse): Regional Variants
**Igniter contribution**: "Organic tomato has lower carbon than conventional"  
→ Community votes on correction  
→ Sparks awarded  
→ New variant added to database with attribution

### Gap B (USDA): Restaurant Dishes
**Igniter contribution**: "Pasta primavera = 200g pasta + 100g vegetables + 2 tbsp oil"  
→ System sums LCA for each component  
→ Community validates the recipe  
→ New composite entry stored

### Gap C (OpenFoodFacts): Data Quality
**Igniter contribution**: "This barcode is wrong; this product is different"  
→ Vote to correct  
→ OpenFoodFacts link updated  
→ Igniter earns Sparks

### Gap D (Certifications): New Badges
**Igniter contribution**: "This tomato is Fair Trade certified"  
→ Submission with photo of cert  
→ Community votes  
→ Badge added to product  
→ Igniter becomes "Trusted Source" for certifications

### Gap E (Materials): Custom Materials
**Igniter contribution**: "This restaurant uses compostable straws from Brand X"  
→ Photos, sourcing info  
→ Community validates  
→ New material entry created  
→ Sparks awarded

---

## Risk & Mitigation Summary

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|-----------|
| Agribalyse inaccessible | Can't ship 100 foods in Phase 1 | Medium | Use Climatiq + seed 50 foods manually |
| Data quality issues | Inaccurate carbon erodes trust | Medium | Confidence labels + community validation |
| Community engagement slow | Gaps persist unfilled | Medium | Sparks system + early Igniter spotlights |
| Barcode lookup failure | Users frustrated on scan | Low | Graceful fallback to text search |
| Rate limits (USDA, APIs) | Lookup latency at scale | Low | Aggressive caching, Phase 2 optimizes |

---

## Next Steps

1. **Week 1 (March 31 - April 6)**: Complete research on Agribalyse + create ClickUp integration tasks
2. **Week 2 (April 7-13)**: Backend seeding + API wiring
3. **Week 3-4 (April 14-27)**: Mobile ↔ backend integration + QA
4. **Week 5-8**: Polish + deploy Phase 1

---

*Green Life Food & Restaurant API Research v1.0 — March 31, 2026*
