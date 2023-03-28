import { useCallback, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { Button, CardList, CardTrainer, Header, useLocalStorage, type Word } from "words-ui";
import { StoreProvider } from "./context";
import { setPageAction, useStore } from "./services/Store";
import { Pages } from "./types/Pages";

const useStyles = createUseStyles({
  "@global": {
    body: {
      margin: 0
    }
  },
  app: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    minHeight: "100vh",
    overflow: "hidden",
  }
});

const App = () => {
  const [words, setWordsToLocalStorage] = useLocalStorage<Word[]>("WORDS", []);
  const store = useStore({page: "CARD_LIST", words});
  const classes = useStyles();
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
    <div className={classes.app}>
      <StoreProvider store={store}>
        {state.page === Pages.CardList &&
          <>
            <Header>
              <Button onClick={onClickCardTrainer} text="Card trainer" />
            </Header>
            <CardList />
          </>
        }
        {state.page === Pages.CardTrainer && <CardTrainer onCancel={onClickCardList}/>}
      </StoreProvider>
    </div>
  );
};

export default App;
