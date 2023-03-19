export const shuffleArray = <T>([...array]: T[]): T[] => array.sort((a, b) => 0.5 - Math.random());
