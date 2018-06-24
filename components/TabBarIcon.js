import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

export const tabBarIcon = name => ({ tintColor }) => (
  <MaterialIcons
    style={{ backgroundColor: "transparent" }}
    name={name}
    color={tintColor}
    size={24}
  />
);
