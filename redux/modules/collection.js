//@flow

import createReducer from "../createReducer";
import type { Action } from "../actions";
import type { Store, ThunkAction } from "../store";

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

type State = {
  +ids: string[],
  byId: {}
};

const INITIAL_STATE: State = {
  ids: [],
  byId: {}
};

const reducer = createReducer(INITIAL_STATE, {
  COLLECTION_SET: (state: State, action: Action) => ({
    ids: action.payload.ids,
    byId: action.payload.byId
  })
});

const selectors = {
  ids: state => state.collection.ids,
  byId: state => state.collection.byId
};

export { reducer, selectors };
