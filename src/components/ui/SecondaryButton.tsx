import { Pressable, StyleSheet, Text } from "react-native";

import { colors, radius, spacing, typography } from "@/theme";

interface SecondaryButtonProps {
  label: string;
  onPress?: () => void;
  variant?: "default" | "accent" | "ghost";
  fullWidth?: boolean;
}

export function SecondaryButton({ label, onPress, variant = "default", fullWidth = false }: SecondaryButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        variant === "accent" ? styles.buttonAccent : null,
        variant === "ghost" ? styles.buttonGhost : null,
        fullWidth ? styles.fullWidth : null,
        pressed ? styles.buttonPressed : null,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.label, variant === "accent" ? styles.labelAccent : null, variant === "ghost" ? styles.labelGhost : null]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  buttonAccent: {
    backgroundColor: "transparent",
    borderColor: colors.primary,
  },
  buttonGhost: {
    backgroundColor: "transparent",
    borderColor: colors.border,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  fullWidth: {
    alignSelf: "stretch",
  },
  label: {
    ...typography.label,
    color: colors.text,
  },
  labelAccent: {
    color: colors.primary,
  },
  labelGhost: {
    color: colors.textMuted,
  },
});
