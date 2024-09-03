import { movie, show, book, album, type LibraryItem } from "./data.js";

export async function fetchApiData(): Promise<LibraryItem[]> {
  const data: LibraryItem[] = [movie, show, book, album];
  const apiResponse = structuredClone(data);
  return apiResponse;
}

declare const __brand: unique symbol;

export type Brand<BaseType, BrandedName extends string> = BaseType & {
  [__brand]: BrandedName;
};
