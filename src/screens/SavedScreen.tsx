import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { getSavedItems } from "@/api/user";
import { ResultCard } from "@/components/item/ResultCard";
import { BrandFooter } from "@/components/ui/BrandFooter";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { Screen } from "@/components/ui/Screen";
import { StatCard } from "@/components/ui/StatCard";
import type { RootStackParamList } from "@/navigation/types";
import { colors, radius, spacing, typography } from "@/theme";

export function SavedScreen() {
  const stackNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const savedQuery = useQuery({ queryKey: ["saved-items"], queryFn: getSavedItems });

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Text style={typography.h1}>Saved shortlist</Text>
          <Text style={styles.heroBody}>Keep lower-impact options and items you want to revisit before purchasing.</Text>
        </View>

        {savedQuery.isSuccess && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsRow}>
            <StatCard label="Saved items" value={String(savedQuery.data.data.items.length)} tone="tint" />
            <StatCard label="Focus" value="Reusable + recyclable" />
          </ScrollView>
        )}

        {savedQuery.isLoading && <LoadingState />}
        {savedQuery.isError && <ErrorState message="Saved items could not be loaded. Sign in and verify the API." />}
        {savedQuery.isSuccess && savedQuery.data.data.items.length === 0 && (
          <EmptyState title="Nothing saved" message="Save products from the item detail screen to build a shortlist." />
        )}
        {savedQuery.isSuccess &&
          savedQuery.data.data.items.map((item) => (
            <ResultCard key={item.id} item={item} onPress={() => stackNavigation.navigate("ItemDetail", { itemId: item.id })} />
          ))}

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
  heroCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.xl
  },
  heroBody: {
    ...typography.bodySmall
  },
  statsRow: {
    gap: spacing.md
  },
  footer: {
    marginTop: spacing.md,
    marginBottom: 20
  }
});



