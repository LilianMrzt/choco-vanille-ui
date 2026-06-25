import { clsx, type ClassValue } from 'clsx'

/**
 * Merge class names conditionally.
 *
 * Thin wrapper around `clsx` that flattens arrays, objects and conditional
 * values into a single space-separated class string. The kit's styles come
 * from Vanilla Extract (scoped, conflict-free class names), so no
 * Tailwind-style conflict resolution is required — later classes simply win
 * by CSS source order.
 */
export const mergeClassNames = (...inputs: ClassValue[]): string => clsx(inputs)
