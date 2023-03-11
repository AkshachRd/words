import { useState } from "react";

export const useLocalStorage = <S>(key: string, initialValue: S): [S, (value: S | ((value: S) => S)) => void] => {
    const [storedValue, setStoredValue] = useState<S>(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);

            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);

            return initialValue;
        }
    });

    const setValue = (value: S | ((value: S) => S)): void => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            console.log(valueToStore)
            setStoredValue(valueToStore);
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
};