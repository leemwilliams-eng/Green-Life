import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { BrandFooter } from "@/components/ui/BrandFooter";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import type { RootStackParamList } from "@/navigation/types";
import { colors, spacing, typography, withAlpha } from "@/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Permissions">;

export function PermissionsScreen({ navigation }: Props) {
  return (
    <View style={styles.root}>
      <ImageBackground
        source={require("../../assets/capture-hero.png")}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
          <SurfaceCard style={styles.footerCard}>
            <Text style={styles.eyebrow}>Capture access</Text>
            <Text style={styles.title}>Use your camera to scan the item or take a picture.</Text>
            <View style={styles.buttonWrap}>
              <PrimaryButton label="Continue" onPress={() => navigation.replace("MainTabs")} />
            </View>
            <BrandFooter />
          </SurfaceCard>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.bg,
    flex: 1
  },
  background: {
    flex: 1,
    justifyContent: "flex-end"
  },
  backgroundImage: {
    resizeMode: "cover"
  },
  safeArea: {
    justifyContent: "flex-end"
  },
  footerCard: {
    backgroundColor: withAlpha(colors.bg, 0.9),
    borderColor: withAlpha(colors.primary, 0.2),
    borderRadius: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    gap: spacing.md,
    minHeight: 260,
    paddingHorizontal: 24,
    paddingVertical: 24
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primaryStrong,
    textTransform: "uppercase"
  },
  title: {
    ...typography.body,
    color: colors.textMuted,
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center"
  },
  buttonWrap: {
    minWidth: 156
  }
});
