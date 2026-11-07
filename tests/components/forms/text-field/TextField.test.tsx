import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import FormLabel from '@components/forms/primitives/form-label/FormLabel.tsx'
import { TextField } from '@components/forms/text-field'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'

describe('TextField', () => {
    describe('rendering', () => {
        it('renders a text input', () => {
            render(<TextField />)
            expect(screen.getByRole('textbox')).toBeTruthy()
        })

        it('renders a label linked to the input', () => {
            render(<TextField label={'Email'} />)
            const input = screen.getByRole('textbox')
            const label = screen.getByText('Email') as HTMLSpanElement
            expect(label.id).toBe(input.getAttribute('aria-labelledby'))
        })

        it('renders a required indicator by default for required fields', () => {
            render(<TextField label={'Email'} required />)
            expect(screen.getByText('*')).toBeTruthy()
        })

        it('can hide the required indicator while preserving native required semantics', () => {
            render(
                <TextField
                    label={'Email'}
                    required
                    showRequiredIndicator={false}
                />,
            )
            expect(screen.queryByText('*')).toBeNull()
            expect((screen.getByRole('textbox') as HTMLInputElement).required).toBe(true)
        })

        it('renders helper text linked via aria-describedby', () => {
            render(
                <TextField
                    label={'Email'}
                    helperText={'We will never share your email.'}
                />,
            )
            const input = screen.getByRole('textbox')
            expect(screen.getByText('We will never share your email.')).toBeTruthy()
            expect(input.getAttribute('aria-describedby')).toBeTruthy()
        })

        it('renders error text and sets aria-invalid', () => {
            render(<TextField label={'Email'} error={'Invalid email'} />)
            const input = screen.getByRole('textbox')
            expect(screen.getByText('Invalid email')).toBeTruthy()
            expect(input.getAttribute('aria-invalid')).toBe('true')
        })

        it('renders a start icon', () => {
            render(<TextField startIcon={SearchIcon} />)
            expect(document.querySelector('svg')).toBeTruthy()
        })

        it('renders a custom end action', () => {
            render(<TextField endAction={<button aria-label={'Clear'}>X</button>} />)
            expect(screen.getByRole('button', { name: 'Clear' })).toBeTruthy()
        })

        it('renders a password toggle when type is password', () => {
            render(<TextField label={'Password'} type={'password'} />)
            expect(
                screen.getByRole('button', { name: 'Show password' }),
            ).toBeTruthy()
        })
    })

    describe('interactions', () => {
        it('toggles password visibility', async () => {
            const { container } = render(
                <TextField label={'Password'} type={'password'} />,
            )
            const input = container.querySelector('input') as HTMLInputElement
            expect(input.type).toBe('password')
            await userEvent.click(
                screen.getByRole('button', { name: 'Show password' }),
            )
            expect(input.type).toBe('text')
            await userEvent.click(
                screen.getByRole('button', { name: 'Hide password' }),
            )
            expect(input.type).toBe('password')
        })

        it('calls onChange when the user types', async () => {
            const handleChange = vi.fn()
            render(<TextField onChange={handleChange} />)
            await userEvent.type(screen.getByRole('textbox'), 'a')
            expect(handleChange).toHaveBeenCalled()
        })

        it('calls onKeyDown and onKeyUp', async () => {
            const handleKeyDown = vi.fn()
            const handleKeyUp = vi.fn()
            render(<TextField onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />)
            await userEvent.type(screen.getByRole('textbox'), 'a')
            expect(handleKeyDown).toHaveBeenCalled()
            expect(handleKeyUp).toHaveBeenCalled()
        })
    })

    describe('states', () => {
        it('disables the input when disabled is true', () => {
            render(<TextField disabled />)
            expect((screen.getByRole('textbox') as HTMLInputElement).disabled).toBe(
                true,
            )
        })

        it('applies a custom width to the wrapper', () => {
            const { container } = render(<TextField width={'12rem'} />)
            const wrapper = container.firstChild as HTMLElement
            expect(wrapper.style.width).toBe('12rem')
        })
    })

    describe('prop forwarding', () => {
        it('forwards a custom className to the input', () => {
            render(<TextField className={'my-input'} />)
            expect(screen.getByRole('textbox').className).toContain('my-input')
        })

        it('forwards data-* attributes to the input', () => {
            render(<TextField data-testid={'my-input'} />)
            expect(screen.getByTestId('my-input')).toBeTruthy()
        })

        it('forwards ref to the input element', () => {
            const ref = createRef<HTMLInputElement>()
            render(<TextField ref={ref} />)
            expect(ref.current).toBe(screen.getByRole('textbox'))
        })
    })

    describe('compound sub-components', () => {
        it('exposes Label, StartIcon and EndAction', () => {
            expect(TextField.Label).toBe(FormLabel)
            expect(TextField.StartIcon).toBeTruthy()
            expect(TextField.EndAction).toBeTruthy()
        })
    })
})