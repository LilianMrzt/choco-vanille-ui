import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ContextMenu } from '@components/overlay/context-menu'

describe('ContextMenu', () => {
    it('opens its menu on right click', async () => {
        const user = userEvent.setup()

        render(
            <ContextMenu>
                <ContextMenu.Trigger>
                    <div>Target</div>
                </ContextMenu.Trigger>
                <ContextMenu.Content>
                    <ContextMenu.Item label={'Item'} />
                </ContextMenu.Content>
            </ContextMenu>,
        )

        await user.pointer({ keys: '[MouseRight]', target: screen.getByText('Target') })

        await waitFor(() => {
            expect(screen.getByRole('menuitem', { name: 'Item' })).toBeTruthy()
            expect(document.activeElement).not.toBe(screen.getByRole('menuitem', { name: 'Item' }))
        })
    }, 10000)

    it('forwards cancelable open details and leaves the menu closed when canceled', async () => {
        const user = userEvent.setup()
        const onOpenChange = vi.fn<NonNullable<React.ComponentProps<typeof ContextMenu>['onOpenChange']>>(
            (_open, details) => details.cancel(),
        )

        render(
            <ContextMenu onOpenChange={onOpenChange}>
                <ContextMenu.Trigger><div>Target</div></ContextMenu.Trigger>
                <ContextMenu.Content><ContextMenu.Item label={'Item'} /></ContextMenu.Content>
            </ContextMenu>,
        )

        await user.pointer({ keys: '[MouseRight]', target: screen.getByText('Target') })
        expect(onOpenChange).toHaveBeenCalledWith(true, expect.objectContaining({ cancel: expect.any(Function) }))
        expect(screen.queryByRole('menu')).toBeNull()
    })

    it('does not add styles to the trigger wrapper', () => {
        render(
            <ContextMenu>
                <ContextMenu.Trigger>
                    <div>Target</div>
                </ContextMenu.Trigger>
                <ContextMenu.Content>
                    <ContextMenu.Item label={'Item'} />
                </ContextMenu.Content>
            </ContextMenu>,
        )

        expect(screen.getByText('Target').parentElement?.className).toBe('')
    })

    it('makes the trigger keyboard reachable', () => {
        render(
            <ContextMenu>
                <ContextMenu.Trigger>
                    <div>Target</div>
                </ContextMenu.Trigger>
                <ContextMenu.Content>
                    <ContextMenu.Item label={'Item'} />
                </ContextMenu.Content>
            </ContextMenu>,
        )

        expect(screen.getByText('Target').closest('[tabindex="0"]')).toBeTruthy()
    })

    it('identifies the trigger as opening a menu', () => {
        render(
            <ContextMenu>
                <ContextMenu.Trigger>
                    <div>Target</div>
                </ContextMenu.Trigger>
                <ContextMenu.Content>
                    <ContextMenu.Item label={'Item'} />
                </ContextMenu.Content>
            </ContextMenu>,
        )

        expect(screen.getByText('Target').getAttribute('aria-haspopup')).toBe('menu')
    })

    it('focuses the first item when opened from the keyboard', async () => {
        const target = 'Target'

        render(
            <ContextMenu>
                <ContextMenu.Trigger>
                    <div>{target}</div>
                </ContextMenu.Trigger>
                <ContextMenu.Content>
                    <ContextMenu.Item label={'Item'} />
                </ContextMenu.Content>
            </ContextMenu>,
        )

        const trigger = screen.getByText(target)
        fireEvent.keyDown(trigger, { key: 'F10' })
        fireEvent.contextMenu(trigger)

        await waitFor(() => {
            expect(document.activeElement).toBe(screen.getByRole('menuitem', { name: 'Item' }))
        })
    })
})
