//@flow

import React from "react";
import { View, Image, Text } from "react-native";
import styles from "../constants/Styles";
import { connect } from "react-redux";
import { Headline } from "react-native-paper";
import { selectors as collectionSelectors } from "../redux/modules/collection";

const mapStateToProps = (state, ownProps) => ({
  rock: collectionSelectors.byId(state)[ownProps.navigation.state.params.rockId]
});

class RockDetailScreen extends React.Component {
  render() {
    const { rock } = this.props;
    return (
      <View style={styles.container}>
        <Image style={{ flex: 0.5 }} />
        <Headline>{rock.name}</Headline>
        <Text>{rock.mineralComposition}</Text>
        <Text>{rock.texture}</Text>
        <Text>{rock.interpretation}</Text>
      </View>
    );
  }
}

export default connect(mapStateToProps)(RockDetailScreen);
