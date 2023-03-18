import { useCallback, useState } from "react";

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
      // eslint-disable-next-line no-console
      console.error(error);

      return initialValue;
    }
  });

  const setValue = useCallback((value: S | ((value: S) => S)): void => {
    // eslint-disable-next-line functional/no-try-statements
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }, [storedValue, key]);

  return [storedValue, setValue];
};
