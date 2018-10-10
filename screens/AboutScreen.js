//@flow

import React from "react";
import { ScrollView } from "react-native";
import { Paragraph, Title, Text, Appbar } from "react-native-paper";
import styles from "../constants/Styles";
import GradientBackground from "../components/GradientBackground";

const about = require("../redux/data/rocks.json").about;
const howTo = require("../redux/data/rocks.json").howTo;

type Props = { navigation: any };

export default class AboutScreen extends React.Component<Props> {
  static navigationOptions = ({ screenProps }: any) => {
    return {
      headerTitle: <Appbar.Content title="About Petra" />,
      headerBackground: <GradientBackground theme={screenProps.theme} />
    };
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 8 }}
      >
        <Title>{"How to use"}</Title>
        <Paragraph>{howTo}</Paragraph>
        <Title>{"More info"}</Title>
        <Paragraph>{about}</Paragraph>
      </ScrollView>
    );
  }
}
