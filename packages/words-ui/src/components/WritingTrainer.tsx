import { animated, useSpring, useTransition } from "@react-spring/web";
import { useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import type { Word } from "words-ui/src/types";
import { useIteration, useKeyPress } from "../hooks";
import { Colors, FontFamily, FontSize } from "../theme";
import { Button } from "./Button";
import { DirectionButton } from "./DirectionButton";
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
    position: "relative",
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
    fontFamily: FontFamily.Primary,
    fontSize: FontSize.Big,
    padding: 0,
    width: "100%",
  },
  writingTrainerInputContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    width: "100%",
  },
  writingTrainerInputContent: {
    fontFamily: FontFamily.Primary,
    fontSize: FontSize.Big,
    left: 0,
    overflow: "hidden",
    pointerEvents: "none",
    position: "absolute",
    textOverflow: "clip",
    top: "50%",
    transform: "translateY(-50%)",
    whiteSpace: "nowrap",
    width: "100%",
  },
  writingTrainerInputWrapper: {
    display: "flex",
    position: "relative",
    width: "100%",
  },
  writingTrainerUnderline: {
    borderRadius: ".4em",
    borderTop: `.4em solid ${Colors.Primary}`,
    width: "100%",
  },
});

const writingTrainerUnderlineAnimation = {
  config: {
    friction: 10,
    mass: 1,
    tension: 1000,
  },
  from: {
    borderColor: `${Colors.Primary}`,
    y: 0,
  },
};

// eslint-disable-next-line max-lines-per-function
export const WritingTrainer = ({ words }: WritingTrainerProps) => {
  const classes = useStyles();
  const contentRef = useRef<HTMLSpanElement>(null);
  const [index, { getNextIter, getPreviousIter }] = useIteration(words);
  const [isGoneIndexes, setIsGoneIndexes] = useState<number[]>([]);
  const [direction, setDirection] = useState<-1 | 1>(-1);
  const currentWord = index === undefined ? undefined : words[index];
  const [value, setValue] = useState<string>("");
  const [{ y, borderColor }, api] = useSpring(() => writingTrainerUnderlineAnimation);

  const transitions = useTransition(index, {
    config: {
      friction: 26,
      tension: 300,
    },
    enter: { x: 0 },
    exitBeforeEnter: true,
    from: { x: window.innerWidth * direction * -1 },
    leave: { x: window.innerWidth * direction },
  });

  const valueSample = currentWord?.backSide;

  const setPreviousCard = (isGone: number[] = []) => {
    setDirection(1);
    getPreviousIter(isGone);
    setValue("");
    api.start({ to: { borderColor: Colors.Primary } });
  };
  useKeyPress(["ArrowLeft"], () => setPreviousCard(isGoneIndexes));

  const setNextCard = (isGone: number[] = []) => {
    setDirection(-1);
    getNextIter(isGone);
    setValue("");
    api.start({ to: { borderColor: Colors.Primary } });
  };
  useKeyPress(["ArrowRight"], () => setNextCard(isGoneIndexes));

  const handleTraining = () => {
    if (valueSample === undefined) return;
    const valueCheck = valueSample.toLowerCase();
    const chars = [...value.toLowerCase()];
    let wasError = false;

    if (valueCheck.length !== value.length) {
      wasError = true;
    }

    const newValue = chars
      .map((char, index) => {
        if (char !== valueCheck[index]) {
          wasError = true;

          return `<span class=${classes.writingTrainerContentWrongAnswerHighlight}>${value[index]}</span>`;
        }
        return value[index];
      })
      .join("");

    if (wasError) {
      api.start({ borderColor: Colors.Error, y: y.get() === 1 ? 0 : 1 });
      if (!contentRef.current) throw new Error("contentRef is not assigned");
      contentRef.current.innerHTML = newValue;

      return;
    }

    index !== undefined && setIsGoneIndexes(state => [...state, index]);
    api.start({ to: { borderColor: Colors.Success } });
    setTimeout(() => {
      index !== undefined && setNextCard([...isGoneIndexes, index]);
    }, 500);
  };

  return (
    <div className={classes.writingTrainer}>
      <DirectionButton direction="left" onClick={() => setPreviousCard(isGoneIndexes)} />
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
              <Button background={Colors.Primary} onClick={handleTraining}>
                Check
              </Button>
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
      <DirectionButton direction="right" onClick={() => setNextCard(isGoneIndexes)} />
    </div>
  );
};
