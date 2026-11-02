import { useContext } from 'react'

import { ThemeContext } from '@theme/providers/theme-provider/ThemeProvider.context.ts'
import type { ThemeContextValue } from '@theme/providers/theme-provider/types/index.ts'

/**
 * Returns the nearest theme context.
 *
 * Outside a provider, returns the system preference, a light resolved theme
 * and a no-op setter.
 *
 * @returns The current preference, resolved theme and change function.
 * @example
 * const { resolvedTheme, setTheme } = useTheme()
 */
export const useTheme = (): ThemeContextValue => useContext(ThemeContext)
