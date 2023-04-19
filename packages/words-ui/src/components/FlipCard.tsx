import { useState, type CSSProperties } from "react";
import { createUseStyles } from "react-jss";
import { Colors } from "../theme";
import type { Word } from "../types";
import { Button } from "./Button";
import { Card } from "./Card";

type FlipCardProps = {
  disabled?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
  opacity?: number;
  rotation?: number;
  word: Word;
};

const rotateX0 = "rotateX(0deg)";
const rotateX180 = "rotateX(180deg)";

const useStyles = createUseStyles({
  flipCard: ({ disabled }: FlipCardProps) => ({
    backgroundColor: "transparent",
    height: 350,
    perspective: 1000,
    userSelect: disabled === undefined || !disabled ? "auto" : "none",
    width: 500,
  }),
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
    height: "100%",
    left: 0,
    position: "absolute",
    top: 0,
    transform: rotateX0,
    transition: ".5s",
    width: "100%",
  },
});

export const FlipCard = (props: FlipCardProps) => {
  const { word, onDelete, onEdit, opacity, rotation, disabled } = props;
  const [isRotated, setIsRotated] = useState(false);
  const classes = useStyles(props);
  const onClick = () => setIsRotated(state => !state);

  const flipCardFrontStyles: CSSProperties = {
    transform: isRotated ? rotateX180 : rotateX0,
  };

  const flipCardBackStyles: CSSProperties = {
    transform: isRotated ? rotateX0 : rotateX180,
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
        {disabled === undefined || !disabled ? (
          <div className={classes.flipCardButtonsContainer}>
            {onDelete ? (
              <div className={classes.flipCardButton}>
                <Button background={Colors.Background} onClick={onDelete}>
                  Delete
                </Button>
              </div>
            ) : undefined}
            {onEdit ? (
              <div className={classes.flipCardButton}>
                <Button background={Colors.Background} onClick={onEdit}>
                  Edit
                </Button>
              </div>
            ) : undefined}
          </div>
        ) : undefined}
      </div>
    </div>
  );
};
