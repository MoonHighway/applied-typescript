import { type Brand } from "./utils.js";

export interface Book {
  type: "book";
  id: string;
  title: string;
  published: number;
  author: string;
}

export interface Album {
  type: "album";
  id: string;
  title: string;
  released: number;
  artist: string;
}

export interface MotionPicture {
  id: unknown;
  title: string;
  released: number;
  director: string;
}

export interface Movie extends MotionPicture {
  type: "movie";
  id: Brand<string, "MovieId">;
}

export interface Show extends MotionPicture {
  type: "show";
  id: Brand<string, "ShowId">;
}

export type LibraryItem = Book | Album | Movie | Show;

export const book: Book = {
  type: "book",
  id: "82f7c297-40ec-4e9f-90b0-a12f2b4980c1",
  title: "To Kill a Mockingbird",
  published: 1960,
  author: "Harper Lee",
};

export const album: Album = {
  type: "album",
  id: "1dc8dd44-245e-4a5f-b1b6-8c02fd2a9dc1",
  title: "The Dark Side of the Moon",
  released: 1973,
  artist: "Pink Floyd",
};

export const movie: Movie = {
  type: "movie",
  id: "f928756a-d3d9-4db3-92ea-88100d03af47" as Movie["id"],
  title: "Point Break",
  released: 1991,
  director: "Kathryn Bigelow",
};

export const show: Show = {
  type: "show",
  id: "c9a7b229-b48f-4407-a267-45ff7fe8ea60" as Show["id"],
  title: "Westworld",
  released: 2016,
  director: "Jonathan Nolan",
};
