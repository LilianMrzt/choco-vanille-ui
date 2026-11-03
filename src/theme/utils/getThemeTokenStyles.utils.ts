import type { ThemeColorOverrides } from '@theme/tokens/colors/types/index.ts'
import { getColorEntries } from '@theme/utils/getColorEntries.utils.ts'

/**
 * Converts supplied leaves to the same custom-property names as the contract.
 *
 * @param tokens - Optional semantic color overrides.
 * @returns Only supplied CSS declarations; other leaves stay inherited.
 * @example
 * getThemeTokenStyles({ primary: { main: '#0f766e' } })
 */
export const getThemeTokenStyles = (tokens?: ThemeColorOverrides): Record<string, string> =>
    Object.fromEntries(getColorEntries(tokens === undefined ? {} : tokens).map(([path, value]) => [
        `--color-${path.replace('.', '-')}`,
        value,
    ]))
