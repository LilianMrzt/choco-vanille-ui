import { palette } from '@theme/tokens/colors/palette.const.ts'
import type { ThemeColorAccent } from '@theme/tokens/colors/types/index.ts'

/**
 * Light-theme semantic UI colors: surfaces, text hierarchy, action and status
 * families, accents, borders, focus indicators, highlights, and placeholders.
 * Each action/status/accent family includes solid and subtle treatments with
 * hover/pressed states and matching foregrounds.
 *
 * These are raw CSS color values, not variable references. Use `vars.color.<token>`
 * in component styles so colors follow the active theme; rich-text palettes
 * are defined separately in `lightEditorColors`.
 */
export const lightColors = {
    primary: {
        main: palette.brand[600],
        hover: palette.brand[700],
        pressed: palette.brand[800],
        foreground: palette.neutral[0],
        subtle: palette.brand[50],
        subtleHover: palette.brand[100],
        subtlePressed: palette.brand[200],
        subtleForeground: palette.brand[800],
        border: palette.brand[600],
        subtleBorder: palette.brand[600],
    } as const satisfies ThemeColorAccent,
    secondary: {
        main: palette.secondary[600],
        hover: palette.secondary[700],
        pressed: palette.secondary[800],
        foreground: palette.neutral[0],
        subtle: palette.secondary[50],
        subtleHover: palette.secondary[100],
        subtlePressed: palette.secondary[200],
        subtleForeground: palette.secondary[900],
        border: palette.secondary[600],
        subtleBorder: palette.secondary[600],
    } as const satisfies ThemeColorAccent,
    neutral: {
        main: palette.neutral[100],
        hover: palette.neutral[200],
        pressed: palette.neutral[300],
        foreground: palette.neutral[900],
        subtle: palette.neutral[50],
        subtleHover: palette.neutral[100],
        subtlePressed: palette.neutral[200],
        subtleForeground: palette.neutral[900],
        border: palette.neutral[500],
        subtleBorder: palette.neutral[500],
    } as const satisfies ThemeColorAccent,
    success: {
        main: palette.green[700],
        hover: palette.green[800],
        pressed: palette.green[900],
        foreground: palette.neutral[0],
        subtle: palette.green[50],
        subtleHover: palette.green[100],
        subtlePressed: palette.green[200],
        subtleForeground: palette.green[900],
        border: palette.green[700],
        subtleBorder: palette.green[700],
    } as const satisfies ThemeColorAccent,
    warning: {
        main: palette.amber[700],
        hover: palette.amber[800],
        pressed: palette.amber[900],
        foreground: palette.neutral[0],
        subtle: palette.amber[50],
        subtleHover: palette.amber[100],
        subtlePressed: palette.amber[200],
        subtleForeground: palette.amber[900],
        border: palette.amber[700],
        subtleBorder: palette.amber[700],
    } as const satisfies ThemeColorAccent,
    info: {
        main: palette.blue[700],
        hover: palette.blue[800],
        pressed: palette.blue[900],
        foreground: palette.neutral[0],
        subtle: palette.blue[50],
        subtleHover: palette.blue[100],
        subtlePressed: palette.blue[200],
        subtleForeground: palette.blue[900],
        border: palette.blue[700],
        subtleBorder: palette.blue[700],
    } as const satisfies ThemeColorAccent,
    danger: {
        main: palette.red[700],
        hover: palette.red[800],
        pressed: palette.red[900],
        foreground: palette.neutral[0],
        subtle: palette.red[50],
        subtleHover: palette.red[100],
        subtlePressed: palette.red[200],
        subtleForeground: palette.red[900],
        border: palette.red[700],
        subtleBorder: palette.red[700],
    } as const satisfies ThemeColorAccent,
    accentPurple: {
        main: palette.purple[700],
        hover: palette.purple[800],
        pressed: palette.purple[900],
        foreground: palette.neutral[0],
        subtle: palette.purple[50],
        subtleHover: palette.purple[100],
        subtlePressed: palette.purple[200],
        subtleForeground: palette.purple[900],
        border: palette.purple[700],
        subtleBorder: palette.purple[700],
    } as const satisfies ThemeColorAccent,
    accentPink: {
        main: palette.pink[700],
        hover: palette.pink[800],
        pressed: palette.pink[900],
        foreground: palette.neutral[0],
        subtle: palette.pink[50],
        subtleHover: palette.pink[100],
        subtlePressed: palette.pink[200],
        subtleForeground: palette.pink[900],
        border: palette.pink[700],
        subtleBorder: palette.pink[700],
    } as const satisfies ThemeColorAccent,
    accentOrange: {
        main: palette.orange[700],
        hover: palette.orange[800],
        pressed: palette.orange[900],
        foreground: palette.neutral[0],
        subtle: palette.orange[50],
        subtleHover: palette.orange[100],
        subtlePressed: palette.orange[200],
        subtleForeground: palette.orange[900],
        border: palette.orange[700],
        subtleBorder: palette.orange[700],
    } as const satisfies ThemeColorAccent,
    accentTeal: {
        main: palette.teal[700],
        hover: palette.teal[800],
        pressed: palette.teal[900],
        foreground: palette.neutral[0],
        subtle: palette.teal[50],
        subtleHover: palette.teal[100],
        subtlePressed: palette.teal[200],
        subtleForeground: palette.teal[900],
        border: palette.teal[700],
        subtleBorder: palette.teal[700],
    } as const satisfies ThemeColorAccent,
    accentCyan: {
        main: palette.cyan[700],
        hover: palette.cyan[800],
        pressed: palette.cyan[900],
        foreground: palette.neutral[0],
        subtle: palette.cyan[50],
        subtleHover: palette.cyan[100],
        subtlePressed: palette.cyan[200],
        subtleForeground: palette.cyan[900],
        border: palette.cyan[700],
        subtleBorder: palette.cyan[700],
    } as const satisfies ThemeColorAccent,
    accentIndigo: {
        main: palette.indigo[600],
        hover: palette.indigo[700],
        pressed: palette.indigo[800],
        foreground: palette.neutral[0],
        subtle: palette.indigo[50],
        subtleHover: palette.indigo[100],
        subtlePressed: palette.indigo[200],
        subtleForeground: palette.indigo[900],
        border: palette.indigo[600],
        subtleBorder: palette.indigo[600],
    } as const satisfies ThemeColorAccent,
    currentColor: 'currentColor',
    transparent: 'transparent',
    background: palette.neutral[50],
    overlay: 'rgb(0 0 0 / 0.5)',
    focusRing: palette.brand[600],
    text: {
        primary: palette.neutral[950],
        secondary: palette.neutral[600],
        tertiary: palette.neutral[550],
    },
    surface: {
        main: palette.neutral[0],
        foreground: palette.neutral[950],
        elevated: palette.neutral[0],
        elevatedForeground: palette.neutral[950],
        muted: palette.neutral[100],
        mutedForeground: palette.neutral[550],
    },
    link: {
        main: palette.brand[600],
        hover: palette.brand[700],
        pressed: palette.brand[800],
    },
    border: {
        subtle: palette.neutral[200],
        muted: palette.neutral[300],
        main: palette.neutral[450],
        strong: palette.neutral[500],
        stronger: palette.neutral[600],
    },
    highlight: {
        main: palette.amber[200],
        foreground: palette.amber[900],
    },
    skeleton: {
        base: palette.neutral[200],
        highlight: palette.neutral[300],
    },
} as const

/**
 * Light-theme palettes for rich-text content, separate from semantic UI colors.
 * RichTextEditor offers seven named families with three tones (`dark`, `base`,
 * `light`); RichTextRenderer also uses the neutral family's default text tone.
 *
 * Use `vars.editorColors.<family>.<tone>` (for example, `vars.editorColors.ocean.base`)
 * instead of these raw values when content should follow theme changes.
 */
export const lightEditorColors = {
    ocean: {
        dark: palette.blue[700],
        base: palette.blue[500],
        light: palette.blue[300],
    },
    forest: {
        dark: palette.green[700],
        base: palette.green[500],
        light: palette.green[300],
    },
    sunset: {
        dark: palette.orange[700],
        base: palette.orange[500],
        light: palette.orange[300],
    },
    berry: {
        dark: palette.pink[700],
        base: palette.pink[500],
        light: palette.pink[300],
    },
    grape: {
        dark: palette.purple[700],
        base: palette.purple[500],
        light: palette.purple[300],
    },
    aqua: {
        dark: palette.teal[700],
        base: palette.teal[500],
        light: palette.teal[300],
    },
    neutral: {
        dark: palette.neutral[900],
        base: palette.neutral[700],
        light: palette.neutral[400],
    },
} as const
