import {
    assignVars,
    createGlobalTheme,
    createGlobalThemeContract,
    globalLayer,
    globalStyle,
} from '@vanilla-extract/css'

import { THEME_DARK_CLASS, THEME_LAYER, THEME_LIGHT_CLASS } from '@constants/theme'

import { darkColors } from '@theme/colors/index.ts'
import { lightTheme } from '@theme/tokens/index.ts'
import { darkShadows, darkDropShadows } from '@theme/tokens/shadows.ts'

/** Low-specificity layer for design-token variables so host apps can override predictably. */
export const themeLayer = globalLayer(THEME_LAYER)

/** Typed token contract. `vars.color.primary` → CSS var `--color-primary`. */
export const vars = createGlobalThemeContract(lightTheme, (_value, path) => path.join('-'))

// 1. Light theme on :root.
createGlobalTheme(':root', vars, { ...lightTheme, '@layer': themeLayer })

const darkOverrides = {
    ...assignVars(vars.color, darkColors),
    ...assignVars(vars.shadow, darkShadows),
    ...assignVars(vars.dropShadow, darkDropShadows),
}

const lightColorOverrides = assignVars(vars.color, lightTheme.color)

// 2. Explicit dark theme on any ancestor via data attribute or class.
//    Using a class (e.g. <div class={THEME_DARK_CLASS}>) is recommended for
//    embedded widgets so the host document does not need a global data attribute.
globalStyle(`[data-theme="dark"], .${THEME_DARK_CLASS}`, {
    '@layer': {
        [themeLayer]: {
            vars: darkOverrides,
        },
    },
})

// 3. Explicit light theme on any ancestor via data attribute or class.
//    Useful for forcing light mode inside a dark-scoped subtree.
globalStyle(`[data-theme="light"], .${THEME_LIGHT_CLASS}`, {
    '@layer': {
        [themeLayer]: {
            vars: lightColorOverrides,
        },
    },
})

// 4. Automatic dark — OS preference, but never overrides an explicit root theme.
globalStyle(`:root:not([data-theme]):not(.${THEME_DARK_CLASS}):not(.${THEME_LIGHT_CLASS})`, {
    '@layer': {
        [themeLayer]: {
            '@media': {
                '(prefers-color-scheme: dark)': { vars: darkOverrides },
            },
        },
    },
})

/** Fully-typed design-token contract. */
export type ThemeVars = typeof vars
