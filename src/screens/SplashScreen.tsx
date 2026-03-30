import { useEffect, useRef } from "react";
import { Animated, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { BrandFooter } from "@/components/ui/BrandFooter";
import type { RootStackParamList } from "@/navigation/types";
import { colors, spacing, typography, withAlpha } from "@/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

export function SplashScreen({ navigation }: Props) {
  const heroOpacity = useRef(new Animated.Value(0)).current;
  const heroTranslateY = useRef(new Animated.Value(24)).current;
  const quoteOpacity = useRef(new Animated.Value(0)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;
  const promptOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(heroOpacity, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true
        }),
        Animated.timing(heroTranslateY, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true
        })
      ]),
      Animated.delay(250),
      Animated.timing(quoteOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true
      }),
      Animated.delay(180),
      Animated.timing(footerOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      }),
      Animated.delay(250),
      Animated.timing(promptOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
      })
    ]).start(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(promptOpacity, { toValue: 0.35, duration: 900, useNativeDriver: true }),
          Animated.timing(promptOpacity, { toValue: 1, duration: 900, useNativeDriver: true })
        ])
      ).start();
    });
  }, [footerOpacity, heroOpacity, heroTranslateY, promptOpacity, quoteOpacity]);

  return (
    <Pressable style={styles.container} onPress={() => navigation.replace("Login")}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />
      <SafeAreaView style={styles.safeArea} edges={["top", "right", "bottom", "left"]}>
        <View style={styles.content}>
          <Animated.View style={[styles.hero, { opacity: heroOpacity, transform: [{ translateY: heroTranslateY }] }]}>
            <Text style={styles.eyebrow}>Green Life</Text>
            <Text style={styles.headline}>Every picture throws a spark.{"\n"}Every spark can start a fire.</Text>
            <Text style={styles.subhead}>Look around you and get real insights about the world you see.</Text>
          </Animated.View>

          <View style={styles.lowerBlock}>
            <Animated.View style={[styles.quoteCard, { opacity: quoteOpacity }]}>
              <Text style={styles.quoteText}>
                "If everyone knew the real impact of what they were doing, they would make different choices."
              </Text>
              <Text style={styles.quoteAttribution}>Lee Williams</Text>
            </Animated.View>

            <Animated.View style={[styles.footerWrap, { opacity: footerOpacity }]}>
              <BrandFooter style={styles.footer} />
            </Animated.View>
          </View>
        </View>

        <Animated.View style={[styles.promptWrap, { opacity: promptOpacity }]}>
          <Text style={styles.prompt}>Tap to continue</Text>
        </Animated.View>
      </SafeAreaView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    flex: 1
  },
  safeArea: {
    backgroundColor: colors.bg,
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxxl
  },
  hero: {
    alignItems: "center",
    gap: spacing.lg,
    paddingTop: spacing.xl
  },
  eyebrow: {
    ...typography.caption,
    color: colors.primaryStrong,
    letterSpacing: 1.6,
    textAlign: "center",
    textTransform: "uppercase"
  },
  headline: {
    ...typography.display,
    fontSize: 34,
    lineHeight: 42,
    maxWidth: 300,
    textAlign: "center"
  },
  subhead: {
    ...typography.body,
    color: colors.textMuted,
    maxWidth: 300,
    textAlign: "center"
  },
  lowerBlock: {
    gap: spacing.xxxxxl,
    paddingBottom: spacing.lg
  },
  quoteCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderLeftColor: colors.spark,
    borderLeftWidth: 3,
    borderRadius: 20,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.xl
  },
  quoteText: {
    ...typography.body,
    color: colors.text,
    fontStyle: "italic"
  },
  quoteAttribution: {
    ...typography.label,
    color: colors.spark,
    textAlign: "right"
  },
  footerWrap: {
    alignItems: "center"
  },
  footer: {
    marginBottom: spacing.sm
  },
  promptWrap: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm
  },
  prompt: {
    ...typography.caption,
    color: withAlpha(colors.textMuted, 0.95),
    letterSpacing: 1.8,
    textAlign: "center",
    textTransform: "uppercase"
  }
});
