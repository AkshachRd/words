import { useState } from "react";
import { createUseStyles } from "react-jss";
import { CloseButton, TrainingMenu, WritingTrainer } from "words-ui";
import { useSelectStore } from "../context";
import { setPageAction, shuffleArray } from "../services";
import { Trainers } from "../types";
import { Pages } from "../types/Pages";

const useStyles = createUseStyles({
  cardTrainer: {
    position: "relative",
    minHeight: "inherit",
  },
  cardTrainerCloseButton: {
    position: "absolute",
    right: 45,
    top: 45,
  },
});

export const CardTrainer = () => {
  const [{ words }, dispatch] = useSelectStore();
  const shuffledWords = shuffleArray(words);
  const [trainer, setTrainer] = useState<Trainers>(Trainers.Menu);
  const classes = useStyles();

  const handleClose = () => {
    dispatch(setPageAction(Pages.CardList));
  };

  const handleSelect = (selectedTrainer: Trainers) => {
    setTrainer(selectedTrainer);
  };

  return (
    <div className={classes.cardTrainer}>
      {
        {
          [Trainers.Writing]: <WritingTrainer words={shuffledWords} />,
          [Trainers.Menu]: <TrainingMenu onSelect={handleSelect} />,
        }[trainer]
      }
      <div className={classes.cardTrainerCloseButton}>
        <CloseButton onClick={handleClose} />
      </div>
    </div>
  );
};
