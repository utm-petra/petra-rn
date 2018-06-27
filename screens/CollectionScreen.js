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
import type { Rock } from "../constants/Types";

const mapStateToProps = state => ({
  ids: collectionSelectors.ids(state),
  byId: collectionSelectors.byId(state),
  scannedRocks: collectionSelectors.scannedRocks(state)
});

const mapDispatchToProps = { hydrateCollectionFromFile };

type Props = {
  navigation: any,
  ids: string[],
  scannedRocks: { [id: string]: boolean },
  byId: { [id: string]: Rock }
};

class CollectionScreen extends React.Component<Props> {
  static navigationOptions = ({ screenProps }: any) => {
    return {
      headerTitle: <ToolbarContent title="UTM Rock Collection" />,
      headerStyle: {
        backgroundColor: screenProps.theme.colors.primary
      }
    };
  };

  _navigate = id =>
    this.props.navigation.navigate("RockDetail", {
      rockId: id
    });

  render() {
    const { ids, byId } = this.props;
    const data = ids.map(id => byId[id]);
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <RockListItem
              id={item.id}
              onPress={() => this._navigate(item.id)}
              visited={this.props.scannedRocks[item.id]}
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
