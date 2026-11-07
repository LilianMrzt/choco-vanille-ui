import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Appearance, Sizes } from '@stories/overlay/panel/Panel.stories'
import PanelAppearance from '@stories/overlay/panel/components/panel-appearance/PanelAppearance'
import PanelWidths from '@stories/overlay/panel/components/panel-widths/PanelWidths'
import appearanceSource from '@stories/overlay/panel/sources/PanelAppearance.source.txt?raw'
import sizesSource from '@stories/overlay/panel/sources/PanelSizes.source.txt?raw'

describe('PanelAppearance', () => {
    it('separates placement from size comparisons and their consumer snippets', () => {
        expect(Appearance.render).toBe(PanelAppearance)
        expect(Sizes.render).toBe(PanelWidths)
        const { rerender } = render(<PanelAppearance />)
        expect(screen.getByRole('button', { name: 'Open left panel' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Open right panel' })).toBeTruthy()
        expect(screen.queryByRole('button', { name: 'Open wide panel' })).toBeNull()
        expect(appearanceSource).not.toContain('width="42rem"')

        rerender(<PanelWidths />)
        expect(screen.getAllByRole('button')).toHaveLength(2)
        expect(screen.getByRole('button', { name: 'Open narrow panel' })).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Open wide panel' })).toBeTruthy()
        expect(sizesSource.match(/<Panel>/g)).toHaveLength(2)
        expect(sizesSource).toContain('width="20rem"')
        expect(sizesSource).toContain('width="42rem"')
    })
})
