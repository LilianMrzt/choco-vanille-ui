import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HoverCard } from '@components/overlay/hover-card'

describe('HoverCardTrigger', () => {
    it('renders the trigger inside the hover card root', () => {
        render(
            <HoverCard>
                <HoverCard.Trigger>
                    <button type={'button'}>Hover me</button>
                </HoverCard.Trigger>
            </HoverCard>,
        )

        expect(screen.getByRole('button', { name: 'Hover me' })).toBeTruthy()
    })

    it('forwards the children to the underlying Base UI trigger render prop', () => {
        render(
            <HoverCard>
                <HoverCard.Trigger>
                    <button type={'button'}>Hover me</button>
                </HoverCard.Trigger>
            </HoverCard>,
        )

        expect(screen.getByRole('button', { name: 'Hover me' })).toBeTruthy()
    })

    it('is attached to the HoverCard compound component', () => {
        expect(HoverCard.Trigger.displayName).toBe('HoverCardTrigger')
    })
})
