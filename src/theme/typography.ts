import { TextStyle } from "react-native";

import { colors } from "@/theme/colors";

type TypographyTokens = Record<string, TextStyle>;

export const typography: TypographyTokens = {
  display: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "700",
    color: colors.text
  },
  h1: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700",
    color: colors.text
  },
  h2: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
    color: colors.text
  },
  title: {
    fontFamily: "PlusJakartaSans-SemiBold",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "600",
    color: colors.text
  },
  body: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "400",
    color: colors.text
  },
  bodySmall: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
    color: colors.textMuted
  },
  label: {
    fontFamily: "PlusJakartaSans-SemiBold",
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    color: colors.text
  },
  caption: {
    fontFamily: "PlusJakartaSans-Medium",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    color: colors.textMuted
  }
};
