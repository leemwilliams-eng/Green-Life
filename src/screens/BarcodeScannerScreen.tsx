import { useMutation } from "@tanstack/react-query";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";

import { lookupBarcode } from "@/api/lookup";
import { ConfidenceBadge } from "@/components/item/ConfidenceBadge";
import { EmptyState } from "@/components/ui/EmptyState";
import { ErrorState } from "@/components/ui/ErrorState";
import { LoadingState } from "@/components/ui/LoadingState";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Screen } from "@/components/ui/Screen";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import type { RootStackParamList } from "@/navigation/types";
import { colors, radius, spacing, typography } from "@/theme";

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
        <View style={styles.previewCard}>
          <Text style={styles.eyebrow}>Scanner preview</Text>
          <View style={styles.frame}>
            <View style={styles.scanWindow} />
          </View>
          <Text style={styles.helper}>Camera wiring can replace this preview later. The lookup flow is active now.</Text>
          <ConfidenceBadge score={0.96} />
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Manual barcode entry</Text>
          <TextInput style={styles.input} value={barcode} onChangeText={setBarcode} autoCapitalize="none" keyboardType="number-pad" />
          <PrimaryButton label={lookupMutation.isPending ? "Looking up..." : "Lookup barcode"} onPress={() => lookupMutation.mutate()} />
          <SecondaryButton label="Simulate no match" onPress={() => navigation.replace("NoMatch", { lookupType: "barcode", queryValue: barcode })} />
        </View>

        {lookupMutation.isPending && <LoadingState />}
        {lookupMutation.isError && <ErrorState message="Barcode lookup failed. Falling back to no-match flow is supported." />}
        {!lookupMutation.isPending && !lookupMutation.isError && (
          <EmptyState title="Ready to scan" message="Use the default mock code or enter any code to test the flow." />
        )}
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
  frame: {
    alignItems: "center",
    backgroundColor: colors.text,
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
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.xl
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md
  }
});
