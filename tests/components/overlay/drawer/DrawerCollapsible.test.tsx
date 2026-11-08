import { CIRCLE_ICON as CircleIcon, INFO_ICON as InfoIcon, USER_ICON as UserIcon } from '@constants/icon-registry'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Drawer } from '@components/overlay/drawer'

describe('Drawer.Collapsible', () => {
    it('renders the section header button', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.Collapsible label="Settings" startIcon={CircleIcon}>
                    <Drawer.NavItem
                        label="Profile"
                        href="/profile"
                        startIcon={UserIcon}
                    />
                </Drawer.Collapsible>
            </Drawer>,
        )

        expect(screen.getByRole('button', { name: 'Settings' })).toBeTruthy()
    })

    it('renders an end icon before the expansion chevron', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.Collapsible
                    label="Settings"
                    startIcon={CircleIcon}
                    endIcon={InfoIcon}
                >
                    <Drawer.NavItem
                        label="Profile"
                        href="/profile"
                        startIcon={UserIcon}
                    />
                </Drawer.Collapsible>
            </Drawer>,
        )

        expect(document.querySelectorAll('svg').length).toBeGreaterThanOrEqual(3)
    })

    it('toggles children when the header is clicked', async () => {
        render(
            <Drawer defaultOpen>
                <Drawer.Collapsible label="Settings" startIcon={CircleIcon}>
                    <Drawer.NavItem
                        label="Profile"
                        href="/profile"
                        startIcon={UserIcon}
                    />
                </Drawer.Collapsible>
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
                <Drawer.Collapsible
                    label="Settings"
                    startIcon={CircleIcon}
                    defaultExpanded
                >
                    <Drawer.NavItem
                        label="Profile"
                        href="/profile"
                        startIcon={UserIcon}
                    />
                </Drawer.Collapsible>
            </Drawer>,
        )

        expect(screen.getByRole('link', { name: 'Profile' })).toBeTruthy()
    })

    it('supports controlled expanded state', async () => {
        const onExpandedChange = vi.fn()
        const { rerender } = render(
            <Drawer defaultOpen>
                <Drawer.Collapsible
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
                </Drawer.Collapsible>
            </Drawer>,
        )

        expect(screen.queryByRole('link', { name: 'Profile' })).toBeNull()

        await userEvent.click(screen.getByRole('button', { name: 'Settings' }))

        expect(onExpandedChange).toHaveBeenCalledWith(true)

        rerender(
            <Drawer defaultOpen>
                <Drawer.Collapsible
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
                </Drawer.Collapsible>
            </Drawer>,
        )

        expect(screen.getByRole('link', { name: 'Profile' })).toBeTruthy()
    })

    it('sets aria-expanded on the header', async () => {
        render(
            <Drawer defaultOpen>
                <Drawer.Collapsible label="Settings" startIcon={CircleIcon}>
                    <Drawer.NavItem
                        label="Profile"
                        href="/profile"
                        startIcon={UserIcon}
                    />
                </Drawer.Collapsible>
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
                <Drawer.Collapsible
                    label="Settings"
                    startIcon={CircleIcon}
                    hideTooltip
                >
                    <Drawer.NavItem label="Profile" startIcon={UserIcon} />
                </Drawer.Collapsible>
            </Drawer>,
        )

        await userEvent.hover(screen.getByRole('button', { name: 'Settings' }))

        expect(screen.queryByRole('tooltip')).toBeNull()
    })
})
