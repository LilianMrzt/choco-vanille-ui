import { describe, expect, it } from 'vitest'

import { lightColors, vars } from '@theme'
import { getColorEntries } from '@theme/utils/getColorEntries.utils.ts'
import { getThemeTokenStyles } from '@theme/utils/getThemeTokenStyles.utils.ts'

describe('color leaf conversion', () => {
    it('uses the exact contract variable name for every supplied leaf', () => {
        const styles = getThemeTokenStyles(lightColors)

        expect(Object.keys(styles)).toHaveLength(156)
        for (const [path, reference] of getColorEntries(vars.color)) {
            const property = reference.slice(4, -1)
            expect(property).toBe(`--color-${path.replace('.', '-')}`)
            expect(typeof styles[property]).toBe('string')
        }
        expect(styles).not.toHaveProperty('--color-primary')
        expect(styles).not.toHaveProperty('--color-primaryActive')
    })

    it('omits absent and undefined leaves without deriving sibling overrides', () => {
        expect(getThemeTokenStyles({
            primary: { main: 'var(--brand)', hover: undefined },
            surface: { elevated: '#fff' },
            border: undefined,
            focusRing: 'currentColor',
        })).toEqual({
            '--color-primary-main': 'var(--brand)',
            '--color-surface-elevated': '#fff',
            '--color-focusRing': 'currentColor',
        })
        expect(getThemeTokenStyles()).toEqual({})
        expect(getThemeTokenStyles({ primary: undefined })).toEqual({})
    })

    it.each([
        null, [], 'red',
        { primary: 'red' },
        { primary: null },
        { primary: [] },
        { primary: { main: { nested: 'red' } } },
        { primary: { unknown: 'red' } },
        { primary: { main: 123 } },
        { primaryHover: 'red' },
        { foreground: undefined },
        { background: { main: 'red' } },
    ])('rejects invalid runtime overrides explicitly: %j', (tokens) => {
        expect(() => Reflect.apply(getThemeTokenStyles, undefined, [tokens])).toThrow(TypeError)
    })
})
