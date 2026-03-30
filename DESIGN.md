# Design System — Green Life

## Product Context
- **What this is:** A React Native mobile app that lets users scan or search products and get source-backed environmental impact data.
- **Who it's for:** Eco-conscious consumers who want to make informed purchasing decisions without sacrificing the quality of the product experience.
- **Space/industry:** Sustainability / consumer goods / environmental data. Peers: Olio, Too Good To Go, Ecosia, Good On You.
- **Project type:** Mobile app (React Native / Expo, iOS + Android)

---

## Aesthetic Direction
- **Direction:** Botanical Dark
- **Decoration level:** Minimal — typography and color do all the work. No leaf icons in the palette, no earthy textures, no "crunchy" eco patterns.
- **Mood:** Premium and focused. The darkness signals depth of information; the emerald signals nature without activism; the gold spark is the one moment of warmth — reserved for emphasis and delight. The result should feel more like a sophisticated tool than a campaign app.
- **Deliberate departures from category norms:**
  1. **Dark mode only** — most eco apps default to white/light. The dark forest palette is unusual in the category and signals premium over approachable.
  2. **Gold spark accent** — sustainability apps live in green/white. The amber accent (#F59E0B) adds warmth and personality. It reads as "ignition" — the moment something catches fire. Kept deliberately despite the ambient "finance" read risk.

---

## Typography

> **Source of truth:** https://v0-design-system-eta-jade.vercel.app/ — always reference before making font decisions.

All weights are self-hosted TTF files in `assets/fonts/`.

- **Display/Hero:** Plus Jakarta Sans Light (300) — the design system uses light weight for large display text. Refined and editorial, not heavy.
- **Headings (H1, H2):** Plus Jakarta Sans Light (300) / Regular (400) — same philosophy, scaled down.
- **Title/H3/H4:** Plus Jakarta Sans Medium (500) — mid-hierarchy step where Light would lose legibility at smaller sizes.
- **Body:** Plus Jakarta Sans Regular (400) — readable at 16px.
- **Labels/Captions:** Plus Jakarta Sans SemiBold (600) / Medium (500) — small sizes need weight to stay readable.
- **Branding only:** SemiBold (600) reserved for the wordmark ("Green Life") and primary CTAs.
- **Data/Mono:** `Platform.OS === 'ios' ? 'Menlo' : 'monospace'` — system mono for barcode strings, scan IDs, and raw data values. No custom mono font loaded; system fallback is sufficient.
- **Loading:** Self-hosted via `expo-font` (`useFonts` in `App.tsx`). No CDN dependency.

### Scale (React Native px)

| Token | Font | Size | Line Height | Weight |
|-------|------|------|-------------|--------|
| `display` | PlusJakartaSans-Light | 32 | 38 | 300 |
| `h1` | PlusJakartaSans-Light | 24 | 30 | 300 |
| `h2` | PlusJakartaSans-Regular | 20 | 26 | 400 |
| `title` | PlusJakartaSans-Medium | 18 | 24 | 500 |
| `body` | PlusJakartaSans-Regular | 16 | 22 | 400 |
| `bodySmall` | PlusJakartaSans-Regular | 14 | 20 | 400 |
| `label` | PlusJakartaSans-SemiBold | 14 | 18 | 600 |
| `caption` | PlusJakartaSans-Medium | 12 | 16 | 500 |

> **Note:** `typography.ts` currently uses Bold (700) for `display` and `h1`. This conflicts with the design system — needs updating to Light (300).

---

## Color

- **Approach:** Restrained — one accent + neutrals. Color is rare and meaningful. The emerald primary is reserved for actions and brand moments; the gold spark is reserved for emphasis and delight. Everything else is dark surface.
- **Dark mode:** Dark mode only. This is a deliberate product decision, not a preference. Elevation is communicated through color lightness (bg → surface → surfaceTint), not shadow depth — shadows are nearly invisible on dark backgrounds.

### Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `bg` | `#0D1F12` | Primary app background (Forest — deep dark green-black) |
| `surface` | `#132B1A` | Elevated surface — cards, sheets, modals |
| `surfaceTint` | `#1A3D25` | Hero card tint — emerald wash for featured content |
| `text` | `#F0FDF4` | Primary text — green-tinted near-white (Tailwind green-50) |
| `textMuted` | `#86EFAC` | Secondary text — soft emerald (Tailwind green-300) |
| `border` | `#1F3D2A` | Subtle surface dividers and borders |
| `primary` | `#10B981` | Emerald 500 — primary actions, CTAs, brand green |
| `primaryStrong` | `#059669` | Emerald 600 — pressed / active states |
| `primarySoft` | `#064E3B` | Emerald 950 — tinted surfaces, badge backgrounds |
| `spark` | `#F59E0B` | Amber 400 — Gold Spark accent. Use sparingly: highlights, scores, igniter moments |
| `info` | `#38BDF8` | Sky 400 — informational states |
| `warning` | `#F59E0B` | Amber 400 — caution (shares value with spark intentionally) |
| `danger` | `#F87171` | Red 400 — error states, lighter red for dark bg readability |

### Contrast Notes
All text/background pairs are designed to pass WCAG AA (4.5:1 for body, 3:1 for large text):
- `text` (#F0FDF4) on `bg` (#0D1F12) — passes AA
- `textMuted` (#86EFAC) on `bg` (#0D1F12) — passes AA for large text / UI labels
- `primary` (#10B981) on `bg` (#0D1F12) — passes AA for large text

---

## Spacing

- **Base unit:** 4pt. The scale is 4pt-derived with a `md: 12` compact step that sits between sm and lg — useful for tight list items and dense data rows.
- **Density:** Comfortable for content, compact for data. The 12pt `md` token exists for data-dense contexts (metric cards, scan result rows); use `lg: 16` for standard component padding.

| Token | Value | Typical use |
|-------|-------|-------------|
| `xs` | 4px | Icon padding, tight gaps |
| `sm` | 8px | Inline element spacing, chip gaps |
| `md` | 12px | Compact list item padding, dense data rows |
| `lg` | 16px | Standard component padding, section gaps |
| `xl` | 24px | Card padding, section spacing |
| `xxl` | 32px | Screen horizontal padding, major section breaks |
| `xxxl` | 40px | Hero section padding, modal top spacing |
| `xxxxl` | 48px | Large section breaks, onboarding padding |
| `xxxxxl` | 64px | Full-bleed screen padding, hero vertical spacing |

> **Note:** `spacing.ts` currently tops out at 40px. Add `xxxxl: 48` and `xxxxxl: 64` to match the design system scale.

---

## Layout

- **Approach:** Grid-disciplined. Strict column alignment, predictable hierarchy. This is a data-lookup tool — users need to find information fast, not explore.
- **Max content width:** Full-width mobile (React Native, no max-width needed)
- **Screen padding:** `spacing.xxl` (32px) horizontal on most screens
- **Tab bar:** Absolute positioned, transparent, no top border — floats over content with safe area handling

### Border Radius

| Token | Value | Typical use |
|-------|-------|-------------|
| `sm` | 8px | Chips, tags, small badges |
| `md` | 12px | Input fields, list items |
| `lg` | 16px | Cards, bottom sheets |
| `xl` | 24px | Hero cards, large surfaces |
| `pill` | 999px | Full-round buttons, avatar frames |

---

## Motion

- **Approach:** Minimal-functional. Transitions aid comprehension; animation is never decorative. The app is a lookup tool — every frame of animation should feel earned.
- **Library:** React Native Reanimated (where needed) + React Native's built-in `Animated` for simple transitions.

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | 80–100ms | ease-out | Button press feedback, toggle switches |
| Short | 150–200ms | ease-out (enter) / ease-in (exit) | Screen transitions, modal appear/dismiss |
| Medium | 250–350ms | ease-in-out | Tab switches, card expand/collapse |
| Long | 400–600ms | ease-in-out | Onboarding, first-time reveals |

**Specific behaviors:**
- **Mic button (Ask screen):** Subtle pulse when recording — scale 1.0 → 1.08 → 1.0 on a 1200ms loop using Reanimated's `withRepeat`. Stops immediately on tap.
- **Scan result cards:** Slide up 12px + fade in (Short, ease-out) as results load sequentially.
- **Tab bar icons:** Scale 1.0 → 1.12 → 1.0 on active (Micro, ease-out). No color-only transitions — motion confirms the tap.
- **Loading states:** Skeleton shimmer using a linear gradient animation, left-to-right sweep, Medium duration.

---

## Icons

> **Source of truth:** https://v0-design-system-eta-jade.vercel.app/ — Lucide React is the icon library.

- **Library:** `lucide-react-native` (React Native port of Lucide React)
- **Default size:** 24px
- **Stroke weight:** Default (Lucide standard — 2px stroke)
- **Color:** Inherit from context (`colors.text`, `colors.textMuted`, or `colors.primary` depending on role)

### Icon Size Scale

| Token | Size | Usage |
|-------|------|-------|
| `xs` | 12px | Inline text icons, badge indicators |
| `sm` | 16px | Tab bar icons (inactive), input field icons |
| `md` | 20px | List item leading icons, button icons |
| `lg` | 24px | Default — tab bar icons (active), headers |
| `xl` | 32px | Feature icons, empty state illustrations |

**Rule:** Never scale icons with arbitrary values. Use the size scale above. When in doubt, use `lg` (24px).

---

## Badges — Match Confidence

Green Life uses badges to communicate data confidence levels. These are a core product pattern — every scanned item result carries one.

| Variant | Color | Usage |
|---------|-------|-------|
| Exact Match | Emerald tint | Product found with high-confidence data |
| Probable | Blue tint | Likely match, some inference involved |
| Estimate | Amber tint | Calculated estimate, limited source data |
| Material | Muted | Material composition guess |
| Success | Semantic green | Positive outcome |
| Warning | Semantic amber | Caution state |
| Destructive | Semantic red | Negative/error outcome |

**Philosophy:** Transparency about data confidence is a core product value — "Be present. Have knowledge. Pay attention." Badges make uncertainty visible rather than hiding it.

---

## Data Visualization Colors

For charts, graphs, and metric displays. All designed to work on dark backgrounds.

| Role | Color |
|------|-------|
| Primary series | Emerald |
| Secondary series | Teal |
| Tertiary series | Lime |
| Quaternary series | Cyan |
| Quinary series | Mint |

---

## Shadows

Shadows are intentionally minimal. On dark backgrounds, depth is communicated through surface color (`bg` → `surface` → `surfaceTint`), not shadow. The single card shadow is a subtle safety net for cases where surfaces overlap light content.

```ts
card: {
  shadowColor: "#101828",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.06,
  shadowRadius: 12,
  elevation: 2  // Android
}
```

---

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-29 | Dark mode only | Deliberate product positioning — premium over approachable, unusual in the eco category |
| 2026-03-29 | Plus Jakarta Sans as sole typeface | Geometric, modern, slightly warm. Not Inter. Loaded self-hosted via expo-font. |
| 2026-03-29 | Gold spark (#F59E0B) as accent | Warmth and differentiation. Most eco apps stay in green/white; amber is unusual and memorable. |
| 2026-03-29 | Elevation via color, not shadow | Dark bg makes shadows invisible. bg → surface → surfaceTint is the elevation ramp. |
| 2026-03-29 | 12pt `md` spacing token | Compact step for data-dense contexts. The app shows impact scores and metrics — needs a tight-but-not-cramped option. |
| 2026-03-29 | System mono for data tokens | Barcode strings and scan IDs look right in monospace. No custom font loaded — Menlo/monospace is sufficient. |
| 2026-03-29 | DESIGN.md created | Documented by /gstack-design-consultation from existing theme tokens + gap-filling. |
| 2026-03-29 | Typography weights corrected | Design system specifies Light (300) for display/h1, not Bold (700). Code in typography.ts needs updating. |
| 2026-03-29 | Icon library: Lucide React | Added from design system. xs:12 sm:16 md:20 lg:24 xl:32. Default 24px. |
| 2026-03-29 | Spacing scale extended to 64px | Added xxxxl:48 and xxxxxl:64 from design system. spacing.ts needs updating. |
| 2026-03-29 | Badge confidence variants added | Exact Match / Probable / Estimate / Material are a core product pattern for data transparency. |
| 2026-03-29 | Chart color sequence defined | Emerald, Teal, Lime, Cyan, Mint — for data visualization on dark backgrounds. |
