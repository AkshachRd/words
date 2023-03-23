import { createUseStyles } from "react-jss";
import { useSelectStore } from "../../../words/src/context";
import { shuffleArray } from "../services";
import { getRandomNumber } from "../services/GetRandomNumber";
import { FlipCard } from "./FlipCard";

type RuleNames = "cardTrainer" | "cardTrainerElement";

const centerShift = 50;
const shuffleShift = 5;
const rotationRange = 20;
const backgroundCardOpacity = 0.5;

const useStyles = createUseStyles<RuleNames>({
  cardTrainer: {
    position: "relative",
  },
  cardTrainerElement: {
    left: `${centerShift}%`,
    position: "absolute",
    top: `${centerShift}%`,
    transform: "translate(-50%, 50%)",
  }
});

export const CardTrainer = () => {
  const [{words}] = useSelectStore();
  const classes = useStyles();
  const [firstWord, ...backgroundWords] = shuffleArray(words);

  return (
    <div className={classes.cardTrainer}>
      {backgroundWords.map((word) => {
        const styles = {
          left: `${centerShift + getRandomNumber(-shuffleShift, shuffleShift, 0)}%`,
          top: `${centerShift + getRandomNumber(-shuffleShift, shuffleShift, 0)}%`,
        };

        return (
          <div className={classes.cardTrainerElement} key={word.id} style={styles}>
            <FlipCard disabled
              opacity={backgroundCardOpacity}
              rotation={getRandomNumber(-rotationRange, rotationRange, 0)}
              word={word}
            />
          </div>
        )
      })}
      {firstWord ? <div className={classes.cardTrainerElement}><FlipCard word={firstWord} /></div> : undefined}
    </div>
  )
};