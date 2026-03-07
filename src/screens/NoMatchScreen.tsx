import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { EmptyState } from "@/components/ui/EmptyState";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Screen } from "@/components/ui/Screen";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { colors, radius, spacing, typography } from "@/theme";
import type { RootStackParamList } from "@/navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "NoMatch">;

export function NoMatchScreen({ navigation, route }: Props) {
  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <Text style={styles.eyebrow}>No exact match</Text>
          <Text style={typography.h1}>We could not resolve this item cleanly.</Text>
          <Text style={styles.body}>Lookup type: {route.params.lookupType}</Text>
          {!!route.params.queryValue && <Text style={styles.body}>Input: {route.params.queryValue}</Text>}
        </View>

        <EmptyState title="Recovery path ready" message="Try search, retry a scan, or fall back to a candidate-based lookup instead of blocking the user." />

        <View style={styles.actions}>
          <PrimaryButton label="Go to Search" onPress={() => navigation.navigate("MainTabs")} />
          <SecondaryButton label="Retry barcode" onPress={() => navigation.navigate("BarcodeScanner")} />
          <SecondaryButton label="Retry photo" onPress={() => navigation.navigate("PhotoCapture")} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    justifyContent: "center",
    paddingBottom: spacing.xxxl
  },
  heroCard: {
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
  body: {
    ...typography.bodySmall
  },
  actions: {
    gap: spacing.md
  }
});
