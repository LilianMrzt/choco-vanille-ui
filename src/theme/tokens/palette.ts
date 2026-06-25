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
    /* Neutral / gray — slightly cool, the backbone of every surface & text. */
    neutral: {
        0: 'oklch(1 0 0)',
        50: 'oklch(0.985 0.001 286.4)',
        100: 'oklch(0.967 0.001 286.4)',
        200: 'oklch(0.92 0.004 286.3)',
        300: 'oklch(0.871 0.006 286.3)',
        400: 'oklch(0.705 0.015 286.1)',
        500: 'oklch(0.552 0.014 285.9)',
        600: 'oklch(0.442 0.017 285.8)',
        700: 'oklch(0.37 0.013 285.8)',
        800: 'oklch(0.274 0.006 286.0)',
        900: 'oklch(0.21 0.006 285.9)',
        950: 'oklch(0.141 0.005 285.8)',
        1000: 'oklch(0 0 0)',
    },

    /* Brand / primary — a confident modern violet-indigo. */
    brand: {
        50: 'oklch(0.97 0.014 286.3)',
        100: 'oklch(0.943 0.029 286.2)',
        200: 'oklch(0.894 0.057 286.5)',
        300: 'oklch(0.811 0.101 286.8)',
        400: 'oklch(0.714 0.158 285.9)',
        500: 'oklch(0.623 0.214 285.4)',
        600: 'oklch(0.548 0.237 285.0)',
        700: 'oklch(0.488 0.224 285.2)',
        800: 'oklch(0.42 0.181 285.8)',
        900: 'oklch(0.38 0.142 286.4)',
        950: 'oklch(0.283 0.097 287.0)',
    },

    /* Blue — informational intent. */
    blue: {
        50: 'oklch(0.97 0.014 254.6)',
        100: 'oklch(0.932 0.032 255.6)',
        200: 'oklch(0.882 0.059 254.1)',
        300: 'oklch(0.809 0.105 251.8)',
        400: 'oklch(0.707 0.165 254.6)',
        500: 'oklch(0.623 0.188 259.8)',
        600: 'oklch(0.546 0.215 262.9)',
        700: 'oklch(0.488 0.217 264.4)',
        800: 'oklch(0.424 0.181 265.6)',
        900: 'oklch(0.379 0.138 265.5)',
        950: 'oklch(0.282 0.091 267.9)',
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
