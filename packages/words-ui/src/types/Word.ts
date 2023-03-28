import { v4 } from "uuid";

export type Word = {
  backSide: string;
  frontSide: string;
  id: string;
};

type WordCreate = Omit<Word, "id">;

export const createWord = ({...wordCreate}: WordCreate): Word => ({
  id: v4(),
  ...wordCreate
});

export const isWord = (word: unknown): word is Word =>
  word !== null &&
  typeof word === "object" &&
  "id" in word &&
  "frontSide" in word &&
  "backSide" in word &&
  typeof word.id === "string";