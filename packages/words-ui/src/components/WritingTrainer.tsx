import { animated, useSpring, useTransition } from "@react-spring/web";
import { useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import type { Word } from "words-ui/src/types";
import { Colors } from "../theme";
import { FlipCard } from "./FlipCard";

type WritingTrainerProps = {
  words: Word[];
};

const useStyles = createUseStyles({
  writingTrainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: "inherit",
  },
  writingTrainerContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    fontSize: 30,
    gap: 20,
    width: "50%",
  },
  writingTrainerContentWrongAnswerHighlight: {
    color: "red",
  },
  writingTrainerInput: {
    "&::placeholder": {
      color: "black",
    },
    "&:focus": {
      outline: "none",
    },
    appearance: "none",
    border: "none",
    caretColor: "black",
    color: "transparent",
    fontSize: "inherit",
    width: "100%",
  },
  writingTrainerInputContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    width: "100%",
  },
  writingTrainerInputContent: {
    left: 0,
    position: "absolute",
  },
  writingTrainerInputWrapper: {
    position: "relative",
    width: "100%",
  },
  writingTrainerUnderline: {
    borderRadius: ".4em",
    borderTop: `.4em solid ${Colors.Primary}`,
    width: "100%",
  },
});

// eslint-disable-next-line max-lines-per-function
export const WritingTrainer = ({ words }: WritingTrainerProps) => {
  const classes = useStyles();
  const contentRef = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<-1 | 1>(1);
  const currentWord = words[index];
  const [value, setValue] = useState<string>("");

  const [{ y, borderColor }, api] = useSpring(() => ({
    config: {
      friction: 10,
      mass: 1,
      tension: 1000,
    },
    from: {
      borderColor: `${Colors.Primary}`,
      y: 0,
    },
  }));

  const transitions = useTransition(index, {
    config: {
      friction: 26,
      tension: 300,
    },
    enter: { x: 0 },
    exitBeforeEnter: true,
    from: { x: window.innerWidth },
    leave: { x: window.innerWidth * direction },
  });

  const valueSample = currentWord?.backSide;

  const handleTraining = () => {
    if (valueSample === undefined) return;
    const chars = [...value];
    let wasError = false;

    if (valueSample.length !== value.length) {
      wasError = true;
    }

    const newValue = chars
      .map((char, index) => {
        if (char !== valueSample[index]) {
          wasError = true;

          return `<span class=${classes.writingTrainerContentWrongAnswerHighlight}>${char}</span>`;
        }
        return char;
      })
      .join("");

    if (!contentRef.current) throw new Error("contentRef is not assigned");
    contentRef.current.innerHTML = newValue;
    if (wasError) {
      api.start({ borderColor: Colors.Error, y: y.get() === 1 ? 0 : 1 });

      return;
    }

    api.start({ to: { borderColor: Colors.Success } });
    setTimeout(() => {
      setDirection(-1);
      setIndex(state => (state + 1) % words.length);
      setValue("");
      api.start({ to: { borderColor: Colors.Primary } });
    }, 500);
  };

  const setPreviousCard = () => {
    setDirection(1);
    setIndex(state => {
      if (state === 0) {
        return words.length - 1;
      }
      return (state - 1) % words.length;
    });
  };

  const setNextCard = () => {
    setDirection(-1);
    setIndex(state => (state + 1) % words.length);
  };

  return (
    <div className={classes.writingTrainer}>
      <button onClick={setPreviousCard} type="button">
        {"<-"}
      </button>
      {currentWord === undefined ? (
        <p>Congratulations!</p>
      ) : (
        transitions(style => (
          <animated.div className={classes.writingTrainerContainer} style={{ ...style }}>
            <FlipCard word={currentWord} />
            <div className={classes.writingTrainerInputContainer}>
              <div className={classes.writingTrainerInputWrapper}>
                <input
                  className={classes.writingTrainerInput}
                  onChange={event => setValue(event.target.value)}
                  placeholder="Type here..."
                  type="text"
                />
                <span className={classes.writingTrainerInputContent} ref={contentRef}>
                  {value}
                </span>
              </div>
              <button onClick={handleTraining} type="button">
                Check
              </button>
            </div>
            <animated.span
              className={classes.writingTrainerUnderline}
              style={{
                transform: y
                  .to({
                    range: [0, 0.25, 0.5, 0.75, 1],
                    output: [0, 5, 0, -5, 0],
                  })
                  .to(y => `translateY(${y}px)`),
                borderColor,
              }}
            />
          </animated.div>
        ))
      )}
      <button onClick={setNextCard} type="button">
        {"->"}
      </button>
    </div>
  );
};
