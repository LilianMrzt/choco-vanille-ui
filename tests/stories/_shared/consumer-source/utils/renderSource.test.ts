import { describe, expect, it } from 'vitest'

import { renderSource } from '@stories/_shared/consumer-source/utils/renderSource.utils'

describe('renderSource', () => {
    it('substitutes repeated placeholders while preserving JSX expression braces', () => {
        expect(renderSource(' \n<Box width={{{width}}}>{{width}}</Box>\n ', { width: '"100%"' }))
            .toBe('<Box width={"100%"}>"100%"</Box>')
    })

    it('preserves replacement metacharacters and does not interpret inserted placeholders', () => {
        const value = '"$& $` $\' {{other}}"'
        expect(renderSource('{{value}} {{other}}', { value, other: 'done' }))
            .toBe(value + ' done')
    })

    it('accepts empty fragments for omitted attributes', () => {
        expect(renderSource('<Box{{attribute}} />', { attribute: '' })).toBe('<Box />')
    })

    it('reports missing placeholders, including inherited object properties', () => {
        expect(() => renderSource('{{missing}}', {})).toThrow('Missing consumer source value: missing')
        expect(() => renderSource('{{toString}}', {})).toThrow('Missing consumer source value: toString')
    })
})
