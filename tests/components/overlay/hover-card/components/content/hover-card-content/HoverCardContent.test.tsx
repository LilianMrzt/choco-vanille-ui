import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HoverCard } from '@components/overlay/hover-card'
import { Button } from '@components/actions/button'

describe('HoverCardContent', () => {
    it('renders content when the hover card is open by default', () => {
        render(
            <HoverCard defaultOpen>
                <HoverCard.Trigger>
                    <Button label={'Hover me'} />
                </HoverCard.Trigger>
                <HoverCard.Content>Hover card content</HoverCard.Content>
            </HoverCard>,
        )

        expect(screen.getByText('Hover card content')).toBeTruthy()
    })
})
