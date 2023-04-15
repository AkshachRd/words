import type { ReactNode } from "react";
import { createUseStyles } from "react-jss";
import { Colors } from "../theme";

type CardProps = {
  children?: ReactNode;
  opacity?: number;
  rotation?: number;
};

const useStyles = createUseStyles({
  card: ({ rotation, opacity }: CardProps) => ({
    alignItems: "center",
    backgroundColor: Colors.Primary,
    borderRadius: 40,
    color: "white",
    display: "flex",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
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
