/*
 * Theme-agnostic font families, sizes and weights. Font-size keys are pixel
 * references at a 16px root; values remain rem-based.
 */

export const FONT_FAMILY = {
    sans: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
} as const

export const FONT_SIZE = {
    10: '0.625rem',
    12: '0.75rem',
    14: '0.875rem',
    16: '1rem',
    18: '1.125rem',
    20: '1.25rem',
    24: '1.5rem',
    30: '1.875rem',
    36: '2.25rem',
    48: '3rem',
    60: '3.75rem',
    72: '4.5rem',
} as const

export const FONT_WEIGHT = {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
} as const
