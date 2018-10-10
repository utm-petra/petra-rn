//@flow

import React from "react";
import { View, Platform } from "react-native";
import { MapView, Constants, Location, Permissions, Font } from "expo";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { Chip, FAB, withTheme, Text, Title } from "react-native-paper";
import { connect } from "react-redux";

import { selectors as getCollection } from "../redux/modules/collection";
import {
  colorsForRockType,
  torontoColors,
  colorTheme
} from "../constants/Colors";
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

type State = {
  fontsLoaded: boolean
};
class HomeScreen extends React.Component<Props, State> {
  static navigationOptions = {
    header: null
  };

  state = {
    fontsLoaded: false
  };

  _map: MapView;

  async componentDidMount() {
    await Font.loadAsync({
      "maven-pro-bold": require("../assets/fonts/MavenPro-Bold.ttf")
    });
    this.setState({ fontsLoaded: true });
  }

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
    this._map.fitToSuppliedMarkers(this.props.rocks.map(r => r.id), true);
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
                identifier={rock.id}
                pinColor={alreadyScanned ? color : "black"}
                onCalloutPress={() => {
                  this.props.navigation.navigate("RockDetail", {
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
            icon="my-location"
            onPress={this._animateToCurrentLocation}
            style={{ marginBottom: 12 }}
            small
          />
          <FAB icon="location-on" onPress={this._animateToInitialRegion} />
        </View>
        <View
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            left: 0,
            padding: 24,
            justifyContent: "flex-end",
            alignItems: "flex-start"
          }}
          pointerEvents={"box-none"}
        >
          <Text>{`Scanned ${this.props.scannedRockIds.length} of ${
            this.props.rocks.length
          } rocks`}</Text>
        </View>
        {this.state.fontsLoaded && (
          <View
            style={{
              position: "absolute",
              right: 0,
              left: 0,
              top: 24,
              justifyContent: "flex-start",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                fontFamily: "maven-pro-bold",
                fontSize: 48,
                textAlign: "center",
                color: colorTheme.colors.accent
              }}
              onPress={() => this.props.navigation.navigate("About")}
            >
              {"petra"}
            </Text>
            <Title
              style={{ textAlign: "center", color: colorTheme.colors.accent }}
            >
              {"Explore UTM's rock collection"}
            </Title>
          </View>
        )}
      </View>
    );
  }
}

export default connect(mapStateToProps)(withTheme(HomeScreen));
