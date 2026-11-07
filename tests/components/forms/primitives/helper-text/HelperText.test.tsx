import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import HelperText from '@components/forms/primitives/helper-text/HelperText.tsx'

describe('HelperText', () => {
    it('renders as a polite status region by default', () => {
        render(<HelperText id={'helper'}>Hint</HelperText>)
        const el = screen.getByText('Hint')
        expect(el.getAttribute('role')).toBe('status')
        expect(el.getAttribute('aria-live')).toBe('polite')
    })

    it('renders as an assertive alert region for errors', () => {
        render(<HelperText id={'helper'} hasError>This field is required</HelperText>)
        const el = screen.getByText('This field is required')
        expect(el.getAttribute('role')).toBe('alert')
        expect(el.getAttribute('aria-live')).toBe('assertive')
    })

    it('allows role and aria-live to be customized', () => {
        render(
            <HelperText id={'helper'} role={'log'} aria-live={'off'}>
                Custom
            </HelperText>,
        )
        const el = screen.getByText('Custom')
        expect(el.getAttribute('role')).toBe('log')
        expect(el.getAttribute('aria-live')).toBe('off')
    })
})
