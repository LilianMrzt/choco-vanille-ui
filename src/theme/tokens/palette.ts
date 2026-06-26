/*
 * Primitive color palette — the raw, theme-agnostic material of the design
 * system.
 *
 * These are *not* exposed as CSS variables directly. They are the building
 * blocks from which the semantic color tokens (see `colors.ts`) are composed
 * for both the light and dark themes. Think of them as the "100% objective"
 * layer: a blue-500 is always the same blue, regardless of theme.
 *
 * Every value is expressed in OKLCH for perceptually-uniform scales — the same
 * approach used by modern systems (Tailwind v4, Radix Colors, shadcn/ui).
 * Each ramp goes from 50 (lightest) to 950 (darkest).
 */

export const palette = {
    /* Neutral / slate — a cool blue-gray, the modern SaaS backbone. */
    neutral: {
        0: 'oklch(1 0 0)',
        50: 'oklch(0.985 0.002 264)',
        100: 'oklch(0.968 0.004 264)',
        200: 'oklch(0.923 0.006 264)',
        300: 'oklch(0.872 0.009 264)',
        400: 'oklch(0.708 0.018 264)',
        500: 'oklch(0.554 0.02 264)',
        600: 'oklch(0.446 0.02 264)',
        700: 'oklch(0.372 0.018 264)',
        800: 'oklch(0.277 0.012 264)',
        900: 'oklch(0.21 0.01 264)',
        950: 'oklch(0.143 0.008 264)',
        1000: 'oklch(0 0 0)',
    },

    /* Brand / primary — a confident modern indigo-blue. */
    brand: {
        50: 'oklch(0.971 0.013 264)',
        100: 'oklch(0.936 0.032 264)',
        200: 'oklch(0.885 0.062 264)',
        300: 'oklch(0.808 0.108 263)',
        400: 'oklch(0.707 0.163 263)',
        500: 'oklch(0.623 0.196 264)',
        600: 'oklch(0.545 0.22 264)',
        700: 'oklch(0.488 0.217 265)',
        800: 'oklch(0.424 0.181 266)',
        900: 'oklch(0.379 0.138 266)',
        950: 'oklch(0.282 0.09 268)',
    },

    /* Blue — informational intent (sky-blue, distinct from brand indigo). */
    blue: {
        50: 'oklch(0.97 0.014 237)',
        100: 'oklch(0.932 0.032 237)',
        200: 'oklch(0.882 0.059 237)',
        300: 'oklch(0.809 0.105 236)',
        400: 'oklch(0.707 0.152 237)',
        500: 'oklch(0.623 0.17 237)',
        600: 'oklch(0.546 0.196 240)',
        700: 'oklch(0.488 0.2 242)',
        800: 'oklch(0.424 0.17 244)',
        900: 'oklch(0.379 0.13 244)',
        950: 'oklch(0.282 0.085 246)',
    },

    /* Green — success / positive intent. */
    green: {
        50: 'oklch(0.982 0.018 155.8)',
        100: 'oklch(0.962 0.044 156.7)',
        200: 'oklch(0.925 0.084 155.9)',
        300: 'oklch(0.871 0.15 154.4)',
        400: 'oklch(0.792 0.209 151.7)',
        500: 'oklch(0.723 0.219 149.6)',
        600: 'oklch(0.627 0.194 149.2)',
        700: 'oklch(0.527 0.154 150.1)',
        800: 'oklch(0.448 0.119 151.3)',
        900: 'oklch(0.393 0.095 152.5)',
        950: 'oklch(0.266 0.065 152.9)',
    },

    /* Amber — warning / caution intent. */
    amber: {
        50: 'oklch(0.987 0.022 95.3)',
        100: 'oklch(0.962 0.059 95.6)',
        200: 'oklch(0.924 0.12 95.7)',
        300: 'oklch(0.879 0.169 91.6)',
        400: 'oklch(0.828 0.189 84.4)',
        500: 'oklch(0.769 0.188 70.1)',
        600: 'oklch(0.666 0.179 58.3)',
        700: 'oklch(0.555 0.156 49.0)',
        800: 'oklch(0.473 0.133 46.2)',
        900: 'oklch(0.414 0.112 45.9)',
        950: 'oklch(0.279 0.077 45.6)',
    },

    /* Red — destructive / danger intent. */
    red: {
        50: 'oklch(0.971 0.013 17.4)',
        100: 'oklch(0.936 0.032 17.7)',
        200: 'oklch(0.885 0.062 18.3)',
        300: 'oklch(0.808 0.114 19.6)',
        400: 'oklch(0.704 0.191 22.2)',
        500: 'oklch(0.637 0.237 25.3)',
        600: 'oklch(0.577 0.245 27.3)',
        700: 'oklch(0.505 0.213 27.5)',
        800: 'oklch(0.444 0.177 26.9)',
        900: 'oklch(0.396 0.141 25.7)',
        950: 'oklch(0.258 0.092 26.0)',
    },

    /* Pure black/white helpers for alpha math and absolutes. */
    white: 'oklch(1 0 0)',
    black: 'oklch(0 0 0)',
} as const

export type Palette = typeof palette
