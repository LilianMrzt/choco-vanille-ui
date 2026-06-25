import { assignVars, createGlobalTheme, createGlobalThemeContract, globalStyle } from '@vanilla-extract/css'

import { darkColors } from '@theme/colors/index.ts'
import { lightTheme } from '@theme/tokens/index.ts'
import { darkShadows } from '@theme/tokens/shadows.ts'

/*
 * Design-token contract & theme registration.
 *
 * Two complementary access paths, kept in sync from one definition:
 *
 *   1. Typed `vars` object — import it in any `*.css.ts` file for full
 *      autocomplete + type-safety: `vars.color.primary`, `vars.space.md`,
 *      `vars.radius.sm`, … Each leaf resolves to a `var(--…)` reference.
 *
 *   2. Plain CSS variables — emitted with stable, human-readable names derived
 *      from the token path (e.g. `--color-primary`, `--space-md`). Consumers
 *      can use or override them directly to retheme — no build tooling needed.
 *
 * Theming strategy:
 *   • `:root`                         → light theme (the default).
 *   • `[data-theme='dark']`           → explicit dark theme.
 *   • `:root:not([data-theme])` + a   → automatic dark theme that follows the
 *     `prefers-color-scheme` query       OS, but only when no theme is forced.
 *
 * Only the theme-dependent categories (color, shadow) are re-assigned for dark;
 * all other tokens are shared and emitted once on `:root`.
 */

/**
 * The typed token contract. Variable names are derived from the token path, so
 * `vars.color.primary` maps to the CSS variable `--color-primary`.
 */
export const vars = createGlobalThemeContract(lightTheme, (_value, path) => path.join('-'))

// 1. Light theme — the full set of variables on :root.
createGlobalTheme(':root', vars, lightTheme)

// The dark overrides only touch the theme-dependent categories.
const darkOverrides = {
    ...assignVars(vars.color, darkColors),
    ...assignVars(vars.shadow, darkShadows),
}

// 2. Explicit dark theme via `data-theme="dark"`.
globalStyle('[data-theme="dark"]', {
    vars: darkOverrides,
})

// 3. Automatic dark theme — follows the OS, but never overrides an explicit
//    `data-theme` (the `:not([data-theme])` keeps user choice authoritative).
globalStyle(':root:not([data-theme])', {
    '@media': {
        '(prefers-color-scheme: dark)': {
            vars: darkOverrides,
        },
    },
})

/** The fully-typed design-token contract. Useful for typing helpers/utilities. */
export type ThemeVars = typeof vars
