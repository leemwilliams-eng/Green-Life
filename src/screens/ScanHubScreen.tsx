import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, Text } from "react-native";

import { ConfidenceBadge } from "@/components/item/ConfidenceBadge";
import { BrandFooter } from "@/components/ui/BrandFooter";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Screen } from "@/components/ui/Screen";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import type { RootStackParamList } from "@/navigation/types";
import { colors, spacing, typography } from "@/theme";

export function ScanHubScreen() {
  const stackNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Screen includeBottomInset={false}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SurfaceCard tone="tint" style={styles.heroCard}>
          <Text style={styles.eyebrow}>Primary action</Text>
          <Text style={typography.h1}>Point your phone at the world.</Text>
          <Text style={styles.body}>
            Scan a barcode for the fastest exact match, or capture a photo when the label needs more context.
          </Text>
          <ConfidenceBadge score={0.96} />
        </SurfaceCard>

        <SurfaceCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Fastest path</Text>
          <Text style={styles.body}>
            Barcode lookup is still the strongest route for exact product matches and source-backed detail.
          </Text>
          <PrimaryButton label="Scan Barcode" onPress={() => stackNavigation.navigate("BarcodeScanner")} />
        </SurfaceCard>

        <SurfaceCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Need more context?</Text>
          <Text style={styles.body}>
            Use a photo when the item has no barcode or when material and packaging cues matter more than SKU data.
          </Text>
          <SecondaryButton variant="accent" label="Take Photo" onPress={() => stackNavigation.navigate("PhotoCapture")} />
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
  heroCard: {
    gap: spacing.md
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primaryStrong,
    textTransform: "uppercase"
  },
  sectionCard: {
    gap: spacing.md
  },
  sectionTitle: {
    ...typography.title
  },
  body: {
    ...typography.bodySmall
  },
  footer: {
    marginTop: spacing.md,
    marginBottom: spacing.sm
  }
});
