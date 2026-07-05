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

    /* Purple — creative / premium intent. */
    purple: {
        50: 'oklch(0.977 0.014 300)',
        100: 'oklch(0.953 0.034 300)',
        200: 'oklch(0.902 0.073 300)',
        300: 'oklch(0.827 0.142 300)',
        400: 'oklch(0.725 0.215 300)',
        500: 'oklch(0.627 0.257 300)',
        600: 'oklch(0.558 0.24 300)',
        700: 'oklch(0.495 0.205 300)',
        800: 'oklch(0.438 0.17 300)',
        900: 'oklch(0.38 0.13 300)',
        950: 'oklch(0.29 0.085 300)',
    },

    /* Pink — playful / accent intent. */
    pink: {
        50: 'oklch(0.98 0.012 350)',
        100: 'oklch(0.958 0.03 350)',
        200: 'oklch(0.918 0.063 350)',
        300: 'oklch(0.85 0.12 350)',
        400: 'oklch(0.76 0.19 350)',
        500: 'oklch(0.656 0.241 350)',
        600: 'oklch(0.592 0.22 350)',
        700: 'oklch(0.525 0.185 350)',
        800: 'oklch(0.46 0.15 350)',
        900: 'oklch(0.405 0.115 350)',
        950: 'oklch(0.31 0.075 350)',
    },

    /* Orange — energetic / attention intent. */
    orange: {
        50: 'oklch(0.98 0.016 55)',
        100: 'oklch(0.954 0.04 55)',
        200: 'oklch(0.901 0.084 55)',
        300: 'oklch(0.837 0.154 55)',
        400: 'oklch(0.75 0.22 55)',
        500: 'oklch(0.678 0.235 55)',
        600: 'oklch(0.6 0.21 55)',
        700: 'oklch(0.52 0.175 55)',
        800: 'oklch(0.45 0.14 55)',
        900: 'oklch(0.39 0.11 55)',
        950: 'oklch(0.285 0.075 55)',
    },

    /* Teal — calm / growth intent. */
    teal: {
        50: 'oklch(0.982 0.018 180)',
        100: 'oklch(0.96 0.04 180)',
        200: 'oklch(0.91 0.08 180)',
        300: 'oklch(0.84 0.15 180)',
        400: 'oklch(0.75 0.21 180)',
        500: 'oklch(0.66 0.22 180)',
        600: 'oklch(0.585 0.195 180)',
        700: 'oklch(0.51 0.16 180)',
        800: 'oklch(0.445 0.13 180)',
        900: 'oklch(0.385 0.1 180)',
        950: 'oklch(0.285 0.065 180)',
    },

    /* Cyan — fresh / tech intent. */
    cyan: {
        50: 'oklch(0.983 0.016 210)',
        100: 'oklch(0.962 0.038 210)',
        200: 'oklch(0.915 0.078 210)',
        300: 'oklch(0.85 0.145 210)',
        400: 'oklch(0.76 0.205 210)',
        500: 'oklch(0.68 0.22 210)',
        600: 'oklch(0.605 0.195 210)',
        700: 'oklch(0.535 0.165 210)',
        800: 'oklch(0.465 0.135 210)',
        900: 'oklch(0.405 0.105 210)',
        950: 'oklch(0.3 0.07 210)',
    },

    /* Indigo — deep / trustworthy intent. */
    indigo: {
        50: 'oklch(0.975 0.014 270)',
        100: 'oklch(0.948 0.034 270)',
        200: 'oklch(0.895 0.073 270)',
        300: 'oklch(0.815 0.142 270)',
        400: 'oklch(0.71 0.215 270)',
        500: 'oklch(0.615 0.257 270)',
        600: 'oklch(0.545 0.24 270)',
        700: 'oklch(0.485 0.205 270)',
        800: 'oklch(0.43 0.17 270)',
        900: 'oklch(0.375 0.13 270)',
        950: 'oklch(0.285 0.085 270)',
    },

    /* Pure black/white helpers for alpha math and absolutes. */
    white: 'oklch(1 0 0)',
    black: 'oklch(0 0 0)',
} as const

export type Palette = typeof palette
