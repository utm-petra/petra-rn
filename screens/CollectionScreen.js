// @flow

import React from "react";
import { FlatList, View } from "react-native";
import styles from "../constants/Styles";
import { connect } from "react-redux";
import { selectors as getCollection } from "../redux/modules/collection";
import { Appbar } from "react-native-paper";

import RockListItem from "../components/RockListItem";
import type { Rock } from "../constants/Types";
import GradientBackground from "../components/GradientBackground";

const mapStateToProps = state => ({
  ids: getCollection.ids(state),
  byId: getCollection.byId(state),
  rocks: getCollection.rocks(state),
  scannedRocks: getCollection.scannedRocks(state)
});

type Props = {
  navigation: any,
  rocks: Rock[],
  scannedRocks: { [id: string]: boolean }
};

class CollectionScreen extends React.Component<Props> {
  static navigationOptions = ({ screenProps }: any) => {
    return {
      headerBackground: <GradientBackground theme={screenProps.theme} />,
      headerTitle: <Appbar.Content title="UTM Rock Collection" />
    };
  };

  _navigate = id =>
    this.props.navigation.navigate("RockDetail", {
      rockId: id
    });

  render() {
    const { rocks } = this.props;
    const data = rocks;
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

export default connect(mapStateToProps)(CollectionScreen);
