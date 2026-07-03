import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import TextFieldLabel from '@components/forms/text-field/components/text-field-label/TextFieldLabel.tsx'

describe('TextFieldLabel', () => {
    it('renders its children', () => {
        render(<TextFieldLabel htmlFor={'input'}>Label</TextFieldLabel>)
        expect(screen.getByText('Label')).toBeTruthy()
    })

    it('forwards htmlFor to the label element', () => {
        render(<TextFieldLabel htmlFor={'my-input'}>Label</TextFieldLabel>)
        const label = screen.getByText('Label') as HTMLLabelElement
        expect(label.htmlFor).toBe('my-input')
    })

    it('sets data-disabled when disabled is true', () => {
        render(
            <TextFieldLabel htmlFor={'input'} disabled>
                Label
            </TextFieldLabel>,
        )
        expect(screen.getByText('Label').getAttribute('data-disabled')).toBe('')
    })

    it('has the expected displayName', () => {
        expect(TextFieldLabel.displayName).toBe('TextFieldLabel')
    })
})
