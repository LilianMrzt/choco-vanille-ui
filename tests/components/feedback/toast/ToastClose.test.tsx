import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { addIcon } from '@iconify/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { Toast } from '@components/feedback/toast'

// Preload the close icon so Iconify renders synchronously in JSDOM.
beforeAll(() => {
    addIcon('lucide:x', {
        body: '<path d="M18 6 6 18M6 6l12 12"/>',
        width: 24,
        height: 24,
    })
})

// Helper

const getButton = () => screen.getByRole('button')

// Suites

describe('ToastClose', () => {
    describe('default rendering', () => {
        it('renders a button element', () => {
            render(<Toast.Close aria-label={'Close'} />)
            expect(getButton()).toBeTruthy()
        })

        it('uses the provided aria-label as the accessible name', () => {
            render(<Toast.Close aria-label={'Dismiss notification'} />)
            expect(
                screen.getByRole('button', { name: 'Dismiss notification' }),
            ).toBeTruthy()
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            render(
                <Toast.Close aria-label={'Close'} className={'my-close'} />,
            )
            expect(getButton().className).toContain('my-close')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            render(
                <Toast.Close
                    aria-label={'Close'}
                    data-testid={'close-btn'}
                />,
            )
            expect(
                screen.getByTestId('close-btn').tagName.toLowerCase(),
            ).toBe('button')
        })
    })

    describe('click handling', () => {
        it('calls onClick when clicked', async () => {
            const onClick = vi.fn()
            render(
                <Toast.Close aria-label={'Close'} onClick={onClick} />,
            )
            await userEvent.click(getButton())
            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('does not call onClick when disabled', async () => {
            const onClick = vi.fn()
            render(
                <Toast.Close
                    aria-label={'Close'}
                    disabled
                    onClick={onClick}
                />,
            )
            await userEvent.click(getButton())
            expect(onClick).not.toHaveBeenCalled()
        })
    })

    describe('displayName', () => {
        it('is set to "Toast.Close"', () => {
            expect(Toast.Close.displayName).toBe('Toast.Close')
        })
    })
})
