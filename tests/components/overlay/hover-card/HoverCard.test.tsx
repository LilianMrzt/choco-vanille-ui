import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HoverCard } from '@components/overlay/hover-card'

describe('HoverCard', () => {
    it('renders the trigger', () => {
        render(
            <HoverCard>
                <HoverCard.Trigger asChild>
                    <button type={'button'}>Hover me</button>
                </HoverCard.Trigger>
                <HoverCard.Content>Hover card content</HoverCard.Content>
            </HoverCard>,
        )

        expect(screen.getByRole('button', { name: 'Hover me' })).toBeTruthy()
    })
})
