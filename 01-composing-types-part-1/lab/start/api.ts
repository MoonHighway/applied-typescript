type IsEqual<Type1, Type2> = Type1 extends Type2
  ? Type2 extends Type1
    ? true
    : "Types are not equal"
  : "Types are not equal";

type AssertEqual<Type1, Type2> = IsEqual<Type1, Type2> extends true
  ? true
  : "Types are not equal";

export function assertEqualTypes<Type1, Type2>(
  value: AssertEqual<Type1, Type2>
) {}

const responses = {
  200: {
    statusCode: 200,
    data: {
      id: 1,
      title: "The Traveller",
      url: "https://picsum.photos/id/79/2000/3011",
      format: "jpeg",
      quality: "high",
      grayscale: true,
    },
    error: null,
  },
  404: {
    statusCode: 404,
    data: null,
    error: "Not Found",
  },
  500: {
    statusCode: 500,
    data: null,
    error: "Internal Server Error",
  },
};

export const api = {
  getPhotoById(id: number) {
    const statusCodes = [200, 404, 500] as const;

    const randomStatusCode: keyof typeof responses =
      statusCodes[Math.floor(Math.random() * statusCodes.length)] || 500;

    return JSON.parse(JSON.stringify(responses[randomStatusCode]));
  },
};
