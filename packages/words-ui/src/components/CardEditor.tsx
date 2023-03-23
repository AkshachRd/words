import type { FormEvent } from "react";
import { createUseStyles } from "react-jss";
import type { Word } from "../types";
import { Card } from "./Card";

type RuleNames = "cardEditor" |
                 "cardEditorButton" |
                 "cardEditorButtonsContainer" |
                 "cardEditorContainer" |
                 "cardEditorInput";

type CardEditorProps = {
  onCancel: () => void;
  onSubmit: (word: Word) => void;
  word: Word;
};

const useStyles = createUseStyles<RuleNames>({
  cardEditor: {
    display: "flex",
    flexDirection: "column",
    height: "fit-content",
    width: "fit-content",
  },
  cardEditorButton: {
    MozAppearance: "none",
    WebkitAppearance: "none",
    appearance: "none",
    backgroundColor: "white",
  },
  cardEditorButtonsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  cardEditorContainer: {
    border: "10px solid black",
    borderRadius: 40,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: 20,
  },
  cardEditorInput: {
    "&:focus": {
      outline: "none",
    },
    MozAppearance: "none",
    WebkitAppearance: "none",
    appearance: "none",
    backgroundColor: "transparent",
    border: "2px solid black",
    borderRadius: 40,
    color: "inherit",
    fontSize: "inherit",
    textAlign: "center",
  }
});

export const CardEditor = ({word, onCancel, onSubmit}: CardEditorProps) => {
  const classes = useStyles();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      backSide: { value: string };
      frontSide: { value: string };
    };

    const frontSide = target.frontSide.value;
    const backSide = target.backSide.value;

    onSubmit({...word, backSide, frontSide});
    onCancel();
  };

  return (
    <form className={classes.cardEditor}  onSubmit={handleSubmit}>
      <div className={classes.cardEditorContainer}>
        <Card>
          <label>
            <input className={classes.cardEditorInput} defaultValue={word.frontSide} name="frontSide" type="text" />
          </label>
        </Card>
        <Card>
        <label>
            <input className={classes.cardEditorInput} defaultValue={word.backSide} name="backSide" type="text" />
          </label>
        </Card>
      </div>
      <div className={classes.cardEditorButtonsContainer}>
        <button className={classes.cardEditorButton} onClick={onCancel} type="button">Cancel</button>
        <button className={classes.cardEditorButton} type="submit">Confirm</button>
      </div>
    </form>
  )
};