import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import AlertDialogExample from '@stories/overlay/alert-dialog/components/alert-dialog-example/AlertDialogExample'

describe('AlertDialogExample', () => {
    it('forwards controlled state, callback details and action labels', async () => {
        const onOpenChange = vi.fn()
        const { rerender } = render(
            <AlertDialogExample
                onOpenChange={onOpenChange}
                open={false}
                triggerLabel={'Open confirmation'}
            />,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Open confirmation' }))
        expect(onOpenChange).toHaveBeenCalledWith(true, expect.objectContaining({ reason: 'trigger-press' }))
        expect(screen.queryByRole('dialog')).toBeNull()

        rerender(
            <AlertDialogExample
                cancelLabel={'Go back'}
                onOpenChange={onOpenChange}
                open
            />,
        )
        await userEvent.click(screen.getByRole('button', { name: 'Go back' }))
        expect(onOpenChange).toHaveBeenCalledWith(false, expect.objectContaining({ reason: 'close-press' }))
    })
})
