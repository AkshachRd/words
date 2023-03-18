import { useReducer } from "react";
import { isWord, type Id, type Word } from "words-ui";
import { isPage, type Pages } from "../types/Pages";

const ActionKind = {
  AddCard: "ADD_CARD",
  DeleteCard: "DELETE_CARD",
  SetPage: "SET_PAGE",
} as const;
type ActionKind = typeof ActionKind[keyof typeof ActionKind];
type PayloadKind = Id | Pages | Word;

export type Action = {
  payload: PayloadKind;
  type: ActionKind;
};

export const addCardAction = (payload: Word): Action => ({
  payload,
  type: ActionKind.AddCard,
});

export const deleteCardAction = (payload: Id): Action => ({
  payload,
  type: ActionKind.DeleteCard,
});

export const setPageAction = (payload: Pages): Action => ({
  payload,
  type: ActionKind.SetPage,
});

type State = {
  page: Pages;
  words: Word[];
};

const reducer = (state: State, action: Action): State => {
  const {type, payload} = action;

  switch (type) {
    case ActionKind.AddCard: {
      if (!isWord(payload)) {
        throw new Error("Action payload is not assignable");
      }
      return {
        ...state,
        words: [...state.words, payload],
      }
    }
    case ActionKind.SetPage: {
      if (!isPage(payload)) {
        throw new Error("Action payload is not assignable");
      }
      return {
        ...state,
        page: payload
      }
    }
    default: {
      return state
    }
  }
};

export const useStore = (initialState: State) => useReducer(reducer, initialState);