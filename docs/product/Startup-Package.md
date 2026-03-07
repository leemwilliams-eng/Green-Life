# Green Life Startup Package

## 1. Executive Summary

### Product
Green Life is a mobile app that helps users identify the environmental impact of products and materials around them. Users scan a barcode, take a photo, or search by name to view a source-backed impact summary, including carbon footprint, material composition, recyclability, disposal guidance, and confidence level.

### Problem
Environmental impact information is difficult to access, fragmented across EPA resources, EPD databases, manufacturer disclosures, and other sustainability datasets. Most consumers cannot easily determine whether a product is environmentally harmful, recyclable, or lower impact than alternatives.

### Solution
Green Life converts fragmented environmental data into a fast, mobile-first experience. It identifies products or materials, maps them to known records or estimates, and presents transparent, source-cited environmental metrics.

### Why Now
- Consumer demand for sustainability transparency is increasing.
- Public environmental datasets are more available than before, but still hard to use.
- Camera, OCR, and barcode workflows are mature enough for a strong MVP.
- Trustworthy environmental tooling for ordinary consumers remains limited.

### Target Market
Initial users:
- environmentally conscious consumers
- homeowners/renters
- shoppers comparing products
- people making disposal or purchase decisions

Future users:
- educators
- sustainability programs
- small business procurement teams

### Core Value Proposition
"Scan something and understand its environmental impact in seconds."

### MVP
The first release should focus on:
- barcode scan
- text search
- product/category matching
- impact summary
- source attribution
- confidence labeling
- saved history

### Business Potential
Possible long-term monetization:
- affiliate recommendations for lower-impact alternatives
- premium consumer features
- B2B sustainability lookup API
- enterprise procurement or reporting tools

## 2. MVP Feature Spec

### Feature 1: Barcode Scan
Purpose:
Allow fast identification of packaged products.

Requirements:
- User can open camera and scan barcode.
- App sends barcode to backend.
- Backend attempts exact product match.
- If found, app returns product profile with environmental data.
- If not found, app offers search fallback.

Success Metric:
- high scan-to-result completion rate on supported products

### Feature 2: Text Search
Purpose:
Allow lookup when barcode is missing or scan fails.

Requirements:
- User can search by product name, brand, material, or category.
- Search returns best-match results ranked by relevance.
- User can select a result and open detail view.

Success Metric:
- high rate of successful product/category discovery from search

### Feature 3: Photo Capture / Image Input
Purpose:
Support future object identification and OCR-assisted matching.

MVP Scope:
- capture/upload image
- optionally run OCR for visible labels/text
- use image as a fallback input, not primary matching method

Success Metric:
- assists search resolution when barcode is unavailable

### Feature 4: Impact Summary Screen
Purpose:
Present environmental information clearly and quickly.

Requirements:
- Show product/item name
- Show match type: exact / probable / estimate
- Show key metrics:
  - carbon footprint
  - material composition
  - recyclability
  - recycled content
  - disposal guidance
  - hazard flags where available
- Show source attribution for each metric
- Show freshness/date where available

Success Metric:
- users understand the result without needing to open technical details

### Feature 5: Confidence Labeling
Purpose:
Prevent overstating precision.

Requirements:
- Every result must display one of:
  - Exact Product Match
  - Probable Product Match
  - Category Estimate
  - Material Estimate
- Confidence label must appear near top of result screen.
- Metrics derived from estimates should be visibly marked.

Success Metric:
- low user confusion and low trust erosion from uncertain data

### Feature 6: Saved Items / History
Purpose:
Improve retention and repeat use.

Requirements:
- User can save an item
- User can view prior scans/searches
- User can remove saved entries

Success Metric:
- repeat engagement and retained value after first use

### Feature 7: Admin Review Tool
Purpose:
Support internal quality control.

Requirements:
- Admin can inspect product-source mappings
- Admin can review questionable matches
- Admin can correct category/product associations
- Admin can view data provenance and confidence metadata

Success Metric:
- reduced error rate in user-facing results

## 3. Technical Architecture

### Architecture Overview
Use a mobile client backed by a normalization and matching platform.

Recommended stack:
- Mobile: React Native with Expo
- Backend API: FastAPI or NestJS
- Database: PostgreSQL
- Search: PostgreSQL full-text initially
- Storage: S3-compatible object storage
- Auth: Clerk, Firebase Auth, or Auth0
- Admin UI: simple React web panel

### Core Components
Mobile App
- onboarding/auth
- barcode scanner
- camera/photo upload
- search UI
- result screen
- saved history

API Layer
- authentication
- product lookup endpoints
- search endpoints
- saved item endpoints
- source/metric retrieval

Matching Service
- barcode exact match
- search ranking
- OCR-assisted product matching
- fallback category/material estimation

Environmental Scoring Service
- retrieves normalized impact metrics
- resolves conflicts between sources
- attaches confidence score
- formats results for API clients

Data Ingestion / ETL
- imports EPA and other datasets
- parses EPD and structured disclosures
- maps incoming records to canonical schema
- stores provenance and freshness data

Admin Tooling
- review records
- inspect source lineage
- override mappings
- QA uncertain results

### Canonical Data Model
Core tables/entities:
- products
- brands
- categories
- materials
- product_identifiers
- impact_metrics
- sources
- source_records
- product_matches
- saved_items
- users

### Lookup Flow
1. User scans barcode or searches text.
2. API sends request to matching service.
3. Matching service resolves product or fallback category/material.
4. Scoring service retrieves environmental metrics.
5. API returns normalized response with:
   - item identity
   - metrics
   - source attribution
   - confidence label
   - timestamps/freshness

### Data Principles
- preserve source provenance
- never discard methodology metadata if available
- separate exact data from estimates
- track freshness and dataset version
- support partial records without breaking UX

### External Data Integration Strategy
Integrate in layers:
1. Product metadata/barcode source
2. EPA/public environmental datasets
3. EPD providers
4. Manufacturer disclosures
5. Category-level carbon/material factor datasets

### Primary Technical Risk
The main challenge is not UI. It is data normalization, confidence scoring, and source quality management.

## 4. User Stories and Acceptance Criteria

### Epic: Product Identification

#### Story 1
As a user, I want to scan a barcode so I can identify a product quickly.

Acceptance Criteria:
- User can open barcode scanner from home screen.
- Valid barcode returns a result if product exists in system.
- If no exact match is found, user is shown a fallback path.
- Result loads within acceptable performance target under normal conditions.

#### Story 2
As a user, I want to search by name or brand so I can find products manually.

Acceptance Criteria:
- Search input accepts free text.
- Search results are ranked by relevance.
- User can open a result detail page from search results.
- Empty or failed search states provide recovery guidance.

### Epic: Environmental Impact Display

#### Story 3
As a user, I want to see a product's carbon footprint and related metrics.

Acceptance Criteria:
- Result screen shows available environmental metrics.
- Each metric includes unit and source.
- Missing metrics do not break the page.
- Metrics are clearly labeled as exact or estimated when relevant.

#### Story 4
As a user, I want to know how reliable the result is.

Acceptance Criteria:
- Each result displays match/confidence type.
- Confidence label appears before detailed metrics.
- Estimated results are visually differentiated from exact matches.

### Epic: Transparency and Trust

#### Story 5
As a user, I want to know where the data came from.

Acceptance Criteria:
- Each key metric includes source attribution.
- Source metadata is accessible in the detail view.
- Dataset date/version is shown where available.

#### Story 6
As a user, I want the app to avoid false precision.

Acceptance Criteria:
- The system never presents category estimates as exact product values.
- Fallback estimates are labeled in API and UI.
- Confidence logic is enforced consistently across supported result types.

### Epic: Retention

#### Story 7
As a user, I want to save items for later.

Acceptance Criteria:
- Signed-in users can save a result.
- Saved items appear in a history/list view.
- Users can remove saved items.

### Epic: Admin and Data Quality

#### Story 8
As an admin, I want to review product-to-source mappings.

Acceptance Criteria:
- Admin can search products and inspect matched sources.
- Admin can see confidence metadata and source lineage.
- Admin can flag or correct problematic mappings.

#### Story 9
As an admin, I want to inspect ingest quality.

Acceptance Criteria:
- Admin can view imported source records.
- Admin can see ingestion date and source name.
- Failed or incomplete mappings are visible for review.

## 5. Suggested MVP Backlog

### Sprint 1
- finalize supported categories
- define schema
- set up mobile app shell
- set up backend, auth, database

### Sprint 2
- barcode scan flow
- text search flow
- product/result API
- initial admin panel scaffold

### Sprint 3
- ingest first product metadata source
- ingest first environmental data source
- implement canonical metric model
- build result detail UI

### Sprint 4
- confidence labeling
- saved items/history
- QA and admin correction flow
- MVP analytics and error tracking

### Sprint 5
- hardening
- usability testing
- data coverage review
- launch prep

## 6. Recommended MVP Narrowing

If you want the highest chance of shipping, start with one of these:
- packaged household products
- food and beverage packaged goods
- building materials and furniture

Do not start with "everything around you." That creates a computer vision and data coverage problem too early.

## 7. Immediate Next Deliverables

Possible next artifacts:
- investor pitch deck outline
- app screen map and wireframe spec
- database schema
- API endpoint spec
- a phased build plan with team roles and timeline

The most useful next step after this package was the screen map and API spec, because that turns the concept package into a buildable product.
