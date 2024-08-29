# Lab: Picture This 📸

> **Section 1: Composing Types: Part I**

You're building the foundations of a photo gallery app which retrieves photos
from an API. Your challenge is to create a generic type which models the API
responses so they can be used in a type-safe way.

You'll be working in `start/index.ts`.

## Requirements

- The potential API responses returned by the `api.getPhotoById()` method are
[documented below](#potential-api-responses).
- Every `photo` object has an `unknown` type annotation. Create a generic
type named `ApiResponse` which can be used to replace these annotations.
- The `ApiResponse` type should accept three type arguments:
  - Status code type
  - Data type
  - Error type
- You should be able to use the type like this:
  - `ApiResponse<200, Photo, null>`
  - `ApiResponse<404, null, string>`
  - `ApiResponse<500, null, string>`
- There are a number of calls to the `assertEqualTypes()` helper function which
currently produce type errors. Use these calls to help guide the structure of
your `ApiResponse` type and to test its behaviour.
- There shouldn't be any remaining type errors once your `ApiResponse` generic
type is working correctly.
- Test that your code runs correctly with `npx tsx index.ts`.

### Extra Credit

Refactor the `ApiResponse` type so that:

1. The status code type only accepts the numeric type literals: `200`, `404`, `500`.
2. The data type parameter is optional.
3. Instead of using a type parameter to provide the type for the `error` property,
make the type for this property conditional. If the status code is `200` the type
should be `null`, otherwise it should be a `string`.

## Potential API responses

200 OK response:

```json
{
  "statusCode": 200,
  "data": {
    "id": 1,
    "title": "The Traveller",
    "url": "https://picsum.photos/id/79/2000/3011",
    "format": "jpeg",
    "quality": "high",
    "grayscale": true
  },
  "error": null
}
```

404 Not Found response:

```json
{
  "statusCode": 404,
  "data": null,
  "error": "Not Found"
}
```

500 Internal Server Error response:

```json
{
  "statusCode": 500,
  "data": null,
  "error": "Internal Server Error"
}
```
