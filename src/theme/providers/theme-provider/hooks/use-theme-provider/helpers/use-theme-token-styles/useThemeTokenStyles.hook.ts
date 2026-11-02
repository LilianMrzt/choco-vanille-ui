import { useMemo, type CSSProperties } from 'react'
import type { ThemeTokens } from '@theme/providers/theme-provider/hooks/use-theme-provider/types'

/**
 * Converts semantic color tokens into inline CSS custom properties.
 *
 * @param tokens - Optional semantic color overrides.
 * @returns Inline custom properties for a subtree.
 * @example
 * const styles = useThemeTokenStyles({ primary: 'red' })
 */
export const useThemeTokenStyles = (tokens?: ThemeTokens): CSSProperties => useMemo<CSSProperties>(() => {
    if (!tokens) {
        return {}
    }

    return Object.entries(tokens).reduce<Record<string, string>>(
        (styles, [key, value]) => {
            if (value !== undefined) {
                styles[`--color-${key}`] = value
            }
            return styles
        },
        {},
    )
}, [tokens])
