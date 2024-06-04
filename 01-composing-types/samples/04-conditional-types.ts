// -- Conditional types --

// Conditional types are effectively if/else logic for types.
// Similar to conditional expressions in JavaScript i.e. `condition ? trueExpression : falseExpression`

interface Shape {
  type: string;
}

interface Box extends Shape {
  color: string;
}

interface Circle {
  diameter: number;
}

// Use the ternary operator
type Example1 = Box extends Shape ? boolean : unknown;

type Example2 = Circle extends Shape ? boolean : unknown;

// -- Generic type with conditional type --

type IsShape<Type> = Type extends Shape ? true : false;

type Example3 = IsShape<Box>;    // true

type Example4 = IsShape<Circle>; // false
