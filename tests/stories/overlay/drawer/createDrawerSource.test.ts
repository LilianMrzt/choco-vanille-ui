import { describe, expect, it } from 'vitest'
import { createDrawerSource } from '@stories/overlay/drawer/utils/create-drawer-source/createDrawerSource.utils'

describe('createDrawerSource', () => {
    it('reflects drawer and slot controls', () => {
        const source = createDrawerSource('', { args: { open: true, mode: 'mini', showNavigation: true, firstNavItemLabel: 'Home', navItemColor: 'primary' } })
        expect(source).toContain('useState(true)')
        expect(source).toContain('mode={"mini"}')
        expect(source).toContain('label={"Home"}')
        expect(source).not.toContain('Drawer.SectionItem')
    })
})
