# Green Life Figma-Ready Screen Specification

Create a Figma file named `Green Life Mobile`.

## 1. Pages
Use these pages in order:
1. `00 Cover`
2. `01 Foundations`
3. `02 Wireframes`
4. `03 UI Kit`
5. `04 Screens`
6. `05 Prototype`
7. `06 Notes`

## 2. Frame Standards
Use mobile app frames:
- `iPhone 15 Pro` width for primary design
- Add one Android validation frame set later

Use naming format:
- `Screen / Home`
- `Screen / Search / Results`
- `Screen / Item Detail / Exact Match`
- `Component / Button / Primary`
- `Component / Badge / Confidence / High`

Keep an 8pt spacing system.

Suggested base tokens:
- Spacing: `4, 8, 12, 16, 24, 32, 40`
- Radius: `8, 12, 16, 24`
- Icon sizes: `16, 20, 24, 32`
- Stroke: `1`

## 3. Foundations Page
Create these sections.

### Color Tokens
Use a clean green-forward palette:
- `Green/900` deep forest
- `Green/700` primary action
- `Green/500` active accent
- `Green/100` soft surface tint
- `Sand/50` warm background
- `Slate/900` primary text
- `Slate/600` secondary text
- `Slate/300` borders
- `White`
- `Alert/Amber`
- `Alert/Red`
- `Info/Blue`

### Typography
Define text styles:
- `Display / Large`
- `Heading / H1`
- `Heading / H2`
- `Title / Large`
- `Body / Regular`
- `Body / Small`
- `Label / Medium`
- `Caption / Small`

Use one modern sans family consistently. Good direction:
- `Manrope`, `Sora`, or `Plus Jakarta Sans`

### Effects
- Card shadow: subtle only
- No heavy blur initially
- Prefer contrast through surface layers, not dramatic shadows

## 4. Wireframes Page
Build low-fidelity grayscale frames first.

Required wireframes:
- `Wireframe / Onboarding`
- `Wireframe / Permissions`
- `Wireframe / Auth`
- `Wireframe / Home`
- `Wireframe / Barcode Scanner`
- `Wireframe / Search`
- `Wireframe / Photo Capture`
- `Wireframe / Candidate Results`
- `Wireframe / Item Detail`
- `Wireframe / Metric Detail`
- `Wireframe / Source Detail`
- `Wireframe / No Match`
- `Wireframe / Saved`
- `Wireframe / Profile`

For each wireframe annotate:
- primary action
- secondary action
- data shown
- empty/error state if relevant

## 5. UI Kit Page
Build reusable components before high-fidelity screens.

### Navigation
- `Component / Top Bar / Default`
- `Component / Tab Bar / 4 Item`
- `Component / Search Bar / Default`
- `Component / Search Bar / Active`

### Buttons
- `Component / Button / Primary`
- `Component / Button / Secondary`
- `Component / Button / Tertiary`
- `Component / Icon Button`

States:
- default
- pressed
- disabled

### Cards
- `Component / Card / Action`
- `Component / Card / Result`
- `Component / Card / Saved Item`
- `Component / Card / Source`
- `Component / Card / Empty State`

### Badges
- `Component / Badge / Match / Exact`
- `Component / Badge / Match / Probable`
- `Component / Badge / Match / Category Estimate`
- `Component / Badge / Match / Material Estimate`
- `Component / Badge / Confidence / High`
- `Component / Badge / Confidence / Medium`
- `Component / Badge / Confidence / Low`

### Metric Components
- `Component / Metric Row / Default`
- `Component / Metric Row / Estimated`
- `Component / Metric Row / Missing`
- `Component / Material Breakdown Row`
- `Component / Disposal Guidance Row`
- `Component / Hazard Flag Row`

### Utility Components
- `Component / Section Header`
- `Component / List Row`
- `Component / Toast / Success`
- `Component / Toast / Error`
- `Component / Empty State`
- `Component / Error State`
- `Component / Permission Prompt`

Use variants, not separate detached frames, wherever possible.

## 6. Screens Page
Build these high-fidelity screens.

### Screen / Home
Sections:
- top greeting/app title
- search bar
- two main actions:
  - `Scan Barcode`
  - `Take Photo`
- recent items
- confidence explainer strip
- bottom tabs

### Screen / Search / Empty
Sections:
- search input
- recent/suggested terms
- filter chips
- bottom tabs

### Screen / Search / Results
Sections:
- search input active
- filter chips
- result cards with match badge
- loading and no-results variants

### Screen / Barcode Scanner
Sections:
- top bar
- camera frame overlay
- flash
- manual entry
- helper text

### Screen / Photo Capture
Sections:
- preview area
- capture/upload actions
- guidance text
- continue/retake state

### Screen / Candidate Results
Sections:
- explanation header
- ranked candidate cards
- confidence labels
- search fallback CTA

### Screen / Item Detail / Exact Match
Sections:
- hero item block
- exact match badge
- confidence indicator
- key metrics section
- materials section
- disposal guidance section
- sources section
- save CTA

### Screen / Item Detail / Estimated
Same layout, but visually distinct:
- estimated badge
- lighter caution/info strip
- metric rows marked `Estimated`

### Screen / Metric Detail
Sections:
- metric name/value
- methodology
- scope
- confidence
- linked source

### Screen / Source Detail
Sections:
- source name
- type
- version/date
- ingestion info
- methodology notes
- external link button

### Screen / No Match
Sections:
- message
- retry actions
- category estimate fallback
- manual search CTA

### Screen / Saved
Sections:
- saved list
- optional sort/filter
- empty state variant

### Screen / Profile
Sections:
- account block
- permissions
- about confidence labels
- privacy/terms
- sign out

## 7. Prototype Flows
In `05 Prototype`, connect these flows:

### Flow 1: Exact Match
`Home -> Barcode Scanner -> Item Detail / Exact -> Source Detail`

### Flow 2: Search
`Home -> Search / Results -> Item Detail / Estimated -> Metric Detail`

### Flow 3: No Match Recovery
`Home -> Photo Capture -> No Match -> Search / Empty`

### Flow 4: Save
`Item Detail -> Saved`

## 8. Annotation Rules
On `06 Notes`, add short annotations for:
- what data is exact vs estimated
- where source provenance appears
- which screens require auth
- guest save behavior
- empty/loading/error states

Keep each annotation to one short sentence.

## 9. Handoff Naming For React Native
Match Figma names to React files:
- `Screen / Home` -> `HomeScreen.tsx`
- `Screen / Search / Results` -> `SearchScreen.tsx`
- `Screen / Barcode Scanner` -> `BarcodeScannerScreen.tsx`
- `Screen / Photo Capture` -> `PhotoCaptureScreen.tsx`
- `Screen / Candidate Results` -> `CandidateResultsScreen.tsx`
- `Screen / Item Detail / Exact Match` -> `ItemDetailScreen.tsx`
- `Screen / Metric Detail` -> `MetricDetailScreen.tsx`
- `Screen / Source Detail` -> `SourceDetailScreen.tsx`
- `Screen / No Match` -> `NoMatchScreen.tsx`
- `Screen / Saved` -> `SavedScreen.tsx`
- `Screen / Profile` -> `ProfileScreen.tsx`

Components:
- `Component / Button / Primary` -> `PrimaryButton.tsx`
- `Component / Card / Result` -> `ResultCard.tsx`
- `Component / Badge / Match / Exact` -> `MatchBadge.tsx`
- `Component / Metric Row / Default` -> `MetricRow.tsx`

## 10. Recommended Visual Direction
Keep it intentional, not generic:
- warm off-white background, not pure white
- deep green primary, not neon green
- rounded cards with clean spacing
- editorial typography with strong section headings
- environmental trust aesthetic, not eco gimmick

## 11. Follow-On Artifacts
The next useful artifact after this spec was the React Native scaffold spec with folder structure, navigation map, theme tokens, shared component list, and starter screen contracts.
