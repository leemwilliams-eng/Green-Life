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

export function CaptureScreen() {
  const stackNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Screen includeBottomInset={false}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SurfaceCard tone="tint" style={styles.heroCard}>
          <Text style={styles.eyebrow}>What You See</Text>
          <Text style={typography.h1}>Point your camera or device at what you see.</Text>
          <Text style={styles.body}>
            Use that photo or scan to lookup food and item profiles for additional details.
          </Text>
          <ConfidenceBadge score={0.96} />
        </SurfaceCard>

        <SurfaceCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Take a photo</Text>
          <Text style={styles.body}>
            Capture an image, including meals and items on your table, and see the profile.
          </Text>
          <PrimaryButton label="Take Photo" onPress={() => stackNavigation.navigate("PhotoCapture")} />
        </SurfaceCard>

        <SurfaceCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Quick scan</Text>
          <Text style={styles.body}>
            QR or barcode is the best way to get food profiles, and match with source backed details.
          </Text>
          <SecondaryButton variant="accent" label="Scan Barcode" onPress={() => stackNavigation.navigate("BarcodeScanner")} />
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
