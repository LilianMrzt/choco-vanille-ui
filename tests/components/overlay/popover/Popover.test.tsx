import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Popover } from '@components/overlay/popover'
import { Button } from '@components/actions/button'

describe('Popover', () => {
    describe('accessibility', () => {
        it('gives the dialog a default accessible name', async () => {
            render(
                <Popover defaultOpen>
                    <Popover.Trigger>
                        <Button label={'Open'} />
                    </Popover.Trigger>
                    <Popover.Content>Content</Popover.Content>
                </Popover>,
            )

            expect(screen.getByRole('dialog', { name: 'Popover' })).toBeTruthy()
        })

        it('allows the default accessible name to be customized for i18n', async () => {
            render(
                <Popover defaultOpen>
                    <Popover.Trigger>
                        <Button label={'Open'} />
                    </Popover.Trigger>
                    <Popover.Content defaultAriaLabel={'Options'}>Content</Popover.Content>
                </Popover>,
            )

            expect(screen.getByRole('dialog', { name: 'Options' })).toBeTruthy()
        })

        it('prefers aria-label over the default', async () => {
            render(
                <Popover defaultOpen>
                    <Popover.Trigger>
                        <Button label={'Open'} />
                    </Popover.Trigger>
                    <Popover.Content aria-label={'Custom label'}>Content</Popover.Content>
                </Popover>,
            )

            expect(screen.getByRole('dialog', { name: 'Custom label' })).toBeTruthy()
        })

        it('supports aria-labelledby', async () => {
            render(
                <Popover defaultOpen>
                    <Popover.Trigger>
                        <Button label={'Open'} />
                    </Popover.Trigger>
                    <Popover.Content aria-labelledby={'title-id'}>
                        <h2 id={'title-id'}>Dialog title</h2>
                    </Popover.Content>
                </Popover>,
            )

            expect(screen.getByRole('dialog', { name: 'Dialog title' })).toBeTruthy()
        })

        it('forwards the content ref to the dialog and clears it on unmount', () => {
            const ref = createRef<HTMLDivElement>()
            const { unmount } = render(
                <Popover defaultOpen>
                    <Popover.Trigger><Button label={'Open'} /></Popover.Trigger>
                    <Popover.Content ref={ref}>Content</Popover.Content>
                </Popover>,
            )

            expect(ref.current).toBe(screen.getByRole('dialog', { name: 'Popover' }))
            unmount()
            expect(ref.current).toBeNull()
        })

        it('passes change details and honors cancellation of Escape', async () => {
            const onOpenChange = vi.fn<NonNullable<React.ComponentProps<typeof Popover>['onOpenChange']>>((open, details) => {
                if (!open) {
                    details.cancel()
                }
            })
            const user = userEvent.setup()

            render(
                <Popover onOpenChange={onOpenChange}>
                    <Popover.Trigger>
                        <Button label={'Open'} />
                    </Popover.Trigger>
                    <Popover.Content>
                        <Popover.Item label={'Edit'} />
                    </Popover.Content>
                </Popover>,
            )

            await user.click(screen.getByRole('button', { name: 'Open' }))
            await user.keyboard('{Escape}')

            expect(onOpenChange).toHaveBeenLastCalledWith(false, expect.objectContaining({ reason: 'escape-key', isCanceled: true }))
            expect(screen.getByRole('dialog')).toBeTruthy()
        })
    })
})
