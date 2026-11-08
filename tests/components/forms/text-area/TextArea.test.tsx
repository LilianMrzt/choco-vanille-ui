import { INFO_ICON as InfoIcon } from '@constants/icon-registry'
import { createRef } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import FormLabel from '@components/forms/primitives/form-label/FormLabel.tsx'
import { TextArea } from '@components/forms/text-area'

describe('TextArea', () => {
    describe('rendering', () => {
        it('renders a textarea', () => {
            render(<TextArea />)
            expect(screen.getByRole('textbox')).toBeTruthy()
        })

        it('renders a label linked to the textarea', () => {
            render(<TextArea label={'Description'} />)
            const textarea = screen.getByRole('textbox')
            const label = screen.getByText('Description') as HTMLSpanElement
            expect(label.id).toBe(textarea.getAttribute('aria-labelledby'))
        })

        it('renders helper text linked via aria-describedby', () => {
            render(<TextArea label={'Description'} helperText={'Keep it short.'} />)
            const textarea = screen.getByRole('textbox')
            expect(screen.getByText('Keep it short.')).toBeTruthy()
            expect(textarea.getAttribute('aria-describedby')).toBeTruthy()
        })

        it('renders error text and sets aria-invalid', () => {
            render(<TextArea label={'Description'} error={'Too long'} />)
            const textarea = screen.getByRole('textbox')
            expect(screen.getByText('Too long')).toBeTruthy()
            expect(textarea.getAttribute('aria-invalid')).toBe('true')
        })

        it('renders a start icon', () => {
            render(<TextArea startIcon={InfoIcon} />)
            expect(document.querySelector('svg')).toBeTruthy()
        })

        it('renders a custom end action', () => {
            render(<TextArea endAction={<button aria-label={'Clear'}>X</button>} />)
            expect(screen.getByRole('button', { name: 'Clear' })).toBeTruthy()
        })

        it('renders with the specified number of rows', () => {
            render(<TextArea rows={6} />)
            expect((screen.getByRole('textbox') as HTMLTextAreaElement).rows).toBe(6)
        })

        it('disables manual resizing via CSS', () => {
            render(<TextArea />)
            const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
            expect(window.getComputedStyle(textarea).resize).toBe('none')
        })

        it('sets the rows attribute to minRows when auto-resize is enabled', () => {
            render(<TextArea rows={4} minRows={2} maxRows={6} />)
            expect((screen.getByRole('textbox') as HTMLTextAreaElement).rows).toBe(2)
        })
    })

    describe('auto-resize', () => {
        it('adjusts height based on content when minRows and maxRows are provided', async () => {
            const originalGetComputedStyle = window.getComputedStyle
            window.getComputedStyle = vi.fn(
                () =>
                    ({
                        lineHeight: '20px',
                        paddingTop: '8px',
                        paddingBottom: '8px',
                        borderTopWidth: '1px',
                        borderBottomWidth: '1px',
                    }) as CSSStyleDeclaration,
            ) as typeof window.getComputedStyle

            render(<TextArea minRows={2} maxRows={4} />)
            const textarea = screen.getByRole('textbox') as HTMLTextAreaElement

            // Initial render should set a height.
            expect(textarea.style.height).not.toBe('')

            window.getComputedStyle = originalGetComputedStyle
        })

        it('does not auto-resize when minRows and maxRows are omitted', () => {
            render(<TextArea />)
            const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
            expect(textarea.style.height).toBe('')
        })
    })

    describe('interactions', () => {
        it('calls onChange when the user types', async () => {
            const handleChange = vi.fn()
            render(<TextArea onChange={handleChange} />)
            await userEvent.type(screen.getByRole('textbox'), 'a')
            expect(handleChange).toHaveBeenCalled()
        })

        it('calls onKeyDown and onKeyUp', async () => {
            const handleKeyDown = vi.fn()
            const handleKeyUp = vi.fn()
            render(<TextArea onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />)
            await userEvent.type(screen.getByRole('textbox'), 'a')
            expect(handleKeyDown).toHaveBeenCalled()
            expect(handleKeyUp).toHaveBeenCalled()
        })
    })

    describe('states', () => {
        it('disables the textarea when disabled is true', () => {
            render(<TextArea disabled />)
            expect(
                (screen.getByRole('textbox') as HTMLTextAreaElement).disabled,
            ).toBe(true)
        })

        it('applies a custom width to the wrapper', () => {
            const { container } = render(<TextArea width={'24rem'} />)
            const wrapper = container.firstChild as HTMLElement
            expect(wrapper.style.width).toBe('24rem')
        })
    })

    describe('prop forwarding', () => {
        it('forwards a custom className to the textarea', () => {
            render(<TextArea className={'my-textarea'} />)
            expect(screen.getByRole('textbox').className).toContain('my-textarea')
        })

        it('forwards data-* attributes to the textarea', () => {
            render(<TextArea data-testid={'my-textarea'} />)
            expect(screen.getByTestId('my-textarea')).toBeTruthy()
        })

        it('forwards ref to the textarea element', () => {
            const ref = createRef<HTMLTextAreaElement>()
            render(<TextArea ref={ref} />)
            expect(ref.current).toBe(screen.getByRole('textbox'))
        })
    })

    describe('compound sub-components', () => {
        it('exposes Label, StartIcon and EndAction', () => {
            expect(TextArea.Label).toBe(FormLabel)
            expect(TextArea.StartIcon).toBeTruthy()
            expect(TextArea.EndAction).toBeTruthy()
        })
    })
})