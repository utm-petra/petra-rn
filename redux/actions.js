// @flow

// naming guidelines
// actions: VerbNounAction
// action types: NOUN_VERB

type SetCollectionAction = {
  type: "COLLECTION_SET",
  payload: { ids: string[], byId: {} }
};

export type Action = SetCollectionAction;
