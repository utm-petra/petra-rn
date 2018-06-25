// @flow

import createReducer from "../createReducer";
import type { Action } from "../actions";
import type { Store, ThunkAction } from "../store";
import { createSelector } from "reselect";
import type { Rock } from "../../constants/Types";
import type { State as EntireState } from "../state";

// import the rock data, which is an array of objects
import dat from "../data/rocks";

export function hydrateCollectionFromFile(): ThunkAction {
  return dispatch => {
    let blob = {};
    dat.forEach(o => {
      blob[o.key] = o;
    });

    dispatch({
      type: "COLLECTION_SET",
      payload: { byId: blob, ids: Object.keys(blob) }
    });
  };
}

export function visitRockId(id: string): ThunkAction {
  return dispatch => {
    dispatch({ type: "SCANNED_ROCK_ID_ADD", payload: id });
  };
}

type State = {
  +ids: string[],
  +byId: { [id: string]: Rock },
  +scannedRocks: { [id: string]: boolean }
};

const INITIAL_STATE: State = {
  ids: [],
  byId: {},
  scannedRocks: {}
};

const reducer = createReducer(INITIAL_STATE, {
  COLLECTION_SET: (state, action) => ({
    ...state,
    ids: action.payload.ids,
    byId: action.payload.byId
  }),
  SCANNED_ROCK_ID_ADD: (state: State, action: Action) => ({
    ...state,
    scannedRocks: { ...state.scannedRocks, [action.payload]: true }
  })
});

const getIds = (state: EntireState) => state.collection.ids;
const getById = (state: EntireState) => state.collection.byId;
const getScannedRocks = (state: EntireState) => state.collection.scannedRocks;
const getScannedRockIds = createSelector([getScannedRocks], o =>
  Object.keys(o).filter(k => o[k])
);

const selectors = {
  ids: getIds,
  byId: getById,
  scannedRocks: getScannedRocks,
  scannedRockIds: getScannedRockIds
};

export { reducer, selectors };
