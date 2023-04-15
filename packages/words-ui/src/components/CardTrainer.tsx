import { WritingTrainer } from "../../../words/src/components/WritingTrainer";
import { useSelectStore } from "../../../words/src/context";
import { shuffleArray } from "../services";

export const CardTrainer = () => {
  const [{ words }] = useSelectStore();
  const shuffledWords = shuffleArray(words);

  return <WritingTrainer words={shuffledWords} />;
};
