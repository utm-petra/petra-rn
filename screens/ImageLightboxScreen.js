// @flow

import React from "react";
import * as Expo from "expo";
import { View, ScrollView, Image } from "react-native";
import ImageZoom from "react-native-image-zoom";
import { Transition } from "react-navigation-fluid-transitions";

import Layout from "../constants/Layout";

type Props = {
  navigation: any
};

export default class ImageLightboxScreen extends React.Component<Props> {
  componentDidMount() {
    const didSubscription = this.props.navigation.addListener("didFocus", _ =>
      Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.ALL)
    );
    const didBlurSubscription = this.props.navigation.addListener(
      "didBlur",
      _ =>
        Expo.ScreenOrientation.allow(
          Expo.ScreenOrientation.Orientation.PORTRAIT
        )
    );
  }

  render() {
    const source = this.props.navigation.getParam("imageSource", null);
    return (
      <ScrollView
        maximumZoomScale={4}
        minimumZoomScale={0.25}
        bouncesZoom={true}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.7)"
        }}
        contentContainerStyle={{
          padding: 24,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image source={source} />
      </ScrollView>
    );
  }
}
