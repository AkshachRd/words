export type Word = {
  backSide: string;
  frontSide: string;
  id: string;
};

export const isWord = (word: unknown): word is Word =>
  word !== null &&
  typeof word === "object" &&
  "id" in word &&
  "frontSide" in word &&
  "backSide" in word &&
  typeof word.id === "string";
