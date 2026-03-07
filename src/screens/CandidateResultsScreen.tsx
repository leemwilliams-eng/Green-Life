import { FlatList, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ConfidenceBadge } from "@/components/item/ConfidenceBadge";
import { ResultCard } from "@/components/item/ResultCard";
import { Screen } from "@/components/ui/Screen";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import type { RootStackParamList } from "@/navigation/types";
import { colors, radius, spacing, typography } from "@/theme";

type Props = NativeStackScreenProps<RootStackParamList, "CandidateResults">;

export function CandidateResultsScreen({ navigation, route }: Props) {
  return (
    <Screen>
      <FlatList
        contentContainerStyle={styles.content}
        data={route.params.candidates}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.headerCard}>
            <Text style={styles.eyebrow}>Possible matches</Text>
            <Text style={typography.h1}>Choose the closest result</Text>
            <Text style={styles.body}>These are ranked from strongest to weakest match based on the mock image lookup.</Text>
            <ConfidenceBadge score={route.params.candidates[0]?.confidence_score ?? 0.6} />
          </View>
        }
        renderItem={({ item }) => (
          <ResultCard item={item} onPress={() => navigation.navigate("ItemDetail", { itemId: item.id })} />
        )}
        ListFooterComponent={<SecondaryButton label="Search instead" onPress={() => navigation.navigate("MainTabs")} />}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.xxxl
  },
  headerCard: {
    backgroundColor: colors.surfaceTint,
    borderRadius: radius.xl,
    gap: spacing.md,
    marginBottom: spacing.lg,
    padding: spacing.xl
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primaryStrong,
    textTransform: "uppercase"
  },
  body: {
    ...typography.bodySmall
  }
});
