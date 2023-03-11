import { useCallback, useState } from "react";
import { createUseStyles } from "react-jss";
import { Button, CardList, Colors, FontWeight, useLocalStorage, WordsContext, type Word } from "words-ui";

const useStyles = createUseStyles({
  text: { color: Colors.info, fontWeight: FontWeight.bold },
});

const App = () => {
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [words, setWords] = useLocalStorage<Word[]>("WORDS", []);

  const onClick = useCallback(() => {
    setWords([{ backSide: "word", frontSide: "word", id: "1" }]);
    setCount(count + 1);
  }, [setWords, setCount, count]);

  return (
    <WordsContext.Provider value={words}>
      <p className={classes.text}>You clicked {count} times</p>
      <Button onClick={onClick} text="Click on me" />
      <CardList words={words} />
    </WordsContext.Provider>
  );
};

export default App;
