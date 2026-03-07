import { StyleSheet, Text, View } from "react-native";

import { colors, spacing, typography } from "@/theme";

interface ErrorStateProps {
  message: string;
}

export function ErrorState({ message }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Something went wrong</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderColor: colors.danger,
    borderRadius: 16,
    borderWidth: 1,
    gap: spacing.sm,
    padding: spacing.lg
  },
  title: {
    ...typography.label,
    color: colors.danger
  },
  message: {
    ...typography.bodySmall,
    color: colors.text
  }
});
