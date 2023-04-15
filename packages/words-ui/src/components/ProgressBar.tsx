import { createUseStyles } from "react-jss";

type ProgressBarProps = {
  completed: number;
};

const useStyles = createUseStyles({
  progressBar: {
    backgroundColor: "transparent",
    height: 10,
    width: "100%",
  },
  progressBarFiller: ({ completed }: ProgressBarProps) => ({
    backgroundColor: "#36c93c",
    height: "100%",
    transition: "width 1s ease-out",
    width: `${completed}%`,
  }),
  progressBarLabel: {
    color: "white",
    fontWeight: "bold",
    padding: 5,
  },
});

export const ProgressBar = (props: ProgressBarProps) => {
  const classes = useStyles(props);

  return (
    <div className={classes.progressBar}>
      <div className={classes.progressBarFiller}>
        <span className={classes.progressBarLabel} />
      </div>
    </div>
  );
};
