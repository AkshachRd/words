export type Word = {
  backSide: string;
  frontSide: string;
  id: string;
};

export const isWord = (word: Word | any): word is Word => (
  word.id !== undefined && word.frontSide !== undefined && word.backSide !== undefined
);