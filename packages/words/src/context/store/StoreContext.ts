import { createContext } from "react";
import type { Store } from "../../services/Store";

const initialValue: Store = [{page: "CARD_LIST", words: []}, () => {}];
export const StoreContext = createContext<Store>(initialValue);