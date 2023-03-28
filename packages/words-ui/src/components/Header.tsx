import type { ReactNode } from "react";
import { createUseStyles } from "react-jss";

type HeaderProps = {
  children?: ReactNode;
};

const useStyles = createUseStyles({
  header: {
    display: "flex",
    flex: "0 1 5vh",
  }
});

export const Header = ({children}: HeaderProps) => {
  const classes = useStyles();

  return (
    <div className={classes.header}>{children}</div>
  )
};