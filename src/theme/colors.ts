// Green Life — Dark Forest Palette
// Derived from the design system spec: dark backgrounds, emerald primary, gold spark accent.
// All tokens are designed to pass WCAG AA contrast on their respective surfaces.

export const colors = {
  // ── Backgrounds ────────────────────────────────────────────────────────────
  bg:          "#0D1F12",   // Forest — primary app background (deep dark green-black)
  surface:     "#132B1A",   // Elevated surface — cards, sheets
  surfaceTint: "#1A3D25",   // Hero card tint — emerald wash (used for hero cards)

  // ── Text ───────────────────────────────────────────────────────────────────
  text:        "#F0FDF4",   // Primary text — green-tinted near-white (green-50)
  textMuted:   "#86EFAC",   // Secondary text — soft emerald (green-300)

  // ── Borders ────────────────────────────────────────────────────────────────
  border:      "#1F3D2A",   // Subtle surface border

  // ── Brand — Emerald ────────────────────────────────────────────────────────
  primary:      "#10B981",  // Emerald 500 — primary actions, brand green
  primaryStrong:"#059669",  // Emerald 600 — pressed / active states
  primarySoft:  "#064E3B",  // Emerald 950 dark — tinted surfaces, badge backgrounds

  // ── Accent — Gold Spark ────────────────────────────────────────────────────
  spark:       "#F59E0B",   // Amber 400 — Igniter gold accent

  // ── Semantic ───────────────────────────────────────────────────────────────
  info:        "#38BDF8",   // Sky 400 — informational
  warning:     "#F59E0B",   // Amber 400 — caution
  danger:      "#F87171",   // Red 400 — lighter red for dark bg readability
} as const;
