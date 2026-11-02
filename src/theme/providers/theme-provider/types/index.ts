import type React from 'react'
import type { ThemeColor } from '@theme/tokens/colors/types/index.ts'

/** Built-in themes supported by the library. */
export type ThemeMode = 'light' | 'dark' | 'system'

/**
 * A consumer theme name. Consumers may provide custom names and define their
 * matching CSS variables in their own stylesheet.
 */
export type ThemeName = string

/** A theme name or the system preference sentinel. */
export type ThemeValue = ThemeName | 'system'

/** Defines whether ThemeProvider scopes the theme to a subtree or the document. */
export type ThemeProviderScope = 'subtree' | 'document'

export type ThemeProviderProps = Readonly<React.HTMLAttributes<HTMLDivElement> & {
    /**
     * Controlled theme name. Built-in values are `light`, `dark` and
     * `system`; consumers may provide any custom theme name.
     * When provided the component is fully controlled — pair it with
     * `onThemeChange` to react to programmatic changes triggered by child
     * components calling `setTheme` from `useTheme`.
     */
    theme?: ThemeValue

    /**
     * Initial theme name when the component is uncontrolled.
     * @default 'system'
     */
    defaultTheme?: ThemeValue

    /**
     * Scope of the theme attribute and runtime token overrides.
     * @default 'document'
     */
    scope?: ThemeProviderScope

    /**
     * Duration applied to every transition while the color scheme changes.
     * Set to `0` to disable the optional transition.
     * @default 0
     */
    themeTransitionDuration?: number

    /**
     * Called whenever the internal theme changes (uncontrolled) or whenever a
     * child calls `setTheme` (both modes).
     */
    onThemeChange?: (theme: ThemeValue) => void

    /**
     * Runtime color-token overrides injected as CSS custom properties on the
     * wrapper or document root according to `scope`. Every key is a semantic color token name (e.g.
     * `primary`, `ring`) and every value is any valid CSS color.
     *
     * @example
     * tokens={{ primary: 'oklch(0.55 0.2 180)', ring: 'oklch(0.55 0.2 180)' }}
     */
    tokens?: Partial<Record<ThemeColor, string>>
}>

/** Theme preference and resolved scheme exposed by `useTheme`. */
export type ThemeContextValue = Readonly<{
    /** Currently active theme name. `'system'` follows the OS preference. */
    theme: ThemeValue
    /** Concrete resolved theme name, never `'system'`. */
    resolvedTheme: string
    /** Requests a theme change; controlled providers notify their parent. */
    setTheme: (theme: ThemeValue) => void
}>
