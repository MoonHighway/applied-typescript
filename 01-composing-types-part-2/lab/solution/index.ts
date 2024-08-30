type DiscountBase = {
  description: string;
};

type PercentageDiscount = DiscountBase & {
  kind: "percentage";
  code: `PERCENT_OFF_${number}`;
  percentage: number;
};

type AmountDiscount = DiscountBase & {
  kind: "amount";
  code: `AMOUNT_OFF_${number}`;
  amount: number;
};

type QuantityDiscount = DiscountBase & {
  kind: "quantity";
  code: `BUY_${number}_GET_${number}_FREE`;
  quantity: number;
  free: number;
};

type Discount = PercentageDiscount | AmountDiscount | QuantityDiscount;

// -- Discounts --

const discounts: Discount[] = [
  {
    code: "PERCENT_OFF_10",
    description: "10% off",
    kind: "percentage",
    percentage: 10,
  },
  {
    code: "AMOUNT_OFF_5",
    description: "$5 off",
    kind: "amount",
    amount: 5,
  },
  {
    code: "PERCENT_OFF_30",
    description: "30% off",
    kind: "percentage",
    percentage: 30,
  },
  {
    kind: "quantity",
    code: "BUY_1_GET_1_FREE",
    description: "Buy 1 get 1 free",
    quantity: 1,
    free: 1,
  },
  {
    kind: "amount",
    code: "AMOUNT_OFF_15",
    description: "$15 off",
    amount: 15,
  },
  {
    kind: "quantity",
    code: "BUY_3_GET_1_FREE",
    description: "Buy 3 get 1 free",
    quantity: 3,
    free: 1,
  },
];

// -- Grouped discounts --

type GroupedDiscounts = {
  [Key in Discount["kind"]]?: Discount[];
};

// Alternative `GroupedDiscounts` type using built-in utility types.
{
  type GroupedDiscounts = Partial<Record<Discount["kind"], Discount[]>>;
}

function groupDiscounts(discounts: Discount[]): GroupedDiscounts {
  const groups: GroupedDiscounts = {};

  for (let discount of discounts) {
    groups[discount.kind] = groups[discount.kind] ?? [];
    groups[discount.kind]?.push(discount);
  }

  return groups;
}

const groupedDiscounts = groupDiscounts(discounts);

console.log(groupedDiscounts);
