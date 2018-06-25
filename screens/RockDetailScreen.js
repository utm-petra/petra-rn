//@flow

import React from "react";
import { View, Image, ScrollView } from "react-native";
import styles from "../constants/Styles";
import {
  Headline,
  Text,
  Card,
  CardCover,
  CardContent,
  Title,
  Subheading,
  Paragraph,
  CardActions,
  Button,
  withTheme
} from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import { selectors as collectionSelectors } from "../redux/modules/collection";
import Layout from "../constants/Layout";
import { colorsForRockType } from "../constants/Colors";
import type { Rock, Theme } from "../constants/Types";

const mapStateToProps = (state, ownProps) => ({
  rock: collectionSelectors.byId(state)[
    ownProps.navigation.state.params.rockId
  ],
  visited: collectionSelectors
    .scannedRockIds(state)
    .includes(ownProps.navigation.state.params.rockId)
});

type Props = { navigation: any, rock: Rock, visited: boolean, theme: Theme };

class RockDetailScreen extends React.Component<Props> {
  static navigationOptions = ({ screenProps, navigation }) => {
    return {
      headerTintColor: screenProps.theme.colors.text,
      headerStyle: {
        backgroundColor: screenProps.theme.colors.primary
      }
    };
  };

  _carousel: Carousel;

  _renderItem({ item, index }) {
    return (
      <View style={{ paddingHorizontal: 2, paddingVertical: 8 }}>
        <Card elevation={4}>
          <CardCover source={require("../assets/images/amphibolite1.jpg")} />
        </Card>
      </View>
    );
  }

  render() {
    const { rock } = this.props;
    const data = ["test", "test", "test", ...rock.pics];
    const w = Layout.window.width;
    const h = Layout.window.height * 0.3;
    return (
      <ScrollView
        style={[
          styles.container,
          {
            backgroundColor: this.props.theme.background
          }
        ]}
      >
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          layout={"default"}
          data={data}
          firstItem={data.length > 1 ? 1 : 0}
          renderItem={this._renderItem}
          itemWidth={w - 64}
          sliderWidth={w}
          sliderHeight={h}
        />
        <View style={{ padding: 8 }}>
          <Card>
            <CardContent>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Headline>{rock.name}</Headline>
                {this.props.visited && (
                  <MaterialIcons
                    name="done"
                    size={28}
                    style={{ marginLeft: 8 }}
                    color={this.props.theme.colors.disabled}
                  />
                )}
              </View>
              <Title
                style={{
                  color: colorsForRockType.hasOwnProperty(rock.type)
                    ? colorsForRockType[rock.type]
                    : this.props.theme.colors.text
                }}
              >
                {rock.type}
              </Title>
              <Subheading>{rock.mineralComposition}</Subheading>
              <Paragraph>{rock.texture}</Paragraph>
              <Paragraph>{rock.interpretation}</Paragraph>
            </CardContent>
          </Card>
        </View>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(withTheme(RockDetailScreen));
