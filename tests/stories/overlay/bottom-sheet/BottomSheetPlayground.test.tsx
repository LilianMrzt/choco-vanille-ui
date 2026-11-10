import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { BottomSheetPlaygroundArgs } from '@stories/overlay/bottom-sheet/types'
import BottomSheetPlayground from '@stories/overlay/bottom-sheet/components/playground/BottomSheetPlayground'

const controls = vi.hoisted((): { args: BottomSheetPlaygroundArgs; updateArgs: ReturnType<typeof vi.fn> } => ({
    args: { open: true, radioValue: 'original' },
    updateArgs: vi.fn(),
}))

vi.mock('storybook/preview-api', () => ({
    useArgs: () => [controls.args, controls.updateArgs],
}))

describe('BottomSheetPlayground', () => {
    beforeEach(() => {
        controls.args = {
            open: true,
            showRadioGroup: true,
            radioValue: 'original',
            radioItemLabel: 'Original size',
            onRadioValueChange: vi.fn(),
        }
        controls.updateArgs.mockReset()
    })

    it('forwards radio details and applies component and Controls changes', async () => {
        const user = userEvent.setup()
        const { rerender } = render(<BottomSheetPlayground />)

        await user.click(screen.getByRole('radio', { name: 'Compressed' }))
        expect(controls.args.onRadioValueChange).toHaveBeenCalledWith('compressed', expect.objectContaining({ isCanceled: false }))
        expect(controls.updateArgs).toHaveBeenCalledWith({ radioValue: 'compressed' })

        controls.args = { ...controls.args, radioValue: 'compressed' }
        rerender(<BottomSheetPlayground />)
        expect(screen.getByRole('radio', { name: 'Compressed' }).getAttribute('aria-checked')).toBe('true')

        controls.args = { ...controls.args, radioValue: 'original' }
        rerender(<BottomSheetPlayground />)
        expect(screen.getByRole('radio', { name: 'Original size' }).getAttribute('aria-checked')).toBe('true')
    })

    it('preserves consumer cancellation of radio changes', async () => {
        controls.args = { ...controls.args, onRadioValueChange: (_value, details) => details.cancel() }
        render(<BottomSheetPlayground />)

        await userEvent.click(screen.getByRole('radio', { name: 'Compressed' }))
        expect(controls.updateArgs).not.toHaveBeenCalled()
        expect(screen.getByRole('radio', { name: 'Original size' }).getAttribute('aria-checked')).toBe('true')
    })

    it('applies dimension controls to the panel', () => {
        controls.args = { ...controls.args, width: '100%', maxWidth: 'none', height: '80vh', maxHeight: '90vh' }
        render(<BottomSheetPlayground />)

        const dialog = screen.getByRole('dialog')
        expect(dialog.style.width).toBe('100%')
        expect(dialog.style.maxWidth).toBe('none')
        expect(dialog.style.height).toBe('80vh')
        expect(dialog.style.maxHeight).toBe('90vh')
    })
})
