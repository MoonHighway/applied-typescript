type Tree = {
  name: string;
  height: number;
  age: number;
};

type TreeDetails<Type> = {
  [Key in keyof Type as `get${Capitalize<string & Key>}`]: () => Type[Key];
};

type OakTree = TreeDetails<Tree>;

const oakData: Tree = {
  name: "Oak",
  height: 20,
  age: 100,
};

let oak: OakTree = {
  getName: () => oakData.name,
  getHeight: () => oakData.height,
  getAge: () => oakData.age,
};

console.log(`Name: ${oak.getName()}`);
console.log(`Height: ${oak.getHeight()}`);
console.log(`Age: ${oak.getAge()}`);

// ----

type PartialTree<Type> = {
  [Key in keyof Type]+?: Type[Key];
};

let partialOak: PartialTree<Tree> = {
  name: "Oak",
};

console.log({ partialOak });

// ----

type TreeWithAge<Type extends number> = `Tree with age ${Type}`;

type OldTree = TreeWithAge<ReturnType<OakTree["getAge"]>>;

let oldOak: OldTree = `Tree with age ${oak.getAge()}`;

console.log(oldOak);
