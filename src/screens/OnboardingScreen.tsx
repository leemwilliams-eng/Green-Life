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
        blurRadius={1}
        source={require("../../assets/opening-hero-patio.jpg")}
        style={styles.topImageBand}
        imageStyle={styles.topImageStyle}
      />
      <View style={styles.imageMask} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Logo */}
        <Image
          source={require("../../assets/Green_Life_Trans.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* App name — SemiBold reserved exclusively for "GREEN LIFE" per design system */}
        <Text style={styles.title}>GREEN <Text style={styles.titleWhite}>LIFE</Text></Text>

        {/* Tagline — emerald primary at 80% opacity */}
        <Text style={styles.tagline}>Be present. <Text style={styles.taglineWhite}>Have knowledge.</Text>{"\n"}Pay attention.</Text>

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
    backgroundColor: colors.bg,  // Forest dark — was white surface
    flex: 1,
  },
  topImageBand: {
    height: 305,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
  imageMask: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: 180,
    borderTopRightRadius: 180,
    height: 80,
    left: -20,
    position: "absolute",
    right: -20,
    top: 245,
  },
  topImageStyle: {
    resizeMode: "cover",
  },
  content: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 48,
    paddingHorizontal: spacing.xl,
    paddingTop: 172,
  },
  logo: {
    height: 160,
    marginBottom: spacing.lg,
    width: 160,
  },
  title: {
    fontFamily: "PlusJakartaSans-SemiBold",
    color: colors.primary,        // Emerald
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: 6,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  tagline: {
    color: "#10B98180",           // Emerald primary at 80% opacity
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 15,
    fontStyle: "italic",
    letterSpacing: 0.3,
    marginBottom: spacing.xxl,
    paddingHorizontal: spacing.sm,
    textAlign: "center",
    width: "100%",
  },
  titleWhite: {
    color: colors.text,
  },
  taglineWhite: {
    color: colors.text,
  },
  quoteCard: {
    backgroundColor: colors.surfaceTint,   // Dark emerald wash
    borderLeftColor: colors.primary,
    borderLeftWidth: 3,
    borderRadius: radius.lg,
    marginBottom: spacing.xxl,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    width: "100%",
  },
  quoteMark: {
    color: colors.primary,
    fontSize: 48,
    fontFamily: "PlusJakartaSans-Bold",
    lineHeight: 44,
    marginBottom: spacing.xs,
    opacity: 0.5,
  },
  quoteText: {
    ...typography.body,
    color: colors.text,
    fontStyle: "italic",
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  quoteAttribution: {
    ...typography.label,
    color: colors.primary,
    textAlign: "right",
  },
  ctaWrap: {
    minWidth: 160,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
});
