import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import PanelExample from '@stories/overlay/panel/components/panel-example/PanelExample'

describe('PanelExample', () => {
    it('forwards controlled state, callback details and slot controls', async () => {
        const onOpenChange = vi.fn()
        const { rerender } = render(<PanelExample onOpenChange={onOpenChange} open={false} title={'Settings'} />)

        await userEvent.click(screen.getByRole('button', { name: 'Open panel' }))
        expect(onOpenChange).toHaveBeenCalledWith(true, expect.objectContaining({ reason: 'trigger-press' }))
        expect(screen.queryByRole('dialog')).toBeNull()

        rerender(<PanelExample onOpenChange={onOpenChange} open title={'Settings'} />)
        expect(screen.getByRole('dialog', { name: 'Settings' })).toBeTruthy()
        await userEvent.click(screen.getByRole('button', { name: 'Close panel' }))
        expect(onOpenChange).toHaveBeenCalledWith(false, expect.objectContaining({ reason: 'close-press' }))
    })
})
