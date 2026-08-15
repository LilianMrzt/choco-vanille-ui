import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Drawer } from '@components/overlay/drawer/Drawer.tsx'
import CircleIcon from '@resources/asset/CircleIcon.svg?react'
import UserIcon from '@resources/asset/UserIcon.svg?react'

describe('Drawer.SectionItem', () => {
    it('renders the section header button', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.SectionItem label="Settings" startIcon={CircleIcon}>
                    <Drawer.NavItem
                        label="Profile"
                        href="/profile"
                        startIcon={UserIcon}
                    />
                </Drawer.SectionItem>
            </Drawer>,
        )

        expect(screen.getByRole('button', { name: 'Settings' })).toBeTruthy()
    })

    it('toggles children when the header is clicked', async () => {
        render(
            <Drawer defaultOpen>
                <Drawer.SectionItem label="Settings" startIcon={CircleIcon}>
                    <Drawer.NavItem
                        label="Profile"
                        href="/profile"
                        startIcon={UserIcon}
                    />
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
                <Drawer.SectionItem
                    label="Settings"
                    startIcon={CircleIcon}
                    defaultExpanded
                >
                    <Drawer.NavItem
                        label="Profile"
                        href="/profile"
                        startIcon={UserIcon}
                    />
                </Drawer.SectionItem>
            </Drawer>,
        )

        expect(screen.getByRole('link', { name: 'Profile' })).toBeTruthy()
    })

    it('supports controlled expanded state', async () => {
        const onExpandedChange = vi.fn()
        const { rerender } = render(
            <Drawer defaultOpen>
                <Drawer.SectionItem
                    label="Settings"
                    startIcon={CircleIcon}
                    expanded={false}
                    onExpandedChange={onExpandedChange}
                >
                    <Drawer.NavItem
                        label="Profile"
                        href="/profile"
                        startIcon={UserIcon}
                    />
                </Drawer.SectionItem>
            </Drawer>,
        )

        expect(screen.queryByRole('link', { name: 'Profile' })).toBeNull()

        await userEvent.click(screen.getByRole('button', { name: 'Settings' }))

        expect(onExpandedChange).toHaveBeenCalledWith(true)

        rerender(
            <Drawer defaultOpen>
                <Drawer.SectionItem
                    label="Settings"
                    startIcon={CircleIcon}
                    expanded
                    onExpandedChange={onExpandedChange}
                >
                    <Drawer.NavItem
                        label="Profile"
                        href="/profile"
                        startIcon={UserIcon}
                    />
                </Drawer.SectionItem>
            </Drawer>,
        )

        expect(screen.getByRole('link', { name: 'Profile' })).toBeTruthy()
    })

    it('sets aria-expanded on the header', async () => {
        render(
            <Drawer defaultOpen>
                <Drawer.SectionItem label="Settings" startIcon={CircleIcon}>
                    <Drawer.NavItem
                        label="Profile"
                        href="/profile"
                        startIcon={UserIcon}
                    />
                </Drawer.SectionItem>
            </Drawer>,
        )

        const header = screen.getByRole('button', { name: 'Settings' })
        expect(header.getAttribute('aria-expanded')).toBe('false')

        await userEvent.click(header)

        expect(header.getAttribute('aria-expanded')).toBe('true')
    })

    it('does not show the tooltip when hideTooltip is true', async () => {
        render(
            <Drawer mode="mini">
                <Drawer.SectionItem
                    label="Settings"
                    startIcon={CircleIcon}
                    hideTooltip
                >
                    <Drawer.NavItem label="Profile" startIcon={UserIcon} />
                </Drawer.SectionItem>
            </Drawer>,
        )

        await userEvent.hover(screen.getByRole('button', { name: 'Settings' }))

        expect(screen.queryByRole('tooltip')).toBeNull()
    })
})
