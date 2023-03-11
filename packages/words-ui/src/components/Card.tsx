import type { ReactNode } from "react";
import { createUseStyles } from "react-jss";
type RuleNames = "card";

type CardProps = {
    children?: ReactNode;
    rotation?: number;
    opacity?: number;
}

const useStyles = createUseStyles<RuleNames, CardProps>({
    card: ({rotation, opacity}) => ({
        backgroundColor: "#ffc002",
        borderRadius: 40,
        color: "white",
        height: 350,
        opacity: opacity ?? 1,
        transform: `rotate(${rotation ?? 0}deg)`,
        width: 500,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    }),
});

export const Card = ({children, ...props}: CardProps) => {
    const classes = useStyles(props);

    return (
        <div className={classes.card}>
            {children}
        </div>
    );
};