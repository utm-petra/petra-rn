// @flow

import React from "react";
import { FlatList, View } from "react-native";
import styles from "../constants/Styles";
import { connect } from "react-redux";
import {
  selectors as collectionSelectors,
  hydrateCollectionFromFile
} from "../redux/modules/collection";
import { Toolbar, ToolbarBackAction, ToolbarContent } from "react-native-paper";

import RockListItem from "../components/RockListItem";

const mapStateToProps = state => ({
  ids: collectionSelectors.ids(state),
  byId: collectionSelectors.byId(state),
  scannedRocks: collectionSelectors.scannedRocks(state)
});

const mapDispatchToProps = { hydrateCollectionFromFile };

class CollectionScreen extends React.Component {
  static navigationOptions = ({ screenProps }) => {
    return {
      headerTitle: <ToolbarContent title="UTM Rock Collection" />,
      headerStyle: {
        backgroundColor: screenProps.theme.colors.primary
      }
    };
  };

  _navigate = key =>
    this.props.navigation.navigate("RockDetail", {
      rockId: key
    });

  render() {
    const { ids, byId } = this.props;
    const data = ids.map(id => byId[id]);
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={item => item.key}
          renderItem={({ item }) => (
            <RockListItem
              id={item.key}
              onPress={() => this._navigate(item.key)}
              visited={this.props.scannedRocks[item.key]}
            />
          )}
        />
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionScreen);
