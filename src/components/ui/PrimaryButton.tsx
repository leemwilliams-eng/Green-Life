import { Pressable, StyleSheet, Text } from "react-native";

import { colors, radius, spacing, typography } from "@/theme";

interface PrimaryButtonProps {
  label: string;
  onPress?: () => void;
  size?: "default" | "compact";
}

export function PrimaryButton({ label, onPress, size = "default" }: PrimaryButtonProps) {
  return (
    <Pressable style={[styles.button, size === "compact" ? styles.buttonCompact : null]} onPress={onPress}>
      <Text style={[styles.label, size === "compact" ? styles.labelCompact : null]}>{label}</Text>
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
  label: {
    ...typography.label,
    color: colors.surface
  },
  labelCompact: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 18
  }
});
