// -- Type narrowed with `typeof` type guard --
{
  function uppercaseValue(value: unknown) {
    if (typeof value !== "string") {
      throw new Error("Value is not a string!");
    }

    return value.toUpperCase();
     //     ^?
  }

  console.log(uppercaseValue("hello"));
  console.log(uppercaseValue(42));
}

// -- Type narrowed with an assertion function --
{
  function assertIsString(value: unknown): asserts value is string {
    //                                     ^^^^^^^^^^^^^^^^^^^^^^^
    //                                     Assertion signature
    if (typeof value !== "string") {
      throw new Error("Value is not a string!");
    }
  }

  function uppercaseValue(value: unknown) {
    assertIsString(value);

    return value.toUpperCase();
    //     ^?
  }

  console.log(uppercaseValue("hello"));
  console.log(uppercaseValue(42));
}
