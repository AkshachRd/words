import { useState } from "react";
import { createUseStyles } from "react-jss";
import type { Word } from "words-ui";
import { Button, CardList, Colors, FontWeight, useLocalStorage } from "words-ui";
import { WordsContext } from "words-ui/src/context/WordsContext";

const useStyles = createUseStyles({
  text: { color: Colors.info, fontWeight: FontWeight.bold },
});

const App = () => {
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [words, setWords] = useLocalStorage<Word[]>("WORDS", []);

  const onClick = () => {
    console.log(words);
  };

  return (
    <WordsContext.Provider value={words}>
      <p className={classes.text}>You clicked {count} times</p>
      <Button onClick={onClick} text="Click on me" />
      <CardList words={words} />
    </WordsContext.Provider>
  );
};

export default App;
