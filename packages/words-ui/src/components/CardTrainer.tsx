import { useState, type DragEvent } from "react";
import { createUseStyles } from "react-jss";
import { useSelectStore } from "../../../words/src/context";
import { useKeyPress } from "../hooks";
import { shuffleArray } from "../services";
import { getRandomNumber } from "../services/GetRandomNumber";
import type { Word } from "../types";
import { FlipCard } from "./FlipCard";
import { ProgressBar } from "./ProgressBar";

type RuleNames = "cardTrainer" | "cardTrainerClose" | "cardTrainerContainer" | "cardTrainerDrag" |
"cardTrainerDragActive" | "cardTrainerElement" | "cardTrainerElementActive" | "cardTrainerHeader" |
"cardTrainerLeft" | "cardTrainerProgressBar" | "cardTrainerRight";

const centerShift = 50;
const shuffleShift = 5;
const rotationRange = 20;
const backgroundCardOpacity = 0.5;
const headerHeight = "60px";

const useStyles = createUseStyles<RuleNames>({
  cardTrainer: {
    display: "flex",
    flex: "1 1 auto",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  cardTrainerClose: {
    "&:after": {
      transform: "rotate(-45deg)",
    },
    "&:before": {
      transform: "rotate(45deg)",
    },
    "&:before, &:after": {
      backgroundColor: "#333",
      borderRadius: 6,
      content: '" "',
      height: 45,
      left: 19,
      position: "absolute",
      width: 6,
    },
    "&:hover": {
      opacity: 1,
    },
    height: 45,
    opacity: 0.3,
    position: "absolute",
    right: 45,
    width: 45,
  },
  cardTrainerContainer: {
    flex: "1 1 auto",
    height: "100%",
    position: "relative",
    width: "100%",
  },
  cardTrainerDrag: {
    height: "100%",
    opacity: 0,
    pointerEvents: "none",
    position: "absolute",
    transition: "opacity .3s ease",
    width: "50%",
  },
  cardTrainerDragActive: {
    opacity: 0.5,
  },
  cardTrainerElement: {
    left: `${centerShift}%`,
    position: "absolute",
    top: `${centerShift}%`,
    transform: `translate(-50%, calc(-50% - ${headerHeight}))`,
  },
  cardTrainerElementActive: {
    composes: "$cardTrainerElement",
  },
  cardTrainerHeader: {
    alignItems: "center",
    display: "flex",
    flex: `0 1 ${headerHeight}`,
    justifyContent: "space-between",
  },
  cardTrainerLeft: {
    backgroundColor: "red",
    composes: "$cardTrainerDrag",
    left: 0,
  },
  cardTrainerProgressBar: {
    flex: "0 1 auto",
  },
  cardTrainerRight: {
    backgroundColor: "green",
    composes: "$cardTrainerDrag",
    right: 0,
  },
});

type BackgroundWord = Word & {
  leftShift: number;
  rotation: number;
  topShift: number;
};

type CardTrainerProps = {
  onCancel: () => void;
};

export const CardTrainer = ({onCancel}: CardTrainerProps) => {
  const [{words}] = useSelectStore();
  const classes = useStyles();
  const [isDragging, setIsDragging] = useState(false);

  const [shuffledWords, setShuffledWords] = useState<BackgroundWord[]>(shuffleArray(words).map((word) => ({
    ...word,
    leftShift: getRandomNumber(-shuffleShift, shuffleShift, 0),
    rotation: getRandomNumber(-rotationRange, rotationRange, 0),
    topShift: getRandomNumber(-shuffleShift, shuffleShift, 0),
  })));

  const progress = 100 - shuffledWords.length / words.length * 100;

  const handleWordGood = () => {
    setShuffledWords((state) => state.slice(1));
  };

  const handleWordBad = () => {
    setShuffledWords((state) => {
      const [first] = state;
      if (first === undefined) {
        return state;
      }
      return [...state.slice(1), first];
    });
  };

  useKeyPress(["ArrowLeft"], handleWordBad);
  useKeyPress(["ArrowRight"], handleWordGood);
  const [firstWord, ...backgroundWords] = shuffledWords;

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.add(classes.cardTrainerDragActive);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.classList.remove(classes.cardTrainerDragActive);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    event.currentTarget.classList.remove(classes.cardTrainerDragActive);
  };

  return (
    <div className={classes.cardTrainer}>
      <div className={classes.cardTrainerHeader}>
        <p>Cards</p>
        <div className={classes.cardTrainerClose} onClick={onCancel} />
      </div>
      <div className={classes.cardTrainerContainer}>
        {backgroundWords.map((word) => {
          const styles = {
            left: `${centerShift + word.leftShift}%`,
            top: `${centerShift + word.topShift}%`,
          };

          return (
            <div className={classes.cardTrainerElement} key={word.id} style={styles}>
              <FlipCard disabled
                opacity={backgroundCardOpacity}
                rotation={word.rotation}
                word={word}
              />
            </div>
          )
        })}
        {firstWord ?
        <div
          className={classes.cardTrainerElementActive}
          draggable
          onDragEnd={() => setIsDragging(false)}
          onDragStart={() => setIsDragging(true)}
          >
            <FlipCard word={firstWord}/>
        </div> : undefined}
      </div>
      <div className={classes.cardTrainerProgressBar}>
        <ProgressBar completed={progress} />
      </div>
      <div
        className={classes.cardTrainerLeft}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={(e) => { handleDrop(e); handleWordBad(); }}
        style={isDragging ? {pointerEvents: "auto"} : undefined}
      />
      <div
        className={classes.cardTrainerRight}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={(e) => { handleDrop(e); handleWordGood(); }}
        style={isDragging ? {pointerEvents: "auto"} : undefined}
      />
    </div>
  )
};