import { createUseStyles } from "react-jss";
import { useSelectStore } from "../../../words/src/context";
import { shuffleArray } from "../services";
import { getRandomNumber } from "../services/GetRandomNumber";
import { FlipCard } from "./FlipCard";

type RuleNames = "cardTrainer" | "cardTrainerElement";

const useStyles = createUseStyles<RuleNames>({
  cardTrainer: {
    position: "relative",
  },
  cardTrainerElement: {
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, 50%)",
  }
});

export const CardTrainer = () => {
  const [{words}, _] = useSelectStore();
  const classes = useStyles();
  const shuffledWords = shuffleArray(words);
  const firstWord = shuffledWords[0];
  const backgroundWords = shuffledWords.slice(1, words.length)

  return (
    <div className={classes.cardTrainer}>
      {backgroundWords.map((word) => {
        const styles = {
          left: `${50 + getRandomNumber(-5, 5, 0)}%`,
          top: `${50 + getRandomNumber(-5, 5, 0)}%`,
        };

        return (
          <div className={classes.cardTrainerElement} key={word.id} style={styles}>
            <FlipCard disabled opacity={0.5} rotation={getRandomNumber(-20, 20, 0)} word={word} />
          </div>
        )
      })}
      {firstWord ? <div className={classes.cardTrainerElement}><FlipCard word={firstWord} /></div> : undefined}
    </div>
  )
};