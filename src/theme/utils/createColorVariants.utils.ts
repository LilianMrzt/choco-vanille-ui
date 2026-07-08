import { vars } from '@theme/contract.css.ts'
import type { LightColors } from '@theme/colors/index.ts'

/**
 * Generates a recipe variant map for every semantic color token in the theme,
 * plus a `transparent` option.
 * Useful when a component should accept any theme color as a prop.
 *
 * @param property - The CSS property to set (e.g. 'background', 'color', 'borderColor').
 * @param extra
 * @returns A record suitable for use inside a Vanilla Extract recipe's `variants`.
 *
 * @example
 * variants: {
 *   backgroundColor: createColorVariants('background'),
 * }
 */
export const createColorVariants = <
  TExtra extends Record<string, string> = Record<never, never>,
>(
        property: 'background' | 'backgroundColor' | 'color' | 'borderColor',
        extra?: TExtra,
    ) => {
    const colorKeys = Object.keys(vars.color) as (keyof LightColors)[]

    const variants: Record<string, Record<string, string>> = Object.fromEntries(
        colorKeys.map((key) => [key, { [property]: vars.color[key] }]),
    )

    variants.transparent = { [property]: 'transparent' }

    if (extra) {
        for (const [key, value] of Object.entries(extra)) {
            variants[key] = { [property]: value }
        }
    }

    return variants as Record<
    keyof LightColors | 'transparent' | keyof TExtra,
    Record<string, string>
  >
}
