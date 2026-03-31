# Green Life Engineering Backlog

_Execution backlog aligned to the platform roadmap, founder brief, and execution compass._

## Purpose

This backlog is the execution layer of the Green Life vision.

It should do more than list implementation tasks. It should make clear how engineering work supports the larger product direction:

- a polished and trustworthy mobile experience
- a durable trust layer
- a reusable platform foundation
- future web portability
- eventual agent and service interfaces

The backlog should always be read through that lens.

## Strategic Workstreams

## 1. Mobile Foundation

Goal:
Finish the mobile app as the first strong expression of the Green Life platform.

### Design System and Shared UI

- complete design-system parity across the active `src/` runtime
- keep typography, spacing, cards, buttons, badges, and navigation aligned to the latest approved visual system
- continue replacing one-off screen styling with shared primitives
- verify brand assets, footer treatment, and high-visibility screen rhythm across the app
- ensure confidence, match, and source states are visually consistent everywhere

### Active Screen Polish

- continue polishing Home, Search, Community, Saved, and Profile
- refine Search states: empty, active query, loading, no results, and partial results
- refine Community as a scalable destination with feed plus secondary community panels
- tighten Item Detail, Metric Detail, and Source Detail hierarchy for trust and explainability
- improve No Match and recovery states with stronger next actions
- polish Candidate Results ranking and confidence presentation

### Device and Interaction Behavior

- replace simulated scanner flow with real barcode scan behavior
- replace simulated image flow with real camera capture and upload handling
- verify microphone, camera, and permission flows on-device
- support flash toggle, retake, manual entry fallback, and denied-permission recovery
- continue validating emulator and phone testing workflows so iteration remains fast

### Quality and Accessibility

- ensure all major screens have loading, empty, and error states
- review contrast, touch targets, motion, and screen-reader labels
- test safe-area and layout behavior across common device sizes
- remove temporary copy and placeholder content before release paths

## 2. Trust Layer and Product Semantics

Goal:
Make Green Life's core trust model explicit and enforceable in the product and platform.

### Trust Model Definition

- define the canonical confidence rubric for exact, probable, category, and material estimates
- define badge types, meanings, and criteria
- define how source provenance is stored and surfaced
- define methodology visibility rules for user-facing outputs
- define how community signal influences ranking, trust, and presentation

### Explainability and Evidence

- ensure every major result surface can explain why a result is shown
- preserve visible source attribution on major metrics
- make source detail, methodology notes, and freshness legible
- define when the system should show uncertainty versus abstain
- avoid any API or UI behavior that implies false precision

### Community as Product Truth

- define sparks, rankings, contributions, and trust-related community interactions
- determine how community input is validated and weighted
- identify where community features are expressive versus evidentiary
- keep community capabilities connected to trust rather than generic social mechanics

## 3. Platform Hardening

Goal:
Separate shared product capability from any single client or screen.

### API Foundation

- implement the real API service matching the documented contracts
- support `/lookup/barcode`, `/search`, `/lookup/image`, `/items/{id}`, and `/sources/{id}`
- support `/me/history`, `/me/saved-items`, and `/me/profile`
- support admin endpoints for products, source records, review queue, and mapping overrides

### Domain and Service Layer

- formalize canonical entities for products, brands, categories, materials, impact metrics, sources, source records, badges, and community signals
- separate result assembly and trust logic from UI-specific code
- standardize platform contracts for lookup, search, item detail, source detail, saved items, and profile
- reduce reliance on mock-specific assumptions as live services come online

### State and Data Contracts

- continue using React Query for server state and lightweight local state for transient UI behavior
- keep result objects structured around `match_type`, `confidence_score`, `estimate_type`, `sources`, and trust metadata
- make sure API response shapes are portable across mobile, web, and future services
- preserve guest-safe interaction paths while clearly defining auth-required actions

## 4. Data and Ingestion

Goal:
Build the evidence foundation that makes Green Life trustworthy.

### Source Validation

- finalize the initial MVP categories with supportable trust coverage
- audit EPA datasets for relevance, access method, and license constraints
- audit EPD sources for structure, coverage, freshness, and commercial-use restrictions
- identify product metadata and barcode sources for exact matches
- identify category and material factor datasets for fallback estimates

### Canonical Mapping

- define mapping rules between source records and user-facing products, categories, and materials
- preserve raw source payloads and methodology details for QA and traceability
- define conflict resolution rules for multiple sources or methodologies
- define data freshness policy and version tracking

### Review and QA

- create admin review paths for low-confidence and incomplete mappings
- define audit-friendly override workflows
- support internal validation of disputed or conflicting results

## 5. Web Readiness

Goal:
Prepare Green Life for a future web surface without diluting the mobile product.

### Portable Surface Identification

- identify which active flows are ready for web-first adaptation: Home, Search, Community, Item Detail, Source Detail, Profile
- mark which mobile-native experiences remain specialized clients for now
- reduce implicit mobile-only assumptions in shared logic where possible

### Interface Adaptation Planning

- define how navigation should translate from mobile tabs/stacks to web layouts
- define how trust, provenance, and community elements should expand on larger screens
- identify which components should become cross-surface primitives
- keep web planning grounded in the same design-system and trust model language

### Technical Preparation

- keep shared API and domain logic decoupled from mobile-only UI code
- preserve and improve the Expo web path where practical
- avoid introducing client-specific assumptions into reusable platform modules

## 6. Agent and Service Readiness

Goal:
Prepare Green Life for a world where users increasingly encounter products through assistants, agents, and service layers.

### Structured Outputs

- define result shapes that work well for non-visual consumers
- ensure key trust signals can be represented outside of app UI
- identify which outputs should be concise summaries versus evidence-rich objects

### Platform Exposure

- identify candidate public or partner-facing endpoints for lookup, trust, and source explanation
- define what should remain internal versus what could become a public API or partner service
- think about embeddable trust cards, explainability modules, and structured summaries

### Future Interaction Modes

- identify where voice, assistant, and workflow-driven experiences differ from screen-first experiences
- keep the intelligence and trust layers reusable enough to support those future modes

## 7. Design and Documentation Alignment

Goal:
Keep implementation, design, and product intent moving together.

### Design Alignment

- continue building and refining the design system and Figma work around the agreed product direction
- keep component names and conceptual models aligned between design and code
- document exact, probable, and estimated result-state visuals clearly

### Documentation Operations

- keep the PRD, platform roadmap, founder brief, execution compass, API spec, schema, and screen map in sync with implementation
- maintain `SESSION-HANDOFF.md` so future sessions preserve context
- continue producing stakeholder-friendly documentation as the platform vision matures

## 8. Release and Validation

Goal:
Validate that Green Life is trustworthy, coherent, and ready for the next stage of platform work.

### Product Validation

- run full device QA across onboarding, lookup, detail, save, and community flows
- verify confidence and estimate labels appear consistently
- verify source details are reachable and understandable from result surfaces
- validate design-system consistency on the highest-traffic flows

### Data Validation

- confirm at least one MVP category has acceptable trust coverage
- verify provenance completeness on surfaced metrics
- verify review and override paths for low-confidence results

### Delivery Validation

- prepare internal demo builds
- prepare stakeholder-ready docs and product materials
- clearly separate mock behavior from live backend behavior as services come online

## Recommended Execution Order

1. Finish mobile design-system alignment and active runtime polish.
2. Harden backend and API contracts around the real product model.
3. Define the trust layer explicitly: confidence, badges, provenance, methodology, and community signal.
4. Stand up ingestion and validation for one narrow, supportable MVP category.
5. Validate trust behavior with real data.
6. Identify the first portable web flows.
7. Begin shaping structured outputs and service-ready platform contracts.

## Current Completed Baseline

The current project already includes:

- a running Expo mobile shell
- the active mobile runtime aligned to the newer design-system-driven `src/` layer
- onboarding, auth, and permissions flows
- tab screens for Home, Search, Community, Saved, and Profile
- second-level screens for Barcode Scanner, Photo Capture, Candidate Results, Item Detail, Metric Detail, Source Detail, and No Match
- in-app mock API and standalone mock server
- product, architecture, API, schema, roadmap, and handoff documentation

This means the backlog should now focus on quality, trust, live data, portability, and platform hardening rather than basic scaffolding.
