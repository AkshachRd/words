import { useMemo, type ReactNode } from "react";
import { StoreContext } from "words-ui";
import type { Store } from "../../services/Store";

type StoreProviderProps = {
  children?: ReactNode;
  store: Store;
};

export const StoreProvider = ({ store: [state, dispatch], children }: StoreProviderProps) => {
  const contextValue = useMemo<Store>(() => [{ ...state, words: [...state.words] }, dispatch], [state, dispatch]);

  return <StoreContext.Provider value={contextValue}>{children}</StoreContext.Provider>;
};
