import { StyleSheet, Text, View } from "react-native";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Screen } from "@/components/ui/Screen";
import { spacing, typography } from "@/theme";

export function AuthScreen() {
  return (
    <Screen>
      <View style={styles.content}>
        <Text style={typography.h1}>Create your account</Text>
        <Text style={typography.body}>Auth wiring belongs here. Keep guest mode available for MVP exploration.</Text>
        <PrimaryButton label="Continue as Guest" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: spacing.xl,
    justifyContent: "center"
  }
});
