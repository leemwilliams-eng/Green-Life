import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { getItemDetail } from "@/api/items";
import { saveItem } from "@/api/user";
import { ConfidenceBadge } from "@/components/item/ConfidenceBadge";
import { MatchBadge } from "@/components/item/MatchBadge";
import { MetricRow } from "@/components/metrics/MetricRow";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Screen } from "@/components/ui/Screen";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { StatCard } from "@/components/ui/StatCard";
import type { RootStackParamList } from "@/navigation/types";
import { colors, radius, spacing, typography } from "@/theme";

type Props = NativeStackScreenProps<RootStackParamList, "ItemDetail">;

export function ItemDetailScreen({ navigation, route }: Props) {
  const queryClient = useQueryClient();
  const itemQuery = useQuery({
    queryKey: ["item", route.params.itemId],
    queryFn: () => getItemDetail(route.params.itemId)
  });

  const saveMutation = useMutation({
    mutationFn: () => saveItem(route.params.itemId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["saved-items"] });
    }
  });

  if (itemQuery.isLoading) {
    return (
      <Screen>
        <LoadingState />
      </Screen>
    );
  }

  if (itemQuery.isError || !itemQuery.data) {
    return (
      <Screen>
        <ErrorState message="Item details could not be loaded. Check the API response for this item." />
      </Screen>
    );
  }

  const item = itemQuery.data.data.item;
  const primaryMetric = item.metrics[0];

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>{item.category?.name ?? "Product"}</Text>
          <Text style={typography.h1}>{item.name}</Text>
          {!!item.brand && <Text style={styles.subhead}>{item.brand}</Text>}
          <View style={styles.badgeRow}>
            <MatchBadge matchType={item.match_type} />
            <ConfidenceBadge score={item.confidence_score} />
          </View>
          {!!item.description && <Text style={styles.body}>{item.description}</Text>}
        </View>

        {primaryMetric && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsRow}>
            <StatCard label={primaryMetric.label} value={`${primaryMetric.value ?? "N/A"} ${primaryMetric.unit ?? ""}`} tone="tint" />
            <StatCard label="Sources" value={String(item.sources.length)} />
            <StatCard label="Materials" value={String(item.materials.length)} />
          </ScrollView>
        )}

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Impact metrics</Text>
          {item.metrics.length === 0 ? (
            <EmptyState title="No metrics yet" message="The item resolved, but no impact metrics are available from the API." />
          ) : (
            item.metrics.map((metric) => (
              <MetricRow
                key={metric.metric_type}
                metric={metric}
                onPress={() => navigation.navigate("MetricDetail", { itemId: item.id, metricType: metric.metric_type })}
              />
            ))
          )}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Materials</Text>
          {item.materials.map((material) => (
            <View key={material.name} style={styles.infoRow}>
              <Text style={styles.infoLabel}>{material.name}</Text>
              <Text style={styles.infoValue}>{material.percentage ?? "-"}%</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Disposal guidance</Text>
          {item.disposal_guidance.map((entry) => (
            <Text key={entry.label} style={styles.body}>{entry.label}</Text>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Sources</Text>
          {item.sources.map((source) => (
            <SecondaryButton key={source.id} label={source.name} onPress={() => navigation.navigate("SourceDetail", { sourceId: source.id })} />
          ))}
        </View>

        <PrimaryButton label={saveMutation.isPending ? "Saving..." : "Save Item"} onPress={() => saveMutation.mutate()} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.xxxl
  },
  heroCard: {
    backgroundColor: colors.surfaceTint,
    borderRadius: radius.xl,
    gap: spacing.md,
    padding: spacing.xl
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primaryStrong,
    textTransform: "uppercase"
  },
  subhead: {
    ...typography.bodySmall
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  body: {
    ...typography.bodySmall
  },
  statsRow: {
    gap: spacing.md
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.xl
  },
  sectionTitle: {
    ...typography.title
  },
  infoRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  infoLabel: {
    ...typography.body
  },
  infoValue: {
    ...typography.label
  }
});
