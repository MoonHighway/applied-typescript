# Lab: Group Discount 🛍️

> **Section 1: Composing Types: Part II**

We're trying to group the discounts that we offer in our online store, but we're
having a tough time creating the types for these groups. Can you help us?!

## Requirements

We got stuck creating the `GroupedDiscounts` type, so it currently allows for `any`
type of value.

1. Change the `GroupedDiscounts` type into a mapped type that allows for grouping
discounts by their `kind` property.
2. Test that your code runs correctly with `npx tsx index.ts`.

### Extra Credit

The `DiscountBase` has a wide type of `string` for the `code` property, but we'd
like to ensure that the discount code for each kind of discount matches a specific
format.

Use the existing `code` values to help you establish the formats, and then create
template literal types to enforce a specific format for each kind of discount.
