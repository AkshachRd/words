import { useContext } from "react";
import { createUseStyles } from "react-jss";
import { WordsContext } from "../../../words/src/context";
import { AddCard } from "./AddCard";
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
  const [state, _] = useContext(WordsContext);

  return (
    <div className={classes.cardList}>
    {state.words.map((word) => (
      <FlipCard key={word.id} word={word} />
    ))}
    <AddCard />
  </div>
  );
};