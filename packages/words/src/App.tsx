import { useCallback, useEffect } from "react";
import { Button, CardList, CardTrainer, useLocalStorage, type Word } from "words-ui";
import { StoreProvider } from "./context";
import { setPageAction, useStore } from "./services/Store";
import { Pages } from "./types/Pages";

const App = () => {
  const [words, setWordsToLocalStorage] = useLocalStorage<Word[]>("WORDS", []);
  const store = useStore({page: "CARD_LIST", words});
  const [state, dispatchToStore] = store;

  const onClickCardList = useCallback(() => {
    dispatchToStore(setPageAction(Pages.CardList));
  }, [dispatchToStore]);

  const onClickCardTrainer = useCallback(() => {
    dispatchToStore(setPageAction(Pages.CardTrainer));
  }, [dispatchToStore]);

  useEffect(() => {
    setWordsToLocalStorage(state.words);
  }, [state.words]);

  return (
    <StoreProvider store={store}>
      <Button onClick={onClickCardList} text="Card list" />
      <Button onClick={onClickCardTrainer} text="Card trainer" />
      {state.page === Pages.CardList && <CardList />}
      {state.page === Pages.CardTrainer && <CardTrainer/>}
    </StoreProvider>
  );
};

export default App;
