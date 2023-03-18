import { useCallback, useEffect, useMemo } from "react";
import { Button, CardList, CardTrainer, useLocalStorage, type Word } from "words-ui";
import { WordsContext } from "./context";
import { setPageAction, useStore } from "./services/Store";
import { Pages } from "./types/Pages";

const App = () => {
  const [words, setWordsToLocalStorage] = useLocalStorage<Word[]>("WORDS", []);
  const [state, dispatchToStore] = useStore({page: "CARD_LIST", words});

  const onClickCardList = useCallback(() => {
    dispatchToStore(setPageAction(Pages.CardList));
  }, [dispatchToStore]);

  const onClickCardTrainer = useCallback(() => {
    dispatchToStore(setPageAction(Pages.CardTrainer));
  }, [dispatchToStore]);

  useEffect(() => {
    setWordsToLocalStorage(state.words);
  }, [state.words]);

  const contextValue = useMemo<ReturnType<typeof useStore>>(() => (
    [{...state, words: [...state.words]}, dispatchToStore]
  ), [state, dispatchToStore]);

  return (
    <WordsContext.Provider value={contextValue}>
      <Button onClick={onClickCardList} text="Card list" />
      <Button onClick={onClickCardTrainer} text="Card trainer" />
      {state.page === Pages.CardList && <CardList />}
      {state.page === Pages.CardTrainer && <CardTrainer/>}
    </WordsContext.Provider>
  );
};

export default App;
