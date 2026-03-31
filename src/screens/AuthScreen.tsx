import { StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { BrandFooter } from "@/components/ui/BrandFooter";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Screen } from "@/components/ui/Screen";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import type { RootStackParamList } from "@/navigation/types";
import { colors, spacing, typography } from "@/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Auth">;

export function AuthScreen({ navigation }: Props) {
  return (
    <Screen>
      <View style={styles.content}>
        <SurfaceCard tone="tint" style={styles.heroCard}>
          <Text style={styles.eyebrow}>Account</Text>
          <Text style={typography.h1}>Create your account</Text>
          <Text style={styles.body}>Auth wiring belongs here. Keep guest mode available for MVP exploration while the account system comes online.</Text>
        </SurfaceCard>

        <SurfaceCard style={styles.actionCard}>
          <PrimaryButton label="Continue as Guest" onPress={() => navigation.replace("MainTabs")} />
          <SecondaryButton label="Back to Login" onPress={() => navigation.goBack()} />
        </SurfaceCard>

        <BrandFooter style={styles.footer} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: spacing.xl,
    justifyContent: "center"
  },
  heroCard: {
    gap: spacing.md
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primaryStrong,
    textTransform: "uppercase"
  },
  body: {
    ...typography.bodySmall
  },
  actionCard: {
    gap: spacing.md
  },
  footer: {
    marginBottom: spacing.md
  }
});
