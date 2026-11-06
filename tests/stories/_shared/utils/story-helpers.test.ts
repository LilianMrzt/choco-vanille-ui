import { describe, expect, it } from 'vitest'

import { md } from '@stories/_shared/utils/markdown'
import { storySource } from '@stories/_shared/utils/storySource'

describe('shared Storybook helpers', () => {
    it('preserves Markdown text, escapes and interpolated values', () => {
        expect(md`# Title

| \`name\` | ${'value'} | ${0} |`).toBe('# Title\n\n| `name` | value | 0 |')
    })

    it('provides trimmed TSX source parameters for static examples', () => {
        expect(storySource('\n  <Example />\n')).toEqual({
            source: {
                code: '<Example />',
                language: 'tsx',
                type: 'code',
            },
        })
    })
})
