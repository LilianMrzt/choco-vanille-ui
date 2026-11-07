import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Appearance, FontSizes } from '@stories/navigation/link/Link.stories'
import LinkAppearance from '@stories/navigation/link/components/link-appearance/LinkAppearance'
import LinkFontSizes from '@stories/navigation/link/components/link-font-sizes/LinkFontSizes'
import { FONT_SIZES } from '@stories/navigation/link/constants'
import appearanceSource from '@stories/navigation/link/sources/LinkAppearance.source.txt?raw'
import fontSizesSource from '@stories/navigation/link/sources/LinkFontSizes.source.txt?raw'

describe('LinkAppearance', () => {
    it('keeps font sizes in a dedicated story with matching consumer source', () => {
        expect(Appearance.render).toBe(LinkAppearance)
        expect(FontSizes.render).toBe(LinkFontSizes)
        const { rerender } = render(<LinkAppearance />)
        expect(screen.queryByRole('link', { name: '72' })).toBeNull()
        expect(appearanceSource).not.toContain('fontSize=')

        rerender(<LinkFontSizes />)
        expect(screen.getAllByRole('link')).toHaveLength(FONT_SIZES.length)
        expect(fontSizesSource.match(/<Link\s/g)).toHaveLength(FONT_SIZES.length)
        for (const fontSize of FONT_SIZES) {
            expect(screen.getByRole('link', { name: String(fontSize) })).toBeTruthy()
            expect(fontSizesSource).toContain(`fontSize={${fontSize}}`)
        }
    })
})
