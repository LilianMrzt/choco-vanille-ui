import { addIcon } from '@iconify/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { Drawer } from '@components/overlay/drawer/Drawer.tsx'

beforeAll(() => {
    addIcon('lucide:home', {
        body: '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>',
        width: 24,
        height: 24,
    })
    addIcon('lucide:external-link', {
        body: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
        width: 24,
        height: 24,
    })
})

describe('Drawer.NavItem', () => {
    it('renders an anchor with the label', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.NavItem label="Dashboard" href="/dashboard" />
            </Drawer>,
        )

        const link = screen.getByRole('link', { name: 'Dashboard' })
        expect(link).toBeTruthy()
        expect(link.getAttribute('href')).toBe('/dashboard')
    })

    it('renders a start icon', () => {
        const { container } = render(
            <Drawer defaultOpen>
                <Drawer.NavItem label="Home" startIcon="lucide:home" />
            </Drawer>,
        )

        expect(container.querySelector('svg')).toBeTruthy()
    })

    it('renders an end icon', () => {
        const { container } = render(
            <Drawer defaultOpen>
                <Drawer.NavItem label="External" endIcon="lucide:external-link" />
            </Drawer>,
        )

        expect(container.querySelectorAll('svg')).toHaveLength(1)
    })

    it('marks the item as current when active', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.NavItem label="Active" active />
            </Drawer>,
        )

        expect(screen.getByRole('link', { name: 'Active' }).getAttribute('aria-current')).toBe('page')
    })

    it('disables the item', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.NavItem label="Disabled" disabled />
            </Drawer>,
        )

        expect(screen.getByRole('link', { name: 'Disabled' }).getAttribute('aria-disabled')).toBe('true')
    })

    it('calls onClick and prevents default navigation', async () => {
        const onClick = vi.fn()
        render(
            <Drawer defaultOpen>
                <Drawer.NavItem label="Click me" href="/click" onClick={onClick} />
            </Drawer>,
        )

        await userEvent.click(screen.getByRole('link', { name: 'Click me' }))

        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('forwards data-* attributes', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.NavItem label="Test" data-testid="nav-item" />
            </Drawer>,
        )

        expect(screen.getByTestId('nav-item')).toBeTruthy()
    })
})
