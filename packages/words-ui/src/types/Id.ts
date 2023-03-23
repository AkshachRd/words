export type Id = string;

export const isId = (id: unknown): id is Id  => typeof id === "string";