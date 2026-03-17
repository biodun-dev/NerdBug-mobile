import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { colors } from "./colors";

export const typography = StyleSheet.create({
  h1: {
    fontSize: hp("3.5%"),
    fontWeight: "700",
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: hp("2.8%"),
    fontWeight: "600",
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  bodyLarge: {
    fontSize: hp("2%"),
    fontWeight: "500",
    color: colors.textPrimary,
    lineHeight: hp("3%"),
  },
  bodyMedium: {
    fontSize: hp("1.8%"),
    fontWeight: "400",
    color: colors.textSecondary,
    lineHeight: hp("2.5%"),
  },
  buttonText: {
    fontSize: hp("2%"),
    fontWeight: "600",
    color: colors.white,
  },
  caption: {
    fontSize: hp("1.5%"),
    fontWeight: "400",
    color: colors.textSecondary,
  },
});
