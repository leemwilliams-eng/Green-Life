import { Pressable, StyleSheet, Text } from "react-native";

import { colors, radius, spacing, typography } from "@/theme";

interface PrimaryButtonProps {
  label: string;
  onPress?: () => void;
  size?: "default" | "compact";
  variant?: "default" | "inverted";
}

export function PrimaryButton({ label, onPress, size = "default", variant = "default" }: PrimaryButtonProps) {
  return (
    <Pressable
      style={[styles.button, size === "compact" ? styles.buttonCompact : null, variant === "inverted" ? styles.buttonInverted : null]}
      onPress={onPress}
    >
      <Text style={[styles.label, size === "compact" ? styles.labelCompact : null, variant === "inverted" ? styles.labelInverted : null]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md
  },
  buttonCompact: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm
  },
  buttonInverted: {
    backgroundColor: colors.bg,
  },
  label: {
    ...typography.label,
    color: colors.surface
  },
  labelCompact: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18
  },
  labelInverted: {
    color: colors.primary,
  }
});
