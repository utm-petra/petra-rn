// @flow

import { combineReducers } from "redux";
import { persistCombineReducers, persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage"; // default: localStorage if web, AsyncStorage if react-native

// import Redux modules here
import { reducer as collection } from "./modules/collection";

// Use redux persist to persist the store across app launches
const rootConfig = {
  key: "root",
  blacklist: ["collection"],
  storage
};

// blacklist the rock collection from redux persist so that it has to load from json every time
const collectionConfig = {
  key: "collection",
  blacklist: ["ids", "byId", "list"],
  storage
};

const rootReducer = combineReducers({
  collection: persistReducer(collectionConfig, collection)
});

export type Reducers = typeof rootReducer;
export default persistReducer(rootConfig, rootReducer);
