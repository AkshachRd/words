import type { MouseEvent } from "react";
import { createUseStyles } from "react-jss";
import { Colors } from "../theme";

type DirectionButtonProps = {
  direction: "left" | "right";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const useStyles = createUseStyles({
  directionButton: ({ direction }: DirectionButtonProps) => ({
    "&:hover": {
      transform: `scale(1.2) scaleX(${direction === "left" ? -1 : 1})`,
    },
    appearance: "none",
    backgroundColor: Colors.Primary,
    border: "none",
    borderRadius: 20,
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    height: 200,
    outline: "none",
    position: "relative",
    transform: `scaleX(${direction === "left" ? -1 : 1})`,
    width: 70,
  }),
  directionButtonArrow: {
    "&:after": {
      boxShadow: "0 3px 5px rgba(0, 0, 0, .2)",
      top: 7,
      transform: "rotate(-45deg)",
    },
    "&:before": {
      top: -7,
      transform: "rotate(45deg)",
    },
    "&:before, &:after": {
      backgroundColor: Colors.Background,
      content: '" "',
      height: 10,
      position: "absolute",
      right: -6,
      width: "60%",
    },
    backgroundColor: Colors.Background,
    boxShadow: "0 3px 5px rgba(0, 0, 0, .2)",
    height: 10,
    left: "calc(50% - 4px)",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
  },
});

export const DirectionButton = (props: DirectionButtonProps) => {
  const { onClick } = props;
  const classes = useStyles(props);

  return (
    <button className={classes.directionButton} onClick={onClick} type="button">
      <div className={classes.directionButtonArrow} />
    </button>
  );
};
