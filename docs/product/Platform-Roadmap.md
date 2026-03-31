# Green Life Platform Roadmap

## Purpose

This document captures a broader product direction for Green Life than "mobile app development."

Green Life is becoming a trust product, a community product, and an interface-flexible product. The mobile app is the first strong expression of that vision, but it should not be the only one. The long-term opportunity is to let Green Life live across phones, web surfaces, voice experiences, agents, partner services, and public-facing trust infrastructure.

This matters because the world is moving away from a browser-only model of interaction. People increasingly discover, interpret, and act through assistants, agents, feeds, recommendations, and service layers. Green Life should be built for that world.

## Product Thesis

Green Life helps people understand the world around them with real insights, clear trust signals, and community-powered meaning.

At its heart, Green Life is not only about scanning, searching, or looking up products. It is about:

- making hidden costs legible
- creating a trust layer around materials, sourcing, impact, and claims
- inviting community participation, interpretation, and correction
- turning everyday awareness into action
- making that capability available through whatever interface people are using

The product should be understood as a movement-oriented platform with multiple interfaces, not as a single mobile container.

## Core Layers

Green Life can be understood in three connected layers.

### 1. Experience Layer

This is how people encounter Green Life.

Examples:

- mobile application
- web application
- voice experience
- agent experience
- partner embeds
- API-backed service experiences

The experience layer should adapt to the interface, but still feel unmistakably like Green Life through its language, trust signals, and design system.

### 2. Trust Layer

This is the core differentiator.

Examples:

- source provenance
- methodology
- confidence scoring
- community verification
- badging
- evidence trails
- trust and transparency explanations
- public and open-source data integrations

This layer is larger than any one interface. It is what gives Green Life authority and usefulness whether a user is in the app, on the web, inside a voice flow, or interacting through an agent.

### 3. Intelligence Layer

This is how Green Life interprets and responds.

Examples:

- barcode lookup
- image recognition and scan interpretation
- search and retrieval
- ranking and summarization
- material and sourcing analysis
- conversational assistance
- community signal synthesis
- future agent workflows

The intelligence layer should be separable from the UI so it can support many surfaces over time.

## Why This Direction Matters

The current market is shifting from page-based discovery to answer-based and agent-mediated discovery. Traditional SEO is giving way to answer engine optimization, assistant visibility, embedded intelligence, and service-oriented trust signals.

Green Life is well-positioned for that shift because the product already centers on questions that work across surfaces:

- What is this?
- What does it cost?
- How trustworthy is the answer?
- What does the community know?
- What should I do next?

Those are not "mobile-only" questions. They are universal interpretation questions.

## Current Technical Position

The current Green Life app is already moving in the right direction.

### Strengths already in place

- Expo and React-based foundation with a web path already available
- shared design system direction
- reusable tokens, typography, spacing, and component primitives
- API-focused application layer under `src/api`
- shared query and state patterns that are not tied to a single screen
- mobile runtime now aligned to a more scalable design system implementation

### What this enables

- strong mobile foundation without closing off future web support
- portable branded experiences across multiple surfaces
- the ability to separate platform logic from interface logic
- the ability to eventually expose Green Life capabilities as services, not only screens

## Portability Map

### Portable now

These areas should move to web or other surfaces with relatively low friction.

- design tokens and visual language in `src/theme`
- reusable UI primitives in `src/components/ui`
- item and badge components in `src/components/item`
- content and detail flows such as Home, Search, Community, Profile, Saved, Item Detail, Metric Detail, and Source Detail
- API client patterns in `src/api`
- shared query and state handling in hooks such as `useSparks`

### Needs adaptation

These areas are conceptually portable but will need interface-specific work.

- navigation patterns in `src/navigation`
- authentication and onboarding layouts
- form-heavy interactions
- community layouts that may want richer desktop patterns
- trust and source detail presentation that may expand on larger screens

### Native-first for now

These areas should be treated as specialized clients on top of the same platform.

- camera capture and barcode flows
- photo-based scan workflows
- mobile voice capture and playback flows
- device-specific safe-area, microphone, and camera permission handling

## Strategic Product Framing

Green Life should evolve from "an app that scans and explains" into "a trust and insight platform for the world people see."

That means:

- mobile is a lead client, not the only client
- the trust model is a product asset, not just supporting metadata
- community input is not a side feature, but part of the product's legitimacy and growth
- open data and public APIs should strengthen the trust layer where possible
- badging and explainability should become portable product primitives
- future agent and service integrations should be expected, not treated as edge cases

## Recommended Roadmap

### Phase 1: Mobile Foundation

Goal:
Finish stabilizing the mobile app as the first high-quality expression of the platform.

Priorities:

- complete design-system parity across the active runtime
- keep reducing legacy UI drift
- preserve product scope while improving coherence
- harden the current API integration points
- make trust signals more explicit in the interface

Outcome:
Green Life mobile becomes a polished, scalable front door for the platform.

### Phase 2: Platform Hardening

Goal:
Clarify and strengthen the system beneath the UI.

Priorities:

- formalize the domain model for items, sources, confidence, badges, sparks, and community signals
- separate platform logic from screen logic wherever possible
- define a stable service layer for lookup, search, item detail, source detail, and user/community data
- create clearer contracts for backend and public API integration
- document how trust, evidence, and badging work

Outcome:
Green Life becomes easier to support across mobile, web, and future service interfaces.

### Phase 3: Web Surface

Goal:
Launch a web-based Green Life experience focused on the flows that are already portable.

Suggested first web surfaces:

- Home
- Search
- Community
- Item Detail
- Source Detail
- Profile

Principle:
Do not force mobile-native capture behaviors into the first web release. Let web be excellent at exploration, interpretation, trust review, and community interaction.

Outcome:
Green Life becomes accessible in a browser without diluting the mobile product.

### Phase 4: Trust Layer Expansion

Goal:
Make trust and transparency a first-class public capability.

Priorities:

- richer source pages
- clearer provenance trails
- methodology and evidence pages
- badge definitions and criteria
- trust explanations that can be linked, quoted, or embedded
- public-facing trust artifacts that support community and partner credibility

Outcome:
Green Life starts to function as a trust layer, not only a consumer UI.

### Phase 5: Agent and Service Interfaces

Goal:
Allow Green Life to participate in a world where users increasingly act through assistants, agents, and service workflows.

Potential directions:

- agent-accessible lookup and explanation endpoints
- structured result objects designed for assistant consumption
- embeddable trust and source cards
- partner API integrations
- voice-first and multimodal assistant experiences
- workflow integrations where Green Life provides interpretation, validation, or trust scoring

Outcome:
Green Life becomes available wherever interpretation and trust are needed, not only where a user opens the app.

## Product Principles Going Forward

### 1. Build for many surfaces, not one container

Decisions should increasingly favor reusable platform capabilities over UI-specific shortcuts.

### 2. The trust layer is the moat

Confidence, methodology, provenance, evidence, and community legitimacy are strategic assets.

### 3. Community is part of product truth

Community input, sparks, rankings, contributions, and shared interpretation should strengthen the product over time.

### 4. Design system consistency is strategic, not cosmetic

The design system is what allows Green Life to scale coherently across interfaces and teams.

### 5. Native features should be treated as clients of the platform

Camera, voice, device sensors, and other hardware-led experiences should sit on top of the same underlying trust and intelligence layers.

### 6. The product should be explainable everywhere

Green Life should be able to explain itself in a screen, in a browser, in a shared card, in a voice reply, or in an agent response.

## Immediate Next Questions

These questions deserve active thought as the product evolves.

- What is the canonical Green Life trust model?
- How should badges be defined and governed?
- What role should community validation play in trust and ranking?
- Which capabilities should be public APIs versus internal services?
- What is the first web experience that creates real value without bloating scope?
- What agent-ready outputs should Green Life eventually expose?
- How should the platform balance authoritative sources, public data, and community input?

## Near-Term Execution Guidance

For the current phase of work, the right sequence is:

1. finish the mobile design-system migration
2. strengthen the app and backend contracts
3. define the trust layer explicitly
4. choose the first portable web flows
5. evolve toward agent and service interfaces intentionally

This preserves momentum while keeping Green Life aligned with the larger opportunity.

## Closing View

Green Life should be built as a universal trust and insight platform for the world people see.

The mobile app remains essential, but it should be understood as the beginning of the platform, not the boundary of it.

If this direction is followed well, Green Life can become a product that meets people in many forms:

- in hand
- on the web
- in conversation
- inside an agent
- inside a service
- inside a movement

That is the scale of the opportunity.
