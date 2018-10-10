// @flow

import React from "react";
import { createStackNavigator, HeaderBackButton } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import RockDetailsScreen from "../screens/RockDetailScreen";
import ImageLightboxScreen from "../screens/ImageLightboxScreen";

import GradientBackground from "../components/GradientBackground";

const DetailsStack = createStackNavigator(
  {
    RockDetail: {
      screen: RockDetailsScreen,
      navigationOptions: ({ navigation, screenProps }) => ({
        headerTintColor: screenProps.theme.colors.text,
        headerLeft: (
          <HeaderBackButton
            onPress={() => navigation.goBack(null)}
            tintColor={screenProps.theme.colors.text}
          />
        )
      })
    },

    ImageLightbox: ImageLightboxScreen
  },
  {
    mode: "card",
    navigationOptions: ({ navigation, screenProps }) => ({
      headerTintColor: screenProps.theme.colors.text,
      headerBackground: <GradientBackground theme={screenProps.theme} />,
      headerStyle: { backgroundColor: "transparent" }
    })
  }
);

const nav = createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: { screen: MainTabNavigator, navigationOptions: { header: null } },
  RockDetail: { screen: DetailsStack, navigationOptions: { header: null } }
});

export default nav;
