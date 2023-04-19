import { createUseStyles } from "react-jss";
import { Button, Colors, FontSize } from "words-ui";
import { Trainers } from "../../../words/src/types";

type TrainingMenuProps = {
  onSelect: (trainer: Trainers) => void;
};

const useStyles = createUseStyles({
  trainingMenu: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    minHeight: "inherit",
  },
  trainingMenuContainer: {
    alignItems: "center",
    border: `10px solid ${Colors.Border}`,
    borderRadius: 40,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: 20,
  },
  trainingMenuTitle: {
    fontSize: FontSize.Big,
  },
});

export const TrainingMenu = ({ onSelect }: TrainingMenuProps) => {
  const classes = useStyles();

  return (
    <div className={classes.trainingMenu}>
      <div className={classes.trainingMenuContainer}>
        <span className={classes.trainingMenuTitle}>Trainers</span>
        <Button background={Colors.Background} height={100} onClick={() => onSelect(Trainers.Writing)} width={200}>
          Writing
        </Button>
      </div>
    </div>
  );
};
