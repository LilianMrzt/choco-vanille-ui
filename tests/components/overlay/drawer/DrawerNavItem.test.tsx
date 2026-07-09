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
    addIcon('lucide:user', {
        body: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        width: 24,
        height: 24,
    })
})

describe('Drawer.NavItem', () => {
    it('renders an anchor with the label', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.NavItem label="Dashboard" href="/dashboard" startIcon="lucide:home" />
            </Drawer>,
        )

        const link = screen.getByRole('link', { name: 'Dashboard' })
        expect(link).toBeTruthy()
        expect(link.getAttribute('href')).toBe('/dashboard')
    })

    it('renders a start icon', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.NavItem label="Home" startIcon="lucide:home" />
            </Drawer>,
        )

        expect(document.querySelector('svg')).toBeTruthy()
    })

    it('renders an end icon', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.NavItem label="External" startIcon="lucide:home" endIcon="lucide:external-link" />
            </Drawer>,
        )

        expect(document.querySelectorAll('svg')).toHaveLength(2)
    })

    it('marks the item as current when active', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.NavItem label="Active" startIcon="lucide:home" active />
            </Drawer>,
        )

        expect(screen.getByRole('link', { name: 'Active' }).getAttribute('aria-current')).toBe('page')
    })

    it('disables the item', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.NavItem label="Disabled" startIcon="lucide:home" disabled />
            </Drawer>,
        )

        expect(screen.getByRole('link', { name: 'Disabled' }).getAttribute('aria-disabled')).toBe('true')
    })

    it('calls onClick and prevents default navigation', async () => {
        const onClick = vi.fn()
        render(
            <Drawer defaultOpen>
                <Drawer.NavItem label="Click me" href="/click" startIcon="lucide:home" onClick={onClick} />
            </Drawer>,
        )

        await userEvent.click(screen.getByRole('link', { name: 'Click me' }))

        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('forwards data-* attributes', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.NavItem label="Test" startIcon="lucide:home" data-testid="nav-item" />
            </Drawer>,
        )

        expect(screen.getByTestId('nav-item')).toBeTruthy()
    })

    it('hides the label in collapsed mini mode', () => {
        render(
            <Drawer defaultOpen={false} mode="mini">
                <Drawer.NavItem label="Dashboard" href="/dashboard" startIcon="lucide:home" />
            </Drawer>,
        )

        expect(screen.queryByText('Dashboard')).toBeNull()
        expect(screen.getByRole('link').getAttribute('aria-label')).toBe('Dashboard')
    })
})
