import { useCallback, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { Header } from "words-ui";
import { CardList, CardTrainer } from "./components";
import { StoreProvider } from "./context";
import { storage } from "./services";
import { setPageAction, useStore } from "./services/Store";
import { Pages } from "./types/Pages";

const useStyles = createUseStyles({
  "@global": {
    body: {
      margin: 0,
    },
  },
  app: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    minHeight: "100vh",
    overflow: "hidden",
  },
});

const storageKey = "WORDS";

const App = () => {
  const store = useStore({ page: Pages.CardList, words: storage.get(storageKey, []) });
  const classes = useStyles();
  const [state, dispatchToStore] = store;

  const onClickCardList = useCallback(() => {
    dispatchToStore(setPageAction(Pages.CardList));
  }, [dispatchToStore]);

  const onClickCardTrainer = useCallback(() => {
    dispatchToStore(setPageAction(Pages.CardTrainer));
  }, [dispatchToStore]);

  useEffect(() => {
    storage.set(storageKey, state.words);
  }, [state.words]);

  return (
    <div className={classes.app}>
      <StoreProvider store={store}>
        {
          {
            [Pages.CardList]: (
              <>
                <Header>
                  <button onClick={onClickCardTrainer} type="button">
                    Card trainer
                  </button>
                </Header>
                <CardList />
              </>
            ),
            [Pages.CardTrainer]: <CardTrainer />,
          }[state.page]
        }
      </StoreProvider>
    </div>
  );
};

export default App;
