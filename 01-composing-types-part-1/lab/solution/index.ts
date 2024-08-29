import { api, assertEqualTypes } from "./api.js";

type Photo = {
  id: number;
  title: string;
  url: string;
  format: "jpeg" | "png";
  quality: "low" | "high";
  grayscale: boolean;
};

type ApiResponse<StatusCodeType, DataType, ErrorType> = {
  statusCode: StatusCodeType;
  data: DataType;
  error: ErrorType;
};

const photoResponse = api.getPhotoById(1);

if (photoResponse.statusCode === 200) {
  const photo: ApiResponse<200, Photo, null> = photoResponse;

  assertEqualTypes<
    {
      statusCode: 200;
      data: Photo;
      error: null;
    },
    typeof photo
  >(true);
  assertEqualTypes<200, (typeof photo)["statusCode"]>(true);
  assertEqualTypes<Photo, (typeof photo)["data"]>(true);
  assertEqualTypes<null, (typeof photo)["error"]>(true);

  console.log(`Photo Title: ${photo.data.title}`);
  console.log(`Photo URL: ${photo.data.url}`);
} else if (photoResponse.statusCode === 404) {
  const photo: ApiResponse<404, null, string> = photoResponse;

  assertEqualTypes<
    {
      statusCode: 404;
      data: null;
      error: string;
    },
    typeof photo
  >(true);
  assertEqualTypes<404, (typeof photo)["statusCode"]>(true);
  assertEqualTypes<null, (typeof photo)["data"]>(true);
  assertEqualTypes<string, (typeof photo)["error"]>(true);

  console.log(`Error retrieving photo (404): ${photo.error}`);
} else if (photoResponse.statusCode === 500) {
  const photo: ApiResponse<500, null, string> = photoResponse;

  assertEqualTypes<
    {
      statusCode: 500;
      data: null;
      error: string;
    },
    typeof photo
  >(true);
  assertEqualTypes<500, (typeof photo)["statusCode"]>(true);
  assertEqualTypes<null, (typeof photo)["data"]>(true);
  assertEqualTypes<string, (typeof photo)["error"]>(true);

  console.log(`Error retrieving photo (500): ${photo.error}`);
}
