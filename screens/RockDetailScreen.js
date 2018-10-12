//@flow

import React from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
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

import Carousel, { Pagination } from "react-native-snap-carousel";
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

const W = Layout.window.width;
const H = Layout.window.height * 0.4;

type Props = { navigation: any, rock: Rock, visited: boolean, theme: Theme };
type State = { lightboxVisible: false, imageIndex: number };
class RockDetailScreen extends React.Component<State, Props> {
  _carousel: Carousel;
  state = { lightboxVisible: false, imageIndex: 0 };

  _renderItem = ({ item, index }) => (
    <TouchableWithoutFeedback
      onPress={() =>
        this.setState({ lightboxVisible: true, imageIndex: index })
      }
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Image
          source={Images[item]}
          style={{
            width: W - 12,
            height: H - 12,
            resizeMode: "center",
            borderRadius: 12,
            ...Platform.select({
              ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2
              },
              android: {
                elevation: 5
              }
            })
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  render() {
    const { rock } = this.props;
    const data = rock.pics;

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
          itemWidth={W}
          itemHeight={H}
          sliderWidth={W}
          sliderHeight={H}
          onSnapToItem={index =>
            this.setState({ imageIndex: index, lightboxVisible: false })
          }
        />
        <Pagination
          dotsLength={data.length}
          activeDotIndex={this.state.imageIndex}
          containerStyle={{ paddingVertical: 8 }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: "rgba(0, 0, 0, 0.8)"
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
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
              width: W,
              height: W
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
