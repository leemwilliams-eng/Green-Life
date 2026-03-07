import { useQuery } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { getItemDetail } from "@/api/items";
import { ConfidenceBadge } from "@/components/item/ConfidenceBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { Screen } from "@/components/ui/Screen";
import type { RootStackParamList } from "@/navigation/types";
import { colors, radius, spacing, typography } from "@/theme";

type Props = NativeStackScreenProps<RootStackParamList, "MetricDetail">;

export function MetricDetailScreen({ route }: Props) {
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
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>Metric detail</Text>
          <Text style={typography.h1}>{metric.label}</Text>
          <Text style={styles.metricValue}>{metric.value ?? "N/A"} {metric.unit ?? ""}</Text>
          <ConfidenceBadge score={metric.confidence_score ?? 0.7} />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Scope</Text>
          <Text style={styles.body}>{metric.scope}</Text>
          <Text style={styles.sectionTitle}>Estimate type</Text>
          <Text style={styles.body}>{metric.estimate_type}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Methodology</Text>
          <Text style={styles.body}>{metric.methodology ?? "No methodology notes are available."}</Text>
        </View>

        {metric.source && (
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Source</Text>
            <Text style={styles.body}>{metric.source.name}</Text>
            <Text style={styles.body}>{metric.source.dataset_version ?? "No dataset version"}</Text>
          </View>
        )}
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
  metricValue: {
    ...typography.display
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.xl
  },
  sectionTitle: {
    ...typography.title
  },
  body: {
    ...typography.bodySmall
  }
});
