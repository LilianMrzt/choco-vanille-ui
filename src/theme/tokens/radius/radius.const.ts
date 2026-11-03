/*
 * Border-radius keys are pixel references at a 16px root. Rem values scale
 * with the root font size; full produces a pill treatment.
 */
export const RADIUS = {
    0: '0',
    4: '0.25rem',
    6: '0.375rem',
    8: '0.5rem',
    10: '0.625rem',
    14: '0.875rem',
    20: '1.25rem',
    full: '9999px',
} as const
