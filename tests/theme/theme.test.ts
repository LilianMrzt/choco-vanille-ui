import { describe, expect, expectTypeOf, it } from 'vitest'

import {
    darkTheme,
    lightTheme,
    ThemeProvider,
    useTheme,
    vars,
    type Theme,
    type ThemeColor,
    type ThemeColorAccent,
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
import {
    PREFIX,
    RESET_LAYER,
    THEME_LAYER,
    THEME_LIGHT_CLASS,
    THEME_TRANSITION_DURATION_VAR,
} from '@theme/constants/index.ts'

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
        expect(vars.color.primary.main).toBe('var(--color-primary-main)')
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
        expect(THEME_DARK_CLASS).toBe('choco-vanille-theme-dark')
    })

    it('uses the library namespace for global theme identifiers', () => {
        expect(PREFIX).toBe('choco-vanille')
        expect(THEME_LIGHT_CLASS).toBe('choco-vanille-theme-light')
        expect(THEME_LAYER).toBe('choco-vanille.theme')
        expect(RESET_LAYER).toBe('choco-vanille.reset')
        expect(THEME_TRANSITION_DURATION_VAR).toBe('--choco-vanille-theme-transition-duration')
    })

    it('accepts both themes and custom values in the public theme type', () => {
        expectTypeOf(lightTheme).toMatchTypeOf<Theme>()
        expectTypeOf(darkTheme).toMatchTypeOf<Theme>()
        expectTypeOf<Theme['color']['primary']>().toEqualTypeOf<ThemeColorAccent>()
        expectTypeOf<Theme['color']['primary']['main']>().toEqualTypeOf<string>()
        expectTypeOf(lightTheme.color.primary.main).toEqualTypeOf<'#2563eb'>()
        expectTypeOf<Theme['editorColors']['ocean']['base']>().toEqualTypeOf<string>()
        expectTypeOf<ThemeVars>().toEqualTypeOf<typeof vars>()
        expectTypeOf<'primary.main'>().toMatchTypeOf<ThemeColor>()
        expectTypeOf<'danger.main' | 'neutral.main' | 'accentPurple.main' | 'focusRing' | 'currentColor' | 'transparent'>()
            .toMatchTypeOf<ThemeColor>()
        expectTypeOf<Extract<ThemeColor, 'destructive' | 'tertiary' | 'purple' | 'ring' | 'card' | 'text'>>()
            .toEqualTypeOf<never>()
        expectTypeOf<ThemeColors>().toEqualTypeOf<Theme['color']>()
        expectTypeOf<ThemeEditorColors>().toEqualTypeOf<Theme['editorColors']>()
        expectTypeOf<PublicThemeColors>().toEqualTypeOf<ThemeColors>()
        expectTypeOf<PublicThemeEditorColors>().toEqualTypeOf<ThemeEditorColors>()
        expectTypeOf<PublicThemeColorOverrides>().toEqualTypeOf<ThemeColorOverrides>()
        expectTypeOf<keyof ThemeColorOverrides>().toEqualTypeOf<keyof ThemeColors>()
        expectTypeOf<Extract<ThemeColor, 'primary' | 'surface' | 'primaryHover' | 'primary.subtle.main'>>()
            .toEqualTypeOf<never>()
        expectTypeOf<{ primary: { main: { nested: string } } }>().not.toMatchTypeOf<ThemeColorOverrides>()
    })

    it('accepts custom color and editor values without copying built-in literals', () => {
        const colorOverrides = {
            primary: { main: '#0f766e', foreground: '#ffffff' },
        } as const satisfies ThemeColorOverrides
        const colors = {
            ...lightTheme.color,
            primary: { ...lightTheme.color.primary, ...colorOverrides.primary },
        } satisfies ThemeColors
        const editorColors = {
            ...darkTheme.editorColors,
            ocean: { dark: '#075985', base: '#0284c7', light: '#7dd3fc' },
        } satisfies ThemeEditorColors
        const customTheme = { ...lightTheme, color: colors, editorColors } satisfies Theme

        expect(customTheme.color.primary.main).toBe('#0f766e')
        expect(customTheme.editorColors.ocean.base).toBe('#0284c7')
    })
})
