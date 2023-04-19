import { animated, useSpring } from "@react-spring/web";
import { useState, type MouseEvent } from "react";
import { createUseStyles } from "react-jss";
import { Colors } from "../theme";

type DirectionButtonProps = {
  direction: "left" | "right";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const directionButtonWidth = 70;
const directionButtonScale = 1.1;
const directionButtonScaleMargin = (-directionButtonWidth * (directionButtonScale - 1)) / 2;

const useStyles = createUseStyles({
  directionButton: {
    appearance: "none",
    backgroundColor: Colors.Primary,
    border: "none",
    borderRadius: 20,
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    height: 200,
    outline: "none",
    position: "relative",
    width: directionButtonWidth,
  },
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
  directionButtonDirection: ({ direction }: DirectionButtonProps) => ({
    transform: `scaleX(${direction === "left" ? -1 : 1})`,
  }),
});

export const DirectionButton = (props: DirectionButtonProps) => {
  const { direction, onClick } = props;
  const classes = useStyles(props);
  const [isScaled, setIsScaled] = useState(false);
  const directionNumber = direction === "left" ? -1 : 1;

  const styles = useSpring({
    from: {
      scale: 1,
      x: 0,
    },
    to: {
      scale: isScaled ? directionButtonScale : 1,
      x: isScaled ? directionButtonScaleMargin * directionNumber : 0,
    },
  });

  return (
    <animated.div onMouseEnter={() => setIsScaled(true)} onMouseLeave={() => setIsScaled(false)} style={{ ...styles }}>
      <button
        className={`${classes.directionButton} ${classes.directionButtonDirection}`}
        onClick={onClick}
        type="button"
      >
        <div className={classes.directionButtonArrow} />
      </button>
    </animated.div>
  );
};
