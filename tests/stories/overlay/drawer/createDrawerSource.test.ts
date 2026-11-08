import { describe, expect, it } from 'vitest'
import { createDrawerSource } from '@stories/overlay/drawer/utils/create-drawer-source/createDrawerSource.utils'

describe('createDrawerSource', () => {
    it('reflects drawer and slot controls', () => {
        const source = createDrawerSource('', { args: { open: true, mode: 'mini', showNavigation: true, firstNavItemLabel: 'Home', navItemColor: 'primary' } })
        expect(source).toContain('useState(true)')
        expect(source).toContain('mode={"mini"}')
        expect(source).toContain('label={"Home"}')
        expect(source).not.toContain('Drawer.Collapsible')
    })

    it('reflects layout, title casing and the renamed collapsible controls', () => {
        const source = createDrawerSource('', {
            args: {
                showHeader: true,
                showFooter: true,
                showSettings: true,
                headerGap: 16,
                bodyGap: 20,
                footerGap: 12,
                sectionTitleTransform: 'uppercase',
                collapsibleLabel: 'Account',
                collapsibleDefaultExpanded: true,
            },
        })

        expect(source).toContain('<Drawer.Header gap={16}>')
        expect(source).toContain('aria-label="Main navigation" gap={20}')
        expect(source).toContain('<Drawer.Footer gap={12}')
        expect(source).toContain('titleProps={{ lineHeight: undefined, textTransform: "uppercase" }}')
        expect(source).toContain('<Drawer.Collapsible label={"Account"}')
        expect(source).toContain('defaultExpanded={true}')
    })

    it('generates safe compound title source matching its controls', () => {
        const source = createDrawerSource('', {
            args: {
                showNavigation: true,
                navigationTitle: 'Navigation < & "settings"',
                sectionTitleLineHeight: 2,
                sectionTitleTransform: 'none',
            },
        })

        expect(source).toContain('<Drawer.SectionTitle lineHeight={2} textTransform={"none"}>{"Navigation < & \\"settings\\""}</Drawer.SectionTitle>')
    })
})
