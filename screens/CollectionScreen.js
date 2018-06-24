//@flow

import React from "react";
import { FlatList, View } from "react-native";
import styles from "../constants/Styles";
import { connect } from "react-redux";
import {
  selectors as collectionSelectors,
  hydrateCollectionFromFile
} from "../redux/modules/collection";

import RockListItem from "../components/RockListItem";

const mapStateToProps = state => ({
  ids: collectionSelectors.ids(state),
  byId: collectionSelectors.byId(state)
});

const mapDispatchToProps = { hydrateCollectionFromFile };

class CollectionScreen extends React.Component {
  static navigationOptions = {
    title: "UTM Rock Collection"
  };

  render() {
    const { ids, byId } = this.props;
    const data = ids.map(id => byId[id]);
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={data}
          keyExtractor={item => item.key}
          renderItem={({ item }) => <RockListItem id={item.key} />}
        />
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionScreen);
