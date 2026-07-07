import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Popover } from '@components/overlay/popover'

describe('PopoverTrigger', () => {
    it('renders the trigger inside the popover root', () => {
        render(
            <Popover>
                <Popover.Trigger>
                    <button type={'button'}>Open</button>
                </Popover.Trigger>
            </Popover>,
        )

        expect(screen.getByRole('button', { name: 'Open' })).toBeTruthy()
    })

    it('forwards children as the underlying Base UI trigger element', () => {
        render(
            <Popover>
                <Popover.Trigger>
                    <button type={'button'}>Open</button>
                </Popover.Trigger>
            </Popover>,
        )

        expect(screen.getByRole('button', { name: 'Open' })).toBeTruthy()
    })

    it('is attached to the Popover compound component', () => {
        expect(Popover.Trigger.displayName).toBe('Popover.Trigger')
    })
})
