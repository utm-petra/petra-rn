//@flow

import { DefaultTheme, Colors } from "react-native-paper";
import type { Theme } from "./Types";

export const colorTheme: Theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.orange200,
    primaryDark: "#ca9b52",
    primaryLight: "##ffffb0",
    secondary: Colors.cyan800,
    secondaryDark: "#005662",
    secondaryLight: "#4fb3bf",
    accent: Colors.cyan800
  }
};

// https://mrdata.usgs.gov/catalog/lithclass-color.php
export const colorsForRockType = {
  Metamorphic: "#9063FF",
  metamorphic: "#9063FF",
  Sedimentary: "#FFD345",
  sedimentary: "#FFD345",
  Igneous: "#FF6F6B",
  igneous: "#FF6F6B",
  other: "#43AFF9"
};
