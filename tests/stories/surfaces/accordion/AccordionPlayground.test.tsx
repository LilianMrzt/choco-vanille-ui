import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { AccordionStoryArgs } from '@stories/surfaces/accordion/types'
import AccordionPlayground from '@stories/surfaces/accordion/components/accordion-playground/AccordionPlayground'
import { playAccordion } from '@stories/surfaces/accordion/utils/playAccordion.utils'

const controls = vi.hoisted((): { args: AccordionStoryArgs; updateArgs: ReturnType<typeof vi.fn> } => ({
    args: { value: [] },
    updateArgs: vi.fn(),
}))

vi.mock('storybook/preview-api', () => ({
    useArgs: () => [controls.args, controls.updateArgs],
}))

describe('AccordionPlayground', () => {
    beforeEach(() => {
        controls.args = { value: ['item-1'], firstLabel: 'Details', onValueChange: vi.fn() }
        controls.updateArgs.mockReset()
    })

    it('forwards details, updates Controls and accepts reverse-direction changes', async () => {
        const user = userEvent.setup()
        const { rerender } = render(<AccordionPlayground />)

        await user.click(screen.getByRole('button', { name: 'Is it styled?' }))
        expect(controls.args.onValueChange).toHaveBeenCalledWith(['item-2'], expect.objectContaining({ reason: 'trigger-press' }))
        expect(controls.updateArgs).toHaveBeenCalledWith({ value: ['item-2'] })

        controls.args = { ...controls.args, value: ['item-3'] }
        rerender(<AccordionPlayground />)
        expect(screen.getByRole('button', { name: 'Can I use custom content?' }).hasAttribute('data-panel-open')).toBe(true)
        expect(screen.getByRole('button', { name: 'Details' }).hasAttribute('data-panel-open')).toBe(false)
    })

    it('does not synchronize a change canceled by the consumer callback', async () => {
        controls.args = { ...controls.args, onValueChange: (_value, details) => details.cancel() }
        render(<AccordionPlayground />)

        await userEvent.click(screen.getByRole('button', { name: 'Is it styled?' }))
        expect(controls.updateArgs).not.toHaveBeenCalled()
        expect(screen.getByRole('button', { name: 'Details' }).hasAttribute('data-panel-open')).toBe(true)
    })

    it('completes its play when Controls asynchronously replace the rendered nodes', async () => {
        controls.args = { ...controls.args, firstLabel: 'Is it accessible?' }
        let revision = 0
        const { container, rerender } = render(<AccordionPlayground key={revision} />)
        controls.updateArgs.mockImplementation((next: Partial<AccordionStoryArgs>) => {
            setTimeout(() => {
                controls.args = { ...controls.args, ...next }
                revision += 1
                rerender(<AccordionPlayground key={revision} />)
            }, 0)
        })

        await playAccordion({ canvasElement: container })
        expect(screen.getByRole('button', { name: 'Is it accessible?' }).hasAttribute('data-panel-open')).toBe(true)
    })
})
