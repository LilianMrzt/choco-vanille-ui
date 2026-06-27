import type React from 'react'
import type { ThemeColor } from '@theme'

/** The three mode values understood by ThemeProvider. */
export type ThemeMode = 'light' | 'dark' | 'system'

export interface ThemeProviderProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Controlled theme mode.
     * When provided the component is fully controlled — pair it with
     * `onThemeChange` to react to programmatic changes triggered by child
     * components calling `setTheme` from `useTheme`.
     */
    theme?: ThemeMode

    /**
     * Initial theme mode when the component is uncontrolled.
     * @default 'system'
     */
    defaultTheme?: ThemeMode

    /**
     * Called whenever the internal mode changes (uncontrolled) or whenever a
     * child calls `setTheme` (both modes).
     */
    onThemeChange?: (theme: ThemeMode) => void

    /**
     * Runtime color-token overrides injected as CSS custom properties on the
     * wrapper element.  Every key is a semantic color token name (e.g.
     * `primary`, `ring`) and every value is any valid CSS color.
     *
     * @example
     * tokens={{ primary: 'oklch(0.55 0.2 180)', ring: 'oklch(0.55 0.2 180)' }}
     */
    tokens?: Partial<Record<ThemeColor, string>>
}
