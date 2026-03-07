# Green Life Frontend Scaffold Specification

Use Expo with TypeScript and keep the codebase aligned to the Figma naming.

## 1. Stack

Recommended:
- expo
- typescript
- @react-navigation/native
- @react-navigation/native-stack
- @react-navigation/bottom-tabs
- @tanstack/react-query
- zustand
- expo-camera
- expo-image-picker
- expo-barcode-scanner or current Expo camera barcode support
- react-native-safe-area-context
- react-native-svg

## 2. Folder Structure

```text
src/
  api/
    client.ts
    lookup.ts
    items.ts
    sources.ts
    user.ts
    admin.ts

  navigation/
    RootNavigator.tsx
    AuthNavigator.tsx
    MainTabs.tsx
    types.ts

  screens/
    HomeScreen.tsx
    SearchScreen.tsx
    BarcodeScannerScreen.tsx
    PhotoCaptureScreen.tsx
    CandidateResultsScreen.tsx
    ItemDetailScreen.tsx
    MetricDetailScreen.tsx
    SourceDetailScreen.tsx
    NoMatchScreen.tsx
    SavedScreen.tsx
    ProfileScreen.tsx
    OnboardingScreen.tsx
    PermissionsScreen.tsx
    AuthScreen.tsx

  components/
    ui/
      AppHeader.tsx
      Screen.tsx
      PrimaryButton.tsx
      SecondaryButton.tsx
      SearchBar.tsx
      SectionHeader.tsx
      EmptyState.tsx
      ErrorState.tsx
      LoadingState.tsx
      Badge.tsx

    navigation/
      TabIcon.tsx

    item/
      ResultCard.tsx
      SavedItemCard.tsx
      ItemHeader.tsx
      MatchBadge.tsx
      ConfidenceBadge.tsx

    metrics/
      MetricRow.tsx
      MaterialsList.tsx
      DisposalGuidanceList.tsx
      HazardFlagsList.tsx

    source/
      SourceCard.tsx
      SourceList.tsx

  features/
    auth/
      useAuthGate.ts
      authStore.ts

    lookup/
      lookupStore.ts
      useBarcodeLookup.ts
      useImageLookup.ts
      useSearch.ts

    items/
      useItemDetail.ts

    saved/
      useSavedItems.ts
      useSaveItem.ts
      useRemoveSavedItem.ts

    profile/
      useProfile.ts

  state/
    uiStore.ts

  theme/
    colors.ts
    spacing.ts
    radius.ts
    typography.ts
    shadows.ts
    index.ts

  types/
    api.ts
    domain.ts
    navigation.ts

  utils/
    format.ts
    confidence.ts
    errors.ts
```

## 3. Navigation Map

### RootNavigator
Handles:
- onboarding
- permissions
- auth
- main app
- modal/detail routes

### MainTabs
Tabs:
- Home
- Search
- Saved
- Profile

### Root Stack Routes
```ts
type RootStackParamList = {
  Onboarding: undefined;
  Permissions: undefined;
  Auth: undefined;
  MainTabs: undefined;
  BarcodeScanner: undefined;
  PhotoCapture: undefined;
  CandidateResults: { candidates: ProductSummary[] };
  ItemDetail: { itemId: string };
  MetricDetail: { itemId: string; metricType: string };
  SourceDetail: { sourceId: string };
  NoMatch: { lookupType: 'barcode' | 'image' | 'search'; queryValue?: string };
};
```

## 4. Theme Tokens

Mirror Figma foundations.

### colors.ts
```ts
export const colors = {
  bg: '#F7F4EC',
  surface: '#FFFFFF',
  surfaceTint: '#EDF6EE',
  text: '#1F2937',
  textMuted: '#667085',
  border: '#D0D5DD',
  primary: '#2F6B3B',
  primaryStrong: '#1F4D2B',
  primarySoft: '#DDEEDF',
  info: '#2E6FBE',
  warning: '#C58A18',
  danger: '#B42318',
};
```

### spacing.ts
```ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};
```

### radius.ts
```ts
export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};
```

### typography.ts
Define:
- `display`
- `h1`
- `h2`
- `title`
- `body`
- `bodySmall`
- `label`
- `caption`

## 5. Shared Domain Types

Create in `src/types/domain.ts`:

```ts
export type MatchType =
  | 'exact_product'
  | 'probable_product'
  | 'category_estimate'
  | 'material_estimate';

export type EstimateType =
  | 'exact'
  | 'inferred'
  | 'modeled'
  | 'category_based'
  | 'material_based';

export type SourceType =
  | 'epa'
  | 'epd'
  | 'manufacturer'
  | 'open_product_data'
  | 'emission_factor_dataset'
  | 'internal_estimate';

export interface ProductSummary {
  id: string;
  name: string;
  brand?: string;
  image_url?: string | null;
  match_type: MatchType;
  confidence_score: number;
  category?: {
    id: string;
    name: string;
  };
}
```

## 6. Screen Contracts

### HomeScreen.tsx
Responsibilities:
- show search bar
- show scan/photo CTAs
- show recent history
- route into lookup flows

Needs:
- `useQuery(['history'])`
- guest-safe behavior

### SearchScreen.tsx
Responsibilities:
- manage query
- show result list
- filter result types
- navigate to item detail

Needs:
- debounced search
- empty/loading/error states

### BarcodeScannerScreen.tsx
Responsibilities:
- request camera permission
- scan barcode
- call lookup endpoint
- route to detail or no-match

Needs:
- duplicate-scan suppression
- permission fallback UI

### PhotoCaptureScreen.tsx
Responsibilities:
- capture/select image
- upload image
- request candidate results
- route forward

### ItemDetailScreen.tsx
Responsibilities:
- fetch item detail
- render metrics, materials, sources
- save item
- open metric/source detail

### SavedScreen.tsx
Responsibilities:
- list saved items
- remove saved item
- navigate to item detail

### ProfileScreen.tsx
Responsibilities:
- show account
- show settings/help
- sign out

## 7. API Client Shape

### api/client.ts
Create one fetch wrapper:
- base URL
- auth token injection
- typed JSON parsing
- consistent error mapping

### api/lookup.ts
Functions:
- `lookupBarcode(barcode: string)`
- `search(query: string, type?: string, cursor?: string)`
- `lookupImage(imageUrl: string)`

### api/items.ts
- `getItemDetail(itemId: string)`

### api/sources.ts
- `getSourceDetail(sourceId: string)`

### api/user.ts
- `getProfile()`
- `getHistory()`
- `getSavedItems()`
- `saveItem(itemId: string)`
- `removeSavedItem(itemId: string)`

## 8. Query Hooks
Examples:
- `useSearch(query, type)`
- `useBarcodeLookup()`
- `useImageLookup()`
- `useItemDetail(itemId)`
- `useSavedItems()`
- `useSaveItem()`
- `useProfile()`

Use TanStack Query for all server state.

## 9. UI Component Priorities
Build these first:
1. `Screen`
2. `AppHeader`
3. `PrimaryButton`
4. `SearchBar`
5. `ResultCard`
6. `MatchBadge`
7. `ConfidenceBadge`
8. `MetricRow`
9. `SourceCard`
10. `EmptyState`
11. `ErrorState`

These components will cover most screens quickly.

## 10. State Rules
Use local store only for transient UI:
- draft image
- active filters
- toast visibility
- current lookup context

Do not duplicate server data in Zustand.

## 11. MVP Build Order
1. app shell and theme
2. navigation
3. Home
4. Search
5. Item Detail
6. Saved
7. Profile
8. Barcode Scanner
9. Photo Capture
10. Source Detail
11. Metric Detail
12. auth polish

## 12. Figma-to-Code Alignment
Use matching names between Figma and code:
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

## 13. Recommended Next Step
The right next artifact before implementation was the Figma-ready screen spec, followed by the actual Expo starter code structure and starter files.
