// -- Structurally compatible types masking a bug --
{
  type Dog = {
    name: string;
    color: string;
  };

  type Cat = {
    name: string;
    color: string;
  };

  function outputPets(dog: Dog, cat: Cat) {
    console.log("Dog:", dog);
    console.log("Cat:", cat);
  }

  const cat = { name: "Boots the cat", color: "black" };
  const dog = { name: "Fluffy the dog", color: "brindle" };

  // We're passing arguments in the wrong order, but TypeScript doesn't
  // catch it as the types of these values are structurally compatible.
  outputPets(cat, dog);
}

// -- Using branded types to make types structurally unique --

declare const __brand: unique symbol;

// - `declare` — Tells TypeScript that the following variable exists in another file (it doesn't need to).
// - `const __brand` — Declaring an immutable (constant) variable named `__brand`.
//   - We're prefixing the variable name with `__` to reduce the risk of it clashing
//     with another variable in the global namespace (these would typically come from a third-party library).
// - `unique symbol` — This type annotation tells TypeScript to treat `symbol` as a unique literal.
//   - "Each reference to a unique symbol implies a completely unique identity that’s tied to a given declaration."
//   - "Because each unique symbol has a completely separate identity, no two unique symbol types are assignable
//      or comparable to each other."

// Branded type.
type Brand<BaseType, BrandedName extends string> = BaseType & {
  //                             ^^^^^^^^^^^^^^
  //                             Ensure `BrandedName` is a string literal type.
  [__brand]: BrandedName;
  // ^^^^^^
  // The unique symbol property.
};

// -- Branded object types --
{
  type Dog = {
    name: string;
    color: string;
  };

  type Cat = {
    name: string;
    color: string;
  };

  type BrandedDog = Brand<Dog, "Dog">;
  type BrandedCat = Brand<Cat, "Cat">;

  function outputPets(dog: BrandedDog, cat: BrandedCat) {
    console.log("Dog:", dog);
    console.log("Cat:", cat);
  }

  // Use type assertions to apply branded types to objects.
  const cat = { name: "Boots the cat", color: "black" } as BrandedCat;
  const dog = { name: "Fluffy the dog", color: "brindle" } as BrandedDog;

  // Error: Argument of type '{ name: string; color: string; }'
  // is not assignable to parameter of type 'BrandedDog'. TS2345.
  outputPets(cat, dog);

  outputPets(dog, cat);
}

// -- Branded object properties --
{
  type Dog = {
    name: Brand<string, "DogName">;
    color: string;
  };

  type Cat = {
    name: Brand<string, "CatName">;
    color: string;
  };

  function outputDogName(dogName: Dog["name"]) {
    console.log(`${dogName} the dog!`);
  }

  // Use type assertions to apply branded types to object properties.
  const cat: Cat = { name: "Boots the cat" as Cat["name"], color: "black" };
  const dog: Dog = { name: "Fluffy the dog" as Dog["name"], color: "brindle" };

  // Error: Argument of type 'Brand<string, "CatName">' is not assignable
  // to parameter of type 'Brand<string, "DogName">'. TS2345.
  outputDogName(cat.name);

  outputDogName(dog.name);
}
