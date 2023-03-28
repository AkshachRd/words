import { useState } from "react";
import { createUseStyles } from "react-jss";
import { useSelectStore } from "../../../words/src/context";
import { useKeyPress } from "../hooks/useKeyPress";
import { shuffleArray } from "../services";
import { getRandomNumber } from "../services/GetRandomNumber";
import type { Word } from "../types";
import { FlipCard } from "./FlipCard";
import { ProgressBar } from "./ProgressBar";

type RuleNames = "cardTrainer" |
                 "cardTrainerClose" |
                 "cardTrainerContainer" |
                 "cardTrainerElement" |
                 "cardTrainerHeader" |
                 "cardTrainerProgressBar";

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
  cardTrainerElement: {
    left: `${centerShift}%`,
    position: "absolute",
    top: `${centerShift}%`,
    transform: `translate(-50%, calc(-50% - ${headerHeight}))`,
  },
  cardTrainerHeader: {
    alignItems: "center",
    display: "flex",
    flex: `0 1 ${headerHeight}`,
    justifyContent: "space-between",
  },
  cardTrainerProgressBar: {
    flex: "0 1 auto",
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

  const [shuffledWords, setShuffledWords] = useState<BackgroundWord[]>(shuffleArray(words).map((word) => ({
    ...word,
    leftShift: getRandomNumber(-shuffleShift, shuffleShift, 0),
    rotation: getRandomNumber(-rotationRange, rotationRange, 0),
    topShift: getRandomNumber(-shuffleShift, shuffleShift, 0),
  })));

  useKeyPress(["ArrowLeft"], () => {
    setShuffledWords((state) => state.slice(1));
  });
  useKeyPress(["ArrowRight"], () => {
    setShuffledWords((state) => {
      const [first] = state;
      if (first === undefined) {
        return state;
      }
      return [...state.slice(1), first];
    });
  });
  const [firstWord, ...backgroundWords] = shuffledWords;

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
        {firstWord ? <div className={classes.cardTrainerElement}><FlipCard word={firstWord} /></div> : undefined}
      </div>
      <div className={classes.cardTrainerProgressBar}>
        <ProgressBar completed={100 - shuffledWords.length/words.length*100} />
      </div>
    </div>
  )
};