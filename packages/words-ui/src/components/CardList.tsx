import { useState } from "react";
import { createUseStyles } from "react-jss";
import { useSelectStore } from "../../../words/src/context";
import { addCardAction, deleteCardAction, editCardAction } from "../../../words/src/services/Store";
import type { Id, Word } from "../types";
import { AddCard } from "./AddCard";
import { CardEditor } from "./CardEditor";
import { FlipCard } from "./FlipCard";

type RuleNames = "cardList";

const useStyles = createUseStyles<RuleNames>({
  cardList: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
});

export const CardList = () => {
  const classes = useStyles();
  const [state, dispatch] = useSelectStore();
  /*
   * TODO null
   * https://github.com/sindresorhus/eslint-plugin-unicorn/blob/v45.0.2/docs/rules/no-null.md
   */
  const [editingCardId, setEditingCardId] = useState<Id | undefined>();

  const addCard = (word: Word) => {
    dispatch(addCardAction(word));
  };

  const handleSubmit = (editedWord: Word) => dispatch(editCardAction(editedWord));
  const handleDelete = (wordId: Id) => () => dispatch(deleteCardAction(wordId));

  return (
    <div className={classes.cardList}>
      {state.words.map(word =>
        editingCardId === word.id ? (
          // eslint-disable-next-line unicorn/no-useless-undefined
          <CardEditor key={word.id} onCancel={() => setEditingCardId(undefined)} onSubmit={handleSubmit} word={word} />
        ) : (
          <FlipCard
            key={word.id}
            onDelete={handleDelete(word.id)}
            onEdit={() => setEditingCardId(word.id)}
            word={word}
          />
        )
      )}
      <AddCard onClick={addCard} />
    </div>
  );
};
