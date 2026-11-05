/**
 * Formats the deterministic invoice amounts used in the table stories.
 * @internal Not part of the public package API.
 * @param amount - Dollar amount to display.
 * @returns An amount with two decimal places.
 * @example
 * formatAmount(250)
 */
export const formatAmount = (amount: number): string => `$${amount.toFixed(2)}`
