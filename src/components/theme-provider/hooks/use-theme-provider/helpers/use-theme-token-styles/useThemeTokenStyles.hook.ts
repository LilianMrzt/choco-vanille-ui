import { useMemo, type CSSProperties } from 'react'
import type { ThemeTokens } from '@components/theme-provider/hooks/use-theme-provider/types'

/**
 * Converts semantic color tokens into inline CSS custom properties.
 */
export const useThemeTokenStyles = (tokens?: ThemeTokens) => useMemo<CSSProperties>(() => {
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
    ) as CSSProperties
}, [tokens])
