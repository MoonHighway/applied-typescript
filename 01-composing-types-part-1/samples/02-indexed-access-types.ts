// -- Indexed access types --

interface City {
  name: string;
  country: string;
}

type CityName = City["name"];

const cityNames: CityName[] = ["Seoul", "Sydney", "Seattle"];

console.log({ cityNames });
