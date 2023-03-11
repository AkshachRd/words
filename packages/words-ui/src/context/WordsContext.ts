import { createContext } from "react";
import type { Word } from "../types/Word";

export const WordsContext = createContext<Word[]>([]);
