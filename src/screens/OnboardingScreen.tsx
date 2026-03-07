import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import type { RootStackParamList } from "@/navigation/types";
import { colors, radius, spacing, typography } from "@/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Onboarding">;

export function OnboardingScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        blurRadius={6}
        source={require("../../assets/opening-hero.png")}
        style={styles.topImageBand}
        imageStyle={styles.topImageStyle}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <Image
          source={require("../../assets/Green_Life_Trans.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* App name */}
        <Text style={styles.title}>GREEN LIFE</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>Have knowledge. Pay attention.</Text>

        {/* Founder quote */}
        <View style={styles.quoteCard}>
          <Text style={styles.quoteMark}>"</Text>
          <Text style={styles.quoteText}>
            I am of the belief, that if everyone knew the real impact of what they were doing, they would make different choices.
          </Text>
          <Text style={styles.quoteAttribution}>— Lee Williams</Text>
        </View>

        {/* CTA */}
        <View style={styles.ctaWrap}>
          <PrimaryButton label="Let's Go" onPress={() => navigation.navigate("MainTabs")} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.surface,
    flex: 1
  },
  topImageBand: {
    height: 202,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0
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
    paddingTop: 160
  },
  logo: {
    height: 160,
    marginBottom: spacing.lg,
    width: 160
  },
  title: {
    fontFamily: "PlusJakartaSans-Bold",
    color: colors.primary,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: 6,
    marginBottom: spacing.sm,
    textAlign: "center"
  },
  tagline: {
    color: "#004D77CC",
    fontFamily: "PlusJakartaSans-Medium",
    fontSize: 15,
    fontStyle: "italic",
    letterSpacing: 0.3,
    marginBottom: spacing.xxl,
    paddingHorizontal: spacing.sm,
    textAlign: "center",
    width: "100%"
  },
  quoteCard: {
    backgroundColor: colors.surfaceTint,
    borderLeftColor: colors.primary,
    borderLeftWidth: 3,
    borderRadius: radius.lg,
    marginBottom: spacing.xxl,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    width: "100%"
  },
  quoteMark: {
    color: colors.primary,
    fontSize: 48,
    fontWeight: "700",
    lineHeight: 44,
    marginBottom: spacing.xs,
    opacity: 0.4
  },
  quoteText: {
    ...typography.body,
    color: colors.text,
    fontStyle: "italic",
    lineHeight: 24,
    marginBottom: spacing.md
  },
  quoteAttribution: {
    ...typography.label,
    color: colors.primary,
    fontWeight: "600",
    textAlign: "right"
  },
  ctaWrap: {
    minWidth: 160,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 4
  }
});