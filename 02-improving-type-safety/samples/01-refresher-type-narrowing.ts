// -- Refresher: `typeof` type guard --
{
  function formatPopulation(population: number | null) {
    // `typeof` type guard.
    if (typeof population === "number") {
      // Type has been narrowed to `number`.
      return population.toLocaleString();
      //     ^?
    }

    return null;
  }

  console.log(formatPopulation(3769495));

  console.log(formatPopulation(null));
}

// -- Refresher: Equality type guard --
{
  function formatCityName(city: "Paris" | "Tokyo" | "New York") {
    if (city === "Paris") {
      return `The City of Light: ${city}`;
    }

    if (city === "Tokyo") {
      return `The City of the Future: ${city}`;
    }

    return `The City that Never Sleeps: ${city}`;
  }

  console.log(formatCityName("Paris"));
  console.log(formatCityName("Tokyo"));
  console.log(formatCityName("New York"));
}

// -- Refresher: `instanceof` type guard --
{
  class City {
    name: string;

    constructor(name: string) {
      this.name = name;
    }
  }

  function outputLocation(location: City | string) {
    if (location instanceof City) {
      console.log(location.name);
    } else {
      console.log(location);
    }
  }

  outputLocation(new City("Copenhagen"));

  outputLocation("New Zealand");
}
