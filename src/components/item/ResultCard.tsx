import { Pressable, StyleSheet, Text, View } from "react-native";

import { MatchBadge } from "@/components/item/MatchBadge";
import { colors, radius, shadows, spacing, typography, withAlpha } from "@/theme";
import type { ProductSummary } from "@/types/domain";

interface ResultCardProps {
  item: ProductSummary;
  onPress?: () => void;
}

export function ResultCard({ item, onPress }: ResultCardProps) {
  return (
    <Pressable style={({ pressed }) => [styles.card, pressed ? styles.cardPressed : null]} onPress={onPress}>
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
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg
  },
  cardPressed: {
    backgroundColor: withAlpha(colors.primary, 0.1),
    borderColor: withAlpha(colors.primary, 0.32)
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
