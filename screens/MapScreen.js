//@flow

import React from "react";
import { View, Platform } from "react-native";
import { MapView, Constants, Location, Permissions } from "expo";
import { connect } from "react-redux";
import { Chip, FAB } from "react-native-paper";
import { selectors as collectionSelectors } from "../redux/modules/collection";

const initialRegion = {
  latitude: 43.547389,
  longitude: -79.665122,
  latitudeDelta: 0.01,
  longitudeDelta: 0.005
};

const mapStateToProps = state => ({
  ids: collectionSelectors.ids(state),
  byId: collectionSelectors.byId(state)
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    region: new MapView.AnimatedRegion({ ...initialRegion }),
    location: null
  };

  componentDidMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        timeInterval: 1000 * 10 /*milliseconds*/,
        distanceInterval: 50 /*meters*/
      },
      ({ coords }) => {
        this.setState({
          location: { latitude: coords.latitude, longitude: coords.longitude }
        });
      }
    );
  };

  _onRegionChange = region => this.state.region.setValue(region);
  _resetRegion = () => {
    const { region } = this.state;
    region.timing({ ...initialRegion }, 300).start();
  };

  _goToLocation = () => {
    const { region, location } = this.state;
    if (location && location !== null)
      region.timing({ ...location }, 300).start();
  };

  render() {
    const { ids, byId } = this.props;
    const { location } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <MapView.Animated
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChange={this._onRegionChange}
        >
          {ids.map(id => {
            const rock = byId[id];
            if (!rock) return null;
            return (
              <MapView.Marker
                coordinate={{ latitude: rock.lat, longitude: rock.lon }}
                title={rock.name}
                description={rock.mineralComposition}
                key={rock.key}
              >
                <MapView.Callout
                  onPress={() => {
                    this.props.navigation.push("RockDetail", {
                      rockId: rock.key
                    });
                  }}
                  tooltip
                >
                  <FAB
                    icon="navigate-next"
                    label={rock.name}
                    style={{ backgroundColor: "white" }}
                  />
                </MapView.Callout>
              </MapView.Marker>
            );
          })}
          {location &&
            location !== null && (
              <MapView.Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude
                }}
                pinColor={"blue"}
              />
            )}
        </MapView.Animated>
        <View
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            top: 0,
            padding: 24,
            justifyContent: "flex-end",
            alignItems: "center"
          }}
        >
          <FAB
            small
            icon="my-location"
            onPress={this._goToLocation}
            small
            style={{ marginBottom: 12 }}
            color="white"
          />
          <FAB icon="home" onPress={this._resetRegion} color="white" />
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(HomeScreen);
