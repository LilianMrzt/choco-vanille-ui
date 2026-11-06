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
    it('exposes the exact numeric spacing scale without named aliases', () => {
        expect(lightTheme.space).toEqual({
            0: '0', 1: '1px', 2: '0.125rem', 4: '0.25rem',
            6: '0.375rem', 8: '0.5rem', 10: '0.625rem', 12: '0.75rem',
            14: '0.875rem', 16: '1rem', 18: '1.125rem', 20: '1.25rem',
            24: '1.5rem', 28: '1.75rem', 32: '2rem', 48: '3rem',
            64: '4rem', 80: '5rem', 96: '6rem', 112: '7rem', 128: '8rem',
        })
    })

    it('keeps font-size and radius values under numeric keys', () => {
        expect(lightTheme.fontSize).toEqual({
            10: '0.625rem', 12: '0.75rem', 14: '0.875rem', 16: '1rem',
            18: '1.125rem', 20: '1.25rem', 24: '1.5rem', 30: '1.875rem',
            36: '2.25rem', 48: '3rem', 60: '3.75rem', 72: '4.5rem',
        })
        expect(lightTheme.radius).toEqual({
            0: '0', 4: '0.25rem', 6: '0.375rem', 8: '0.5rem',
            10: '0.625rem', 14: '0.875rem', 20: '1.25rem', full: '9999px',
        })
    })

    it('types token indices as finite numeric scales', () => {
        expectTypeOf<keyof Theme['space']>().toEqualTypeOf<
            0 | 1 | 2 | 4 | 6 | 8 | 10 | 12 | 14 | 16 | 18 | 20 | 24 | 28 | 32 | 48 | 64 | 80 | 96 | 112 | 128
        >()
        expectTypeOf<keyof Theme['fontSize']>().toEqualTypeOf<
            10 | 12 | 14 | 16 | 18 | 20 | 24 | 30 | 36 | 48 | 60 | 72
        >()
        expectTypeOf<keyof Theme['radius']>().toEqualTypeOf<0 | 4 | 6 | 8 | 10 | 14 | 20 | 'full'>()
        expect(vars.space[16]).toBe('var(--space-16)')
        expect(vars.space[80]).toBe('var(--space-80)')
        expect(vars.space[112]).toBe('var(--space-112)')
        expect(vars.fontSize[14]).toBe('var(--fontSize-14)')
        expect(vars.radius[8]).toBe('var(--radius-8)')
        expect(vars.radius.full).toBe('var(--radius-full)')
    })

    it('provides the same six shadow levels in both modes', () => {
        for (const theme of [lightTheme, darkTheme]) {
            for (const family of ['shadow', 'dropShadow'] as const) {
                expect(Object.keys(theme[family])).toEqual(['none', 'xs', 'sm', 'md', 'lg', 'xl'])
                expect(theme[family].none).toBe('none')
            }
            expect(lightTheme.shadow.xs).toBe('0 1px 2px 0 rgb(0 0 0 / 0.05)')
            expect(darkTheme.shadow.xs).toBe('0 1px 2px 0 rgb(0 0 0 / 0.3)')
            expect(lightTheme.dropShadow.xs).toBe('drop-shadow(0 1px 2px rgb(0 0 0 / 0.05))')
            expect(darkTheme.dropShadow.xs).toBe('drop-shadow(0 1px 2px rgb(0 0 0 / 0.3))')
            expect(vars.shadow.xs).toBe('var(--shadow-xs)')
            expect(vars.dropShadow.xs).toBe('var(--dropShadow-xs)')
        }
        expect(lightTheme.shadow.md).toBe('0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)')
        expect(darkTheme.shadow.md).toBe('0 4px 6px -1px rgb(0 0 0 / 0.5), 0 2px 4px -2px rgb(0 0 0 / 0.5)')
    })

    it('removes line-height and tracking from theme values, variables and types', () => {
        for (const theme of [lightTheme, darkTheme, vars]) {
            expect(theme).not.toHaveProperty('lineHeight')
            expect(theme).not.toHaveProperty('letterSpacing')
        }
        expectTypeOf<Extract<keyof Theme, 'lineHeight' | 'letterSpacing'>>().toEqualTypeOf<never>()
        expectTypeOf<Extract<keyof Theme['space'], 'md' | 'lg' | 'px'>>().toEqualTypeOf<never>()
    })

    it('keeps shared non-color token values identical across themes', () => {
        for (const category of [
            'space', 'radius', 'fontFamily', 'fontSize', 'fontWeight',
            'zIndex', 'duration', 'easing',
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
        expect(vars.space[12]).toBe('var(--space-12)')
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
        expectTypeOf(lightTheme.color.primary.main).toEqualTypeOf<'#2961ed'>()
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
