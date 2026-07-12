import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { RadioGroup } from '@components/forms/radio-group'
import RadioItem from '@components/forms/radio-group/components/radio-item/RadioItem.tsx'

describe('RadioItem', () => {
    describe('rendering', () => {
        it('renders a radio button', () => {
            render(
                <RadioGroup aria-label={'group'}>
                    <RadioItem value={'a'} aria-label={'Option A'} />
                </RadioGroup>,
            )
            expect(screen.getByRole('radio')).toBeTruthy()
        })

        it('renders a label when the label prop is provided', () => {
            render(
                <RadioGroup aria-label={'group'}>
                    <RadioItem value={'a'} label={'Option A'} />
                </RadioGroup>,
            )
            expect(screen.getByText('Option A')).toBeTruthy()
            expect(screen.getByText('Option A').tagName.toLowerCase()).toBe('label')
        })

        it('renders without a label when the label prop is omitted', () => {
            const { container } = render(
                <RadioGroup aria-label={'group'}>
                    <RadioItem value={'a'} aria-label={'Option A'} />
                </RadioGroup>,
            )
            expect(container.querySelector('label')).toBeNull()
        })
    })

    describe('accessibility', () => {
        it('associates the label with the radio via aria-labelledby', () => {
            render(
                <RadioGroup aria-label={'group'}>
                    <RadioItem value={'a'} label={'Option A'} />
                </RadioGroup>,
            )
            const label = screen.getByText('Option A') as HTMLLabelElement
            const radio = screen.getByRole('radio') as HTMLElement
            expect(radio.getAttribute('aria-labelledby')).toBe(label.id)
        })
    })

    describe('prop forwarding', () => {
        it('forwards aria-label to the radio', () => {
            render(
                <RadioGroup aria-label={'group'}>
                    <RadioItem value={'a'} aria-label={'Custom option'} />
                </RadioGroup>,
            )
            expect(screen.getByRole('radio', { name: 'Custom option' })).toBeTruthy()
        })

        it('forwards className to the radio item', () => {
            render(
                <RadioGroup aria-label={'group'}>
                    <RadioItem value={'a'} className={'my-radio'} aria-label={'Option A'} />
                </RadioGroup>,
            )
            expect(screen.getByRole('radio').className).toContain('my-radio')
        })

        it('forwards data-testid to the radio item', () => {
            render(
                <RadioGroup aria-label={'group'}>
                    <RadioItem value={'a'} data-testid={'radio-a'} aria-label={'Option A'} />
                </RadioGroup>,
            )
            expect(screen.getByTestId('radio-a')).toBeTruthy()
        })
    })

    describe('interactions', () => {
        it('calls onClick when provided', async () => {
            const handleClick = vi.fn()
            render(
                <RadioGroup aria-label={'group'}>
                    <RadioItem value={'a'} onClick={handleClick} aria-label={'Option A'} />
                </RadioGroup>,
            )
            await userEvent.click(screen.getByRole('radio'))
            expect(handleClick).toHaveBeenCalledTimes(1)
        })
    })

    describe('displayName', () => {
        it('is set to "RadioGroup.Item"', () => {
            expect(RadioItem.displayName).toBe('RadioGroup.Item')
        })
    })
})
