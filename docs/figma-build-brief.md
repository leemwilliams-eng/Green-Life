# Green Life Figma Build Brief

This document is the local handoff artifact for building the Green Life Figma file. A live Figma cloud file cannot be created from this terminal because there is no Figma MCP/session tool available in the current environment.

## File Name

`Green Life Mobile`

## Pages

1. `00 Cover`
2. `01 Foundations`
3. `02 Wireframes`
4. `03 UI Kit`
5. `04 Screens`
6. `05 Prototype`
7. `06 Notes`

## Cover Page

Title:
- `Green Life`

Subtitle:
- `Mobile MVP for environmental impact lookup`

Meta:
- `Platform: React Native + Expo`
- `Primary flows: scan, search, review, save`

## Foundations

### Color Tokens
- `bg / #F7F4EC`
- `surface / #FFFFFF`
- `surfaceTint / #EDF6EE`
- `text / #1F2937`
- `textMuted / #667085`
- `border / #D0D5DD`
- `primary / #2F6B3B`
- `primaryStrong / #1F4D2B`
- `primarySoft / #DDEEDF`
- `info / #2E6FBE`
- `warning / #C58A18`
- `danger / #B42318`

### Typography Tokens
- `Display / 32 / 38 / 700`
- `H1 / 24 / 30 / 700`
- `H2 / 20 / 26 / 700`
- `Title / 18 / 24 / 600`
- `Body / 16 / 22 / 400`
- `Body Small / 14 / 20 / 400`
- `Label / 14 / 18 / 600`
- `Caption / 12 / 16 / 500`

### Spacing
- `4, 8, 12, 16, 24, 32, 40`

### Radius
- `8, 12, 16, 24, pill`

## Screen Copy Pack

### Onboarding
- Heading: `Green Life`
- Body: `Scan products and understand environmental impact with clear source-backed results.`
- CTA: `Continue`

### Permissions
- Heading: `Camera Access`
- Body: `Green Life uses the camera for barcode scans and product photos.`
- CTA: `Continue to App`

### Home
- Heading: `Scan something nearby`
- Search placeholder: `Search products, brands, materials`
- Primary CTA: `Scan Barcode`
- Secondary CTA: `Take Photo`
- Section label: `Recent activity`

### Search
- Search placeholder: `Search products, brands, materials`
- Empty title: `Start searching`
- Empty body: `Enter at least two characters to search products or materials.`
- No results title: `No results`
- No results body: `Try a broader product name, brand, or material.`

### Item Detail
- Example item: `Reusable Water Bottle`
- Example brand: `Example Brand`
- Badge: `Exact Product Match`
- Metric label: `Carbon Footprint`
- Metric value: `2.4 kg CO2e`
- CTA: `Save Item`
- Secondary CTA: `View Source`

### No Match
- Heading: `No Exact Match Found`
- Body: `Retry the scan, search manually, or fall back to a category estimate.`
- CTA: `Search by Name`

### Saved
- Heading: `Saved`
- Empty title: `Nothing saved`
- Empty body: `Save products from the item detail screen to build a shortlist.`

### Profile
- Heading: `Profile`
- Body: `Confidence labels and permissions settings will live here.`

## Component Variants

### Match Badge
- `Exact Product Match`
- `Probable Product Match`
- `Category Estimate`
- `Material Estimate`

### Empty State
- title
- body

### Error State
- title: `Something went wrong`
- body: variable based on screen

### Result Card
- title
- subtitle
- badge

## Prototype Links

- `Home -> Barcode Scanner`
- `Home -> Photo Capture`
- `Home -> Search`
- `Search -> Item Detail`
- `Item Detail -> Source Detail`
- `Item Detail -> Saved`

## Handoff Rule

The names in this brief should match the React Native file names and theme tokens already created in the codebase.
