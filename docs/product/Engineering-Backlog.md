# Green Life Engineering Backlog

_Expanded execution backlog aligned to the current implementation and the original planning outputs._

## 1. Frontend Workstream

### Design System and Shared UI
- finalize theme tokens against the latest approved visual direction
- align typography, spacing, and surface styles to the final Figma system
- replace temporary code-drawn logo marks with clean exported assets
- standardize badges for match type and confidence state
- standardize cards for results, saved items, sources, empty states, and errors
- verify tab bar, header, and button styles across onboarding, core tabs, and second-level flows

### Core Screen Completion
- finish visual polish for Home, Search, Saved, and Profile
- refine Search states: empty, active query, loading, no results, and partial match results
- refine Item Detail layout for exact-match and estimated-result variants
- ensure Metric Detail and Source Detail have clear hierarchy for provenance and methodology
- improve No Match recovery flow with stronger fallback actions
- polish Candidate Results ranking and confidence presentation

### Camera and Device Behaviors
- replace simulated scanner flow with actual barcode scan behavior
- replace simulated image flow with real camera capture and upload handling
- verify permission requests and denied-permission states on device
- add flash toggle, manual barcode entry fallback, and retake flow

### State and Data Handling
- continue using TanStack Query for server state
- keep transient UI state in lightweight local stores only
- ensure guest-user behavior is clear when save actions require auth
- preserve confidence labels and source attribution in every result surface

### Accessibility and Quality
- add loading, empty, and error states to all major screens
- review text contrast, touch target sizes, and screen-reader labels
- test across iOS and Android safe areas and common device sizes
- remove placeholder copy and temporary content before release builds

## 2. Backend Workstream

### API Foundation
- implement real API service matching the documented endpoint contracts
- support `/lookup/barcode`, `/search`, `/lookup/image`, `/items/{id}`, and `/sources/{id}`
- support `/me/history`, `/me/saved-items`, and `/me/profile`
- support admin endpoints for products, source records, review queue, and mapping overrides

### Matching and Lookup
- build exact-match resolution for known barcodes
- build ranked search across products, brands, categories, and materials
- add OCR-assisted and image-assisted candidate generation
- support fallback to category or material estimates when exact data is unavailable

### Result Assembly
- return normalized result objects with `match_type`, `confidence_score`, `estimate_type`, and `sources`
- support partial result assembly when some metrics are missing
- keep source provenance attached to user-facing metrics
- enforce API rules that prevent overstating exactness

### Persistence and User Features
- store saved items and lookup history
- support guest-safe lookup paths while reserving persistence for signed-in users where needed
- add audit-friendly admin override and review operations

## 3. Data and Ingestion Workstream

### Source Validation
- finalize the initial set of supported categories for MVP
- audit EPA datasets for relevance, access method, and license constraints
- audit EPD sources for structure, coverage, and commercial-use restrictions
- identify product metadata and barcode sources to support exact matches
- identify category/material factor datasets for fallback estimates

### Canonical Model and Mapping
- finalize canonical entities: products, brands, categories, materials, impact metrics, sources, and source records
- define mapping rules between source records and user-facing products/categories/materials
- define the confidence rubric for exact, probable, category, and material estimate results
- preserve raw payloads and methodology details for QA and source traceability

### Data Freshness and QA
- define freshness policy for imported sources
- implement ingestion timestamps and dataset version tracking
- create admin review queues for low-confidence or incomplete mappings
- add rules for handling conflicts between multiple source methodologies

## 4. Design Workstream

### Figma and Asset Pipeline
- continue building and refining the Figma file around the agreed screen structure
- export clean logo, hero, and screen assets rather than using screenshot previews
- keep Figma component names aligned to React Native file and component names
- document exact-match versus estimated-state visuals in the design system

### Screen Design Priorities
- complete high-fidelity screens for Home, Search, Item Detail, Saved, and Profile first
- complete second-level screens for Barcode Scanner, Photo Capture, Candidate Results, No Match, Metric Detail, and Source Detail
- define component variants for exact, probable, and estimated result states
- maintain clear visual treatment for source provenance and confidence indicators

### Figma MCP
- if the target session has a working Figma MCP connection, switch from screenshot-driven implementation to direct frame inspection
- otherwise continue using exported PNG/SVG assets and precise frame references

## 5. Documentation and Product Ops
- keep the PRD as the system-of-record product document
- keep startup package, screen map, API spec, database schema, frontend scaffold, and Figma screen spec in sync with implementation
- continue producing both markdown and docx outputs for shareability
- generate PDFs for stakeholder review when document sets are updated
- maintain `SESSION-HANDOFF.md` so other sessions can continue work without losing context

## 6. Release Readiness

### App Readiness
- run full device QA in Expo on the key onboarding, lookup, detail, and save flows
- validate that confidence and estimate labels appear consistently
- validate that source details are reachable from result surfaces
- verify camera permissions, safe area handling, and navigation transitions

### Data Readiness
- confirm at least one narrow MVP category has acceptable coverage and trust level
- verify source attribution completeness on all surfaced core metrics
- verify admin review paths for low-confidence and disputed mappings

### Delivery Readiness
- prepare internal demo build
- prepare stakeholder-ready docs package
- confirm mock API fallback is disabled or clearly separated when live backend is ready

## 7. Recommended Execution Order
1. Finish Figma-aligned visual refinement on the currently running Expo app.
2. Replace temporary assets and code-drawn marks with clean exported brand assets.
3. Implement the real backend endpoints matching the documented contracts.
4. Stand up ingestion for one narrow, supportable MVP category.
5. Validate confidence, provenance, and estimate behavior with real data.
6. Run device QA and prepare internal build review.

## 8. Current Completed Baseline
The current project already includes:
- running Expo mobile shell
- onboarding and permissions screens customized from provided mock screenshots
- tab screens for Home, Search, Saved, and Profile
- second-level screens for Barcode Scanner, Photo Capture, Candidate Results, Item Detail, Metric Detail, Source Detail, and No Match
- in-app mock API and standalone mock server
- documented product, architecture, API, schema, scaffold, and handoff artifacts

This means the backlog should now focus on fidelity, live data, asset cleanup, and integration rather than re-scaffolding the application.
