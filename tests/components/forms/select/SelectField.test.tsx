import { CIRCLE_ICON as CircleIcon } from '@constants/icon-registry'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { SelectField } from '@components/forms/select'

const FRUIT_OPTIONS = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
]

const GROUPED_OPTIONS = [
    {
        type: 'group' as const,
        label: 'Citrus',
        options: [
            { value: 'lemon', label: 'Lemon' },
            { value: 'lime', label: 'Lime' },
        ],
    },
    { type: 'separator' as const },
    {
        type: 'group' as const,
        label: 'Berries',
        options: [
            { value: 'blueberry', label: 'Blueberry' },
            { value: 'raspberry', label: 'Raspberry', disabled: true },
        ],
    },
]

describe('SelectField', () => {
    describe('rendering', () => {
        it('renders a combobox trigger', () => {
            render(<SelectField options={FRUIT_OPTIONS} />)
            expect(screen.getByRole('combobox')).toBeTruthy()
        })

        it('renders a label linked to the trigger when label is provided', () => {
            render(<SelectField label={'Fruit'} options={FRUIT_OPTIONS} />)
            const trigger = screen.getByRole('combobox')
            const label = screen.getByText('Fruit') as HTMLSpanElement
            expect(label.id).toBe(trigger.getAttribute('aria-labelledby'))
        })

        it('does not open the trigger when its label is clicked', async () => {
            render(<SelectField label={'Fruit'} options={FRUIT_OPTIONS} />)

            await userEvent.click(screen.getByText('Fruit'))

            expect(document.querySelector('[data-open]')).toBeNull()
        })

        it('does not render a label when label is omitted', () => {
            render(<SelectField options={FRUIT_OPTIONS} />)
            expect(screen.queryByRole('label')).toBeNull()
        })

        it('renders helper text below the trigger', () => {
            render(
                <SelectField
                    helperText={'Pick your favourite fruit.'}
                    options={FRUIT_OPTIONS}
                />,
            )
            expect(screen.getByText('Pick your favourite fruit.')).toBeTruthy()
        })

        it('links helper text to trigger via aria-describedby', () => {
            render(
                <SelectField helperText={'Choose wisely.'} options={FRUIT_OPTIONS} />,
            )
            const trigger = screen.getByRole('combobox')
            expect(trigger.getAttribute('aria-describedby')).toBeTruthy()
        })

        it('renders error text and sets aria-invalid on the trigger', () => {
            render(
                <SelectField
                    error={'Please select a fruit.'}
                    options={FRUIT_OPTIONS}
                />,
            )
            const trigger = screen.getByRole('combobox')
            expect(screen.getByText('Please select a fruit.')).toBeTruthy()
            expect(trigger.getAttribute('aria-invalid')).toBe('true')
        })

        it('renders a start icon when startIcon is provided', () => {
            render(<SelectField startIcon={CircleIcon} options={FRUIT_OPTIONS} />)
            expect(document.querySelector('svg')).toBeTruthy()
        })

        it('renders the placeholder when no value is selected', () => {
            render(
                <SelectField placeholder={'Pick a fruit'} options={FRUIT_OPTIONS} />,
            )
            expect(screen.getByRole('combobox').textContent).toContain(
                'Pick a fruit',
            )
        })

        it('shows the selected value text in the trigger', async () => {
            render(<SelectField value={'banana'} options={FRUIT_OPTIONS} />)
            expect(screen.getByRole('combobox').textContent).toContain('Banana')
        })
    })

    describe('interactions', () => {
        it('opens the listbox on click', async () => {
            render(<SelectField options={FRUIT_OPTIONS} />)
            await userEvent.click(screen.getByRole('combobox'))
            await waitFor(() => {
                expect(document.querySelector('[data-open]')).not.toBeNull()
            })
        })

        it('calls onValueChange with the selected value', async () => {
            const handleChange = vi.fn()
            render(
                <SelectField options={FRUIT_OPTIONS} onValueChange={handleChange} />,
            )
            const trigger = screen.getByRole('combobox')
            trigger.focus()
            await userEvent.keyboard('{ArrowDown}')
            await waitFor(() => {
                expect(document.querySelector('[data-open]')).not.toBeNull()
            })
            await userEvent.keyboard('{ArrowDown}{Enter}')
            expect(handleChange).toHaveBeenCalledWith('banana')
        })

        it('closes the listbox on Escape', async () => {
            render(<SelectField options={FRUIT_OPTIONS} />)
            const trigger = screen.getByRole('combobox')
            trigger.focus()
            await userEvent.keyboard('{ArrowDown}')
            await waitFor(() => {
                expect(document.querySelector('[data-open]')).not.toBeNull()
            })
            await userEvent.keyboard('{Escape}')
            await waitFor(() => {
                expect(document.querySelector('[data-open]')).toBeNull()
            })
        })
    })

    describe('states', () => {
        it('disables the trigger when disabled is true', () => {
            render(<SelectField disabled options={FRUIT_OPTIONS} />)
            expect((screen.getByRole('combobox') as HTMLButtonElement).disabled).toBe(
                true,
            )
        })

        it('does not set aria-invalid without an error', () => {
            render(<SelectField options={FRUIT_OPTIONS} />)
            expect(
                screen.getByRole('combobox').getAttribute('aria-invalid'),
            ).toBeNull()
        })
    })

    describe('layout props', () => {
        it('applies a custom width to the outer wrapper', () => {
            const { container } = render(
                <SelectField width={'14rem'} options={FRUIT_OPTIONS} />,
            )
            const wrapper = container.firstChild as HTMLElement
            expect(wrapper.style.width).toBe('14rem')
        })

        it('merges a custom className onto the outer wrapper', () => {
            const { container } = render(
                <SelectField className={'my-select-field'} options={FRUIT_OPTIONS} />,
            )
            const wrapper = container.firstChild as HTMLElement
            expect(wrapper.className).toContain('my-select-field')
        })
    })

    describe('grouped options', () => {
        it('renders group labels when options contain groups', async () => {
            render(<SelectField options={GROUPED_OPTIONS} />)
            const trigger = screen.getByRole('combobox')
            trigger.focus()
            await userEvent.keyboard('{ArrowDown}')
            await waitFor(() => {
                expect(document.querySelector('[data-open]')).not.toBeNull()
            })
            expect(screen.getByText('Citrus')).toBeTruthy()
            expect(screen.getByText('Berries')).toBeTruthy()
        })

        it('marks disabled options with data-disabled', async () => {
            render(<SelectField options={GROUPED_OPTIONS} />)
            const trigger = screen.getByRole('combobox')
            trigger.focus()
            await userEvent.keyboard('{ArrowDown}')
            await waitFor(() => {
                expect(document.querySelector('[data-open]')).not.toBeNull()
            })
            const disabledOpt = screen
                .getByText('Raspberry')
                .closest('[role="option"]') as HTMLElement
            expect(disabledOpt.getAttribute('data-disabled')).toBe('')
        })
    })

    describe('controlled behavior', () => {
        it('reflects the controlled value in the trigger', () => {
            const { rerender } = render(
                <SelectField value={'apple'} options={FRUIT_OPTIONS} />,
            )
            expect(screen.getByRole('combobox').textContent).toContain('Apple')

            rerender(<SelectField value={'cherry'} options={FRUIT_OPTIONS} />)
            expect(screen.getByRole('combobox').textContent).toContain('Cherry')
        })
    })

    describe('displayName', () => {
        it('is set to "SelectField"', () => {
            expect(SelectField.displayName).toBe('SelectField')
        })
    })
})
