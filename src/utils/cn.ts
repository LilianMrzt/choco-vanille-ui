/**
 * Joins class names, filtering out any falsy values.
 *
 * Vanilla Extract generates scoped, conflict-free class names, so simple
 * concatenation is all that's needed — no conflict resolution required.
 */
export const cn = (...classes: (string | undefined | null | false | ((state: never) => string | undefined))[]): string =>
    classes.filter((c): c is string | undefined | null | false => typeof c !== 'function').filter(Boolean).join(' ')
