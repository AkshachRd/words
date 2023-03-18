import { memo } from "react";
import { createUseStyles } from "react-jss";
import { Card } from "./Card";

type RuleNames = "addCard";

type AddCardProps = {
  onClick: () => void;
};

const useStyles = createUseStyles<RuleNames>({
  addCard: {
    "&:first-child": {
      backgroundColor: "white",
      border: "3px black"
    }
  }
});

const AddCard = ({onClick}: AddCardProps) => {
  const classes = useStyles();

  return (
    <div className={classes.addCard} onClick={onClick}>
      <Card>
        +
      </Card>
    </div>
  )
};

export default memo(AddCard);