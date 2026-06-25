import { assignVars, createGlobalTheme, createGlobalThemeContract, globalStyle } from '@vanilla-extract/css'

import { darkColors } from '@theme/colors/index.ts'
import { lightTheme } from '@theme/tokens/index.ts'
import { darkShadows } from '@theme/tokens/shadows.ts'

/** Typed token contract. `vars.color.primary` → CSS var `--color-primary`. */
export const vars = createGlobalThemeContract(lightTheme, (_value, path) => path.join('-'))

// 1. Light theme on :root.
createGlobalTheme(':root', vars, lightTheme)

const darkOverrides = {
    ...assignVars(vars.color, darkColors),
    ...assignVars(vars.shadow, darkShadows),
}

// 2. Explicit dark theme.
globalStyle('[data-theme="dark"]', { vars: darkOverrides })

// 3. Automatic dark — OS preference, but never overrides an explicit data-theme.
globalStyle(':root:not([data-theme])', {
    '@media': {
        '(prefers-color-scheme: dark)': { vars: darkOverrides },
    },
})

/** Fully-typed design-token contract. */
export type ThemeVars = typeof vars
