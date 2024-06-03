import {
  book,
  album,
  movie,
  show,
  type Book,
  type Album,
  type Movie,
  type Show,
  type LibraryItem,
} from "./data.js";

import { fetchApiData } from "./utils.js";

function isBook(item: LibraryItem): item is Book {
  return item.type === "book";
}

function isAlbum(item: LibraryItem): item is Album {
  return item.type === "album";
}

function isMovie(item: LibraryItem): item is Movie {
  return item.type === "movie";
}

function isShow(item: LibraryItem): item is Show {
  return item.type === "show";
}

function describeLibraryItem(item: LibraryItem) {
  if (isBook(item)) {
    console.log(
      `- ${item.title} is a book written by ${item.author}, and published in ${item.published}.`
    );
  } else if (isAlbum(item)) {
    console.log(
      `- ${item.title} is an album by the artist ${item.artist}, released in ${item.released}`
    );
  } else if (isMovie(item)) {
    console.log(
      `- ${item.title} is a movie directed by ${item.director}, released in ${item.released}`
    );
  } else if (isShow(item)) {
    console.log(
      `- ${item.title} is a show directed by ${item.director}, released in ${item.released}`
    );
  } else {
    console.error("Error: Unrecognised library item!");
  }
}

describeLibraryItem(book);
describeLibraryItem(album);
describeLibraryItem(movie);
describeLibraryItem(show);

function assertIsMovie(item: LibraryItem): asserts item is Movie {
  if (item.type !== 'movie') {
    throw new Error(`This item is not a Movie: ${item.title}`);
  }
}

async function getMovieById(id: Movie['id']) {
  const apiData = await fetchApiData();

  const movie = apiData.find((item: LibraryItem) => item.id === id);

  if (!movie) {
    throw new Error('Movie not found');
  }

  assertIsMovie(movie);

  return movie;
}

const movieDetails = await getMovieById(movie.id);

console.log(movieDetails);
