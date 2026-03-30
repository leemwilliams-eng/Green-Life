import { StyleSheet, TextInput, View } from "react-native";

import { colors, radius, spacing, typography } from "@/theme";

interface SearchBarProps {
  value: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChangeText, placeholder = "Search products, brands, materials" }: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radius.pill,
    borderWidth: 1,
    paddingHorizontal: spacing.lg
  },
  input: {
    ...typography.body,
    minHeight: 48
  }
});
