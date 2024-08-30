// -- Generic types example --

// -- Start --

{
  const nzLanguages = {
    name: "New Zealand",
    languages: "English, Māori",
  };

  console.log(nzLanguages.languages);

  const spainLanguages = {
    name: "Spain",
    languages: ["Spanish", "Catalan", "Galician", "Basque", "Valencian"],
  };

  console.log(spainLanguages.languages.join(", "));
}

// -- End --

{
  interface Country<LanguagesType> {
    name: string;
    languages: LanguagesType;
  }

  const nzLanguages: Country<string> = {
    name: "New Zealand",
    languages: "English, Māori",
  };

  console.log(nzLanguages.languages);

  const spainLanguages: Country<string[]> = {
    name: "Spain",
    languages: ["Spanish", "Catalan", "Galician", "Basque", "Valencian"],
  };

  console.log(spainLanguages.languages.join(", "));
}

// TODO: More examples

{
  type MessageOf<MediumType> = MediumType extends { message: unknown }
    ? MediumType["message"]
    : never;

  interface Email {
    message: string;
  }

  interface SMS {
    message: string;
  }

  type EmailMessage = MessageOf<Email>;
  //   ^?

  type SMSMessage = MessageOf<SMS>;
  //   ^?

  type NoMessage = MessageOf<number>;
  //   ^?
}

// ----

{
  type MessageOfV2<MediumType> = MediumType extends {
    message: infer MessageType;
  }
    ? MessageType
    : never;

  interface Email {
    message: string;
  }

  interface SMS {
    message: string;
  }

  type EmailMessageV2 = MessageOfV2<Email>;
  //   ^?

  type SMSMessageV2 = MessageOfV2<SMS>;
  //   ^?

  type NoMessageV2 = MessageOfV2<number>;
  //   ^?
}

// ----

{
  type Photo = {
    format: "jpeg" | "png";
    quality: "low" | "high";
  };

  type EditOptions = {
    format: "jpeg" | "png";
    quality: "low" | "high";
    grayscale: boolean;
    blur: boolean;
  };

  type EditPhoto<PhotoType, EditOptionsType> = PhotoType extends {
    format: infer Format;
    quality: infer Quality;
  }
    ? EditOptionsType extends { format: Format; quality: Quality }
      ? PhotoType & EditOptionsType
      : never
    : never;

  type EditedPhoto = EditPhoto<Photo, EditOptions>;

  const photo: EditedPhoto = {
    format: "jpeg",
    quality: "high",
    grayscale: true,
    blur: false,
  };
}
