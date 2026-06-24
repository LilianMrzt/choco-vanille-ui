import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge class names with Tailwind-aware conflict resolution.
 * Combines `clsx` (conditional classes) with `tailwind-merge` (dedupes
 * conflicting Tailwind utilities, keeping the last one).
 */
export const mergeClassNames = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))
