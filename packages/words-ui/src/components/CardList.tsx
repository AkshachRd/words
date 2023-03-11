import type { Word } from "../types/Word";
import { Card } from "./Card";

type CardListProps = {
  words: Word[];
};

export const CardList = ({ words }: CardListProps) => (
  <>
    {words.map(word => (
      <Card key={word.id}>
        <p>{word.frontSide}</p>
        <br />
        <p>{word.backSide}</p>
      </Card>
    ))}
    <Card>+</Card>
  </>
);
