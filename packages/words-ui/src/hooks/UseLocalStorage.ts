import { useState } from "react";

export const useLocalStorage = <S>(key: string, initialValue: S): [S, (value: S | ((value: S) => S)) => void] => {
  const [storedValue, setStoredValue] = useState<S>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    // eslint-disable-next-line functional/no-try-statements
    try {
      const item = window.localStorage.getItem(key);

      return item === null ? initialValue : (JSON.parse(item) as S);
    } catch (error) {
      // eslint-disable-next-line functional/no-expression-statements, no-console
      console.error(error);

      return initialValue;
    }
  });

  const setValue = (value: S | ((value: S) => S)): void => {
    // eslint-disable-next-line functional/no-try-statements
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // eslint-disable-next-line functional/no-expression-statements, no-console
      console.log(valueToStore);
      // eslint-disable-next-line functional/no-expression-statements
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        // eslint-disable-next-line functional/no-expression-statements
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // eslint-disable-next-line functional/no-expression-statements, no-console
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
