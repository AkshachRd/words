import { createUseStyles } from "react-jss";
import { FontWeight } from "../theme";

const useStyles = createUseStyles({
  button: { cursor: "pointer", fontWeight: FontWeight.bold },
});

type ButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
};

export const Button = ({ text, onClick }: ButtonProps) => {
  const classes = useStyles();

  return (
    <button className={classes.button} onClick={onClick} type="button">
      {text}
    </button>
  );
};
