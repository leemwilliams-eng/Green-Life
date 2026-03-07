import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

import { BrandFooter } from "@/components/ui/BrandFooter";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import type { RootStackParamList } from "@/navigation/types";
import { colors, typography } from "@/theme";

type Props = NativeStackScreenProps<RootStackParamList, "Permissions">;

export function PermissionsScreen({ navigation }: Props) {
  return (
    <View style={styles.root}>
      <ImageBackground source={require("../../assets/capture-hero.png")} style={styles.background} imageStyle={styles.backgroundImage}>
        <SafeAreaView edges={["left", "right", "bottom"]} style={styles.safeArea}>
          <View style={styles.footer}>
            <View style={styles.buttonWrap}>
              <PrimaryButton label="View Item" onPress={() => navigation.replace("MainTabs")} />
            </View>
            <Text style={styles.helperText}>{"Use your camera to scan the item\nor take a picture."}</Text>
            <BrandFooter />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg
  },
  background: {
    flex: 1,
    justifyContent: "flex-end"
  },
  backgroundImage: {
    resizeMode: "cover"
  },
  safeArea: {
    justifyContent: "flex-end"
  },
  footer: {
    alignItems: "center",
    backgroundColor: "rgba(227, 227, 227, 0.72)",
    justifyContent: "space-evenly",
    minHeight: 260,
    paddingHorizontal: 24
  },
  buttonWrap: {
    minWidth: 156
  },
  helperText: {
    ...typography.body,
    color: colors.text,
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center"
  }
});