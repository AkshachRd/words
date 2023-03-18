export const getRandomNumber = (min: number, max: number, decimals: number) => {
  const string = (Math.random() * (max - min) + min).toFixed(decimals);

  return Number.parseFloat(string);
}
