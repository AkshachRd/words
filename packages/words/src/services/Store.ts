import { useReducer } from "react";
import { isId, isWord, type Id, type Word } from "words-ui";
import { isPage, type Pages } from "../types/Pages";

// eslint-disable-next-line @typescript-eslint/naming-convention
const ActionKind = {
  AddCard: "ADD_CARD",
  DeleteCard: "DELETE_CARD",
  EditCard: "EDIT_CARD",
  SetPage: "SET_PAGE",
} as const;
// eslint-disable-next-line @typescript-eslint/no-redeclare
type ActionKind = (typeof ActionKind)[keyof typeof ActionKind];
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
type PayloadKind = Id | Pages | Word;

type Action = {
  payload: PayloadKind;
  type: ActionKind;
};

export type State = {
  page: Pages;
  words: Word[];
};

const addCardAction = (payload: Word): Action => ({
  payload,
  type: ActionKind.AddCard,
});

const editCardAction = (payload: Word): Action => ({
  payload,
  type: ActionKind.EditCard,
});

const deleteCardAction = (payload: Id): Action => ({
  payload,
  type: ActionKind.DeleteCard,
});

const setPageAction = (payload: Pages): Action => ({
  payload,
  type: ActionKind.SetPage,
});

const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;

  switch (type) {
    case ActionKind.AddCard: {
      if (!isWord(payload)) {
        throw new Error("Action payload is not assignable: AddCard action payload must be Word type");
      }
      return {
        ...state,
        words: [...state.words, payload],
      };
    }
    case ActionKind.EditCard: {
      if (!isWord(payload)) {
        throw new Error("Action payload is not assignable: EditCard action payload must be Word type");
      }
      const words = state.words.reduce<Word[]>((words, word) => {
        if (word.id === payload.id) {
          word.frontSide = payload.frontSide;
          word.backSide = payload.backSide;
        }

        words.push(word);

        return words;
      }, []);

      return {
        ...state,
        words,
      };
    }
    case ActionKind.SetPage: {
      if (!isPage(payload)) {
        throw new Error("Action payload is not assignable: SetPage action payload must be Pages type");
      }
      return {
        ...state,
        page: payload,
      };
    }
    case ActionKind.DeleteCard: { {
      if (!isId(payload)) {
        throw new Error("Action payload is not assignable: DeleteCard action payload must be Id type");
      }
    }

    return {
      ...state,
      words: state.words.filter((word) => word.id !== payload),
    }
    }
    default: {
      return state;
    }
  }
};

export type Store = ReturnType<typeof useStore>;

export { addCardAction, deleteCardAction, editCardAction, setPageAction };

export const useStore = (initialState: State) => useReducer(reducer, initialState);
