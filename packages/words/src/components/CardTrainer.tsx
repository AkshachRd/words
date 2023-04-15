import { WritingTrainer } from "words-ui";
import { useSelectStore } from "../context";
import { shuffleArray } from "../services";

export const CardTrainer = () => {
  const [{ words }] = useSelectStore();
  const shuffledWords = shuffleArray(words);

  return <WritingTrainer words={shuffledWords} />;
};
