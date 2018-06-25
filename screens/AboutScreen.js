//@flow

import React from "react";
import { ScrollView } from "react-native";
import { Text, Paragraph, ToolbarContent } from "react-native-paper";
import styles from "../constants/Styles";

const about = require("../redux/data/rocks.json").about;

type Props = { navigation: any };

export default class AboutScreen extends React.Component<Props> {
  static navigationOptions = ({ screenProps }: any) => {
    return {
      headerTitle: <ToolbarContent title="About Petra" />,
      headerStyle: {
        backgroundColor: screenProps.theme.colors.primary
      }
    };
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
