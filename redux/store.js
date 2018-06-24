// @flow

import { createStore, applyMiddleware, compose } from "redux";
import type { Store as ReduxStore } from "redux";
import { persistStore } from "redux-persist";
import ReduxThunk from "redux-thunk";
import logger from "redux-logger";

import reducers from "./reducers";
import type { Action } from "./actions";
import type { State } from "./state";

export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type GetState = () => State;
export type PromiseAction = Promise<Action>;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type Store = ReduxStore<State, Action>;

declare var __DEV__: boolean;
const store: Store = __DEV__
  ? createStore(reducers, {}, applyMiddleware(ReduxThunk, logger))
  : createStore(reducers, {}, applyMiddleware(ReduxThunk));

export const persistor = persistStore(store);
console.log("Initial State:\n" + JSON.stringify(store.getState()));

export default store;
