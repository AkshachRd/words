export const storage = {
  get: <T>(key: string, defaultValue?: T): T => {
    const value = localStorage.getItem(key);

    return (value === null ? defaultValue : JSON.parse(value)) as T;
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
  set: (key: string, value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
};