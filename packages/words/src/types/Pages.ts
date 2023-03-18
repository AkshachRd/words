export const Pages = {
  CardList: "CARD_LIST",
  CardTrainer: "CARD_TRAINER",
} as const;

export type Pages = typeof Pages[keyof typeof Pages];

export const isPage = (page: any): page is Pages => Object.values(Pages).includes(page as Pages);