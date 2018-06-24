// @flow

import { combineReducers } from "redux";
import { persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage"; // default: localStorage if web, AsyncStorage if react-native
import type { Action } from "./actions";

// import modules here
import { reducer as collection } from "./modules/collection";

// Use redux persist to persist the store to AsyncStorage
// but we only persist the preferences part, the rest is on firebase
// so create a whitelist
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["collection"],
  timeout: 10000
};

const reducers = { collection };

export type Reducers = typeof reducers;

export default persistCombineReducers(persistConfig, reducers);
