import { StyleSheet, Text, View } from "react-native";

import { confidenceTones, radius, spacing, typography } from "@/theme";

export function ConfidenceBadge({ score }: { score: number }) {
  const tier = score >= 0.9 ? "high" : score >= 0.75 ? "medium" : "low";
  const label = score >= 0.9 ? "High confidence" : score >= 0.75 ? "Medium confidence" : "Low confidence";
  const { backgroundColor, textColor } = confidenceTones[tier];

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      <Text style={[styles.value, { color: textColor }]}>{Math.round(score * 100)}%</Text>
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
