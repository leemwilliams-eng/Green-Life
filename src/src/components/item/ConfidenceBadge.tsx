import { StyleSheet, Text, View } from "react-native";

import { radius, spacing, typography } from "@/theme";

// Dark-mode confidence badge colors.
// High/medium/low tiers use dark tinted backgrounds with luminous foreground text.

const TIERS = {
  high:   { bg: "#064E3B", text: "#6EE7B7" }, // Emerald dark — High confidence
  medium: { bg: "#451A03", text: "#FCD34D" }, // Amber dark   — Medium confidence
  low:    { bg: "#450A0A", text: "#FCA5A5" }, // Red dark     — Low confidence
};

export function ConfidenceBadge({ score }: { score: number }) {
  const tier   = score >= 0.9 ? "high" : score >= 0.75 ? "medium" : "low";
  const label  = score >= 0.9 ? "High confidence" : score >= 0.75 ? "Medium confidence" : "Low confidence";
  const { bg, text } = TIERS[tier];

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[styles.label, { color: text }]}>{label}</Text>
      <Text style={[styles.value, { color: text }]}>{Math.round(score * 100)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  label: {
    ...typography.caption,
  },
  value: {
    ...typography.caption,
    fontFamily: "PlusJakartaSans-Bold",
  },
});
