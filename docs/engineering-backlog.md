# Green Life Engineering Backlog

## Frontend

### Sprint 1

- [ ] Initialize Expo + TypeScript app shell
- [ ] Set up React Navigation root stack and tab navigator
- [ ] Add theme tokens from Figma foundations
- [ ] Build shared UI primitives: `Screen`, `Button`, `SearchBar`, `Badge`
- [ ] Build `HomeScreen`
- [ ] Build `SearchScreen` with mock data
- [ ] Build `ItemDetailScreen` with mock data

### Sprint 2

- [ ] Add API client and typed response models
- [ ] Wire `GET /search` to `SearchScreen`
- [ ] Wire `GET /items/{id}` to `ItemDetailScreen`
- [ ] Build `SavedScreen`
- [ ] Build `ProfileScreen`
- [ ] Add loading, empty, and error states

### Sprint 3

- [ ] Implement barcode scanner with Expo camera
- [ ] Wire `POST /lookup/barcode`
- [ ] Implement `NoMatchScreen`
- [ ] Implement source detail flow with `GET /sources/{id}`
- [ ] Implement save/remove item interactions

### Sprint 4

- [ ] Implement photo capture and image upload flow
- [ ] Wire `POST /lookup/image`
- [ ] Build `CandidateResultsScreen`
- [ ] Add guest upgrade prompt for save attempts
- [ ] Add analytics and error tracking hooks

## Backend

### Sprint 1

- [ ] Scaffold API service
- [ ] Set up PostgreSQL schema for products, identifiers, sources, and impact metrics
- [ ] Add auth strategy for guest plus signed-in users
- [ ] Implement `GET /health`
- [ ] Seed a minimal local dataset

### Sprint 2

- [ ] Implement `POST /lookup/barcode`
- [ ] Implement `GET /search`
- [ ] Implement `GET /items/{id}`
- [ ] Add source provenance serialization
- [ ] Add lookup history persistence

### Sprint 3

- [ ] Implement `GET /sources/{id}`
- [ ] Implement `GET /me/history`
- [ ] Implement `GET /me/saved-items`
- [ ] Implement `POST /me/saved-items`
- [ ] Implement `DELETE /me/saved-items/{itemId}`

### Sprint 4

- [ ] Implement image lookup ingestion endpoint
- [ ] Add OCR/image matching service integration
- [ ] Add confidence score rules for exact vs estimated matches
- [ ] Add admin endpoints for source record review
- [ ] Add mapping override support

## Data Workstream

- [ ] Finalize MVP categories
- [ ] Audit EPA-accessible datasets
- [ ] Audit EPD data sources and licensing
- [ ] Define canonical metric taxonomy
- [ ] Define match confidence rubric
- [ ] Build first ingestion pipeline
- [ ] Create source freshness policy

## Design and Handoff

- [ ] Complete Figma foundations page
- [ ] Complete wireframes
- [ ] Build UI kit variants
- [ ] Complete high-fidelity MVP screens
- [ ] Prototype exact-match and no-match flows
- [ ] Deliver token names that match frontend theme keys

## Release Readiness

- [ ] Validate supported item categories with test set
- [ ] Review source attribution on every shown metric
- [ ] Confirm exact vs estimated labeling is consistent
- [ ] Run internal QA on scan, search, save, and source flows
- [ ] Prepare TestFlight and Android internal builds
