//@flow

import React from "react";
import { ScrollView } from "react-native";
import { Text, Paragraph } from "react-native-paper";
import styles from "../constants/Styles";

const about = require("../redux/data/rocks.json").about;

export default class AboutScreen extends React.Component {
  static navigationOptions = {
    title: "About Petra"
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 8 }}
      >
        <Paragraph>{about}</Paragraph>
      </ScrollView>
    );
  }
}
