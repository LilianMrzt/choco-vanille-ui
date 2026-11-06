import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { StepIndicator } from '@components/navigation/step-indicator'

describe('StepIndicator', () => {
    it('renders compound items with accessible labels and current state', () => {
        render(
            <StepIndicator aria-label={'Signup progress'} currentStep={2}>
                <StepIndicator.Item label={'Account'} />
                <StepIndicator.Item label={'Preferences'} />
                <StepIndicator.Item label={'Review'} />
            </StepIndicator>,
        )

        expect(screen.getByRole('navigation', { name: 'Signup progress' })).toBeTruthy()
        expect(screen.getByLabelText('Preferences').getAttribute('aria-current')).toBe('step')
        expect(screen.getAllByRole('listitem')).toHaveLength(3)
    })

    it('uses named native buttons when step changes are enabled', async () => {
        const onStepChange = vi.fn()

        render(
            <StepIndicator
                aria-label={'Progress'}
                currentStep={1}
                onStepChange={onStepChange}
            >
                <StepIndicator.Item label={'Account'} />
                <StepIndicator.Item label={'Review'} />
            </StepIndicator>,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Review' }))

        expect(onStepChange).toHaveBeenCalledWith(2)
    })

    it('updates current state when the controlling parent changes the step', async () => {
        const onStepChange = vi.fn()
        const ref = createRef<HTMLElement>()
        const { rerender } = render(
            <StepIndicator aria-label={'Progress'} currentStep={1} onStepChange={onStepChange} ref={ref}>
                <StepIndicator.Item label={'Account'} />
                <StepIndicator.Item label={'Review'} />
            </StepIndicator>,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Review' }))
        expect(onStepChange).toHaveBeenCalledWith(2)
        expect(screen.getByRole('button', { name: 'Account' }).getAttribute('aria-current')).toBe('step')

        rerender(
            <StepIndicator aria-label={'Progress'} currentStep={2} onStepChange={onStepChange} ref={ref}>
                <StepIndicator.Item label={'Account'} />
                <StepIndicator.Item label={'Review'} />
            </StepIndicator>,
        )

        expect(screen.getByRole('button', { name: 'Review' }).getAttribute('aria-current')).toBe('step')
        expect(ref.current).toBe(screen.getByRole('navigation', { name: 'Progress' }))
    })

    it('does not activate disabled items', async () => {
        const onStepChange = vi.fn()

        render(
            <StepIndicator
                aria-label={'Progress'}
                currentStep={1}
                onStepChange={onStepChange}
            >
                <StepIndicator.Item label={'Account'} />
                <StepIndicator.Item label={'Review'} disabled />
            </StepIndicator>,
        )

        const reviewButton = screen.getByRole('button', { name: 'Review' }) as HTMLButtonElement
        expect(reviewButton.disabled).toBe(true)
        await userEvent.click(reviewButton)

        expect(onStepChange).not.toHaveBeenCalled()
    })
})
