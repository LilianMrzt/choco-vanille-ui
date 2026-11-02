import { describe, expect, expectTypeOf, it } from 'vitest'

import {
    darkTheme,
    lightTheme,
    ThemeProvider,
    useTheme,
    vars,
    type Theme,
    type ThemeColor,
    type ThemeVars,
} from '@theme'
import {
    darkTheme as publicDarkTheme,
    lightTheme as publicLightTheme,
    ThemeProvider as publicThemeProvider,
    THEME_DARK_CLASS,
    useTheme as publicUseTheme,
    vars as publicVars,
} from '@/index.ts'

const getTokenPaths = (value: object, prefix = ''): string[] =>
    Object.entries(value).flatMap(([key, token]) => {
        const path = prefix ? `${prefix}.${key}` : key

        return typeof token === 'string' ? [path] : getTokenPaths(token, path)
    })

describe('theme', () => {
    it('provides the same token paths in both themes and the variable contract', () => {
        const lightPaths = getTokenPaths(lightTheme).sort()

        expect(getTokenPaths(darkTheme).sort()).toEqual(lightPaths)
        expect(getTokenPaths(vars).sort()).toEqual(lightPaths)
    })

    it('preserves public CSS variable names and built-in token values', () => {
        expect(vars.color.primary).toBe('var(--color-primary)')
        expect(vars.editorColors.ocean.base).toBe('var(--editorColors-ocean-base)')
        expect(vars.space.md).toBe('var(--space-md)')
        expect(lightTheme.color.background).not.toBe(darkTheme.color.background)
    })

    it('exposes the theme and contract through the package entry', () => {
        expect(publicLightTheme).toBe(lightTheme)
        expect(publicDarkTheme).toBe(darkTheme)
        expect(publicVars).toBe(vars)
        expect(publicThemeProvider).toBe(ThemeProvider)
        expect(publicUseTheme).toBe(useTheme)
        expect(THEME_DARK_CLASS).toBe('aurora-theme-dark')
    })

    it('accepts both themes and custom values in the public theme type', () => {
        expectTypeOf(lightTheme).toMatchTypeOf<Theme>()
        expectTypeOf(darkTheme).toMatchTypeOf<Theme>()
        expectTypeOf<Theme['color']['primary']>().toEqualTypeOf<string>()
        expectTypeOf<Theme['editorColors']['ocean']['base']>().toEqualTypeOf<string>()
        expectTypeOf<ThemeVars>().toEqualTypeOf<typeof vars>()
        expectTypeOf<'primary'>().toMatchTypeOf<ThemeColor>()
    })
})
