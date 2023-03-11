import type { ReactNode } from "react";
import { createUseStyles } from "react-jss";
type RuleNames = "card";

type CardProps = {
  children?: ReactNode;
  opacity?: number;
  rotation?: number;
};

const useStyles = createUseStyles<RuleNames, CardProps>({
  card: ({ rotation, opacity }) => ({
    alignItems: "center",
    backgroundColor: "#ffc002",
    borderRadius: 40,
    color: "white",
    display: "flex",
    flexDirection: "column",
    height: 350,
    justifyContent: "center",
    opacity: opacity ?? 1,
    transform: `rotate(${rotation ?? 0}deg)`,
    width: 500,
  }),
});

export const Card = ({ children, ...props }: CardProps) => {
  const classes = useStyles(props);

  return <div className={classes.card}>{children}</div>;
};
