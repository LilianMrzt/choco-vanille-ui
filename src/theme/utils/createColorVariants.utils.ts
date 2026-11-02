import { vars } from '@theme/styles/contract/contract.css.ts'
import type { LightColors } from '@theme/tokens/colors/types/index.ts'

/**
 * Generates a recipe variant map for every semantic color token in the theme,
 * plus a `transparent` option.
 * Useful when a component should accept any theme color as a prop.
 *
 * @param property - The CSS property to set (e.g. 'background', 'color', 'borderColor').
 * @param extra - Additional variant names and CSS values.
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
    ): Record<keyof LightColors | 'transparent' | Extract<keyof TExtra, string>, Record<string, string>> => {
    const variants: Record<string, Record<string, string>> = Object.fromEntries(
        Object.entries(vars.color).map(([key, value]) => [key, { [property]: value }]),
    )

    variants.transparent = { [property]: 'transparent' }

    if (extra) {
        for (const [key, value] of Object.entries(extra)) {
            variants[key] = { [property]: value }
        }
    }

    // Object.fromEntries cannot retain the known keys of the theme contract.
    return variants as Record<
        keyof LightColors | 'transparent' | Extract<keyof TExtra, string>,
        Record<string, string>
    >
}
