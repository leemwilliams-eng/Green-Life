import { StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing, typography } from "@/theme";
import type { MatchType } from "@/types/domain";

const labels: Record<MatchType, string> = {
  exact_product: "Exact Product Match",
  probable_product: "Probable Product Match",
  category_estimate: "Category Estimate",
  material_estimate: "Material Estimate"
};

export function MatchBadge({ matchType }: { matchType: MatchType }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.label}>{labels[matchType]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  label: {
    ...typography.caption,
    color: colors.primaryStrong
  }
});
