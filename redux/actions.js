// @flow

// naming guidelines
// actions: VerbNounAction
// action types: NOUN_VERB

type SetCollectionAction = {
  type: "COLLECTION_SET",
  payload: { ids: string[], byId: {} }
};

type AddScannedRockIdAction = {
  type: "SCANNED_ROCK_ID_ADD",
  payload: string
};

export type Action = SetCollectionAction | AddScannedRockIdAction;
