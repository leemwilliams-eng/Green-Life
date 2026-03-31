import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { BrandFooter } from "@/components/ui/BrandFooter";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import type { RootStackParamList } from "@/navigation/types";
import { colors, radius, spacing, typography, withAlpha } from "@/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Onboarding">;

export function OnboardingScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "right", "bottom", "left"]}>
      <ImageBackground
        blurRadius={1}
        source={require("../../assets/opening-hero-patio.jpg")}
        style={styles.topImageBand}
        imageStyle={styles.topImageStyle}
      />
      <View style={styles.imageMask} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={require("../../assets/Green_Life_Trans.png")} style={styles.logo} resizeMode="contain" />

        <Text style={styles.title}>
          GREEN <Text style={styles.titleWhite}>LIFE</Text>
        </Text>

        <Text style={styles.tagline}>
          Be present. <Text style={styles.taglineWhite}>Have knowledge.</Text>
          {"\n"}
          Pay attention.
        </Text>

        <SurfaceCard tone="tint" style={styles.quoteCard}>
          <Text style={styles.quoteMark}>"</Text>
          <Text style={styles.quoteText}>
            I am of the belief, that if everyone knew the real impact of what they were doing, they would make different choices.
          </Text>
          <Text style={styles.quoteAttribution}>Lee Williams</Text>
        </SurfaceCard>

        <View style={styles.ctaWrap}>
          <PrimaryButton label="Let's Go" onPress={() => navigation.navigate("MainTabs")} />
        </View>

        <BrandFooter style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.bg,
    flex: 1
  },
  topImageBand: {
    height: 305,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0
  },
  imageMask: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: 180,
    borderTopRightRadius: 180,
    height: 80,
    left: -20,
    position: "absolute",
    right: -20,
    top: 245
  },
  topImageStyle: {
    resizeMode: "cover"
  },
  content: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 48,
    paddingHorizontal: spacing.xl,
    paddingTop: 172
  },
  logo: {
    height: 160,
    marginBottom: spacing.lg,
    width: 160
  },
  title: {
    color: colors.primary,
    fontFamily: "PlusJakartaSans-SemiBold",
    fontSize: 32,
    letterSpacing: 6,
    lineHeight: 38,
    marginBottom: spacing.sm,
    textAlign: "center"
  },
  tagline: {
    color: withAlpha(colors.primary, 0.8),
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 15,
    fontStyle: "italic",
    letterSpacing: 0.3,
    marginBottom: spacing.xxl,
    paddingHorizontal: spacing.sm,
    textAlign: "center",
    width: "100%"
  },
  titleWhite: {
    color: colors.text
  },
  taglineWhite: {
    color: colors.text
  },
  quoteCard: {
    borderLeftColor: colors.primary,
    borderLeftWidth: 3,
    gap: spacing.sm,
    marginBottom: spacing.xxl,
    width: "100%"
  },
  quoteMark: {
    color: colors.primary,
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 48,
    lineHeight: 44,
    opacity: 0.5
  },
  quoteText: {
    ...typography.body,
    color: colors.text,
    fontStyle: "italic",
    lineHeight: 24
  },
  quoteAttribution: {
    ...typography.label,
    color: colors.primary,
    textAlign: "right"
  },
  ctaWrap: {
    minWidth: 160
  },
  footer: {
    marginTop: spacing.xl
  }
});
