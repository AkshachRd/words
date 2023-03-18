import { useCallback, useContext } from "react";
import { createUseStyles } from "react-jss";
import { StoreContext } from "../../../words/src/context";
import { makeId } from "../../../words/src/services/MakeId";
import { addCardAction } from "../../../words/src/services/Store";
import AddCard from "./AddCard";
import { FlipCard } from "./FlipCard";

type RuleNames = "cardList";

const useStyles = createUseStyles<RuleNames>({
  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: 20
  }
});

export const CardList = () => {
  const classes = useStyles();
  const [state, dispatch] = useContext(StoreContext);

  const addCard = useCallback(() => {
    dispatch(addCardAction({id: makeId(5), frontSide: "Hello", backSide: "Привет"}))
  }, [dispatch]);

  return (
    <div className={classes.cardList}>
    {state.words.map((word) => (
      <FlipCard key={word.id} word={word} />
    ))}
    <AddCard onClick={addCard} />
  </div>
  );
};