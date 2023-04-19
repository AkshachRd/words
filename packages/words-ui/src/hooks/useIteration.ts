/* eslint-disable functional/no-expression-statements */
/* eslint-disable functional/no-loop-statements */
/* eslint-disable functional/no-let */
import { useState } from "react";

export const useIteration = (
  array: unknown[]
): [
  number | undefined,
  { getNextIter: (excludeArray?: number[]) => void; getPreviousIter: (excludeArray?: number[]) => void }
] => {
  const [index, setIndex] = useState<number | undefined>(0);

  const getPreviousIter = (excludeArray: number[] = []) =>
    setIndex(state => {
      if (state === undefined) {
        return state;
      }

      let previousIndex: number = state === 0 ? array.length - 1 : (state - 1) % array.length;

      while (excludeArray.includes(previousIndex)) {
        if (array.length === excludeArray.length) {
          // eslint-disable-next-line consistent-return
          return;
        }

        previousIndex = previousIndex === 0 ? array.length - 1 : (state - 1) % array.length;
      }

      return previousIndex;
    });

  const getNextIter = (excludeArray: number[] = []) =>
    setIndex(state => {
      if (state === undefined) {
        return state;
      }
      let nextIndex: number = (state + 1) % array.length;
      while (excludeArray.includes(nextIndex)) {
        if (array.length === excludeArray.length) {
          // eslint-disable-next-line consistent-return
          return;
        }

        nextIndex = (nextIndex + 1) % array.length;
      }

      return nextIndex;
    });

  return [index, { getNextIter, getPreviousIter }];
};
