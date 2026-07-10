import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Drawer } from '@components/overlay/drawer/Drawer.tsx'

describe('Drawer.Section', () => {
    it('renders the uppercase title and children', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.Section title="Account">
                    <div>Profile</div>
                </Drawer.Section>
            </Drawer>,
        )

        expect(screen.getByText('Account')).toBeTruthy()
        expect(screen.getByText('Profile')).toBeTruthy()
    })

    it('forwards data-* attributes', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.Section title="Account" data-testid="section">
                    <div>Profile</div>
                </Drawer.Section>
            </Drawer>,
        )

        expect(screen.getByTestId('section')).toBeTruthy()
    })

    it('associates the title with the section via aria-labelledby', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.Section title="Account" data-testid="section">
                    <div>Profile</div>
                </Drawer.Section>
            </Drawer>,
        )

        const section = screen.getByTestId('section')
        const title = screen.getByText('Account')

        expect(section.getAttribute('aria-labelledby')).toBe(title.id)
    })
})
