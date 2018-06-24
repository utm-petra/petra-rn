//@flow

import React from "react";
import { View } from "react-native";
import { MapView } from "expo";
import { connect } from "react-redux";
import { selectors as collectionSelectors } from "../redux/modules/collection";

const mapStateToProps = state => ({
  ids: collectionSelectors.ids(state),
  byId: collectionSelectors.byId(state)
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { ids, byId } = this.props;
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 43.550444,
          longitude: -79.663321,
          latitudeDelta: 0.02,
          longitudeDelta: 0.01
        }}
      >
        {ids.map(id => {
          const rock = byId[id];
          if (!rock) return null;
          return (
            <MapView.Marker
              coordinate={{ latitude: rock.lat, longitude: rock.lon }}
              title={rock.title}
              description={rock.description}
              key={rock.key}
            />
          );
        })}
      </MapView>
    );
  }
}

export default connect(mapStateToProps)(HomeScreen);
