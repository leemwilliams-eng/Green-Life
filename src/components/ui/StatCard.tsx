import { StyleSheet, Text, View } from "react-native";

import { colors, radius, shadows, spacing, typography } from "@/theme";

interface StatCardProps {
  label: string;
  value: string;
  tone?: "default" | "tint";
}

export function StatCard({ label, value, tone = "default" }: StatCardProps) {
  return (
    <View style={[styles.card, tone === "tint" ? styles.tint : null]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...shadows.card,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    gap: spacing.xs,
    minWidth: 150,
    padding: spacing.lg
  },
  tint: {
    backgroundColor: colors.surfaceTint
  },
  label: {
    ...typography.caption
  },
  value: {
    ...typography.title
  }
});
