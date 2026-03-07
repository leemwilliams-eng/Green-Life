import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "@/theme";
import type { ImpactMetric } from "@/types/domain";

interface MetricRowProps {
  metric: ImpactMetric;
  onPress?: () => void;
}

export function MetricRow({ metric, onPress }: MetricRowProps) {
  const content = (
    <>
      <View>
        <Text style={styles.label}>{metric.label}</Text>
        <Text style={styles.meta}>{metric.estimate_type}</Text>
      </View>
      <Text style={styles.value}>
        {metric.value ?? "N/A"} {metric.unit ?? ""}
      </Text>
    </>
  );

  if (onPress) {
    return (
      <Pressable style={styles.row} onPress={onPress}>
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
  label: {
    ...typography.label
  },
  meta: {
    ...typography.caption,
    textTransform: "capitalize"
  },
  value: {
    ...typography.body,
    flexShrink: 1,
    paddingLeft: spacing.md,
    textAlign: "right"
  }
});
