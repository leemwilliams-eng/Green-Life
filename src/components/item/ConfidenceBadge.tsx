import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/theme";

export function ConfidenceBadge({ score }: { score: number }) {
  const variant = score >= 0.9 ? styles.high : score >= 0.75 ? styles.medium : styles.low;
  const label = score >= 0.9 ? "High confidence" : score >= 0.75 ? "Medium confidence" : "Low confidence";

  return (
    <View style={[styles.badge, variant]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{Math.round(score * 100)}%</Text>
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
    paddingVertical: spacing.sm
  },
  high: {
    backgroundColor: colors.primarySoft
  },
  medium: {
    backgroundColor: "#F8E8C6"
  },
  low: {
    backgroundColor: "#F9D6D2"
  },
  label: {
    ...typography.caption,
    color: colors.text
  },
  value: {
    ...typography.caption,
    color: colors.text,
    fontWeight: "700"
  }
});
