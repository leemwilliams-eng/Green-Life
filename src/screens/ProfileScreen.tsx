import { useQuery } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { getProfile } from "@/api/user";
import { ConfidenceBadge } from "@/components/item/ConfidenceBadge";
import { BrandFooter } from "@/components/ui/BrandFooter";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { Screen } from "@/components/ui/Screen";
import { StatCard } from "@/components/ui/StatCard";
import { colors, radius, spacing, typography } from "@/theme";

export function ProfileScreen() {
  const profileQuery = useQuery({ queryKey: ["profile"], queryFn: getProfile });

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.accountCard}>
          <Text style={styles.eyebrow}>Account</Text>
          <Text style={typography.h1}>Profile</Text>
          {profileQuery.isLoading && <LoadingState />}
          {profileQuery.isError && <ErrorState message="Profile is unavailable. This is expected until auth is connected." />}
          {profileQuery.isSuccess && (
            <>
              <Text style={styles.email}>{profileQuery.data.data.email}</Text>
              <Text style={styles.body}>Guest upgrade, permissions, and source preferences will live here.</Text>
              <ConfidenceBadge score={0.88} />
            </>
          )}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsRow}>
          <StatCard label="Data mode" value="Mock API active" tone="tint" />
          <StatCard label="Labeling" value="Exact + estimated" />
          <StatCard label="Primary datasets" value="EPA, EPD" />
        </ScrollView>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>About confidence labels</Text>
          <Text style={styles.body}>Exact matches mean the app linked to a specific known product record. Estimates mean the result was derived from category or material data.</Text>
        </View>

        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Next settings</Text>
          <Text style={styles.body}>Permissions, account linking, privacy controls, and saved history preferences belong in this section.</Text>
        </View>

        <BrandFooter style={styles.footer} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.xl
  },
  accountCard: {
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
  email: {
    ...typography.title
  },
  body: {
    ...typography.bodySmall
  },
  statsRow: {
    gap: spacing.md
  },
  panel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.xl
  },
  panelTitle: {
    ...typography.title
  },
  footer: {
    marginTop: spacing.md,
    marginBottom: 20
  }
});



