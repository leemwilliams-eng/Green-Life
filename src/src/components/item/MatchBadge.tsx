import { StyleSheet, Text, View } from "react-native";

import { radius, spacing, typography } from "@/theme";
import type { MatchType } from "@/types/domain";

// Dark-mode badge colors — Confidence Transparency Principle
// Each badge uses a dark tinted background with a light high-contrast label.
// Designed to read clearly on Forest (#0D1F12) and Surface (#132B1A) backgrounds.

const config: Record<MatchType, { label: string; bg: string; text: string }> = {
  exact_product: {
    label: "Exact Match",
    bg:   "#064E3B",  // Emerald 950 dark
    text: "#6EE7B7",  // Emerald 300
  },
  probable_product: {
    label: "Probable",
    bg:   "#1E3A5F",  // Blue 950 dark
    text: "#93C5FD",  // Blue 300
  },
  category_estimate: {
    label: "Estimate",
    bg:   "#451A03",  // Amber 950 dark
    text: "#FCD34D",  // Amber 300
  },
  material_estimate: {
    label: "Material",
    bg:   "#1F2937",  // Gray 800
    text: "#9CA3AF",  // Gray 400
  }
};

export function MatchBadge({ matchType }: { matchType: MatchType }) {
  const { label, bg, text } = config[matchType];

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.label, { color: text }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  label: {
    ...typography.caption,
  }
});
