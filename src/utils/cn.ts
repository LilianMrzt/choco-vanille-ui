/**
 * Joins class names, filtering out any falsy values.
 *
 * Vanilla Extract generates scoped, conflict-free class names, so simple
 * concatenation is all that's needed — no conflict resolution required.
 */
export const cn = (...classes: (string | undefined | null | false)[]): string =>
    classes.filter(Boolean).join(' ')
