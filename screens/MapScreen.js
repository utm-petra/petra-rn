//@flow

import React from "react";
import { View, Platform } from "react-native";
import { MapView, Constants, Location, Permissions } from "expo";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Chip, FAB, withTheme, Text } from "react-native-paper";
import { connect } from "react-redux";

import { selectors as getCollection } from "../redux/modules/collection";
import { colorsForRockType } from "../constants/Colors";
import styles from "../constants/Styles";
import type { Rock } from "../constants/Types";

const initialRegion = {
  latitude: 43.547389,
  longitude: -79.665122,
  latitudeDelta: 0.01,
  longitudeDelta: 0.005
};

const mapStateToProps = state => ({
  rocks: getCollection.rocks(state),
  scannedRockIds: getCollection.scannedRockIds(state)
});

type Props = {
  navigation: any,
  rocks: Rock[],
  scannedRockIds: string[]
};

class HomeScreen extends React.Component<Props> {
  static navigationOptions = {
    header: null
  };

  _map: MapView;

  _animateToCurrentLocation = async () => {
    const userLocation = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true
    });

    this._map.animateToRegion(
      {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      },
      1000
    );
  };

  _animateToInitialRegion = () => {
    this._map.fitToElements(true);
  };

  render() {
    const { rocks } = this.props;

    return (
      <View style={styles.container}>
        <MapView
          ref={r => (this._map = r)}
          style={styles.map}
          initialRegion={initialRegion}
          showsMyLocationButton={false}
          mapType={Platform.select({
            ios: "standard",
            android: "terrain"
          })}
          showsUserLocation
        >
          {rocks.map((rock, i) => {
            const color =
              rock.type && colorsForRockType.hasOwnProperty(rock.type)
                ? colorsForRockType[rock.type]
                : colorsForRockType.other;
            const alreadyScanned = this.props.scannedRockIds.includes(rock.id);
            return (
              <MapView.Marker
                coordinate={{
                  latitude: rock.lat,
                  longitude: rock.lon
                }}
                title={rock.name}
                key={rock.id}
                pinColor={alreadyScanned ? color : "wheat"}
                onCalloutPress={() => {
                  this.props.navigation.push("RockDetail", {
                    rockId: rock.id
                  });
                }}
              />
            );
          })}
        </MapView>
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
          pointerEvents={"box-none"}
        >
          <FAB
            small
            icon="my-location"
            onPress={this._animateToCurrentLocation}
            small
            style={{ marginBottom: 12 }}
            color="white"
          />
          <FAB
            icon="location-on"
            onPress={this._animateToInitialRegion}
            color="white"
          />
        </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(withTheme(HomeScreen));
