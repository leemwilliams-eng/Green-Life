import { useQuery } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { getSourceDetail } from "@/api/sources";
import { BrandFooter } from "@/components/ui/BrandFooter";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { Screen } from "@/components/ui/Screen";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { colors, spacing, typography } from "@/theme";
import type { RootStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "SourceDetail">;

export function SourceDetailScreen({ route }: Props) {
  const sourceQuery = useQuery({
    queryKey: ["source", route.params.sourceId],
    queryFn: () => getSourceDetail(route.params.sourceId)
  });

  if (sourceQuery.isLoading) {
    return (
      <Screen>
        <LoadingState />
      </Screen>
    );
  }

  if (sourceQuery.isError || !sourceQuery.data) {
    return (
      <Screen>
        <ErrorState message="Source details could not be loaded." />
      </Screen>
    );
  }

  const source = sourceQuery.data.data.source;

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SurfaceCard tone="tint" style={styles.heroCard}>
          <Text style={styles.eyebrow}>Source detail</Text>
          <Text style={typography.h1}>{source.name}</Text>
          <Text style={styles.body}>{source.source_type}</Text>
        </SurfaceCard>

        <SurfaceCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Reference</Text>
          <Text style={styles.body}>{source.reference_url ?? "No reference URL"}</Text>
          <Text style={styles.body}>Version: {source.dataset_version ?? "N/A"}</Text>
          <Text style={styles.body}>Published: {source.published_at ?? "N/A"}</Text>
        </SurfaceCard>

        <SurfaceCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Ingestion</Text>
          <Text style={styles.body}>Ingested: {source.ingested_at ?? "N/A"}</Text>
          <Text style={styles.body}>{source.methodology_notes ?? "No methodology notes"}</Text>
        </SurfaceCard>

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
  sectionCard: {
    gap: spacing.sm
  },
  sectionTitle: {
    ...typography.title
  },
  body: {
    ...typography.bodySmall
  },
  footer: {
    marginBottom: 20
  }
});
