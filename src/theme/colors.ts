import type { MatchType } from "@/types/domain";

// Green Life - Dark Forest Palette
// Derived from the design system spec: dark backgrounds, emerald primary, gold spark accent.

export const colors = {
  bg: "#0D1F12",
  surface: "#132B1A",
  surfaceTint: "#1A3D25",

  text: "#F0FDF4",
  textMuted: "#86EFAC",

  border: "#1F3D2A",

  primary: "#10B981",
  primaryStrong: "#059669",
  primarySoft: "#064E3B",

  spark: "#F59E0B",

  info: "#38BDF8",
  warning: "#F59E0B",
  danger: "#F87171",

  chart1: "#10B981",
  chart2: "#14B8A6",
  chart3: "#84CC16",
  chart4: "#38BDF8",
  chart5: "#6EE7B7",
} as const;

export function withAlpha(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const pairs =
    normalized.length === 3
      ? normalized.split("").map((char) => `${char}${char}`)
      : [normalized.slice(0, 2), normalized.slice(2, 4), normalized.slice(4, 6)];

  const [r, g, b] = pairs.map((pair) => Number.parseInt(pair, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const matchBadgeTones: Record<MatchType, { label: string; backgroundColor: string; textColor: string }> = {
  exact_product: {
    label: "Exact Match",
    backgroundColor: colors.primarySoft,
    textColor: "#6EE7B7",
  },
  probable_product: {
    label: "Probable",
    backgroundColor: "#1E3A5F",
    textColor: "#93C5FD",
  },
  category_estimate: {
    label: "Estimate",
    backgroundColor: "#451A03",
    textColor: "#FCD34D",
  },
  material_estimate: {
    label: "Material",
    backgroundColor: "#1F2937",
    textColor: "#9CA3AF",
  },
};

export const confidenceTones = {
  high: { backgroundColor: colors.primarySoft, textColor: "#6EE7B7" },
  medium: { backgroundColor: "#451A03", textColor: "#FCD34D" },
  low: { backgroundColor: "#450A0A", textColor: "#FCA5A5" },
} as const;
