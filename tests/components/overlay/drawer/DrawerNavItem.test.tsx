import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Drawer } from '@components/overlay/drawer/Drawer.tsx'
import UserIcon from '@resources/asset/UserIcon.svg?react'

describe('Drawer.NavItem', () => {
    it('renders an anchor with the label', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.NavItem
                    label="Dashboard"
                    href="/dashboard"
                    startIcon={UserIcon}
                />
            </Drawer>,
        )

        const link = screen.getByRole('link', { name: 'Dashboard' })
        expect(link).toBeTruthy()
        expect(link.getAttribute('href')).toBe('/dashboard')
    })

    it('renders a start icon', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.NavItem label="Home" startIcon={UserIcon} />
            </Drawer>,
        )

        expect(document.querySelector('svg')).toBeTruthy()
    })

    it('renders trailing content', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.NavItem
                    label="External"
                    startIcon={UserIcon}
                    trailing={<span data-testid="trailing">↗</span>}
                />
            </Drawer>,
        )

        expect(document.querySelectorAll('svg')).toHaveLength(1)
        expect(screen.getByTestId('trailing')).toBeTruthy()
    })

    it('marks the item as current when active', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.NavItem label="Active" startIcon={UserIcon} active />
            </Drawer>,
        )

        expect(
            screen.getByRole('link', { name: 'Active' }).getAttribute('aria-current'),
        ).toBe('page')
    })

    it('disables the item', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.NavItem label="Disabled" startIcon={UserIcon} disabled />
            </Drawer>,
        )

        const link = screen.getByRole('link', { name: 'Disabled' })

        expect(link.getAttribute('aria-disabled')).toBe('true')
    })

    it('calls onClick and prevents default navigation', async () => {
        const onClick = vi.fn()
        render(
            <Drawer defaultOpen>
                <Drawer.NavItem
                    label="Click me"
                    href="/click"
                    startIcon={UserIcon}
                    onClick={onClick}
                />
            </Drawer>,
        )

        await userEvent.click(screen.getByRole('link', { name: 'Click me' }))

        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('forwards data-* attributes', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.NavItem
                    label="Test"
                    startIcon={UserIcon}
                    data-testid="nav-item"
                />
            </Drawer>,
        )

        expect(screen.getByTestId('nav-item')).toBeTruthy()
    })
})
