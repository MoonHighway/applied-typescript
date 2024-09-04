// -- Narrow inferred types --
{
  // Hover over to see the inferred type.
  const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    // Typo in property name hasn't been caught.
    bleu: [0, 0, 255],
  };

  const greenNormalized = palette.green.toUpperCase();
}

// -- Wider types with a type annotation --
{
  type Colors = "red" | "green" | "blue";
  type RGB = [red: number, green: number, blue: number];

  const palette: Record<Colors, string | RGB> = {
    red: [255, 0, 0],
    green: "#00ff00",
    // Error: Object literal may only specify known properties,
    // and 'bleu' does not exist in type 'Record<Colors, string | RGB>'. TS2353.
    bleu: [0, 0, 255],
  };

  // Error: Property 'toUpperCase' does not exist on type 'string | RGB'.
  //        Property 'toUpperCase' does not exist on type 'RGB'. TS2339.
  const greenNormalized = palette.green.toUpperCase();
}

// -- Retain narrower inferred types by using `satisfies` --
{
  type Colors = "red" | "green" | "blue";

  type RGB = [red: number, green: number, blue: number];

  // Narrow inferred types.
  const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    // Error: Object literal may only specify known properties,
    // and 'bleu' does not exist in type 'Record<Colors, string | RGB>'. TS2353.
    bleu: [0, 0, 255],
  } satisfies Record<Colors, string | RGB>;

  const redComponent = palette.red.at(0);

  const greenNormalized = palette.green.toUpperCase();
}
