import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Popover } from '@components/overlay/popover'

describe('PopoverContent', () => {
    it('renders content when the popover is open by default', () => {
        render(
            <Popover defaultOpen>
                <Popover.Trigger asChild>
                    <button type={'button'}>Open</button>
                </Popover.Trigger>
                <Popover.Content>Content</Popover.Content>
            </Popover>,
        )

        expect(screen.getByRole('dialog', { name: 'Popover' })).toBeTruthy()
        expect(screen.getByText('Content')).toBeTruthy()
    })

    it('does not render content when the popover is closed', () => {
        render(
            <Popover>
                <Popover.Trigger asChild>
                    <button type={'button'}>Open</button>
                </Popover.Trigger>
                <Popover.Content>Content</Popover.Content>
            </Popover>,
        )

        expect(screen.queryByRole('dialog')).toBeNull()
    })

    it('opens and closes via the trigger', async () => {
        render(
            <Popover>
                <Popover.Trigger asChild>
                    <button type={'button'}>Open</button>
                </Popover.Trigger>
                <Popover.Content>Content</Popover.Content>
            </Popover>,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Open' }))
        expect(screen.getByRole('dialog', { name: 'Popover' })).toBeTruthy()

        await userEvent.keyboard('{Escape}')
        expect(screen.queryByRole('dialog')).toBeNull()
    }, 10000)

    it('calls onOpenChange when the open state changes', async () => {
        const onOpenChange = vi.fn()
        render(
            <Popover onOpenChange={onOpenChange}>
                <Popover.Trigger asChild>
                    <button type={'button'}>Open</button>
                </Popover.Trigger>
                <Popover.Content>Content</Popover.Content>
            </Popover>,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Open' }))
        expect(onOpenChange).toHaveBeenLastCalledWith(true)
    }, 10000)

    it('is attached to the Popover compound component', () => {
        expect(Popover.Content.displayName).toBe('PopoverContent')
    })
})
