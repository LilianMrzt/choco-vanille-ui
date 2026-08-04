import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Stepper from '@components/navigation/stepper/Stepper.tsx'

describe('Stepper', () => {
    it('renders a named navigation landmark and all steps', () => {
        render(
            <Stepper aria-label={'Signup progress'} currentStep={2}>
                <Stepper.Item label={'Account'} description={'Your details'} />
                <Stepper.Item label={'Preferences'} />
                <Stepper.Item label={'Review'} />
            </Stepper>,
        )

        expect(
            screen.getByRole('navigation', { name: 'Signup progress' }),
        ).toBeTruthy()
        expect(screen.getByText('Account')).toBeTruthy()
        expect(screen.getByText('Preferences')).toBeTruthy()
        expect(screen.getByText('Review')).toBeTruthy()
    })

    it('marks the current step with aria-current', () => {
        render(
            <Stepper aria-label={'Signup progress'} currentStep={2}>
                <Stepper.Item label={'Account'} />
                <Stepper.Item label={'Preferences'} />
                <Stepper.Item label={'Review'} />
            </Stepper>,
        )

        expect(
            screen
                .getByText('Preferences')
                .closest('[aria-current]')
                ?.getAttribute('aria-current'),
        ).toBe('step')
    })

    it('renders a connector between every pair of steps', () => {
        render(
            <Stepper
                aria-label={'Progress'}
                currentStep={2}
            >
                <Stepper.Item label={'Account'} />
                <Stepper.Item label={'Preferences'} />
                <Stepper.Item label={'Review'} />
            </Stepper>,
        )

        expect(document.querySelectorAll('[class*="connectorItem"]').length).toBe(2)
        expect(document.querySelectorAll('[class*="connector"]').length).toBe(4)
        expect(screen.getByRole('navigation').className).toContain(
            'Stepper_STEPPER_STYLES_root',
        )
    })

    it('renders visible vertical connectors between steps', () => {
        render(
            <Stepper
                aria-label={'Progress'}
                currentStep={2}
                orientation={'vertical'}
            >
                <Stepper.Item label={'Account'} />
                <Stepper.Item label={'Preferences'} />
                <Stepper.Item label={'Review'} />
            </Stepper>,
        )

        expect(
            document.querySelectorAll('[class*="connectorItemVertical"]').length,
        ).toBe(2)
        expect(
            document.querySelectorAll('[class*="connectorVertical"]').length,
        ).toBe(2)
    })

    it('calls onStepChange with the selected step number', async () => {
        const onStepChange = vi.fn()
        render(
            <Stepper
                aria-label={'Signup progress'}
                currentStep={2}
                onStepChange={onStepChange}
            >
                <Stepper.Item label={'Account'} />
                <Stepper.Item label={'Preferences'} />
                <Stepper.Item label={'Review'} />
            </Stepper>,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Review' }))

        expect(onStepChange).toHaveBeenCalledWith(3)
    })

    it('does not activate disabled steps', async () => {
        const onStepChange = vi.fn()
        render(
            <Stepper
                aria-label={'Signup progress'}
                currentStep={2}
                onStepChange={onStepChange}
            >
                <Stepper.Item label={'Account'} />
                <Stepper.Item label={'Preferences'} />
                <Stepper.Item label={'Review'} disabled />
            </Stepper>,
        )

        const reviewButton = screen.getByRole('button', {
            name: 'Review',
        }) as HTMLButtonElement
        expect(reviewButton.disabled).toBe(true)
        await userEvent.click(reviewButton)
        expect(onStepChange).not.toHaveBeenCalled()
    })
})
