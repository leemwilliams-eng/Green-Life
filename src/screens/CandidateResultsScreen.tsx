import { FlatList, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ConfidenceBadge } from "@/components/item/ConfidenceBadge";
import { ResultCard } from "@/components/item/ResultCard";
import { BrandFooter } from "@/components/ui/BrandFooter";
import { Screen } from "@/components/ui/Screen";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import type { RootStackParamList } from "@/navigation/types";
import { colors, spacing, typography } from "@/theme";

type Props = NativeStackScreenProps<RootStackParamList, "CandidateResults">;

export function CandidateResultsScreen({ navigation, route }: Props) {
  const topConfidence = route.params.candidates[0]?.confidence_score ?? 0.6;

  return (
    <Screen>
      <FlatList
        contentContainerStyle={styles.content}
        data={route.params.candidates}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <SurfaceCard tone="tint" style={styles.headerCard}>
            <Text style={styles.eyebrow}>Possible matches</Text>
            <Text style={typography.h1}>Choose the closest result</Text>
            <Text style={styles.body}>These are ranked from strongest to weakest match based on the mock image lookup.</Text>
            <ConfidenceBadge score={topConfidence} />
          </SurfaceCard>
        }
        renderItem={({ item }) => (
          <ResultCard item={item} onPress={() => navigation.navigate("ItemDetail", { itemId: item.id })} />
        )}
        ListFooterComponent={
          <View style={styles.footerWrap}>
            <SecondaryButton label="Search instead" onPress={() => navigation.navigate("MainTabs")} />
            <BrandFooter style={styles.footer} />
          </View>
        }
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
    gap: spacing.md,
    marginBottom: spacing.lg
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primaryStrong,
    textTransform: "uppercase"
  },
  body: {
    ...typography.bodySmall
  },
  footerWrap: {
    gap: spacing.lg,
    marginTop: spacing.sm
  },
  footer: {
    marginBottom: 20
  }
});
