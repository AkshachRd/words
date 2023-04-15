import { useSelectStore } from "../../../words/src/context";
import { shuffleArray } from "../services";
import { WritingTrainer } from "./WritingTrainer";

export const CardTrainer = () => {
  const [{ words }] = useSelectStore();
  const shuffledWords = shuffleArray(words);

  return <WritingTrainer words={shuffledWords} />;
};
