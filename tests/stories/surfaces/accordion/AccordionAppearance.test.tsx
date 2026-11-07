import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import AccordionAppearance from '@stories/surfaces/accordion/components/accordion-appearance/AccordionAppearance'

describe('AccordionAppearance', () => {
    it('compares orientations with independently keyboard-operable items', async () => {
        const user = userEvent.setup()
        render(<AccordionAppearance />)

        expect(screen.getByRole('heading', { name: 'Orientations' })).toBeTruthy()
        const vertical = screen.getByRole('button', { name: 'Vertical details' })
        const horizontal = screen.getByRole('button', { name: 'Horizontal details' })
        expect(vertical.getAttribute('data-orientation')).toBe('vertical')
        expect(horizontal.getAttribute('data-orientation')).toBe('horizontal')
        vertical.focus()
        await user.keyboard('{Enter}')
        expect(vertical.getAttribute('aria-expanded')).toBe('true')
        expect(horizontal.getAttribute('aria-expanded')).toBe('false')

        horizontal.focus()
        await user.keyboard(' ')
        expect(horizontal.getAttribute('aria-expanded')).toBe('true')
    })
})
