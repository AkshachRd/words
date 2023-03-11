import { createContext } from "react";
import type { Word } from "../types/Word";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const WordsContext = createContext<Word[]>([]);
