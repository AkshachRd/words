import { useState, type CSSProperties } from "react";
import { createUseStyles } from "react-jss";
import type { Word } from "../types";
import { Card } from "./Card";

type RuleNames = "flipCard" | "flipCardBack" | "flipCardButton" | "flipCardContainer" | "flipCardFront";

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
    display: "none",
    position: "absolute",
  },
  flipCardContainer: {
    "&:hover $flipCardButton": {
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
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
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
        {onDelete && (disabled === undefined || !disabled) ?
        <button className={classes.flipCardButton} onClick={onDelete} type="button">Delete</button>
        : undefined}
        {onEdit && (disabled === undefined || !disabled) ?
        <button className={classes.flipCardButton} onClick={onEdit} style={{top: "20px"}} type="button">Edit</button>
        : undefined}
      </div>
    </div>
  );
};
