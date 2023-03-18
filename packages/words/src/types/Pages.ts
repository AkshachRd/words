// eslint-disable-next-line @typescript-eslint/naming-convention
export const Pages = {
  CardList: "CARD_LIST",
  CardTrainer: "CARD_TRAINER",
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Pages = (typeof Pages)[keyof typeof Pages];

export const isPage = (page: unknown): page is Pages => Object.values(Pages).includes(page as Pages);
