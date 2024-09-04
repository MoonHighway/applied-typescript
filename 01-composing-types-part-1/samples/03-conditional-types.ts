interface Shape {
  type: string;
}

interface Box extends Shape {
  color: string;
}

interface Circle {
  diameter: number;
}

// -- Conditional types --
{
  type Example1 = Box extends Shape ? boolean : unknown;
  //                                ^ Ternary operator

  type Example2 = Circle extends Shape ? boolean : unknown;
  //                                     ^^ True branch
}

// -- Generic type with conditional type --
{
  type IsShape<Type> = Type extends Shape ? true : false;
  //                                        ^^ boolean literal type

  type Example3 = IsShape<Box>; // true

  type Example4 = IsShape<Circle>; // false
}

// -- `infer` keyword --
{
  // Original type without `infer`
  {
    type MessageBody<MediumType extends { body: unknown }> = MediumType["body"];
  }

  // Conditional type with `infer`
  type MessageBody<MediumType> = MediumType extends { body: infer BodyType }
    ? BodyType
    : never;

  type Email = {
    toAddress: string;
    body: {
      type: "html" | "text";
      content: string;
    };
  };

  type SMS = {
    toNumber: string;
    body: string;
  };

  type EmailBody = MessageBody<Email>;
  //   ^?

  type SMSBody = MessageBody<SMS>;
  //   ^?
}
