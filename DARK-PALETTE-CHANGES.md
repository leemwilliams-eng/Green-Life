# Green Life — Dark Forest Palette Update
**Date:** March 2026

---

## New Palette

| Token | Hex | Role |
|---|---|---|
| `bg` | `#0D1F12` | Forest — primary app background |
| `surface` | `#132B1A` | Elevated surface — cards, sheets |
| `surfaceTint` | `#1A3D25` | Hero card tint — emerald wash |
| `text` | `#F0FDF4` | Primary text — green-tinted near-white |
| `textMuted` | `#86EFAC` | Secondary text — soft emerald |
| `border` | `#1F3D2A` | Subtle surface border |
| `primary` | `#10B981` | Emerald 500 — primary actions |
| `primaryStrong` | `#059669` | Emerald 600 — pressed states |
| `primarySoft` | `#064E3B` | Emerald 950 dark — tinted surfaces |
| `spark` | `#F59E0B` | Amber 400 — Igniter gold accent |
| `info` | `#38BDF8` | Sky 400 |
| `warning` | `#F59E0B` | Amber 400 |
| `danger` | `#F87171` | Red 400 (lighter for dark bg readability) |

---

## Files Changed

| File | What Changed |
|---|---|
| `src/theme/colors.ts` | Full palette rewrite — light blue → dark forest emerald |
| `App.tsx` | `DefaultTheme` → `DarkTheme`; navigation colors updated; `StatusBar` → `light` |
| `src/components/item/MatchBadge.tsx` | Badge colors → dark tinted variants per match type |
| `src/components/item/ConfidenceBadge.tsx` | Hardcoded light badge colors → dark tinted variants |
| `src/components/ui/BrandFooter.tsx` | Tagline: `#004D77CC` → `#10B98180` (emerald at 80%) |
| `src/screens/OnboardingScreen.tsx` | `safeArea` bg: `colors.surface` white → `colors.bg` forest dark; tagline color updated |
| `src/screens/PermissionsScreen.tsx` | Glass overlay: light gray `rgba(227,227,227,0.72)` → dark forest `rgba(13,31,18,0.88)` |

---

## What Cascades Automatically (no file changes needed)

All screens using the `Screen` component and semantic color tokens will pick up the
new palette automatically when `colors.ts` is updated:

- `HomeScreen`, `SearchScreen`, `SavedScreen`, `ProfileScreen`
- `BarcodeScannerScreen`, `PhotoCaptureScreen`
- `ItemDetailScreen`, `MetricDetailScreen`, `SourceDetailScreen`
- `CandidateResultsScreen`, `NoMatchScreen`, `AuthScreen`

---

## Action Required

1. Add `PlusJakartaSans-Light.ttf` to `assets/fonts/` (if not done from previous drop)
2. Run `npx expo install lucide-react-native` (if not done from previous drop)
3. Verify the hero images (`opening-hero.png`, `capture-hero.png`) still read well
   against the dark background — they may benefit from increased `blurRadius` or
   a dark scrim overlay if contrast is insufficient.
