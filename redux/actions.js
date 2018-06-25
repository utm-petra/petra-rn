// @flow

// naming guidelines
// actions: VerbNounAction
// action types: NOUN_VERB

import type { Rock } from "../constants/Types";

type SetCollectionAction = {
  type: "COLLECTION_SET",
  payload: { ids: string[], byId: { [id: string]: Rock } }
};

type AddScannedRockIdAction = {
  type: "SCANNED_ROCK_ID_ADD",
  payload: string
};

export type Action = SetCollectionAction | AddScannedRockIdAction;
