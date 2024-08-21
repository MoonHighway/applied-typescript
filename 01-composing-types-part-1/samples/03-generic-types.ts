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
