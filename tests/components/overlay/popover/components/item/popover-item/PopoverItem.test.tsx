import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Popover } from '@components/overlay/popover'

describe('PopoverItem', () => {
    it('renders an actionable button with the item label', () => {
        render(
            <Popover defaultOpen>
                <Popover.Trigger>
                    <button type={'button'}>Open</button>
                </Popover.Trigger>
                <Popover.Content>
                    <Popover.Item label={'Edit'} />
                </Popover.Content>
            </Popover>,
        )

        expect(screen.getByRole('button', { name: 'Edit' })).toBeTruthy()
    })

    it('calls onClick and closes the popover when activated', async () => {
        const onClick = vi.fn()

        render(
            <Popover defaultOpen>
                <Popover.Trigger>
                    <button type={'button'}>Open</button>
                </Popover.Trigger>
                <Popover.Content>
                    <Popover.Item label={'Edit'} onClick={onClick} />
                </Popover.Content>
            </Popover>,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Edit' }))

        expect(onClick).toHaveBeenCalled()
        expect(screen.queryByRole('dialog')).toBeNull()
    })

    it('supports the same visual options as DropdownMenu.Item', async () => {
        render(
            <Popover defaultOpen>
                <Popover.Trigger>
                    <button type={'button'}>Open</button>
                </Popover.Trigger>
                <Popover.Content>
                    <Popover.Item
                        label={'Delete'}
                        startIcon={() => null}
                        endIcon={() => null}
                        shortcut={'⌘D'}
                        active
                        destructive
                        closeOnClick={false}
                    />
                </Popover.Content>
            </Popover>,
        )

        const item = screen.getByRole('button', { name: 'Delete' })
        expect(item.getAttribute('data-active')).toBe('true')
        expect(item.className).toContain('destructive')
        expect(screen.getByText('⌘D')).toBeTruthy()

        await userEvent.click(item)
        expect(screen.getByRole('dialog')).toBeTruthy()
    })

    it('is attached to the Popover compound component', () => {
        expect(Popover.Item.displayName).toBe('Popover.Item')
    })
})
