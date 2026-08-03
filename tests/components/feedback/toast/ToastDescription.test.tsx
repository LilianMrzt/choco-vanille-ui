import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Toast } from '@components/feedback/toast'

// Suites

describe('ToastDescription', () => {
    describe('default rendering', () => {
        it('renders its children', () => {
            render(
                <Toast.Description>Something happened</Toast.Description>,
            )
            expect(screen.getByText('Something happened')).toBeTruthy()
        })

        it('renders as an inline span element', () => {
            render(<Toast.Description>Text</Toast.Description>)
            expect(
                screen.getByText('Text').tagName.toLowerCase(),
            ).toBe('span')
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className onto the span', () => {
            render(
                <Toast.Description className={'my-desc'}>
                    Text
                </Toast.Description>,
            )
            expect(screen.getByText('Text').className).toContain('my-desc')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            render(
                <Toast.Description data-testid={'description'}>
                    Text
                </Toast.Description>,
            )
            expect(screen.getByTestId('description')).toBeTruthy()
        })

        it('forwards aria-* attributes', () => {
            render(
                <Toast.Description aria-label={'Description text'}>
                    Text
                </Toast.Description>,
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
                <Toast.Description ref={ref}>Text</Toast.Description>,
            )
            expect(ref.current).toBeTruthy()
            expect(ref.current!.tagName.toLowerCase()).toBe('span')
        })
    })

    describe('displayName', () => {
        it('is set to "Toast.Description"', () => {
            expect(Toast.Description.displayName).toBe('Toast.Description')
        })
    })
})
