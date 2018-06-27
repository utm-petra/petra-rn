// @flow

import createReducer from "../createReducer";
import type { Action } from "../actions";
import type { Store, ThunkAction } from "../store";
import { createSelector } from "reselect";
import type { Rock } from "../../constants/Types";
import type { State as EntireState } from "../state";

// import the rock data, which is an array of objects
const rocks = require("../data/rocks.json");
let rockIds = [];
let rocksById = {};
rocks.map(r => {
  rockIds.push(r.id);
  rocksById[r.id] = r;
});

export function visitRockId(id: string): ThunkAction {
  return dispatch => {
    dispatch({ type: "SCANNED_ROCK_ID_ADD", payload: id });
  };
}

type State = {
  +ids: string[],
  +byId: { [id: string]: Rock },
  +list: Rock[],
  +scannedRocks: { [id: string]: boolean }
};

const INITIAL_STATE: State = {
  ids: rockIds,
  byId: rocksById,
  list: rocks,
  scannedRocks: {}
};

const reducer = createReducer(INITIAL_STATE, {
  COLLECTION_SET: (state, action) => {
    return {
      ...state,
      ids: action.payload.ids,
      byId: action.payload.byId
    };
  },
  SCANNED_ROCK_ID_ADD: (state, action) => ({
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
