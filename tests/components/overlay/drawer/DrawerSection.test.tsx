import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Drawer } from '@components/overlay/drawer'

describe('Drawer.Section', () => {
    it('preserves title casing by default and renders children', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.Section title="Account">
                    <div>Profile</div>
                </Drawer.Section>
            </Drawer>,
        )

        expect(screen.getByText('Account')).toBeTruthy()
        expect(screen.getByText('Account').style.textTransform).toBe('')
        expect(screen.getByText('Profile')).toBeTruthy()
    })

    it('supports explicit title casing and keeps a custom accessible label ID', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.Section
                    title="Account"
                    titleProps={{ id: 'account-title', textTransform: 'uppercase' }}
                    data-testid="section"
                >
                    Profile
                </Drawer.Section>
            </Drawer>,
        )

        expect(screen.getByText('Account').style.textTransform).toBe('uppercase')
        expect(screen.getByTestId('section').getAttribute('aria-labelledby')).toBe('account-title')
    })

    it('uses a readable line height for single-line titles with descenders', () => {
        render(<Drawer.Section title="Navigation, typography" />)

        expect(screen.getByText('Navigation, typography').style.lineHeight).toBe('1.5')
    })

    it('preserves consumer title line-height overrides', () => {
        render(<Drawer.Section title="Navigation" titleProps={{ lineHeight: 2 }} />)

        expect(screen.getByText('Navigation').style.lineHeight).toBe('2')
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
