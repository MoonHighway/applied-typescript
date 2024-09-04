// -- Type narrowed with `typeof` type guard --
{
  function uppercaseValue(value: unknown) {
    if (typeof value === "string") {
      return value.toUpperCase();
      //     ^?
    }

    return null;
  }

  console.log(uppercaseValue("hello"));
  console.log(uppercaseValue(42));
}

// -- Type narrowed with a type predicate --
{
  function valueIsString(value: any): value is string {
  //                                  ^^^^^^^^^^^^^^^
  //                                  Type predicate
    return typeof value === "string";
  }

  function uppercaseValue(value: unknown) {
    if (valueIsString(value)) {
      return value.toUpperCase();
      //     ^?
    }

    return null;
  }

  console.log(uppercaseValue("hello"));
  console.log(uppercaseValue(42));
}
