import { StyleSheet, TextInput, View } from "react-native";

import { colors, radius, typography } from "@/theme";

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
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16
  },
  input: {
    ...typography.body,
    minHeight: 52
  }
});
