import { animated, useSpring } from "@react-spring/web";
import type { FormEvent } from "react";
import { createUseStyles } from "react-jss";
import type { Word } from "../types";
import { Card } from "./Card";

type CardEditorProps = {
  onCancel: () => void;
  onSubmit: (word: Word) => void;
  word: Word;
};

const useStyles = createUseStyles({
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
    borderColor: "black",
    borderRadius: 40,
    borderStyle: "solid",
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
  },
});

export const CardEditor = ({ word, onCancel, onSubmit }: CardEditorProps) => {
  const classes = useStyles();

  const springs = useSpring({
    from: {
      borderWidth: 0,
      padding: 0,
    },
    to: {
      borderWidth: 10,
      padding: 20,
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      backSide: { value: string };
      frontSide: { value: string };
    };

    const frontSide = target.frontSide.value;
    const backSide = target.backSide.value;

    onSubmit({ ...word, backSide, frontSide });
    onCancel();
  };

  return (
    <form className={classes.cardEditor} onSubmit={handleSubmit}>
      <animated.div className={classes.cardEditorContainer} style={springs}>
        <Card>
          <label>
            <input
              className={classes.cardEditorInput}
              defaultValue={word.frontSide}
              name="frontSide"
              placeholder="Front side"
              type="text"
            />
          </label>
        </Card>
        <Card>
          <label>
            <input
              className={classes.cardEditorInput}
              defaultValue={word.backSide}
              name="backSide"
              placeholder="Back side"
              type="text"
            />
          </label>
        </Card>
      </animated.div>
      <div className={classes.cardEditorButtonsContainer}>
        <button className={classes.cardEditorButton} onClick={onCancel} type="button">
          Cancel
        </button>
        <button className={classes.cardEditorButton} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};
