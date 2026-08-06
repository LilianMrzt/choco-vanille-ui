import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Stepper } from '@components/navigation/stepper'

describe('Stepper.Item', () => {
    it('renders its label inside the Stepper compound root', () => {
        render(
            <Stepper
                aria-label={'Progress'}
                currentStep={1}
            >
                <Stepper.Item
                    label={'Account'}
                    description={'Your details'}
                />
            </Stepper>,
        )

        expect(screen.getByText('Account')).toBeTruthy()
        expect(screen.getByText('Your details')).toBeTruthy()
    })

    it('uses children instead of the default marker and label visuals', () => {
        render(
            <Stepper
                aria-label={'Progress'}
                currentStep={2}
            >
                <Stepper.Item>
                    <span>Custom content</span>
                </Stepper.Item>
            </Stepper>,
        )

        expect(screen.getByText('Custom content')).toBeTruthy()
        expect(screen.queryByText('1')).toBeNull()
        expect(
            screen.getByText('Custom content').closest('li')?.querySelector(
                '[class*="markerCompleted"]',
            ),
        ).toBeTruthy()
    })

    it('centers a title-only item next to its marker', () => {
        render(
            <Stepper
                aria-label={'Progress'}
                currentStep={1}
            >
                <Stepper.Item label={'Account'} />
            </Stepper>,
        )

        const label = screen.getByText('Account')
        expect(label.closest('[aria-current]')?.className).toContain(
            'itemContentCentered',
        )
    })

    it('renders the small size for compact stepper layouts', () => {
        render(
            <Stepper
                aria-label={'Progress'}
                currentStep={1}
            >
                <Stepper.Item
                    label={'Account'}
                    size={'sm'}
                />
            </Stepper>,
        )

        expect(
            screen.getByText('1').closest('[class*="markerSmall"]'),
        ).toBeTruthy()
        expect(screen.getByText('Account').className).toContain(
            'labelSmall',
        )
    })
})
