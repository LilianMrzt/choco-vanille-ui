import { createGlobalTheme, createGlobalThemeContract } from '@vanilla-extract/css'

/*
 * Design tokens for @my-org/ui-kit — the single source of truth for the
 * design system.
 *
 * Two complementary access paths, both kept in sync from one definition:
 *
 *   1. Typed `vars` object — import it in any kit or consumer `*.css.ts`
 *      file and get full autocomplete + type-safety:  `vars.color.primary`,
 *      `vars.space.md`, `vars.radius.sm`, …  Each leaf resolves to a
 *      `var(--…)` reference.
 *
 *   2. Plain CSS variables — the tokens are emitted on `:root` with stable,
 *      human-readable names derived from their path
 *      (e.g. `--color-primary`, `--space-md`, `--radius-sm`). Consumers can
 *      use them directly in stylesheets or override them to retheme — no
 *      build tooling required.
 *
 * This is the default ("light") theme.
 */

const tokens = {
    color: {
        /* Surfaces */
        background: 'oklch(1 0 0)',
        foreground: 'oklch(0.145 0 0)',
        card: 'oklch(1 0 0)',
        cardForeground: 'oklch(0.145 0 0)',
        popover: 'oklch(1 0 0)',
        popoverForeground: 'oklch(0.145 0 0)',

        /* Brand / intents */
        primary: 'oklch(0.205 0 0)',
        primaryForeground: 'oklch(0.985 0 0)',
        secondary: 'oklch(0.97 0 0)',
        secondaryForeground: 'oklch(0.205 0 0)',
        muted: 'oklch(0.97 0 0)',
        mutedForeground: 'oklch(0.556 0 0)',
        accent: 'oklch(0.97 0 0)',
        accentForeground: 'oklch(0.205 0 0)',
        destructive: 'oklch(0.577 0.245 27.325)',
        destructiveForeground: 'oklch(0.985 0 0)',

        /* Lines & focus */
        border: 'oklch(0.922 0 0)',
        input: 'oklch(0.922 0 0)',
        ring: 'oklch(0.708 0 0)',

        /* Highlight (used by Typography <mark>) */
        highlight: 'oklch(0.905 0.182 98.111)',
        highlightForeground: 'oklch(0.421 0.095 57.708)',
    },

    space: {
        none: '0',
        xs: '0.25rem',
        sm: '0.5rem',
        md: '0.75rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem',
    },

    radius: {
        none: '0',
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.625rem',
        xl: '0.875rem',
        full: '9999px',
    },

    fontFamily: {
        sans: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    },

    fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
    },

    fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
    },

    lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '1.75',
    },

    letterSpacing: {
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
    },

    shadow: {
        none: 'none',
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    },

    zIndex: {
        base: '0',
        dropdown: '1000',
        overlay: '1100',
        modal: '1200',
        popover: '1300',
        tooltip: '1400',
    },
}

/**
 * The typed token contract. Variable names are derived from the token path,
 * so `vars.color.primary` maps to the CSS variable `--color-primary`.
 */
export const vars = createGlobalThemeContract(tokens, (_value, path) => path.join('-'))

// Assign the light-theme values to those variables on :root.
createGlobalTheme(':root', vars, tokens)

/** The fully-typed design-token contract. Useful for typing helpers/utilities. */
export type ThemeVars = typeof vars
