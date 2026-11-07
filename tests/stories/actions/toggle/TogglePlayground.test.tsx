import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ToggleProps } from '@components/actions'
import ControlledToggle from '@stories/actions/toggle/components/controlled-toggle/ControlledToggle'
import { DEFAULT_ARGS } from '@stories/actions/toggle/constants'
import type { ToggleStoryArgs } from '@stories/actions/toggle/types'

const controls = vi.hoisted(() => ({ getArgs: vi.fn(), updateArgs: vi.fn() }))
vi.mock('storybook/preview-api', () => ({
    useArgs: () => [controls.getArgs(), controls.updateArgs],
}))

describe('Toggle primary playground', () => {
    beforeEach(() => {
        controls.getArgs.mockReset()
        controls.updateArgs.mockReset()
    })

    it.each([false, true])('preserves standalone callbacks and cancellation (cancelled: %s)', async (cancelled) => {
        const onPressedChange = vi.fn<NonNullable<ToggleProps['onPressedChange']>>((_pressed, details) => {
            if (cancelled) {details.cancel()}
        })
        const args: ToggleStoryArgs = { ...DEFAULT_ARGS, label: 'Standalone bold', pressed: false, onPressedChange }
        controls.getArgs.mockReturnValue(args)
        render(<ControlledToggle {...args} />)
        await userEvent.click(screen.getByRole('button', { name: 'Standalone bold' }))

        expect(onPressedChange).toHaveBeenCalledWith(true, expect.objectContaining({ isCanceled: cancelled }))
        if (cancelled) {expect(controls.updateArgs).not.toHaveBeenCalled()}
        else {expect(controls.updateArgs).toHaveBeenCalledWith({ pressed: true })}
    })

    it('renders only the standalone toggle', () => {
        const args: ToggleStoryArgs = { ...DEFAULT_ARGS, label: 'Standalone bold' }
        controls.getArgs.mockReturnValue(args)
        render(<ControlledToggle {...args} />)
        expect(screen.getAllByRole('button')).toHaveLength(1)
    })
})
