// -- `keyof` operator --

interface City {
  name: string;
  country: string;
}

// Use `keyof` to produce a string literal union of the keys of an object type
type CityProperties = keyof City;

// Equivalent to:
//  type CityProperties = 'name' | 'country';

const cityProperties: CityProperties[] = ['name', 'country', 'population'];
