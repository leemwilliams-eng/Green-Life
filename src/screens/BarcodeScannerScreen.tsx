import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { lookupBarcode } from "@/api/lookup";
import { ConfidenceBadge } from "@/components/item/ConfidenceBadge";
import { BrandFooter } from "@/components/ui/BrandFooter";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Screen } from "@/components/ui/Screen";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import type { RootStackParamList } from "@/navigation/types";
import { colors, radius, spacing, typography, withAlpha } from "@/theme";

type Props = NativeStackScreenProps<RootStackParamList, "BarcodeScanner">;

export function BarcodeScannerScreen({ navigation }: Props) {
  const [barcode, setBarcode] = useState("012345678905");
  const lookupMutation = useMutation({
    mutationFn: () => lookupBarcode(barcode),
    onSuccess: (data) => {
      navigation.replace("ItemDetail", { itemId: data.data.result.id });
    },
    onError: () => {
      navigation.replace("NoMatch", { lookupType: "barcode", queryValue: barcode });
    }
  });

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SurfaceCard tone="tint" style={styles.previewCard}>
          <Text style={styles.eyebrow}>Scanner preview</Text>
          <View style={styles.frame}>
            <View style={styles.scanWindow} />
          </View>
          <Text style={styles.helper}>Camera wiring can replace this preview later. The lookup flow is active now.</Text>
          <ConfidenceBadge score={0.96} />
        </SurfaceCard>

        <SurfaceCard style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Manual barcode entry</Text>
          <TextInput
            style={styles.input}
            value={barcode}
            onChangeText={setBarcode}
            autoCapitalize="none"
            keyboardType="number-pad"
            placeholder="Enter a barcode"
            placeholderTextColor={withAlpha(colors.textMuted, 0.8)}
          />
          <PrimaryButton label={lookupMutation.isPending ? "Looking up..." : "Lookup barcode"} onPress={() => lookupMutation.mutate()} />
          <SecondaryButton label="Simulate no match" onPress={() => navigation.replace("NoMatch", { lookupType: "barcode", queryValue: barcode })} />
        </SurfaceCard>

        {lookupMutation.isPending && <LoadingState />}
        {lookupMutation.isError && <ErrorState message="Barcode lookup failed. Falling back to no-match flow is supported." />}
        {!lookupMutation.isPending && !lookupMutation.isError && (
          <EmptyState title="Ready to scan" message="Use the default mock code or enter any code to test the flow." />
        )}

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
  previewCard: {
    gap: spacing.md
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primaryStrong,
    textTransform: "uppercase"
  },
  frame: {
    alignItems: "center",
    backgroundColor: withAlpha(colors.text, 0.92),
    borderRadius: radius.xl,
    height: 260,
    justifyContent: "center"
  },
  scanWindow: {
    borderColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 2,
    height: 120,
    width: "80%"
  },
  helper: {
    ...typography.bodySmall
  },
  sectionCard: {
    gap: spacing.md
  },
  sectionTitle: {
    ...typography.title
  },
  input: {
    ...typography.body,
    backgroundColor: colors.bg,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    color: colors.text,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md
  },
  footer: {
    marginBottom: 20
  }
});
