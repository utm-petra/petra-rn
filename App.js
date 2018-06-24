// @flow

import React from "react";
import { View, StatusBar } from "react-native";

// the StoreProvider will link our app to the Redux store we created
import { Provider as StoreProvider, connect } from "react-redux";

// the PaperProvider will provide our app with theming and design by Paper
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";

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

const mapStateToProps = state => ({
  empty:
    collectionSelectors.ids(state) &&
    collectionSelectors.byId(state).length === 0
});

const mapDispatchToProps = { hydrateCollectionFromFile };

class AppWithNavigation extends React.Component {
  componentDidMount() {
    this.props.hydrateCollectionFromFile();
  }

  render() {
    return (
      <View style={styles.container}>
        <AppNavigator />
      </View>
    );
  }
}

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors
  }
};

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWithNavigation);

export default class App extends React.Component {
  render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider theme={theme}>
          <PersistGate persistor={persistor} loading={null}>
            <StatusBar backgroundColor={theme.colors.primaryDark} />
            <ConnectedApp />
          </PersistGate>
        </PaperProvider>
      </StoreProvider>
    );
  }
}
