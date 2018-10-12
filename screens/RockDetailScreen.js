//@flow

import React from "react";
import { View, Image, ScrollView } from "react-native";
import styles from "../constants/Styles";
import {
  Headline,
  Text,
  Card,
  Title,
  Subheading,
  Paragraph,
  Button,
  withTheme
} from "react-native-paper";
import ImageView from "react-native-image-view";

import Carousel from "react-native-snap-carousel";
import { connect } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";

import { selectors as getCollection } from "../redux/modules/collection";
import Layout from "../constants/Layout";
import { colorsForRockType } from "../constants/Colors";
import type { Rock, Theme } from "../constants/Types";
import Images from "../assets/images";

const mapStateToProps = (state, ownProps) => ({
  rock: getCollection.byId(state)[ownProps.navigation.state.params.rockId],
  visited: getCollection
    .scannedRockIds(state)
    .includes(ownProps.navigation.state.params.rockId)
});

type Props = { navigation: any, rock: Rock, visited: boolean, theme: Theme };
type State = { lightboxVisible: false, imageIndex: number };
class RockDetailScreen extends React.Component<State, Props> {
  _carousel: Carousel;
  state = { lightboxVisible: false, imageIndex: 0 };

  _renderItem = ({ item, index }) => (
    <View style={{ paddingHorizontal: 2, paddingVertical: 8 }}>
      <Card
        elevation={4}
        onPress={() =>
          this.setState({ lightboxVisible: true, imageIndex: index })
        }
      >
        <Card.Cover source={Images[item]} />
      </Card>
    </View>
  );

  _zoomImage = imageSource =>
    this.props.navigation.navigate("ImageLightbox", { imageSource });

  render() {
    const { rock } = this.props;
    const data = rock.pics;
    const w = Layout.window.width;
    const h = Layout.window.height * 0.3;
    return (
      <ScrollView
        style={[
          styles.container,
          {
            backgroundColor: this.props.theme.colors.background
          }
        ]}
      >
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          layout={"default"}
          data={data}
          firstItem={0}
          renderItem={this._renderItem}
          itemWidth={w - 64}
          sliderWidth={w}
          sliderHeight={h}
        />
        <View style={{ padding: 8 }}>
          <Card>
            <Card.Content>
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
            </Card.Content>
          </Card>
        </View>
        <ImageView
          images={this.props.rock.pics.map(i => {
            return {
              source: Images[i],
              width: 200,
              height: 200
            };
          })}
          isVisible={this.state.lightboxVisible}
          imageIndex={this.state.imageIndex}
        />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(withTheme(RockDetailScreen));
