// -- Refresher: Intersection types --
{
  interface City {
    name: string;
    country: string;
  }

  interface Population {
    population: number;
  }

  type CityWithPopulation = City & Population;
}

//-- Refresher: Extending interfaces --
{
  interface Country {
    name: string;
  }

  interface CountryWithCurrency extends Country {
    currency: string;
  }

  const country2: CountryWithCurrency = {
    name: "New Zealand",
    currency: "New Zealand dollar",
  };
}

// -- Refresher: Union types --
{
  type CityName = "Seoul" | "Sydney" | "Seattle";

  let cityName: CityName = "Seoul";
  cityName = "Seattle";
  cityName = "Sydney";

  cityName = "Paris";

  // ----

  interface Dog {
    name: string;
    legs: number;
  }

  interface Bird {
    name: string;
    wings: number;
  }

  type Pet = Dog | Bird;

  const pets: Pet[] = [
    { name: "Doggy", legs: 4 },
    { name: "Birdy", wings: 2 },
  ];
}

// -- Refresher: Indexed access types --
{
  interface City {
    name: string;
    country: string;
  }

  type CityName = City["name"];

  const cityNames: CityName[] = ["Seoul", "Sydney", "Seattle"];

  console.log({ cityNames });
}
