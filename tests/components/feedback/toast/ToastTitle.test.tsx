import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Toast, type ToastVariant } from '@components/feedback/toast'

// Suites

describe('ToastTitle', () => {
    describe('default rendering', () => {
        it('renders its children', () => {
            render(<Toast.Title>Heads up</Toast.Title>)
            expect(screen.getByText('Heads up')).toBeTruthy()
        })

        it('renders as an inline span element', () => {
            render(<Toast.Title>Title text</Toast.Title>)
            expect(
                screen.getByText('Title text').tagName.toLowerCase(),
            ).toBe('span')
        })
    })

    describe('variant context', () => {
        const variants: ToastVariant[] = ['info', 'success', 'warning', 'error']

        it.each(variants)(
            'renders the title text for the "%s" variant via the Toast root',
            (variant) => {
                render(
                    <Toast variant={variant}>
                        <Toast.Title>Title</Toast.Title>
                    </Toast>,
                )
                expect(screen.getByText('Title')).toBeTruthy()
            },
        )
    })

    describe('CSS class application', () => {
        it('merges a custom className onto the span', () => {
            render(
                <Toast.Title className={'my-title'}>Title text</Toast.Title>,
            )
            expect(screen.getByText('Title text').className).toContain(
                'my-title',
            )
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            render(
                <Toast.Title data-testid={'toast-title'}>Title</Toast.Title>,
            )
            expect(screen.getByTestId('toast-title')).toBeTruthy()
        })

        it('forwards aria-* attributes', () => {
            render(
                <Toast.Title aria-label={'Toast title'}>Title</Toast.Title>,
            )
            expect(
                screen.getByText('Title').getAttribute('aria-label'),
            ).toBe('Toast title')
        })
    })

    describe('ref forwarding', () => {
        it('forwards the ref to the underlying span element', () => {
            const ref = createRef<HTMLSpanElement>()
            render(<Toast.Title ref={ref}>Title</Toast.Title>)
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('span')
        })
    })

    describe('displayName', () => {
        it('is set to "Toast.Title"', () => {
            expect(Toast.Title.displayName).toBe('Toast.Title')
        })
    })
})
