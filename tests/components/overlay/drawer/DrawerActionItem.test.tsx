import { CHEVRON_RIGHT_ICON as ChevronRightIcon, CLOSE_ICON as CloseIcon } from '@constants/icon-registry'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Drawer } from '@components/overlay/drawer'

describe('Drawer.ActionItem', () => {
    it('renders a button with the label', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.ActionItem                 label="Sign out" startIcon={CloseIcon} />
            </Drawer>,
        )

        expect(screen.getByRole('button', { name: 'Sign out' })).toBeTruthy()
    })

    it('renders a start icon', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.ActionItem label="Sign out" startIcon={CloseIcon} />
            </Drawer>,
        )

        expect(document.querySelector('svg')).toBeTruthy()
    })

    it('renders an end icon', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.ActionItem
                    label="Next"
                    startIcon={CloseIcon}
                    endIcon={ChevronRightIcon}
                />
            </Drawer>,
        )

        expect(document.querySelectorAll('svg')).toHaveLength(2)
    })

    it('calls onClick when clicked', async () => {
        const onClick = vi.fn()
        render(
            <Drawer defaultOpen>
                <Drawer.ActionItem
                    label="Action"
                    startIcon={CloseIcon}
                    onClick={onClick}
                />
            </Drawer>,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Action' }))

        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('disables the button', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.ActionItem label="Disabled" startIcon={CloseIcon} disabled />
            </Drawer>,
        )

        expect(
            screen.getByRole('button', { name: 'Disabled' }).hasAttribute('disabled'),
        ).toBe(true)
    })

    it('forwards data-* attributes', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.ActionItem
                    label="Test"
                    startIcon={CloseIcon}
                    data-testid="action-item"
                />
            </Drawer>,
        )

        expect(screen.getByTestId('action-item')).toBeTruthy()
    })

    it('does not show the tooltip when hideTooltip is true', async () => {
        render(
            <Drawer mode="mini">
                <Drawer.ActionItem
                    label="Action"
                    startIcon={CloseIcon}
                    hideTooltip
                />
            </Drawer>,
        )

        await userEvent.hover(screen.getByRole('button', { name: 'Action' }))

        expect(screen.queryByRole('tooltip')).toBeNull()
    })
})
