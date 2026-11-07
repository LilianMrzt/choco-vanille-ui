import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { NotificationCard } from '@components/feedback/notification-card'

// Helper

const getFirstChild = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement

// Suites

describe('NotificationCardActions', () => {
    describe('default rendering', () => {
        it('aligns actions to the end of the row', () => {
            const { container } = render(<NotificationCard.Actions><button>Undo</button></NotificationCard.Actions>)
            expect(getFirstChild(container).style.justifyContent).toBe('flex-end')
        })

        it('renders a container element', () => {
            const { container } = render(
                <NotificationCard.Actions>
                    <button type={'button'}>Ok</button>
                </NotificationCard.Actions>,
            )
            expect(getFirstChild(container)).toBeTruthy()
        })

        it('renders its children', () => {
            render(
                <NotificationCard.Actions>
                    <button type={'button'}>Undo</button>
                    <button type={'button'}>Retry</button>
                </NotificationCard.Actions>,
            )
            expect(screen.getByRole('button', { name: 'Undo' })).toBeTruthy()
            expect(screen.getByRole('button', { name: 'Retry' })).toBeTruthy()
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(
                <NotificationCard.Actions className={'my-actions'}>
                    <button type={'button'}>Ok</button>
                </NotificationCard.Actions>,
            )
            expect(getFirstChild(container).className).toContain('my-actions')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(
                <NotificationCard.Actions data-testid={'actions-bar'}>
                    <button type={'button'}>Ok</button>
                </NotificationCard.Actions>,
            )
            expect(getFirstChild(container).getAttribute('data-testid')).toBe(
                'actions-bar',
            )
        })

        it('forwards aria-* attributes', () => {
            const { container } = render(
                <NotificationCard.Actions aria-label={'NotificationCard actions'}>
                    <button type={'button'}>Ok</button>
                </NotificationCard.Actions>,
            )
            expect(
                getFirstChild(container).getAttribute('aria-label'),
            ).toBe('NotificationCard actions')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLDivElement>()
            render(
                <NotificationCard.Actions ref={ref}>
                    <button type={'button'}>Ok</button>
                </NotificationCard.Actions>,
            )
            expect(ref.current).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "NotificationCard.Actions"', () => {
            expect(NotificationCard.Actions.displayName).toBe('NotificationCard.Actions')
        })
    })
})
