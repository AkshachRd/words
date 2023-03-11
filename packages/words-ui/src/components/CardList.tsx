import Card from "words-ui/src/components/Card";
import type { Word } from "words-ui/src/types/word";

type CardListProps = {
    words: Word[];
};

export const CardList = ({words}: CardListProps) => (
        <>
            {words.map((word) => (
                <Card key={word.id}>
                <p>{word.frontSide}</p>
                <br />
                <p>{word.backSide}</p>
                </Card>
            ))}
            <Card>
                +
            </Card>
        </>
    );