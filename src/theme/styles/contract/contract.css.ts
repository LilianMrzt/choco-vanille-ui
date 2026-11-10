import {
    assignVars,
    createGlobalTheme,
    createGlobalThemeContract,
    globalLayer,
    globalStyle,
} from '@vanilla-extract/css'

import { THEME_DARK_CLASS, THEME_LAYER, THEME_LIGHT_CLASS } from '@theme/constants/index.ts'

import { darkTheme, lightTheme } from '@theme/themes/themes.const.ts'

/** Low-specificity layer for design-token variables so host apps can override predictably. */
const themeLayer = globalLayer(THEME_LAYER)

/** Theme token contract, including semantic colors and numeric radius variables. */
export const vars = createGlobalThemeContract(lightTheme, (_value, path) => path.join('-'))

// 1. Light theme on :root.
createGlobalTheme(':root', vars, { ...lightTheme, '@layer': themeLayer })

const darkOverrides = {
    ...assignVars(vars.color, darkTheme.color),
    ...assignVars(vars.editorColors, darkTheme.editorColors),
    ...assignVars(vars.shadow, darkTheme.shadow),
    ...assignVars(vars.dropShadow, darkTheme.dropShadow),
}

const lightOverrides = {
    ...assignVars(vars.color, lightTheme.color),
    ...assignVars(vars.editorColors, lightTheme.editorColors),
    ...assignVars(vars.shadow, lightTheme.shadow),
    ...assignVars(vars.dropShadow, lightTheme.dropShadow),
}

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
            vars: lightOverrides,
        },
    },
})

// 4. Automatic dark — OS preference, but never overrides an explicit root theme.
globalStyle(`:root:not([data-theme]):not(.${THEME_DARK_CLASS}):not(.${THEME_LIGHT_CLASS})`, {
    '@layer': {
        [themeLayer]: {
            '@media': {
                '(prefers-color-scheme: dark)': {
                    vars: darkOverrides,
                },
            },
        },
    },
})
