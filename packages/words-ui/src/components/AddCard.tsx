import { useCallback, useContext } from "react";
import { createUseStyles } from "react-jss";
import { WordsContext } from "../../../words/src/context";
import { makeId } from "../../../words/src/services/MakeId";
import { addCardAction } from "../../../words/src/services/Store";
import { Card } from "./Card";

type RuleNames = "addCard";

const useStyles = createUseStyles<RuleNames>({
  addCard: {
    "&:first-child": {
      backgroundColor: "white",
      border: "3px black"
    }
  }
});

export const AddCard = () => {
  const classes = useStyles();
  const [_, dispatch] = useContext(WordsContext);

  const onClick = useCallback(() => {
    dispatch(addCardAction({id: makeId(5), frontSide: "Hello", backSide: "Привет"}))
  }, [dispatch]);

  return (
    <div className={classes.addCard} onClick={onClick}>
      <Card>
        +
      </Card>
    </div>
  )
};