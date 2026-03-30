import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography, withAlpha } from "@/theme";
import type { ImpactMetric } from "@/types/domain";

interface MetricRowProps {
  metric: ImpactMetric;
  onPress?: () => void;
}

export function MetricRow({ metric, onPress }: MetricRowProps) {
  const content = (
    <>
      <View style={styles.metaWrap}>
        <Text style={styles.label}>{metric.label}</Text>
        <Text style={styles.meta}>{metric.estimate_type}</Text>
      </View>
      <View style={styles.valueWrap}>
        <Text style={styles.value}>
          {metric.value ?? "N/A"} {metric.unit ?? ""}
        </Text>
        {onPress ? <Feather name="chevron-right" size={18} color={colors.textMuted} /> : null}
      </View>
    </>
  );

  if (onPress) {
    return (
      <Pressable style={({ pressed }) => [styles.row, pressed ? styles.rowPressed : null]} onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return <View style={styles.row}>{content}</View>;
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.md
  },
  rowPressed: {
    backgroundColor: withAlpha(colors.primary, 0.08),
    borderRadius: spacing.md
  },
  metaWrap: {
    flex: 1,
    gap: spacing.xs
  },
  label: {
    ...typography.label
  },
  meta: {
    ...typography.caption,
    textTransform: "capitalize"
  },
  valueWrap: {
    alignItems: "center",
    flexDirection: "row",
    flexShrink: 1,
    gap: spacing.xs,
    paddingLeft: spacing.md
  },
  value: {
    ...typography.body,
    flexShrink: 1,
    textAlign: "right"
  }
});
