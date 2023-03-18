import { createContext } from "react";
import type { useStore } from "../services/Store";

const initialValue: ReturnType<typeof useStore> = [{page: "CARD_LIST", words: []}, () => {}];

export const WordsContext = createContext<ReturnType<typeof useStore>>(initialValue);
