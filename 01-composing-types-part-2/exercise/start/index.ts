const oakData = {
  name: "Oak",
  height: 20,
  age: 100,
};

let oak = {
  getName: () => oakData.name,
  getHeight: () => oakData.height,
  getAge: () => oakData.age,
};

console.log(`Name: ${oak.getName()}`);
console.log(`Height: ${oak.getHeight()}`);
console.log(`Age: ${oak.getAge()}`);
