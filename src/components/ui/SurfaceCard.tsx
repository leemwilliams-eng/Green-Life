import { PropsWithChildren } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { colors, radius, shadows, spacing, withAlpha } from "@/theme";

interface SurfaceCardProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  tone?: "default" | "tint" | "primary";
  shadow?: boolean;
}

export function SurfaceCard({
  children,
  style,
  tone = "default",
  shadow = false
}: SurfaceCardProps) {
  return (
    <View
      style={[
        styles.card,
        tone === "tint" ? styles.tintCard : null,
        tone === "primary" ? styles.primaryCard : null,
        shadow ? styles.shadow : null,
        style
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    gap: spacing.md,
    padding: spacing.xl
  },
  tintCard: {
    backgroundColor: colors.surfaceTint,
    borderColor: withAlpha(colors.primary, 0.24)
  },
  primaryCard: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  shadow: {
    ...shadows.card
  }
});
