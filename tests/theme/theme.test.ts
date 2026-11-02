import { describe, expect, expectTypeOf, it } from 'vitest'

import {
    darkTheme,
    lightTheme,
    ThemeProvider,
    useTheme,
    vars,
    type Theme,
    type ThemeColor,
    type ThemeColorOverrides,
    type ThemeColors,
    type ThemeEditorColors,
    type ThemeVars,
} from '@theme'
import {
    darkTheme as publicDarkTheme,
    lightTheme as publicLightTheme,
    ThemeProvider as publicThemeProvider,
    THEME_DARK_CLASS,
    useTheme as publicUseTheme,
    vars as publicVars,
    type ThemeColors as PublicThemeColors,
    type ThemeEditorColors as PublicThemeEditorColors,
    type ThemeColorOverrides as PublicThemeColorOverrides,
} from '@/index.ts'

const getTokenPaths = (value: object, prefix = ''): string[] =>
    Object.entries(value).flatMap(([key, token]) => {
        const path = prefix ? `${prefix}.${key}` : key

        return typeof token === 'string' ? [path] : getTokenPaths(token, path)
    })

describe('theme', () => {
    it('keeps shared non-color token values identical across themes', () => {
        for (const category of [
            'space', 'radius', 'fontFamily', 'fontSize', 'fontWeight',
            'lineHeight', 'letterSpacing', 'zIndex', 'duration', 'easing',
        ] as const) {
            expect(darkTheme[category]).toEqual(lightTheme[category])
        }
    })

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
        expectTypeOf<'danger' | 'neutral' | 'accentPurple' | 'focusRing' | 'currentColor' | 'transparent'>()
            .toMatchTypeOf<ThemeColor>()
        expectTypeOf<Extract<ThemeColor, 'destructive' | 'tertiary' | 'purple' | 'ring' | 'card' | 'text'>>()
            .toEqualTypeOf<never>()
        expectTypeOf<ThemeColors>().toEqualTypeOf<Theme['color']>()
        expectTypeOf<ThemeEditorColors>().toEqualTypeOf<Theme['editorColors']>()
        expectTypeOf<PublicThemeColors>().toEqualTypeOf<ThemeColors>()
        expectTypeOf<PublicThemeEditorColors>().toEqualTypeOf<ThemeEditorColors>()
        expectTypeOf<PublicThemeColorOverrides>().toEqualTypeOf<ThemeColorOverrides>()
        expectTypeOf<keyof ThemeColorOverrides>().toEqualTypeOf<ThemeColor>()
    })

    it('accepts custom color and editor values without copying built-in literals', () => {
        const colorOverrides = {
            primary: '#0f766e',
            primaryForeground: '#ffffff',
        } as const satisfies ThemeColorOverrides
        const colors = { ...lightTheme.color, ...colorOverrides } satisfies ThemeColors
        const editorColors = {
            ...darkTheme.editorColors,
            ocean: { dark: '#075985', base: '#0284c7', light: '#7dd3fc' },
        } satisfies ThemeEditorColors
        const customTheme = { ...lightTheme, color: colors, editorColors } satisfies Theme

        expect(customTheme.color.primary).toBe('#0f766e')
        expect(customTheme.editorColors.ocean.base).toBe('#0284c7')
    })
})
