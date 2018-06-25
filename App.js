// @flow

import React from "react";
import { View, StatusBar } from "react-native";

// the StoreProvider will link our app to the Redux store we created
import { Provider as StoreProvider, connect } from "react-redux";

// the PaperProvider will provide our app with theming and design by Paper
import { Provider as PaperProvider, withTheme } from "react-native-paper";

// the app navigation framework setup in React Navigation
import AppNavigator from "./navigation/AppNavigator";

import styles from "./constants/Styles";

// our created redux store and options to persist the state through app launches
import store, { persistor } from "./redux/store";

// the PersistGate will take care of displaying a screen as the app state loads from disk
import { PersistGate } from "redux-persist/integration/react";

// import the rock collection and a way to "hydrate" it if needed
import {
  selectors as collectionSelectors,
  hydrateCollectionFromFile
} from "./redux/modules/collection";

import { colorTheme } from "./constants/Colors";
import type { Theme } from "./constants/Types";

const mapStateToProps = state => ({
  empty: collectionSelectors.ids(state).length === 0
});

const mapDispatchToProps = { hydrateCollectionFromFile };

type Props = {
  hydrateCollectionFromFile: Function,
  theme: Theme
};

class AppWithNavigation extends React.Component<Props> {
  componentDidMount() {
    if (this.props.empty) {
      this.props.hydrateCollectionFromFile();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={this.props.theme.colors.primaryDark}
          barStyle="dark-content"
        />
        <AppNavigator screenProps={{ theme: this.props.theme }} />
      </View>
    );
  }
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(AppWithNavigation));

export default class App extends React.Component<*> {
  render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider theme={colorTheme}>
          <PersistGate persistor={persistor} loading={null}>
            <ConnectedApp />
          </PersistGate>
        </PaperProvider>
      </StoreProvider>
    );
  }
}
