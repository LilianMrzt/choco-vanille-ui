import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import StepIndicator from '@components/navigation/step-indicator/StepIndicator.tsx'

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
