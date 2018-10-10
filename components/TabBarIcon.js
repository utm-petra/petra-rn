import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const tabBarIcon = name => ({ tintColor }) => (
  <MaterialCommunityIcons
    style={{ backgroundColor: "transparent" }}
    name={name}
    color={tintColor}
    size={24}
  />
);
