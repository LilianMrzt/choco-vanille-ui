import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { NotificationCard } from '@components/feedback/notification-card'

// Suites

describe('NotificationCardDescription', () => {
    describe('default rendering', () => {
        it('renders its children', () => {
            render(
                <NotificationCard.Description>Something happened</NotificationCard.Description>,
            )
            expect(screen.getByText('Something happened')).toBeTruthy()
        })

        it('renders as an inline span element', () => {
            render(<NotificationCard.Description>Text</NotificationCard.Description>)
            expect(
                screen.getByText('Text').tagName.toLowerCase(),
            ).toBe('span')
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className onto the span', () => {
            render(
                <NotificationCard.Description className={'my-desc'}>
                    Text
                </NotificationCard.Description>,
            )
            expect(screen.getByText('Text').className).toContain('my-desc')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            render(
                <NotificationCard.Description data-testid={'description'}>
                    Text
                </NotificationCard.Description>,
            )
            expect(screen.getByTestId('description')).toBeTruthy()
        })

        it('forwards aria-* attributes', () => {
            render(
                <NotificationCard.Description aria-label={'Description text'}>
                    Text
                </NotificationCard.Description>,
            )
            expect(
                screen.getByText('Text').getAttribute('aria-label'),
            ).toBe('Description text')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying span element', () => {
            const ref = createRef<HTMLSpanElement>()
            render(
                <NotificationCard.Description ref={ref}>Text</NotificationCard.Description>,
            )
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('span')
        })
    })

    describe('displayName', () => {
        it('is set to "NotificationCard.Description"', () => {
            expect(NotificationCard.Description.displayName).toBe('NotificationCard.Description')
        })
    })
})
