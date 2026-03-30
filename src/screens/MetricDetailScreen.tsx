import { useQuery } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { getItemDetail } from "@/api/items";
import { ConfidenceBadge } from "@/components/item/ConfidenceBadge";
import { BrandFooter } from "@/components/ui/BrandFooter";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { Screen } from "@/components/ui/Screen";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { StatCard } from "@/components/ui/StatCard";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import type { RootStackParamList } from "@/navigation/types";
import { colors, spacing, typography } from "@/theme";

type Props = NativeStackScreenProps<RootStackParamList, "MetricDetail">;

export function MetricDetailScreen({ navigation, route }: Props) {
  const itemQuery = useQuery({
    queryKey: ["item", route.params.itemId],
    queryFn: () => getItemDetail(route.params.itemId)
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
        <ErrorState message="Metric detail could not be loaded." />
      </Screen>
    );
  }

  const metric = itemQuery.data.data.item.metrics.find((entry) => entry.metric_type === route.params.metricType);

  if (!metric) {
    return (
      <Screen>
        <EmptyState title="Metric missing" message="This metric is not available on the selected item." />
      </Screen>
    );
  }

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SurfaceCard tone="tint" style={styles.heroCard}>
          <Text style={styles.eyebrow}>Metric detail</Text>
          <Text style={typography.h1}>{metric.label}</Text>
          <Text style={styles.metricValue}>
            {metric.value ?? "N/A"} {metric.unit ?? ""}
          </Text>
          <ConfidenceBadge score={metric.confidence_score ?? 0.7} />
        </SurfaceCard>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsRow}>
          <StatCard label="Scope" value={metric.scope} tone="tint" />
          <StatCard label="Estimate type" value={metric.estimate_type} />
        </ScrollView>

        <SurfaceCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Methodology</Text>
          <Text style={styles.body}>{metric.methodology ?? "No methodology notes are available."}</Text>
        </SurfaceCard>

        {metric.source && (
          <SurfaceCard style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Source</Text>
            <View style={styles.sourceMeta}>
              <Text style={styles.body}>{metric.source.name}</Text>
              <Text style={styles.body}>{metric.source.dataset_version ?? "No dataset version"}</Text>
            </View>
            <SecondaryButton label="View source detail" onPress={() => navigation.navigate("SourceDetail", { sourceId: metric.source!.id })} />
          </SurfaceCard>
        )}

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
  metricValue: {
    ...typography.display
  },
  statsRow: {
    gap: spacing.md
  },
  sectionCard: {
    gap: spacing.sm
  },
  sectionTitle: {
    ...typography.title
  },
  body: {
    ...typography.bodySmall
  },
  sourceMeta: {
    gap: spacing.xs
  },
  footer: {
    marginBottom: 20
  }
});
