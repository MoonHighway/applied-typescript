# Exercise: Lib for a Library 📚

> **Section 2: Improving Type Safety**

In this exercise, we'll be creating a library with the following functions:

- `describeItem(item: LibraryItem): void`
- `getMovieById(id: Movie['id']): Promise<string>`

## Create initial types for books and albums

- In `exercise.ts`:

```typescript
export interface Book {
  id: string;
  title: string;
  published: number;
  author: string;
}

export interface Album {
  id: string;
  title: string;
  released: number;
  artist: string;
}
```

- Add type annotations to books and albums objects e.g. `const book: Book = ...`

- Create a union type:

```typescript
export type LibraryItem = Book | Album;
```

- In `exercise.ts`, add an `import` statement:

```typescript
import { book, type LibraryItem } from "./data.js";
```

- Implement the skeleton for the `describeLibraryItem()` function:

```typescript
function describeLibraryItem(item: LibraryItem) {
  // There will be type errors on this line, we'll fix them in the next steps.
  console.log(
    `- ${item.title} is a book written by ${item.author}, and published in ${item.published}.`
  );
}

describeLibraryItem(book);
```

- Create a type guard function for books which use type predicates:

```typescript
function isBook(item: LibraryItem): item is Book {
  //                                ^^^^^^^^^^^^
  //                                type predicate

  return (item as Book).published !== undefined;
}
```

- Use the type guard function in the `describeLibraryItem()` function:

```typescript
function describeLibraryItem(item: LibraryItem) {
  if (isBook(item)) {
    console.log(
      `- ${item.title} is a book written by ${item.author}, and published in ${item.published}.`
    );
  } else {
    console.error('Error: Unrecognised library item!');
  }
}
```

- Call the `describeLibraryItem()` function:

```typescript
describeLibraryItem(album);
```

- Create a type guard function for albums:

```typescript
function isAlbum(item: LibraryItem): item is Album {
  return (item as Album).artist !== undefined;
}
```

- Use `isAlbum()` to narrow the type in the `describeLibraryItem()` function:

```diff
 function describeLibraryItem(item: LibraryItem) {
   if (isBook(item)) {
     console.log(
       `- ${item.title} is a book written by ${item.author}, and  published in ${item.published}`
     );
+  } else if (isAlbum(item)) {
+    console.log(
+      `- ${item.title} is an album by the artist ${item.artist}, released in ${item.released}`
+    );
   } else {
     console.error(
       'Error: Unrecognised library item! Security have  been notified.'
     );
   }
 }
```

## Handle movies and shows

- Add movie and show types:

```typescript
export interface MotionPicture {
  id: string;
  title: string;
  released: number;
  director: string;
}

// Type aliases
export type Movie = MotionPicture;
export type Show = MotionPicture;
```

- Update the `LibraryItem` union type:

```diff
- export type LibraryItem = Book | Album;
+ export type LibraryItem = Book | Album | Movie | Show;
```

- Add type annotations to movies and shows objects e.g. `const show: Show = ...`

- Add calls to `describeLibraryItem()`, passing in a movie and a show:

```typescript
describeLibraryItem(movie);
describeLibraryItem(show);
```

- Try to implement type guard functions for movies and shows:

```typescript
function isMovie(item: LibraryItem): item is Movie {
  // `id` and `title` properties exist on all library items.
  // `released` property exists for both the `Movie` and `Show` types.
  // Oh no! There's no property which is unique between the `Movie` and `Show` types.
  return (item as Movie).??? === ???;
}
```

- It's time to add a discriminant property to our library items!

- Add a `type` property to each type in the `LibraryItem` union to make it a discriminated union:

```diff
- export type Movie = MotionPicture;
+ export interface Movie extends MotionPicture {
+   type: 'movie',
+ }

- export type Show = MotionPicture;
+ export interface Show extends MotionPicture {
+   type: 'show',
+ }

  export interface Book {
+   type: 'book',
    id: string;
    title: string;
    published: number;
  }

  export interface Album {
+   type: 'album',
    id: string;
    title: string;
    released: number;
  }
```

- Update the objects which implement these types: add a `type` property to each of them

- Finish implementing type guard functions for movies and shows:

```typescript
function isMovie(item: LibraryItem): item is Movie {
  return item.type === 'movie';
}

function isShow(item: LibraryItem): item is Show {
  return item.type === 'show';
}
```

- Update `isBook()` and `isAlbum()` type guard functions to use the `type` discriminant property:

```diff
  function isBook(item: LibraryItem): item is Book {
-   return (item as Book).published !== undefined;
+   return item.type === 'book';
  }

  function isAlbum(item: LibraryItem): item is Album {
-   return (item as Album).artist !== undefined;
+   return item.type === 'album';
  }
```

- Implement describing movies and shows in `describeLibraryItem()` function

```typescript
else if (isMovie(item)) {
  console.log(
    `- ${item.title} is a movie directed by ${item.director}, released in ${item.released}`
  );
} else if (isShow(item)) {
  console.log(
    `- ${item.title} is a show directed by ${item.director}, released in ${item.released}`
  );
}
```

## Implement `getMovieById()` function

- Create a new function in `index.ts`:

```typescript
async function getMovieById(id: string) {
  const apiData = await fetchApiData();

  const movie = apiData.find((item: LibraryItem) => item.id === id) as Movie;

  if (!movie) {
    throw new Error('Movie not found');
  }

  return movie;
}
```

- Call the `getMovieById()` function:

```typescript
const movieDetails = await getMovieById(movie.id);

console.log(movieDetails);
```

- Try out passing in `show.id`:

```diff
-const movieDetails = await getMovieById(movie.id);
+const movieDetails = await getMovieById(show.id);
```

- Create a type guard function with an assertion signature:

```typescript
function assertIsMovie(item: LibraryItem): asserts item is Movie {
  if (item.type !== 'movie') {
    throw new Error(`This item is not a Movie: ${item.title}`);
  }
}
```

- Remove type assertion and add in call to `assertIsMovie()` in the `getMovieById()` function:

```diff
-  const movie = apiData.find((item: LibraryItem) => item.id === id) as Movie;
+  const movie = apiData.find((item: LibraryItem) => item.id === id);

   if (!movie) {
     throw new Error('Movie not found');
   }

+  assertIsMovie(movie);

   return `The movie ${movie.title} was released in ${movie.released}`;
```

- There are no type errors, but we're getting a run time error.

- We can improve the type safety of this code by using branded types.

## Create branded types for movie and show IDs

- In `data.ts`, Import the `Brand` utility type:

```typescript
import { type Brand } from './utils.js';
```

- Adjust the movie and shows types:

```diff
 interface MotionPicture {
-  id: string;
+  id: unknown;
   title: string;
   released: number;
   director: string;
 }

 interface Movie extends MotionPicture {
   type: 'movie';
+  id: Brand<string, 'MovieId'>;
 }

 interface Show extends MotionPicture {
   type: 'show';
+  id: Brand<string, 'ShowId'>;
 }
```

- Update the `movie` and `show` objects:

```diff
 const movie: Movie = {
   type: 'movie',
-  id: 'f928756a-d3d9-4db3-92ea-88100d03af47',
+  id: 'f928756a-d3d9-4db3-92ea-88100d03af47' as Movie['id'],
   title: 'Inception',
   released: 2010,
   director: 'Christopher Nolan'
 };

 const show: Show = {
   type: 'show',
-  id: 'c9a7b229-b48f-4407-a267-45ff7fe8ea60',
+  id: 'c9a7b229-b48f-4407-a267-45ff7fe8ea60' as Show['id'],
   title: 'Westworld',
   released: 2016,
   director: 'Jonathan Nolan'
 };
```

- Update the type for the `id` parameter on the `getMovieById()` function:

```diff
-async function getMovieById(id: string) {
+async function getMovieById(id: Movie['id']) {
```

- We should now see type error where we're calling `getMovieById(show.id)`

- Pass the correct ID:

```diff
-const movieDetails = await getMovieById(show.id);
+const movieDetails = await getMovieById(movie.id);
```
