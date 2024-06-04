// -- Refresher: Intersection types --

interface City {
  name: string;
  country: string;
}

interface Population {
  population: number;
}

type CityWithPopulation = City & Population;

// -- Refresher: Union types --

type CityName = 'Seoul' | 'Sydney' | 'Seattle';

let cityName: CityName = 'Seoul';
cityName = 'Seattle';
cityName = 'Sydney';

cityName = 'Paris';

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
  { name: 'Doggy', legs: 4 },
  { name: 'Birdy', wings: 2 }
];
