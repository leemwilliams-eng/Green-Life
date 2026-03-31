import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { getHistory } from "@/api/user";
import { ConfidenceBadge } from "@/components/item/ConfidenceBadge";
import { ResultCard } from "@/components/item/ResultCard";
import { BrandFooter } from "@/components/ui/BrandFooter";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Screen } from "@/components/ui/Screen";
import { SearchBar } from "@/components/ui/SearchBar";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { StatCard } from "@/components/ui/StatCard";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import type { MainTabParamList, RootStackParamList } from "@/navigation/types";
import { colors, spacing, typography, withAlpha } from "@/theme";

type Props = BottomTabScreenProps<MainTabParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const [searchText, setSearchText] = useState("");
  const stackNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const historyQuery = useQuery({ queryKey: ["history"], queryFn: getHistory });

  return (
    <Screen includeBottomInset={false}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SurfaceCard tone="tint" style={styles.hero}>
          <Text style={styles.eyebrow}>Green Life</Text>
          <Text style={typography.display}>Measure the footprint around you.</Text>
          <Text style={styles.heroBody}>
            Scan a product, review impact metrics, and keep source-backed results in one place.
          </Text>
          <SearchBar value={searchText} placeholder="Search food and products" onChangeText={setSearchText} />
        </SurfaceCard>

        <View style={styles.actionsRow}>
          <SurfaceCard tone="primary" style={styles.actionCardPrimary}>
            <Text style={styles.actionTitlePrimary}>Quick scan</Text>
            <Text style={styles.actionBodyPrimary}>Barcode is the fastest path to an exact product match with full data provenance.</Text>
            <PrimaryButton variant="inverted" label="Scan Barcode" onPress={() => stackNavigation.navigate("BarcodeScanner")} />
          </SurfaceCard>
          <SurfaceCard style={styles.actionCardSecondary}>
            <Text style={styles.actionTitleSecondary}>No barcode?</Text>
            <Text style={styles.actionBodySecondary}>Capture a label or object and narrow it down with image lookup.</Text>
            <SecondaryButton variant="accent" label="Take Photo" onPress={() => stackNavigation.navigate("PhotoCapture")} />
          </SurfaceCard>
          <SecondaryButton variant="ghost" fullWidth label="Browse Search" onPress={() => navigation.navigate("Search")} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsRow}>
          <StatCard label="Supported flow" value="Scan, search, save" tone="tint" />
          <StatCard label="Data posture" value="Exact and estimated" />
          <StatCard label="Primary sources" value="EPA + EPD" />
        </ScrollView>

        <SurfaceCard style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>Trust the label, not the guesswork.</Text>
          <Text style={styles.noticeBody}>Every result shows whether it is exact, probable, or estimated, with source provenance attached.</Text>
          <ConfidenceBadge score={0.91} />
        </SurfaceCard>

        <View style={styles.sectionHeader}>
          <Text style={typography.h2}>Recent activity</Text>
          <Text style={styles.sectionMeta}>Last three lookups</Text>
        </View>

        {historyQuery.isLoading && <LoadingState />}
        {historyQuery.isError && <ErrorState message="History could not be loaded. Check auth or API availability." />}
        {historyQuery.isSuccess && historyQuery.data.data.history.length === 0 && (
          <EmptyState title="No history yet" message="Your recent scans and searches will appear here." />
        )}
        {historyQuery.isSuccess && (
          <View style={styles.resultsWrap}>
            {historyQuery.data.data.history.slice(0, 3).map((entry) => (
              <ResultCard key={entry.id} item={entry.item} onPress={() => stackNavigation.navigate("ItemDetail", { itemId: entry.item.id })} />
            ))}
          </View>
        )}

        <BrandFooter style={styles.footer} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl
  },
  hero: {
    gap: spacing.md
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primaryStrong,
    textTransform: "uppercase"
  },
  heroBody: {
    ...typography.body,
    color: colors.textMuted
  },
  actionsRow: {
    gap: spacing.lg
  },
  actionCardPrimary: {
    gap: spacing.md
  },
  actionCardSecondary: {
    gap: spacing.md
  },
  actionTitlePrimary: {
    ...typography.title,
    color: colors.bg
  },
  actionBodyPrimary: {
    ...typography.bodySmall,
    color: withAlpha(colors.bg, 0.78)
  },
  actionTitleSecondary: {
    ...typography.title,
    color: colors.text
  },
  actionBodySecondary: {
    ...typography.bodySmall,
    color: colors.textMuted
  },
  statsRow: {
    gap: spacing.md
  },
  noticeCard: {
    gap: spacing.md
  },
  noticeTitle: {
    ...typography.title
  },
  noticeBody: {
    ...typography.bodySmall
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  sectionMeta: {
    ...typography.caption
  },
  resultsWrap: {
    gap: spacing.md
  },
  footer: {
    marginTop: spacing.md,
    marginBottom: spacing.sm
  }
});
