import { createUseStyles } from "react-jss";
import { Colors } from "../theme";
import { Button } from "./Button";

type CloseButtonProps = {
  onClick?: () => void;
};

const useStyles = createUseStyles({
  closeButton: {
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
    position: "relative",
    width: 45,
  },
});

export const CloseButton = ({ onClick }: CloseButtonProps) => {
  const classes = useStyles();

  return (
    <Button background={Colors.Background} onClick={onClick}>
      <div className={classes.closeButton} />
    </Button>
  );
};
