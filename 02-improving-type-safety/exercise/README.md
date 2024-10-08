# Exercise: Lib for a Library 📚

> **Section 2: Improving Type Safety**

In this exercise, we'll be creating a library with the following function:

- `describeItem(item: LibraryItem): void`

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
