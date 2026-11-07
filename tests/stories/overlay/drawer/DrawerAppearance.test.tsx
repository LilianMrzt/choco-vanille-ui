import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import DrawerAppearance from '@stories/overlay/drawer/components/drawer-appearance/DrawerAppearance'
import { APPEARANCE_COLORS, APPEARANCE_VARIANTS } from '@stories/overlay/drawer/constants'
import source from '@stories/overlay/drawer/sources/DrawerAppearance.source.txt?raw'

describe('DrawerAppearance', () => {
    it('renders and documents every variant × color for both item APIs without size multiplication', () => {
        render(<DrawerAppearance />)
        const pairs = APPEARANCE_VARIANTS.length * APPEARANCE_COLORS.length
        expect(screen.getAllByRole('link')).toHaveLength(pairs)
        expect(screen.getAllByRole('button')).toHaveLength(pairs)
        expect(source.match(/<Drawer.NavItem\s/g)).toHaveLength(pairs)
        expect(source.match(/<Drawer.ActionItem\s/g)).toHaveLength(pairs)
        for (const variant of APPEARANCE_VARIANTS) {
            for (const color of APPEARANCE_COLORS) {
                expect(screen.getByRole('link', { name: `Navigate ${variant} ${color}` })).toBeTruthy()
                expect(screen.getByRole('button', { name: `Run ${variant} ${color}` })).toBeTruthy()
                expect(source).toContain(`label="Navigate ${variant} ${color}"`)
                expect(source).toContain(`label="Run ${variant} ${color}"`)
            }
        }
        expect(source.match(/size="full"/g)).toHaveLength(APPEARANCE_VARIANTS.length)
    })
})
