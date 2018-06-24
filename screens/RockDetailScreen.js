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

import { selectors as collectionSelectors } from "../redux/modules/collection";
import Layout from "../constants/Layout";

const mapStateToProps = (state, ownProps) => ({
  rock: collectionSelectors.byId(state)[ownProps.navigation.state.params.rockId]
});

class RockDetailScreen extends React.Component {
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
        <Card>
          <CardContent>
            <Title>{rock.name}</Title>
            <Subheading>{rock.mineralComposition}</Subheading>
            <Paragraph>{rock.texture}</Paragraph>
            <Paragraph>{rock.interpretation}</Paragraph>
          </CardContent>
        </Card>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(withTheme(RockDetailScreen));
