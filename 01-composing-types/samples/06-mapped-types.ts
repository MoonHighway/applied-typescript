// -- Mapped types --

type CountryData = {
  name: string;
  languages: string[];
  population: number;
};

type Descriptions<Type> = {
  [Key in keyof Type]: string;
};

const countryDataDescriptions: Descriptions<CountryData> = {
  name: "The name of the country.",
  languages: "The languages spoken in the country.",
  population: "The population of the country.",
};

// -- Mapping modifiers --

type ReadOnlyDescriptions<Type> = {
  +readonly [Key in keyof Type]: string;
};

type OptionalDescriptions<Type> = {
  [Key in keyof Type]+?: string;
};

const readOnlyCountryDataDescriptions: ReadOnlyDescriptions<CountryData> = {
  name: "The name of the country.",
  languages: "The languages spoken in the country.",
  population: "The population of the country.",
};

readOnlyCountryDataDescriptions.name = "The name of the country v2.";

const optionalCountryDataDescriptions: OptionalDescriptions<CountryData> = {
  name: "The name of the country.",
  population: "The population of the country.",
};
