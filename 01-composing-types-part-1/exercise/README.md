# Exercise: Blast from the Past 🏛️

> **Section 1: Composing Types: Part I**

In this exercise we're going to build up the types for objects which
contain data on ancient civilizations. We'll use generic and conditional
types to help us along the way.

## Create the `Civilization` type

```typescript
interface Civilization {
  name: string;
  location: string;
}
```

## Turn the `Civilization` type into a generic type

- Add a type parameter to the `Civilization` type:

```diff
-interface Civilization {
+interface Civilization<NotablePeopleType> {
```

- Add a property which uses the type variable:

```typescript
notablePeople: NotablePeopleType[];
```

## Create types for all the notable people

```typescript
interface Person {
  name: string;
  occupation: string;
}

type Architect = Person & { occupation: 'Architect' };
type Pharaoh = Person & { occupation: 'Pharaoh' };
type Poet = Person & { occupation: 'Poet' };
type Philosopher = Person & { occupation: 'Philosopher' };
type General = Person & { occupation: 'General' };
```

## Add type annotations to each civilization object

Example:

```typescript
const egyptianCivilization: Civilization<Architect | Pharaoh> = {
```

## Notice that we can pass anything in for the `NotablePeopleType` argument

Example:

```typescript
Civilization<NotablePeople<Architect | true>>
```

## Create a generic type with a conditional type

```typescript
type NotablePeople<PersonType> = PersonType extends Person ? PersonType : never;
```

## Update the type annotations for all civilization objects

Example:

```diff
-const egyptianCivilization: Civilization<Architect | Pharaoh> = {
+const egyptianCivilization: Civilization<NotablePeople<Architect | Pharaoh>> = {
```
