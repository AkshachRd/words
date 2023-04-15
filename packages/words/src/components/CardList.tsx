import { useState } from "react";
import { createUseStyles } from "react-jss";
import { AddCard, CardEditor, FlipCard } from "words-ui";
import type { Id, Word } from "words-ui/src/types";
import { useSelectStore } from "../context";
import { addCardAction, deleteCardAction, editCardAction } from "../services/Store";

const useStyles = createUseStyles({
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
