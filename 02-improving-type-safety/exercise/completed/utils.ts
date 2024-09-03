import { movie, show, book, album } from "./data.js";

export async function fetchApiData() {
  const data = [movie, show, book, album];
  const apiResponse = structuredClone(data);
  return apiResponse;
}
