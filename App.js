// @flow

import React from "react";
import { View, StatusBar, Platform } from "react-native";

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
import { selectors as getCollection } from "./redux/modules/collection";

import { colorTheme } from "./constants/Colors";

export default class App extends React.Component<*> {
  render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider theme={colorTheme}>
          <PersistGate persistor={persistor} loading={null}>
            <View style={{ flex: 1 }}>
              <AppNavigator screenProps={{ theme: colorTheme }} />
            </View>
          </PersistGate>
        </PaperProvider>
      </StoreProvider>
    );
  }
}
