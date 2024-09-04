// -- Non generic types --
{
  type Country = {
    name: string;
    languages: string | string[];
  };

  const nzLanguages: Country = {
    name: "New Zealand",
    languages: "English, Māori",
  };

  console.log(nzLanguages.languages);

  const spainLanguages: Country = {
    name: "Spain",
    languages: ["Spanish", "Catalan", "Galician", "Basque", "Valencian"],
  };

  // Error: Property 'join' does not exist on type 'string'. TS2339.
  console.log(spainLanguages.languages.join(", "));
}

// -- Generic type --
{
  type Country<LanguagesType> = {
    //         ^ Type parameter
    name: string;
    languages: LanguagesType;
    //         ^ Type variable
  };

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

// -- Multiple type parameters --
{
  type Country<LanguagesType, PopulationType> = {
    name: string;
    languages: LanguagesType;
    population: PopulationType;
  };

  const newZealand: Country<string, number> = {
    name: "New Zealand",
    languages: "English, Māori",
    population: 5_000_000,
  };

  const spain: Country<string[], { total: number; capital: number }> = {
    name: "Spain",
    languages: ["Spanish", "Catalan", "Galician", "Basque", "Valencian"],
    population: { total: 47_000_000, capital: 3_000_000 },
  };
}

// -- Separate types vs a Generic type --
{
  type Country = {
    name: string;
    languages: string;
  };

  type CountryWithLanguagesArray = {
    name: string;
    languages: string[];
  };

  const nzLanguages: Country = {
    name: "New Zealand",
    languages: "English, Māori",
  };

  console.log(nzLanguages.languages);

  const spainLanguages: CountryWithLanguagesArray = {
    name: "Spain",
    languages: ["Spanish", "Catalan", "Galician", "Basque", "Valencian"],
  };

  console.log(spainLanguages.languages.join(", "));
}

// -- Union type vs a Generic type --
{
  type CountryUnion = {
    name: string;
    languages: string | string[];
    population: number | { total: number; capital: number };
  };

  const newZealand2: CountryUnion = {
    name: "New Zealand",
    languages: "English, Māori",
    population: 5_000_000,
  };

  if (typeof newZealand2.languages === "string") {
    console.log(newZealand2.languages.toUpperCase());
  }

  // ----

  type CountryGeneric<LanguagesType, PopulationType> = {
    name: string;
    languages: LanguagesType;
    population: PopulationType;
  };

  const newZealand1: CountryGeneric<string, number> = {
    name: "New Zealand",
    languages: "English, Māori",
    population: 5_000_000,
  };

  console.log(newZealand1.languages.toUpperCase());
}

// -- Default type parameters --
{
  type Country<LanguagesType = string, PopulationType = number> = {
    name: string;
    languages: LanguagesType;
    population: PopulationType;
  };

  const nzLanguages: Country = {
    name: "New Zealand",
    languages: "English, Māori",
    population: 5_000_000,
  };

  const spainLanguages: Country<string[], { total: number; capital: number }> =
    {
      name: "Spain",
      languages: ["Spanish", "Catalan", "Galician", "Basque", "Valencian"],
      population: { total: 47_000_000, capital: 3_000_000 },
    };
}

// -- Generic constraints (extends) --
{
  type MessageBody<MediumType extends { body: unknown }> = MediumType["body"];

  type Email = {
    toAddress: string;
    body: {
      type: "html" | "text";
      content: string;
    };
  };

  type SMS = {
    toNumber: string;
    body: string;
  };

  type EmailBody = MessageBody<Email>;
  //   ^?

  type SMSBody = MessageBody<SMS>;
  //   ^?
}
