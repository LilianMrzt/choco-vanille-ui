import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import DialogExample from '@stories/overlay/dialog/components/dialog-example/DialogExample'

describe('DialogExample', () => {
    it('forwards controlled state, callback details and slot controls', async () => {
        const onOpenChange = vi.fn()
        const { rerender } = render(
            <DialogExample
                open={false}
                onOpenChange={onOpenChange}
                showFooter
                title={'Settings'}
            />,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Open dialog' }))
        expect(onOpenChange).toHaveBeenCalledWith(true, expect.objectContaining({ reason: 'trigger-press' }))
        expect(screen.queryByRole('dialog')).toBeNull()

        rerender(
            <DialogExample
                open
                onOpenChange={onOpenChange}
                showFooter
                title={'Settings'}
                cancelLabel={'Dismiss'}
            />,
        )

        expect(screen.getByRole('heading', { name: 'Settings' })).toBeTruthy()
        await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }))
        expect(onOpenChange).toHaveBeenCalledWith(false, expect.objectContaining({ reason: 'close-press' }))
    })
})
