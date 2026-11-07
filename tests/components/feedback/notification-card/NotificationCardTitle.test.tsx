import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { NotificationCard, type NotificationCardVariant } from '@components/feedback/notification-card'

// Suites

describe('NotificationCardTitle', () => {
    describe('default rendering', () => {
        it('renders its children', () => {
            render(<NotificationCard.Title>Heads up</NotificationCard.Title>)
            expect(screen.getByText('Heads up')).toBeTruthy()
        })

        it('renders as an inline span element', () => {
            render(<NotificationCard.Title>Title text</NotificationCard.Title>)
            expect(
                screen.getByText('Title text').tagName.toLowerCase(),
            ).toBe('span')
        })
    })

    describe('variant context', () => {
        const variants: NotificationCardVariant[] = ['info', 'success', 'warning', 'error']

        it.each(variants)(
            'renders the title text for the "%s" variant via the NotificationCard root',
            (variant) => {
                render(
                    <NotificationCard variant={variant}>
                        <NotificationCard.Title>Title</NotificationCard.Title>
                    </NotificationCard>,
                )
                expect(screen.getByText('Title')).toBeTruthy()
            },
        )
    })

    describe('CSS class application', () => {
        it('merges a custom className onto the span', () => {
            render(
                <NotificationCard.Title className={'my-title'}>Title text</NotificationCard.Title>,
            )
            expect(screen.getByText('Title text').className).toContain(
                'my-title',
            )
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            render(
                <NotificationCard.Title data-testid={'notification-card-title'}>Title</NotificationCard.Title>,
            )
            expect(screen.getByTestId('notification-card-title')).toBeTruthy()
        })

        it('forwards aria-* attributes', () => {
            render(
                <NotificationCard.Title aria-label={'NotificationCard title'}>Title</NotificationCard.Title>,
            )
            expect(
                screen.getByText('Title').getAttribute('aria-label'),
            ).toBe('NotificationCard title')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying span element', () => {
            const ref = createRef<HTMLSpanElement>()
            render(<NotificationCard.Title ref={ref}>Title</NotificationCard.Title>)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('span')
        })
    })

    describe('displayName', () => {
        it('is set to "NotificationCard.Title"', () => {
            expect(NotificationCard.Title.displayName).toBe('NotificationCard.Title')
        })
    })
})
