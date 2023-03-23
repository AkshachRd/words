// eslint-disable-next-line functional/immutable-data, @typescript-eslint/no-magic-numbers
export const shuffleArray = <T>([...array]: T[]): T[] => array.sort(() => 0.5 - Math.random());
