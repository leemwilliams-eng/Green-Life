import { StyleSheet, Text, View } from "react-native";

import { matchBadgeTones, radius, spacing, typography } from "@/theme";
import type { MatchType } from "@/types/domain";

export function MatchBadge({ matchType }: { matchType: MatchType }) {
  const { label, backgroundColor, textColor } = matchBadgeTones[matchType];

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
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
  },
});
