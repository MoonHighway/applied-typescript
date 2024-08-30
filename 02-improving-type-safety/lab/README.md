# Lab: Type Safe Creators 🎬

> **Section 2: Improving Type Safety**

## Requirements

1. There are eight pesky type errors in the Step 1 section of `start.ts`. Use the `satisfies` operator to help you fix them.
2. In the `for...of` loop in Step 2 section, `Array.isArray` is used to narrow the type for the `creator` variable. Refactor this code to use type predicates to narrow the type instead.
    1. Create two type predicate functions: `isDirector()` and `isProducer()`
    2. Hint: The return type for these functions should be a type predicate where the type is an *intersection type*.
