import type { MouseEvent, ReactNode } from "react";
import { createUseStyles } from "react-jss";
import { Colors } from "../theme";

type ButtonProps = {
  background?: Colors;
  color?: Colors;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  width?: number | string;
  height?: number | string;
  children: ReactNode;
};

const useStyles = createUseStyles({
  button: ({ background, width, height, color }: ButtonProps) => ({
    "&:hover": {
      transform: "scale(1.1)",
      transition: "transform 0.2s ease-out",
    },
    "&:focus": {
      outline: "none",
    },
    appearance: "none",
    background: background ?? Colors.Primary,
    border: "3px solid black",
    borderRadius: 10,
    boxShadow: "0 3px 5px rgba(0, 0, 0, .2)",
    color: color ?? Colors.Border,
    cursor: "pointer",
    fontWeight: "bold",
    height,
    width,
  }),
});

export const Button = (props: ButtonProps) => {
  const { children, onClick } = props;
  const classes = useStyles(props);

  return (
    <button className={classes.button} onClick={onClick} type="button">
      {children}
    </button>
  );
};
