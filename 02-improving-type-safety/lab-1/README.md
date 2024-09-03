# Lab 1: Show Business 🎬

> **Section 2: Improving Type Safety**

Your challenge is to improve the type safety of a new method that's been added to
the library that we created in the [Lib for a Library](../exercise/README.md)
exercise:

```typescript
function getMovieById(id: Movie["id"]): Promise<Movie>
```

You'll be working on the code in the `start` directory for this lab. It matches
the [completed code](../exercise/completed/) for the 'Lib for a Library' exercise.

It also includes a `utils.ts` script which exports a:

- **Function: `fetchApiData(): Promise<LibraryItem[]>`** — For retrieving all library items,
used in `getMovieById()`.
- **Generic type: `Brand<BaseType, BrandedName>`** — For "branding" a type to make it
structurally unique.

The new `getMovieById()` method is defined in [`start/index.ts`](./start/index.ts).

## Requirements

### Only return movies from `getMovieById()`

In `index.ts`, when we're calling the new `getMovieById()` method, we're accidentally
passing through a show ID, instead of a movie ID. Run the script to check its output:
`npx tsx index.ts`

You'll notice that `getMovieById()` is returning a *show*, but we only want it to
return movies, and to output an error if the library item isn't a movie.

You'll need to:

1. Create a type guard function named `assertIsMovie`. It should have an assertion signature
and throw an error if the library item which it receives isn't a movie.
2. Remove the `as Movie` type assertion in `getMovieById()` — sometimes it's a lie!
3. Call the `assertIsMovie()` function in `getMovieById()` to narrow the type of the
`libraryItem` object.
4. Run the script to check your work: `npx tsx index.ts` —  it should fail with the error
that you're throwing in your `assertIsMovie()` function.

### Extra credit: Only accept movie IDs as an argument to `getMovieById()`

You're now throwing an error if the library item which has been found isn't a movie, but
you could prevent the mistake of passing an incorrect ID much earlier, when writing the code
which calls `getMovieById()`.

Use branded types to ensure that the `getMovieById()` function only allows a movie
ID to be passed to it:

1. Use the `Brand` utility type (provided by `utils.ts`) to create branded
types for the `id` properties in the `Movie` and `Show` types in `data.ts`.
2. Use type assertions to apply the branded types to the `id` properties
in the `movie` and `show` objects in `data.ts`.
3. You should now see a type error in `index.ts` where `getMovieById()` is being called with `show.id`.
4. Fix the type error by passing `movie.id` to `getMovieById()` instead of `show.id`.
5. Run the script to check your work: `npx tsx index.ts`
