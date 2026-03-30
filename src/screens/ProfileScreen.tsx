import { useQuery } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { getProfile } from "@/api/user";
import { ConfidenceBadge } from "@/components/item/ConfidenceBadge";
import { BrandFooter } from "@/components/ui/BrandFooter";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { Screen } from "@/components/ui/Screen";
import { StatCard } from "@/components/ui/StatCard";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { colors, spacing, typography } from "@/theme";

export function ProfileScreen() {
  const profileQuery = useQuery({ queryKey: ["profile"], queryFn: getProfile });

  return (
    <Screen includeBottomInset={false}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SurfaceCard tone="tint" style={styles.accountCard}>
          <Text style={styles.eyebrow}>Account</Text>
          <View style={styles.profileRow}>
            <View style={styles.avatarFrame}>
              {profileQuery.isSuccess && profileQuery.data.data.email ? (
                <Text style={styles.avatarInitial}>{profileQuery.data.data.email[0].toUpperCase()}</Text>
              ) : (
                <Text style={styles.avatarInitial}>?</Text>
              )}
            </View>
            <View style={styles.profileInfo}>
              <Text style={typography.h1}>Profile</Text>
              {profileQuery.isLoading && <LoadingState />}
              {profileQuery.isError && <ErrorState message="Profile is unavailable. This is expected until auth is connected." />}
              {profileQuery.isSuccess && <Text style={styles.email}>{profileQuery.data.data.email}</Text>}
            </View>
          </View>
          {profileQuery.isSuccess && (
            <>
              <Text style={styles.body}>Guest upgrade, permissions, and source preferences will live here.</Text>
              <ConfidenceBadge score={0.88} />
            </>
          )}
        </SurfaceCard>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsRow}>
          <StatCard label="Data mode" value="Mock API active" tone="tint" />
          <StatCard label="Labeling" value="Exact + estimated" />
          <StatCard label="Primary datasets" value="EPA, EPD" />
        </ScrollView>

        <SurfaceCard style={styles.panel}>
          <Text style={styles.panelTitle}>About confidence labels</Text>
          <Text style={styles.body}>Exact matches mean the app linked to a specific known product record. Estimates mean the result was derived from category or material data.</Text>
        </SurfaceCard>

        <SurfaceCard style={styles.panel}>
          <Text style={styles.panelTitle}>Next settings</Text>
          <Text style={styles.body}>Permissions, account linking, privacy controls, and saved history preferences belong in this section.</Text>
        </SurfaceCard>

        <BrandFooter style={styles.footer} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg
  },
  accountCard: {
    gap: spacing.md
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primaryStrong,
    textTransform: "uppercase"
  },
  profileRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.lg
  },
  avatarFrame: {
    alignItems: "center",
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
    borderRadius: 36,
    borderWidth: 2,
    height: 72,
    justifyContent: "center",
    width: 72
  },
  avatarInitial: {
    color: colors.primary,
    fontFamily: "PlusJakartaSans-SemiBold",
    fontSize: 28,
    lineHeight: 34
  },
  profileInfo: {
    flex: 1,
    gap: spacing.xs
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
    gap: spacing.sm
  },
  panelTitle: {
    ...typography.title
  },
  footer: {
    marginTop: spacing.md,
    marginBottom: spacing.sm
  }
});
