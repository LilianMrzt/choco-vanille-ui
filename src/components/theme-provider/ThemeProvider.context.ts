import { createContext, useContext } from 'react'
import type { ThemeValue } from '@components/theme-provider/types/ThemeProvider.props.ts'

export interface ThemeContextValue {
    /** Currently active theme name. `'system'` follows the OS preference. */
    theme: ThemeValue

    /**
     * The concrete resolved theme name, never `'system'`. Useful for
     * conditional rendering that depends on the actual visual state.
     */
    resolvedTheme: string

    /**
     * Change the active theme.
     * - In **uncontrolled** mode this updates internal state.
     * - In **controlled** mode (`theme` prop is provided) it only fires
     *   `onThemeChange`; the parent is responsible for updating `theme`.
     */
    setTheme: (theme: ThemeValue) => void
}

/**
 * Default context value used when `useTheme` is called outside a
 * `ThemeProvider`.  Falls back to `'system'` / `'light'` so the hook is
 * always safe to call.
 */
const defaultContext: ThemeContextValue = {
    theme: 'system',
    resolvedTheme: 'light',
    setTheme: () => undefined,
}

export const ThemeContext = createContext<ThemeContextValue>(defaultContext)

/**
 * Returns the nearest `ThemeProvider` context.
 *
 * Safe to call outside a provider — returns `{ theme: 'system', resolvedTheme:
 * 'light', setTheme: noop }` as a fallback.
 *
 * @example
 * const { resolvedTheme, setTheme } = useTheme()
 */
export const useTheme = (): ThemeContextValue => useContext(ThemeContext)
