import { addIcon } from '@iconify/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { Drawer } from '@components/overlay/drawer/Drawer.tsx'

beforeAll(() => {
    addIcon('lucide:settings', {
        body: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
        width: 24,
        height: 24,
    })
    addIcon('lucide:chevron-down', {
        body: '<polyline points="6 9 12 15 18 9"/>',
        width: 24,
        height: 24,
    })
    addIcon('lucide:user', {
        body: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
        width: 24,
        height: 24,
    })
})

describe('Drawer.SectionItem', () => {
    it('renders the section header button', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.SectionItem label="Settings" startIcon="lucide:settings">
                    <Drawer.NavItem label="Profile" href="/profile" startIcon="lucide:user" />
                </Drawer.SectionItem>
            </Drawer>,
        )

        expect(screen.getByRole('button', { name: 'Settings' })).toBeTruthy()
    })

    it('toggles children when the header is clicked', async () => {
        render(
            <Drawer defaultOpen>
                <Drawer.SectionItem label="Settings" startIcon="lucide:settings">
                    <Drawer.NavItem label="Profile" href="/profile" startIcon="lucide:user" />
                </Drawer.SectionItem>
            </Drawer>,
        )

        expect(screen.queryByRole('link', { name: 'Profile' })).toBeNull()

        await userEvent.click(screen.getByRole('button', { name: 'Settings' }))

        expect(screen.getByRole('link', { name: 'Profile' })).toBeTruthy()

        await userEvent.click(screen.getByRole('button', { name: 'Settings' }))

        expect(screen.queryByRole('link', { name: 'Profile' })).toBeNull()
    })

    it('respects defaultExpanded', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.SectionItem label="Settings" startIcon="lucide:settings" defaultExpanded>
                    <Drawer.NavItem label="Profile" href="/profile" startIcon="lucide:user" />
                </Drawer.SectionItem>
            </Drawer>,
        )

        expect(screen.getByRole('link', { name: 'Profile' })).toBeTruthy()
    })

    it('supports controlled expanded state', async () => {
        const onExpandedChange = vi.fn()
        const { rerender } = render(
            <Drawer defaultOpen>
                <Drawer.SectionItem label="Settings" startIcon="lucide:settings" expanded={false} onExpandedChange={onExpandedChange}>
                    <Drawer.NavItem label="Profile" href="/profile" startIcon="lucide:user" />
                </Drawer.SectionItem>
            </Drawer>,
        )

        expect(screen.queryByRole('link', { name: 'Profile' })).toBeNull()

        await userEvent.click(screen.getByRole('button', { name: 'Settings' }))

        expect(onExpandedChange).toHaveBeenCalledWith(true)

        rerender(
            <Drawer defaultOpen>
                <Drawer.SectionItem label="Settings" startIcon="lucide:settings" expanded onExpandedChange={onExpandedChange}>
                    <Drawer.NavItem label="Profile" href="/profile" startIcon="lucide:user" />
                </Drawer.SectionItem>
            </Drawer>,
        )

        expect(screen.getByRole('link', { name: 'Profile' })).toBeTruthy()
    })

    it('sets aria-expanded on the header', async () => {
        render(
            <Drawer defaultOpen>
                <Drawer.SectionItem label="Settings" startIcon="lucide:settings">
                    <Drawer.NavItem label="Profile" href="/profile" startIcon="lucide:user" />
                </Drawer.SectionItem>
            </Drawer>,
        )

        const header = screen.getByRole('button', { name: 'Settings' })
        expect(header.getAttribute('aria-expanded')).toBe('false')

        await userEvent.click(header)

        expect(header.getAttribute('aria-expanded')).toBe('true')
    })
})
