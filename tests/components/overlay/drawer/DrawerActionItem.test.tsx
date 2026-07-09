import { addIcon } from '@iconify/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { Drawer } from '@components/overlay/drawer/Drawer.tsx'

beforeAll(() => {
    addIcon('lucide:log-out', {
        body: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
        width: 24,
        height: 24,
    })
})

describe('Drawer.ActionItem', () => {
    it('renders a button with the label', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.ActionItem label="Sign out" startIcon="lucide:log-out" />
            </Drawer>,
        )

        expect(screen.getByRole('button', { name: 'Sign out' })).toBeTruthy()
    })

    it('renders a start icon', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.ActionItem label="Sign out" startIcon="lucide:log-out" />
            </Drawer>,
        )

        expect(document.querySelector('svg')).toBeTruthy()
    })

    it('calls onClick when clicked', async () => {
        const onClick = vi.fn()
        render(
            <Drawer defaultOpen>
                <Drawer.ActionItem label="Action" startIcon="lucide:log-out" onClick={onClick} />
            </Drawer>,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Action' }))

        expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('disables the button', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.ActionItem label="Disabled" startIcon="lucide:log-out" disabled />
            </Drawer>,
        )

        expect(screen.getByRole('button', { name: 'Disabled' }).hasAttribute('disabled')).toBe(true)
    })

    it('forwards data-* attributes', () => {
        render(
            <Drawer defaultOpen>
                <Drawer.ActionItem label="Test" startIcon="lucide:log-out" data-testid="action-item" />
            </Drawer>,
        )

        expect(screen.getByTestId('action-item')).toBeTruthy()
    })
})
