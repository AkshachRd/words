import { memo, useState } from "react";
import { createUseStyles } from "react-jss";
import { createWord, type Word } from "../types";
import { Card } from "./Card";
import { CardEditor } from "./CardEditor";

type AddCardProps = {
  onClick: (word: Word) => void;
};

const useStyles = createUseStyles({
  addCard: {
    "&:first-child": {
      backgroundColor: "white",
      border: "3px black",
    },
  },
});

const AddCardComponent = ({ onClick }: AddCardProps) => {
  const classes = useStyles();
  const [isCreating, setIsCreating] = useState(false);
  const word: Word = createWord({ backSide: "", frontSide: "" });

  return isCreating ? (
    <CardEditor onCancel={() => setIsCreating(false)} onSubmit={onClick} word={word} />
  ) : (
    <div className={classes.addCard} onClick={() => setIsCreating(true)}>
      <Card>+</Card>
    </div>
  );
};

export const AddCard = memo(AddCardComponent);
