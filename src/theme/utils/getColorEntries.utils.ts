import { lightColors } from '@theme/tokens/colors/lightColors.const.ts'
import type { ThemeColor, ThemeColorOverrides } from '@theme/tokens/colors/types/index.ts'

/**
 * Lists supplied color leaves using their bounded semantic paths.
 * Undefined overrides are omitted; unknown keys and non-string leaves throw.
 *
 * @param colors - Complete colors or partial direct-leaf overrides.
 * @returns Supplied path/value pairs, without expanding absent branches.
 * @throws {TypeError} When the runtime input does not match the color schema.
 * @example
 * getColorEntries({ primary: { main: 'var(--brand)' } })
 */
export const getColorEntries = (colors: ThemeColorOverrides): ReadonlyArray<readonly [ThemeColor, string]> => {
    if (typeof colors !== 'object' || colors === null || Array.isArray(colors)) {
        throw new TypeError('Theme colors must be an object')
    }

    const entries: [ThemeColor, string][] = []

    for (const [group, value] of Object.entries(colors)) {
        if (!Object.hasOwn(lightColors, group)) {
            throw new TypeError(`Unknown theme color: ${group}`)
        }
        if (value === undefined) {
            continue
        }

        const schema = lightColors[group as keyof typeof lightColors]
        if (typeof schema === 'string') {
            if (typeof value !== 'string') {
                throw new TypeError(`Theme color ${group} must be a string`)
            }
            entries.push([group as ThemeColor, value])
            continue
        }
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
            throw new TypeError(`Theme color ${group} must contain direct color leaves`)
        }

        for (const [leaf, color] of Object.entries(value)) {
            if (!Object.hasOwn(schema, leaf)) {
                throw new TypeError(`Unknown theme color: ${group}.${leaf}`)
            }
            if (color === undefined) {
                continue
            }
            if (typeof color !== 'string') {
                throw new TypeError(`Theme color ${group}.${leaf} must be a string`)
            }
            entries.push([`${group}.${leaf}` as ThemeColor, color])
        }
    }

    return entries
}
