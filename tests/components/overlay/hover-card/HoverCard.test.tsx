import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { HoverCard } from '@components/overlay/hover-card'

describe('HoverCard', () => {
    it('renders the trigger', () => {
        render(
            <HoverCard>
                <HoverCard.Trigger>
                    <button type={'button'}>Hover me</button>
                </HoverCard.Trigger>
                <HoverCard.Content>Hover card content</HoverCard.Content>
            </HoverCard>,
        )

        expect(screen.getByRole('button', { name: 'Hover me' })).toBeTruthy()
    })

    it('forwards the content ref and releases it on unmount', () => {
        const ref = createRef<HTMLDivElement>()
        const { unmount } = render(
            <HoverCard defaultOpen>
                <HoverCard.Trigger>
                    <button type={'button'}>Hover me</button>
                </HoverCard.Trigger>
                <HoverCard.Content ref={ref}>Hover card content</HoverCard.Content>
            </HoverCard>,
        )

        expect(ref.current).toBe(screen.getByText('Hover card content'))
        unmount()
        expect(ref.current).toBeNull()
    })

    it('opens on keyboard focus and reports Base UI change details', async () => {
        const onOpenChange = vi.fn()
        const user = userEvent.setup()

        render(
            <HoverCard onOpenChange={onOpenChange}>
                <HoverCard.Trigger>
                    <button type={'button'}>Hover me</button>
                </HoverCard.Trigger>
                <HoverCard.Content>Hover card content</HoverCard.Content>
            </HoverCard>,
        )

        await user.tab()
        expect(await screen.findByText('Hover card content')).toBeTruthy()
        expect(onOpenChange).toHaveBeenCalledWith(true, expect.objectContaining({ reason: 'trigger-focus' }))
    })
})
