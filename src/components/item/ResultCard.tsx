import { Pressable, StyleSheet, Text, View } from "react-native";

import { MatchBadge } from "@/components/item/MatchBadge";
import { colors, radius, shadows, spacing, typography } from "@/theme";
import type { ProductSummary } from "@/types/domain";

interface ResultCardProps {
  item: ProductSummary;
  onPress?: () => void;
}

export function ResultCard({ item, onPress }: ResultCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{item.name}</Text>
      {!!item.brand && <Text style={styles.subtitle}>{item.brand}</Text>}
      <View style={styles.badgeWrap}>
        <MatchBadge matchType={item.match_type} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    ...shadows.card,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    gap: spacing.sm,
    marginBottom: spacing.md,
    padding: spacing.lg
  },
  title: {
    ...typography.title
  },
  subtitle: {
    ...typography.bodySmall
  },
  badgeWrap: {
    marginTop: spacing.xs
  }
});
