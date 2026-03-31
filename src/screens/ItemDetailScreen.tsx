import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { getItemDetail } from "@/api/items";
import { saveItem } from "@/api/user";
import { ConfidenceBadge } from "@/components/item/ConfidenceBadge";
import { MatchBadge } from "@/components/item/MatchBadge";
import { BrandFooter } from "@/components/ui/BrandFooter";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Screen } from "@/components/ui/Screen";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { StatCard } from "@/components/ui/StatCard";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { MetricRow } from "@/components/metrics/MetricRow";
import type { RootStackParamList } from "@/navigation/types";
import { colors, spacing, typography, withAlpha } from "@/theme";

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
        <SurfaceCard tone="tint" style={styles.heroCard}>
          <Text style={styles.eyebrow}>{item.category?.name ?? "Product"}</Text>
          <Text style={typography.h1}>{item.name}</Text>
          {!!item.brand && <Text style={styles.subhead}>{item.brand}</Text>}
          <View style={styles.badgeRow}>
            <MatchBadge matchType={item.match_type} />
            <ConfidenceBadge score={item.confidence_score} />
          </View>
          {!!item.description && <Text style={styles.body}>{item.description}</Text>}
        </SurfaceCard>

        {primaryMetric && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsRow}>
            <StatCard label={primaryMetric.label} value={`${primaryMetric.value ?? "N/A"} ${primaryMetric.unit ?? ""}`} tone="tint" />
            <StatCard label="Sources" value={String(item.sources.length)} />
            <StatCard label="Materials" value={String(item.materials.length)} />
          </ScrollView>
        )}

        <SurfaceCard style={styles.sectionCard}>
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
        </SurfaceCard>

        <SurfaceCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Materials</Text>
          {item.materials.length === 0 ? (
            <Text style={styles.body}>No material breakdown is available yet.</Text>
          ) : (
            item.materials.map((material) => (
              <View key={material.name} style={styles.infoRow}>
                <Text style={styles.infoLabel}>{material.name}</Text>
                <Text style={styles.infoValue}>{material.percentage ?? "-"}%</Text>
              </View>
            ))
          )}
        </SurfaceCard>

        <SurfaceCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Disposal guidance</Text>
          {item.disposal_guidance.length === 0 ? (
            <Text style={styles.body}>No disposal guidance is available yet.</Text>
          ) : (
            item.disposal_guidance.map((entry) => (
              <View key={entry.label} style={styles.guidanceRow}>
                <View style={styles.guidanceDot} />
                <Text style={styles.guidanceText}>{entry.label}</Text>
              </View>
            ))
          )}
        </SurfaceCard>

        <SurfaceCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Sources</Text>
          {item.sources.length === 0 ? (
            <Text style={styles.body}>No source records are attached to this item yet.</Text>
          ) : (
            item.sources.map((source) => (
              <SecondaryButton key={source.id} label={source.name} onPress={() => navigation.navigate("SourceDetail", { sourceId: source.id })} />
            ))
          )}
        </SurfaceCard>

        <View style={styles.actions}>
          <SecondaryButton
            label="Ask about this item"
            onPress={() => navigation.navigate("VoiceAsk", { itemId: item.id, itemName: item.name })}
          />
          <PrimaryButton label={saveMutation.isPending ? "Saving..." : "Save Item"} onPress={() => saveMutation.mutate()} />
        </View>

        <BrandFooter style={styles.footer} />
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
    gap: spacing.md
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primaryStrong,
    textTransform: "uppercase"
  },
  subhead: {
    ...typography.bodySmall,
    color: withAlpha(colors.text, 0.84)
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
    gap: spacing.md
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
  },
  guidanceRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: spacing.sm
  },
  guidanceDot: {
    backgroundColor: colors.spark,
    borderRadius: 999,
    height: 8,
    marginTop: 6,
    width: 8
  },
  guidanceText: {
    ...typography.bodySmall,
    flex: 1
  },
  actions: {
    gap: spacing.md
  },
  footer: {
    marginBottom: 20
  }
});
