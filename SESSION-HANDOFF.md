# Session Handoff

## Project

Green Life React Native mobile app scaffold.

Workspace:
`C:\Users\leew\OneDrive\Documents\Playground\green-life`

## Current Stack

- Expo SDK 54
- React Native 0.81.5
- React 19.1.0
- TypeScript
- React Navigation
- TanStack Query

## Current State

The app runs in Expo and currently uses an in-app mock API by default.

Implemented:
- onboarding screen styled to match screenshot-based mockup
- permissions / capture screen styled to match screenshot-based mockup
- tab screens: Home, Search, Saved, Profile
- second-level screens: Barcode Scanner, Photo Capture, Candidate Results, Item Detail, Metric Detail, Source Detail, No Match
- theme tokens with primary brand blue `#004D77`
- local mock data and standalone mock server

## Important Files

### App entry and config
- `App.tsx`
- `package.json`
- `app.json`
- `babel.config.js`

### Navigation
- `src/navigation/RootNavigator.tsx`
- `src/navigation/MainTabs.tsx`
- `src/navigation/types.ts`

### Theme
- `src/theme/colors.ts`
- `src/theme/spacing.ts`
- `src/theme/radius.ts`
- `src/theme/typography.ts`

### Core screens
- `src/screens/OnboardingScreen.tsx`
- `src/screens/PermissionsScreen.tsx`
- `src/screens/HomeScreen.tsx`
- `src/screens/SearchScreen.tsx`
- `src/screens/SavedScreen.tsx`
- `src/screens/ProfileScreen.tsx`
- `src/screens/ItemDetailScreen.tsx`
- `src/screens/BarcodeScannerScreen.tsx`
- `src/screens/PhotoCaptureScreen.tsx`
- `src/screens/CandidateResultsScreen.tsx`
- `src/screens/MetricDetailScreen.tsx`
- `src/screens/SourceDetailScreen.tsx`
- `src/screens/NoMatchScreen.tsx`

### Shared components
- `src/components/ui/PrimaryButton.tsx`
- `src/components/ui/SecondaryButton.tsx`
- `src/components/ui/SearchBar.tsx`
- `src/components/ui/StatCard.tsx`
- `src/components/ui/LoadingState.tsx`
- `src/components/ui/ErrorState.tsx`
- `src/components/ui/EmptyState.tsx`
- `src/components/item/MatchBadge.tsx`
- `src/components/item/ConfidenceBadge.tsx`
- `src/components/item/ResultCard.tsx`
- `src/components/metrics/MetricRow.tsx`

### Mock API
- `src/api/client.ts`
- `src/api/mockData.ts`
- `mock-api-server.js`
- `docs/mock-api.md`

### Design / planning docs
- `docs/figma-component-checklist.md`
- `docs/figma-build-brief.md`
- `docs/engineering-backlog.md`

## Assets Added

- `assets/opening-hero.png`
- `assets/capture-hero.png`

## Behavior Notes

- The app currently defaults to mock API mode.
- `src/api/client.ts` uses mock data unless `EXPO_PUBLIC_USE_MOCK_API` is set to `false`.
- The onboarding title has been changed from `Green Zone` to `Green Life`.
- The actual clean logo asset has not yet been provided. Current logo marks are code-drawn approximations.
- The onboarding and permissions screens were implemented from uploaded screenshots, not direct Figma node inspection.

## Run Instructions

In the project folder:

```powershell
npm.cmd start
```

Typecheck:

```powershell
npm.cmd run typecheck
```

## Mock API Options

### Default
Uses in-app mock data automatically.

### Standalone local server
Run in a second terminal:

```powershell
node mock-api-server.js
```

Then launch Expo against it:

```powershell
$env:EXPO_PUBLIC_USE_MOCK_API="false"
$env:EXPO_PUBLIC_API_BASE_URL="http://localhost:4000/api/v1"
npm.cmd start
```

For a physical phone, replace `localhost` with the computer's LAN IP.

## Current Limitation

This session did not have a callable Figma MCP tool attached, even though the `figma` skill instructions were available. Direct Figma node inspection was therefore not possible here.

## Recommended Next Steps

1. Attach/verify Figma MCP in the new session if available.
2. Replace the code-drawn logo with a clean exported SVG or PNG.
3. Match the remaining screens to the final Figma designs.
4. Replace simulated scan/photo interactions with actual camera integration.
5. Connect a real backend or expand the standalone mock API.
