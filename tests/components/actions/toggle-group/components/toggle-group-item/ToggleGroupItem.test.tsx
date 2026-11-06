import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ToggleGroup } from '@components/actions/toggle-group'
import { TOGGLE_STYLES } from '@components/actions/toggle'

describe('ToggleGroup.Item', () => {
    it('defaults to the same ghost subtle treatment in a group', () => {
        render(
            <ToggleGroup aria-label={'Formatting'}>
                <ToggleGroup.Item value={'bold'} label={'Bold'} />
            </ToggleGroup>,
        )
        expect(screen.getByRole('button', { name: 'Bold' }).className).toBe(
            TOGGLE_STYLES.recipe({ variant: 'ghostSubtle', size: 'md' }),
        )
    })

    it('can be used independently with standalone state, ref and native attributes', async () => {
        const ref = createRef<HTMLButtonElement>()
        const onPressedChange = vi.fn()
        render(
            <ToggleGroup.Item
                value={'bold'}
                label={'Bold'}
                defaultPressed
                data-testid={'item'}
                ref={ref}
                onPressedChange={onPressedChange}
            />,
        )
        const button = screen.getByRole('button', { name: 'Bold' })
        expect(ref.current).toBe(button)
        expect(button.getAttribute('data-testid')).toBe('item')
        expect(button.getAttribute('aria-pressed')).toBe('true')

        await userEvent.click(button)
        expect(button.getAttribute('aria-pressed')).toBe('false')
        expect(onPressedChange).toHaveBeenCalledWith(false, expect.objectContaining({ cancel: expect.any(Function) }))
    })

    it('forwards a disabled state and ref within a group', () => {
        const ref = createRef<HTMLButtonElement>()
        render(
            <ToggleGroup aria-label={'Formatting'} disabled>
                <ToggleGroup.Item value={'bold'} label={'Bold'} ref={ref} />
            </ToggleGroup>,
        )
        expect(ref.current).toBe(screen.getByRole('button', { name: 'Bold' }))
        expect(ref.current?.disabled).toBe(true)
    })
})
