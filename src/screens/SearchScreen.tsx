import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { search } from "@/api/lookup";
import { ResultCard } from "@/components/item/ResultCard";
import { BrandFooter } from "@/components/ui/BrandFooter";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { Screen } from "@/components/ui/Screen";
import { SearchBar } from "@/components/ui/SearchBar";
import type { MainTabParamList, RootStackParamList } from "@/navigation/types";
import { colors, radius, spacing, typography } from "@/theme";

type Props = BottomTabScreenProps<MainTabParamList, "Search">;
const chips = ["Drinkware", "Cleaning", "Packaging", "Appliances"];

export function SearchScreen({}: Props) {
  const [query, setQuery] = useState("");
  const trimmedQuery = query.trim();
  const stackNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const searchQuery = useQuery({
    queryKey: ["search", trimmedQuery],
    queryFn: () => search(trimmedQuery),
    enabled: trimmedQuery.length >= 2
  });

  const headline = useMemo(() => {
    if (trimmedQuery.length < 2) return "Start with a product, brand, or material.";
    return `Results for \"${trimmedQuery}\"`;
  }, [trimmedQuery]);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <Text style={typography.h1}>Search</Text>
          <Text style={styles.subhead}>{headline}</Text>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          {chips.map((chip) => (
            <Pressable key={chip} style={styles.chip} onPress={() => setQuery(chip)}>
              <Text style={styles.chipLabel}>{chip}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {trimmedQuery.length < 2 && <EmptyState title="Start searching" message="Enter at least two characters to search products or materials." />}
        {searchQuery.isLoading && <LoadingState />}
        {searchQuery.isError && <ErrorState message="Search failed. Confirm the API is reachable and try again." />}
        {searchQuery.isSuccess && searchQuery.data.data.results.length === 0 && (
          <EmptyState title="No results" message="Try a broader product name, brand, or material." />
        )}
        {searchQuery.isSuccess && (
          <View style={styles.resultsWrap}>
            {searchQuery.data.data.results.map((item) => (
              <ResultCard key={item.id} item={item} onPress={() => stackNavigation.navigate("ItemDetail", { itemId: item.id })} />
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
    gap: spacing.lg,
    paddingBottom: spacing.xl
  },
  headerCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.xl
  },
  subhead: {
    ...typography.bodySmall
  },
  chipRow: {
    gap: spacing.sm
  },
  chip: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm
  },
  chipLabel: {
    ...typography.caption,
    color: colors.primaryStrong
  },
  resultsWrap: {
    gap: spacing.md
  },
  footer: {
    marginTop: spacing.md,
    marginBottom: 20
  }
});



