import { describe, expect, it } from 'vitest'

import { createLinkSource } from '@stories/navigation/link/utils/create-link-source/createLinkSource.utils'

describe('createLinkSource', () => {
    it('reflects current link controls and preserves empty and zero values', () => {
        const source = createLinkSource('', {
            args: { label: 'Open "settings"', href: '', fontSize: 16, margin: 0, target: '_blank', 'aria-disabled': true },
        })

        expect(source).toContain('label={"Open \\"settings\\""}')
        expect(source).toContain('href={""}')
        expect(source).toContain('fontSize={16}')
        expect(source).toContain('margin={0}')
        expect(source).toContain('target={"_blank"}')
        expect(source).toContain('aria-disabled={true}')
        expect(source).not.toContain('{{attributes}}')
    })
})
