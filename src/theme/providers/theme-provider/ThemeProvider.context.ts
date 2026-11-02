import { createContext } from 'react'
import type { ThemeContextValue } from '@theme/providers/theme-provider/types/index.ts'

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
