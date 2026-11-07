import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { NotificationCard } from '@components/feedback/notification-card'
import { ICON_BUTTON_STYLES } from '@components/actions/icon-button/styles/IconButton.css'

// Helper

const getButton = () => screen.getByRole('button')

// Suites

describe('NotificationCardClose', () => {
    describe('default rendering', () => {
        it('uses the small close-button size', () => {
            render(<NotificationCard.Close aria-label={'Close'} />)
            for (const className of ICON_BUTTON_STYLES.recipe({ variant: 'ghost', color: 'neutral', size: 'sm' }).split(' ')) {
                expect(getButton().className).toContain(className)
            }
        })

        it('renders a button element', () => {
            render(<NotificationCard.Close aria-label={'Close'} />)
            expect(getButton()).toBeTruthy()
        })

        it('uses the provided aria-label as the accessible name', () => {
            render(<NotificationCard.Close aria-label={'Dismiss notification'} />)
            expect(
                screen.getByRole('button', { name: 'Dismiss notification' }),
            ).toBeTruthy()
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            render(<NotificationCard.Close aria-label={'Close'} className={'my-close'} />)
            expect(getButton().className).toContain('my-close')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            render(<NotificationCard.Close aria-label={'Close'} data-testid={'close-btn'} />)
            expect(screen.getByTestId('close-btn').tagName.toLowerCase()).toBe(
                'button',
            )
        })
    })

    describe('click handling', () => {
        it('calls onClick when clicked', async () => {
            const onClick = vi.fn()
            render(<NotificationCard.Close aria-label={'Close'} onClick={onClick} />)
            await userEvent.click(getButton())
            expect(onClick).toHaveBeenCalledTimes(1)
        })

        it('does not call onClick when disabled', async () => {
            const onClick = vi.fn()
            render(<NotificationCard.Close aria-label={'Close'} disabled onClick={onClick} />)
            await userEvent.click(getButton())
            expect(onClick).not.toHaveBeenCalled()
        })
    })

    describe('displayName', () => {
        it('is set to "NotificationCard.Close"', () => {
            expect(NotificationCard.Close.displayName).toBe('NotificationCard.Close')
        })
    })
})
