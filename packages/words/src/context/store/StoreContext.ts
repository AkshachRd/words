import { createContext, useContext } from "react";
import * as Functions from "../../services/Functions";
import type { Store } from "../../services/Store";

const initialValue: Store = [{ page: "CARD_LIST", words: [] }, Functions.empty];

export const StoreContext = createContext<Store>(initialValue);

export const useSelectStore = () => useContext(StoreContext);
