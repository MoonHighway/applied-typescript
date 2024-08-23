# Exercise: Tree-mendous Mapped Types 🌳

> **Section 1: Composing Types: Part II**

In this exercise we're going to use one object type to create
another object type. We'll see just how tree-mendously powerful
mapped types really are!

## Part 1

### Create a `Tree` type

```typescript
type Tree = {
  name: string;
  height: number;
  age: number;
};
```

### Use the type

```diff
-const oakData = {
+const oakData: Tree = {
```

### Create `TreeDetails` mapped type to describe `oak` object

```typescript
type TreeDetails<Type> = {
  [Key in keyof Type as `get${Capitalize<string & Key>}`]: () => Type[Key];
};

type OakTree = TreeDetails<Tree>;
```

### Components to discuss

- `keyof Type`
- `Key in keyof Type` — same as `Key in "name" | "height" | "age"`
- `as` - type assertion
- `Capitalize<string & Key>` — using the `Capitalize` utility type
- `string & Key` - ensures that the `Key` extends the `string` type, as keys can be Symbols in JavaScript
- `() => Type[Key]` - function signature
- `Type[Key]` - indexed access type to look up type of property on `Type`

### Alternative for extracting keys with type string

```typescript
Extract<keyof Type, string>
```

### Use the `OakTree` type

```diff
-let oak = {
+let oak: OakTree = {
   getName: () => oakData.name,
   getHeight: () => oakData.height,
   getAge: () => oakData.age,
 };
```

## Optional: Part 2: Create a `PartialTree` mapped type

```typescript
type PartialTree<Type> = {
  [Key in keyof Type]+?: Type[Key];
};

// Using the `+?` optionality modifier to indicate the field is optional.

type PartialOak = PartialTree<Tree>;

let partialOak: PartialOak = {
  name: "Oak",
};

console.log({ partialOak });
```

## Optional: Part 3: Create a generic type with a template literal type

```typescript
type TreeWithAge<Type extends number> = `Tree with age ${Type}`;

type OldTree = TreeWithAge<number>;

let oldOak: OldTree = `Tree with age ${oak.getAge()}`;

console.log(oldOak);
```

### Alternative to hardcoding `number` as the argument to `TreeWithAge`

Use an indexed access type:

```typescript
ReturnType<OakTree["getAge"]>
```
