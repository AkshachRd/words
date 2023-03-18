import { createContext, useContext } from "react";
import { Functions } from "../../services/Functions";
import type { Store } from "../../services/Store";

const initialValue: Store = [{ page: "CARD_LIST", words: [] }, Functions.empty];
// eslint-disable-next-line @typescript-eslint/naming-convention
export const StoreContext = createContext<Store>(initialValue);

export const useSelectStore = () => useContext(StoreContext);
