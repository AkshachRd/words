import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";
import { createUseStyles } from "react-jss";
import { Colors } from "../theme";
import type { Word } from "../types";
import { Button } from "./Button";
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
    gap: 10,
    height: "fit-content",
    width: "fit-content",
  },
  cardEditorButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
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

const buttonWidth = 100;
const buttonHeight = 40;

export const CardEditor = ({ word, onCancel, onSubmit }: CardEditorProps) => {
  const classes = useStyles();
  const [frontSide, setFrontSide] = useState<string>("");
  const [backSide, setBackSide] = useState<string>("");

  const springs = useSpring({
    from: { borderWidth: 0, padding: 0 },
    to: { borderWidth: 10, padding: 20 },
  });

  const handleSubmit = () => {
    if (frontSide !== "" && backSide !== "") {
      onSubmit({ ...word, backSide, frontSide });
    }

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
              onChange={event => setFrontSide(event.target.value)}
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
              onChange={event => setBackSide(event.target.value)}
              placeholder="Back side"
              type="text"
            />
          </label>
        </Card>
      </animated.div>
      <div className={classes.cardEditorButtonsContainer}>
        <Button background={Colors.Background} height={buttonHeight} onClick={onCancel} width={buttonWidth}>
          Cancel
        </Button>
        <Button background={Colors.Background} height={buttonHeight} onClick={handleSubmit} width={buttonWidth}>
          Confirm
        </Button>
      </div>
    </form>
  );
};
