import { createContext } from "react";
import type { Word } from "words-ui/src/types/word";

export const WordsContext = createContext<Word[]>([]);