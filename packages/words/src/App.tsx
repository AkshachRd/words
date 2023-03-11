import { useCallback, useState } from "react";
import { createUseStyles } from "react-jss";
import { Button, CardList, Colors, FontWeight, useLocalStorage, WordsContext, type Word } from "words-ui";

const useStyles = createUseStyles({
  text: { color: Colors.info, fontWeight: FontWeight.bold },
});

const App = () => {
  const classes = useStyles();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [count, setCount] = useState(0);
  const [words, setWords] = useLocalStorage<Word[]>("WORDS", []);

  const onClick = useCallback(() => {
    // eslint-disable-next-line functional/no-expression-statements
    setWords([{ backSide: "word", frontSide: "word", id: "1" }]);
  }, [setWords]);

  return (
    <WordsContext.Provider value={words}>
      <p className={classes.text}>You clicked {count} times</p>
      <Button onClick={onClick} text="Click on me" />
      <CardList words={words} />
    </WordsContext.Provider>
  );
};

export default App;
