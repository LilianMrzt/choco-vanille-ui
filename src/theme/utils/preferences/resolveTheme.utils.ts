import type { ThemeValue } from '@theme/providers/theme-provider/types/index.ts'

/**
 * Resolves a system preference while preserving explicit and custom names.
 *
 * @param mode - Active preference or custom theme name.
 * @param systemTheme - Current system color scheme.
 * @returns The concrete theme name.
 * @example
 * const theme = resolveTheme('system', 'dark')
 */
export const resolveTheme = (mode: ThemeValue, systemTheme: 'light' | 'dark'): string =>
    mode === 'system' ? systemTheme : mode
