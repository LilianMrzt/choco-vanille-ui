import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Popover } from '@components/overlay/popover'

describe('PopoverTrigger', () => {
    it('renders the trigger inside the popover root', () => {
        render(
            <Popover>
                <Popover.Trigger asChild>
                    <button type={'button'}>Open</button>
                </Popover.Trigger>
            </Popover>,
        )

        expect(screen.getByRole('button', { name: 'Open' })).toBeTruthy()
    })

    it('forwards the asChild prop to the underlying Radix trigger', () => {
        render(
            <Popover>
                <Popover.Trigger asChild>
                    <button type={'button'}>Open</button>
                </Popover.Trigger>
            </Popover>,
        )

        expect(screen.getByRole('button', { name: 'Open' })).toBeTruthy()
    })

    it('is attached to the Popover compound component', () => {
        expect(Popover.Trigger.displayName).toBe('PopoverTrigger')
    })
})
