import { assignVars, globalStyle } from '@vanilla-extract/css'

import { vars } from '@theme/contract.css.ts'

/*
 * Theme override helpers — how consumers customise the kit's colour tokens.
 *
 * IMPORTANT: import these helpers from your own *.css.ts files so that
 * Vanilla Extract can capture the `globalStyle` / `assignVars` side-effects
 * during its build-time pass. Calling them from a plain .ts file won't work.
 *
 * ── Q: Can the theme be overridden in a consuming project? ──────────────────
 *
 * YES — three complementary strategies:
 *
 * 1. Plain CSS  (no build tooling required)
 *    Override the emitted CSS custom properties. Every token has a stable name:
 *
 *      :root {
 *        --color-primary:       oklch(0.55 0.2 180);
 *        --color-primary-hover: oklch(0.48 0.2 180);
 *        --radius-md: 0.25rem;
 *      }
 *
 *    Scoped overrides also work:
 *      .my-modal { --color-background: oklch(0.1 0.02 250); }
 *
 * 2. Vanilla Extract  assignVars  (type-safe, build-time — see helpers below)
 *
 *      // my-app/theme/brand.css.ts
 *      import { overrideColors } from '@my-org/ui-kit'
 *
 *      overrideColors('[data-brand="acme"]', {
 *        primary:      'oklch(0.55 0.2 180)',
 *        primaryHover: 'oklch(0.48 0.2 180)',
 *      })
 *
 * 3. Vanilla Extract  createGlobalTheme  (full theme replacement)
 *
 *      // my-app/theme/acme.css.ts
 *      import { createGlobalTheme } from '@vanilla-extract/css'
 *      import { vars, lightTheme } from '@my-org/ui-kit'
 *
 *      createGlobalTheme('[data-brand="acme"]', vars, {
 *        ...lightTheme,
 *        color: {
 *          ...lightTheme.color,
 *          primary:      'oklch(0.55 0.2 180)',
 *          primaryHover: 'oklch(0.48 0.2 180)',
 *        },
 *      })
 */

/**
 * Override a subset of color tokens on any CSS selector.
 * Call this from a *.css.ts file so Vanilla Extract captures it.
 *
 * @example
 * // my-app/theme/brand.css.ts
 * overrideColors('[data-brand="acme"]', {
 *   primary:      'oklch(0.55 0.2 180)',
 *   primaryHover: 'oklch(0.48 0.2 180)',
 * })
 */
export const overrideColors = (
    selector: string,
    colors: Partial<Record<keyof typeof vars.color, string>>,
) => {
    globalStyle(selector, {
        // Spread the existing var references as defaults, then overwrite
        // only what the caller changed. assignVars requires a complete object.
        vars: assignVars(
            vars.color,
            { ...vars.color, ...colors } as Record<keyof typeof vars.color, string>,
        ),
    })
}

/**
 * Override a single color token on `:root`.
 * Call this from a *.css.ts file so Vanilla Extract captures it.
 *
 * @example
 * setColorToken('primary', 'oklch(0.55 0.2 180)')
 */
export const setColorToken = (
    token: keyof typeof vars.color,
    value: string,
) => {
    globalStyle(':root', {
        vars: { [vars.color[token]]: value },
    })
}
