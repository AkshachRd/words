import { useCallback, useState } from "react";
import { createUseStyles } from "react-jss";
import type { Id, Word } from "../types";
import { Card } from "./Card";

type RuleNames = "flipCard" | "flipCardBack" | "flipCardContainer" | "flipCardFront";

type FlipCardProps = {
  disabled?: boolean;
  onDelete?: (id: Id) => void;
  onEdit?: (word: Word) => void;
  opacity?: number;
  rotation?: number;
  word: Word;
};

type Rotation = boolean;

const useStyles = createUseStyles<RuleNames, Rotation>({
  flipCard: {
    backgroundColor: "transparent",
    height: 350,
    perspective: 1000,
    width: 500,
  },
  flipCardBack: rotated => ({
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    transform: rotated === true ? "rotateX(0deg)" : "rotateX(180deg)",
    transition: ".5s",
    width: "100%",
  }),
  flipCardContainer: {
    height: "100%",
    position: "relative",
    textAlign: "center",
    transformStyle: "preserve-3d",
    transition: ".5s",
    width: "100%",
  },
  flipCardFront: rotated => ({
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    transform: rotated === true ? "rotateX(180deg)" : "rotateX(0deg)",
    transition: ".5s",
    width: "100%",
  }),
});

export const FlipCard = ({ word, onDelete, onEdit, opacity, rotation, disabled }: FlipCardProps) => {
  const [isRotated, setIsRotated] = useState(false);
  const classes = useStyles(isRotated);
  const onClick = useCallback(() => setIsRotated(state => !state), [setIsRotated]);

  return (
    <div className={classes.flipCard} onClick={disabled === undefined || disabled ? undefined : onClick}>
      <div className={classes.flipCardContainer}>
        <div className={classes.flipCardFront}>
          <Card opacity={opacity} rotation={rotation}>
            {word.frontSide}
          </Card>
        </div>
        <div className={classes.flipCardBack}>
          <Card>{word.backSide}</Card>
        </div>
      </div>
    </div>
  );
};
