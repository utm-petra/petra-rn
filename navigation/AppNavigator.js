import React from "react";
import { createStackNavigator } from "react-navigation";
import { Toolbar } from "react-native-paper";

import MainTabNavigator from "./MainTabNavigator";
import RockDetailScreen from "../screens/RockDetailScreen";

const nav = createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: { screen: MainTabNavigator, navigationOptions: { header: null } },
  RockDetail: RockDetailScreen
});

export default nav;
