import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation";

import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import { tabBarIcon } from "../components/TabBarIcon";
import MapScreen from "../screens/MapScreen";
import CollectionScreen from "../screens/CollectionScreen";
import AboutScreen from "../screens/AboutScreen";
import RockScannerScreen from "../screens/RockScannerScreen";

import RockDetailScreen from "../screens/RockDetailScreen";

// Google maps
const MapStack = createStackNavigator({
  Map: MapScreen
});

MapStack.navigationOptions = {
  tabBarLabel: "Map",
  tabBarIcon: tabBarIcon("map")
};

// Rock collection list
const CollectionStack = createStackNavigator({
  Collection: CollectionScreen
});

CollectionStack.navigationOptions = {
  tabBarLabel: "Collection",
  tabBarIcon: tabBarIcon("collections")
};

// QR scanner screen
const RockScannerStack = createStackNavigator({
  RockScanner: RockScannerScreen
});

RockScannerStack.navigationOptions = {
  tabBarLabel: "Scan",
  tabBarIcon: tabBarIcon("fullscreen")
};

// About Petra screen
const AboutStack = createStackNavigator({
  About: AboutScreen
});

AboutStack.navigationOptions = {
  tabBarLabel: "About",
  tabBarIcon: tabBarIcon("info")
};

export default createMaterialBottomTabNavigator({
  MapStack,
  CollectionStack,
  RockScannerStack,
  AboutStack
});
