import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import TextFieldEndAction from '@components/forms/text-field/components/text-field-end-action/TextFieldEndAction.tsx'

describe('TextFieldEndAction', () => {
    it('renders its children', () => {
        render(
            <TextFieldEndAction>
                <button>Action</button>
            </TextFieldEndAction>,
        )
        expect(screen.getByRole('button', { name: 'Action' })).toBeTruthy()
    })

    it('has the expected displayName', () => {
        expect(TextFieldEndAction.displayName).toBe('TextField.EndAction')
    })
})
