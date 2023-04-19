export const Colors = {
  Background: "white",
  Border: "black",
  Error: "#fb6c55",
  Primary: "#ffc002",
  Success: "green",
} as const;

export type Colors = (typeof Colors)[keyof typeof Colors];
