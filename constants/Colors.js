//@flow

import { DefaultTheme, Colors } from "react-native-paper";
import type { Theme } from "./Types";

export const colorTheme: Theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: "#EADDD8",
    primaryDark: "#d3bead",
    primaryLight: "#F7F1EF",
    secondary: "#9ECED9",
    secondaryDark: "#627C8C",
    secondaryLight: "#B4DDE7",
    accent: "#3E8CAC"
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

export const torontoColors = {
  blue: "#00204E",
  red: "#BB133E",
  white: "#fff"
};
