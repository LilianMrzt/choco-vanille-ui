/*
 * Border-radius keys are pixel references at a 16px root. Rem values scale
 * with the root font size; full produces a pill treatment.
 */
export const RADIUS = {
    0: '0',
    1: '1px',
    2: '0.125rem',
    4: '0.25rem',
    6: '0.375rem',
    8: '0.5rem',
    10: '0.625rem',
    12: '0.75rem',
    14: '0.875rem',
    16: '1rem',
    18: '1.125rem',
    20: '1.25rem',
    24: '1.5rem',
    28: '1.75rem',
    32: '2rem',
    48: '3rem',
    64: '4rem',
    80: '5rem',
    96: '6rem',
    112: '7rem',
    128: '8rem',
    full: '9999px',
} as const
