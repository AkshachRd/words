import { useState, type CSSProperties } from "react";
import { createUseStyles } from "react-jss";
import type { Word } from "../types";
import { Card } from "./Card";

type RuleNames = "flipCard" | "flipCardBack" | "flipCardButton" | "flipCardButtonsContainer" | "flipCardContainer" | "flipCardFront";

type FlipCardProps = {
  disabled?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
  opacity?: number;
  rotation?: number;
  word: Word;
};

// TODO Constants?
const rotateX0 = "rotateX(0deg)";
const rotateX180 = "rotateX(180deg)";

const useStyles = createUseStyles<RuleNames>({
  flipCard: {
    backgroundColor: "transparent",
    height: 350,
    perspective: 1000,
    width: 500,
  },
  flipCardBack: {
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    transform: rotateX180,
    transition: ".5s",
    width: "100%",
  },
  flipCardButton: {
    appearance: "none",
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: 40,
    cursor: "pointer",
    left: "5%",
    position: "absolute",
    top: "5%",
  },
  flipCardButtonsContainer: {
    "& :nth-child(even)": {
      left: "95%",
      transform: "translateX(-100%)",
    },
    display: "none",
    height: "100%",
    position: "relative",
    width: "100%",
  },
  flipCardContainer: {
    "&:hover $flipCardButtonsContainer": {
      display: "block",
    },
    height: "100%",
    position: "relative",
    textAlign: "center",
    transformStyle: "preserve-3d",
    transition: ".5s",
    width: "100%",
  },
  flipCardFront: {
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden", // TODO CSS logic
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    transform: rotateX0,
    transition: ".5s",
    width: "100%",
  },
});

export const FlipCard = ({ word, onDelete, onEdit, opacity, rotation, disabled }: FlipCardProps) => {
  const [isRotated, setIsRotated] = useState(false);
  const classes = useStyles();
  const onClick = () => setIsRotated(state => !state);

  const flipCardFrontStyles: CSSProperties = {
    transform: isRotated ? rotateX180 : rotateX0
  };

  const flipCardBackStyles: CSSProperties = {
    transform: isRotated ? rotateX0 : rotateX180
  };

  return (
    <div className={classes.flipCard} onClick={disabled === undefined || !disabled ? onClick : undefined}>
      <div className={classes.flipCardContainer}>
        <div className={classes.flipCardFront} style={flipCardFrontStyles}>
          <Card opacity={opacity} rotation={rotation}>
            {word.frontSide}
          </Card>
        </div>
        <div className={classes.flipCardBack} style={flipCardBackStyles}>
          <Card>{word.backSide}</Card>
        </div>
        {(disabled === undefined || !disabled) ?
          <div className={classes.flipCardButtonsContainer}>
            {onDelete ?
            <button className={classes.flipCardButton} onClick={onDelete} type="button">Delete</button>
            : undefined}
            {onEdit ?
            <button className={classes.flipCardButton} onClick={onEdit} type="button">Edit</button>
            : undefined}
          </div> : undefined}
      </div>
    </div>
  );
};
