import { useMemo, type CSSProperties } from 'react'
import type { ThemeColorOverrides } from '@theme/tokens/colors/types/index.ts'
import { getThemeTokenStyles } from '@theme/utils/getThemeTokenStyles.utils.ts'

/**
 * Converts semantic color tokens into inline CSS custom properties.
 *
 * @param tokens - Optional semantic color overrides.
 * @returns Inline custom properties for a subtree.
 * @example
 * const styles = useThemeTokenStyles({ primary: { main: 'red' } })
 */
export const useThemeTokenStyles = (tokens?: ThemeColorOverrides): CSSProperties =>
    useMemo(() => getThemeTokenStyles(tokens), [tokens])
