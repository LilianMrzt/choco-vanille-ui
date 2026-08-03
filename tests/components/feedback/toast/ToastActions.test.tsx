import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Toast } from '@components/feedback/toast'

// Helper

const getFirstChild = (container: HTMLElement) =>
    container.firstElementChild as HTMLElement

// Suites

describe('ToastActions', () => {
    describe('default rendering', () => {
        it('renders a container element', () => {
            const { container } = render(
                <Toast.Actions>
                    <button type={'button'}>Ok</button>
                </Toast.Actions>,
            )
            expect(getFirstChild(container)).toBeTruthy()
        })

        it('renders its children', () => {
            render(
                <Toast.Actions>
                    <button type={'button'}>Undo</button>
                    <button type={'button'}>Retry</button>
                </Toast.Actions>,
            )
            expect(screen.getByRole('button', { name: 'Undo' })).toBeTruthy()
            expect(screen.getByRole('button', { name: 'Retry' })).toBeTruthy()
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(
                <Toast.Actions className={'my-actions'}>
                    <button type={'button'}>Ok</button>
                </Toast.Actions>,
            )
            expect(getFirstChild(container).className).toContain('my-actions')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(
                <Toast.Actions data-testid={'actions-bar'}>
                    <button type={'button'}>Ok</button>
                </Toast.Actions>,
            )
            expect(getFirstChild(container).getAttribute('data-testid')).toBe(
                'actions-bar',
            )
        })

        it('forwards aria-* attributes', () => {
            const { container } = render(
                <Toast.Actions aria-label={'Toast actions'}>
                    <button type={'button'}>Ok</button>
                </Toast.Actions>,
            )
            expect(
                getFirstChild(container).getAttribute('aria-label'),
            ).toBe('Toast actions')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying DOM node', () => {
            const ref = createRef<HTMLDivElement>()
            render(
                <Toast.Actions ref={ref}>
                    <button type={'button'}>Ok</button>
                </Toast.Actions>,
            )
            expect(ref.current).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Toast.Actions"', () => {
            expect(Toast.Actions.displayName).toBe('Toast.Actions')
        })
    })
})
