import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import MapScreen from "../screens/MapScreen";
import CollectionScreen from "../screens/CollectionScreen";
import AboutScreen from "../screens/AboutScreen";
import RockScannerScreen from "../screens/RockScannerScreen";

import RockDetailScreen from "../screens/RockDetailScreen";

// Google maps
const MapStack = createStackNavigator({
  Map: MapScreen,
  RockDetail: RockDetailScreen
});

MapStack.navigationOptions = {
  tabBarLabel: "Map",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={"map"} />
};

// Rock collection list
const CollectionStack = createStackNavigator({
  Collection: CollectionScreen,
  RockDetail: RockDetailScreen
});

CollectionStack.navigationOptions = {
  tabBarLabel: "Collection",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"collections"} />
  )
};

// QR scanner screen
const RockScannerStack = createStackNavigator({
  RockScanner: RockScannerScreen,
  RockDetail: RockDetailScreen
});

RockScannerStack.navigationOptions = {
  tabBarLabel: "Scan",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"fullscreen"} />
  )
};

// About Petra screen
const AboutStack = createStackNavigator({
  About: AboutScreen
});

AboutStack.navigationOptions = {
  tabBarLabel: "About",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={"info"} />
};

export default createBottomTabNavigator({
  MapStack,
  CollectionStack,
  RockScannerStack,
  AboutStack
});
