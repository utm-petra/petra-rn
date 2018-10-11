// @flow

import React from "react";
import * as Expo from "expo";
import { View, ScrollView, Image } from "react-native";
import ImageView from "react-native-image-view";

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
      <View>
        <ImageView images={[{ source }]} imageIndex={0} isVisible />
      </View>
    );
  }
}
