// eslint-disable-next-line @typescript-eslint/naming-convention
export const Trainers = {
  Menu: "MENU",
  Writing: "WRITING_TRAINER",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Trainers = (typeof Trainers)[keyof typeof Trainers];
