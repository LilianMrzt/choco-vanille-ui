import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Popover } from '@components/overlay/popover'

describe('PopoverAnchor', () => {
    it('renders children as the anchor reference', () => {
        render(
            <Popover defaultOpen>
                <Popover.Anchor>
                    <button type={'button'}>Anchor</button>
                </Popover.Anchor>
                <Popover.Content>Content</Popover.Content>
            </Popover>,
        )

        expect(screen.getByRole('button', { name: 'Anchor' })).toBeTruthy()
        expect(screen.getByRole('dialog', { name: 'Popover' })).toBeTruthy()
    })

    it('is attached to the Popover compound component', () => {
        expect(Popover.Anchor.displayName).toBe('PopoverAnchor')
    })
})
