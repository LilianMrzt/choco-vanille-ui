import { createRef } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { addIcon } from '@iconify/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { Select, SelectField } from '@components/forms/select'

beforeAll(() => {
    addIcon('lucide:chevron-down', {
        body: '<path d="m6 9 6 6 6-6"/>',
        width: 24,
        height: 24,
    })
    addIcon('lucide:check', {
        body: '<path d="M20 6 9 17l-5-5"/>',
        width: 24,
        height: 24,
    })
    addIcon('lucide:apple', {
        body: '<path d="M12 2a10 10 0 0 1 0 20 10 10 0 0 1 0-20Z"/>',
        width: 24,
        height: 24,
    })
})

const FRUIT_OPTIONS = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
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
            { value: 'strawberry', label: 'Strawberry' },
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

        it('renders a label linked to the trigger', () => {
            render(<SelectField label={'Fruit'} options={FRUIT_OPTIONS} />)
            const trigger = screen.getByRole('combobox')
            const label = screen.getByText('Fruit') as HTMLLabelElement
            expect(label.htmlFor).toBe(trigger.id)
        })

        it('renders helper text linked via aria-describedby', () => {
            render(
                <SelectField
                    label={'Fruit'}
                    helperText={'Pick your favorite fruit.'}
                    options={FRUIT_OPTIONS}
                />,
            )
            const trigger = screen.getByRole('combobox')
            expect(screen.getByText('Pick your favorite fruit.')).toBeTruthy()
            expect(trigger.getAttribute('aria-describedby')).toBeTruthy()
        })

        it('renders error text and sets aria-invalid', () => {
            render(
                <SelectField
                    label={'Fruit'}
                    error={'Please select a fruit.'}
                    options={FRUIT_OPTIONS}
                />,
            )
            const trigger = screen.getByRole('combobox')
            expect(screen.getByText('Please select a fruit.')).toBeTruthy()
            expect(trigger.getAttribute('aria-invalid')).toBe('true')
        })

        it('renders a start icon', () => {
            render(<SelectField startIcon={'lucide:apple'} options={FRUIT_OPTIONS} />)
            expect(document.querySelector('svg')).toBeTruthy()
        })

        it('renders the placeholder when no value is selected', () => {
            render(
                <SelectField
                    placeholder={'Pick a fruit'}
                    options={FRUIT_OPTIONS}
                />,
            )
            expect(screen.getByRole('combobox').textContent).toContain('Pick a fruit')
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

        it('selects an option with the keyboard', async () => {
            const handleChange = vi.fn()
            render(
                <SelectField
                    options={FRUIT_OPTIONS}
                    onValueChange={handleChange}
                />,
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
            expect((screen.getByRole('combobox') as HTMLButtonElement).disabled).toBe(true)
        })

        it('applies a custom width to the wrapper', () => {
            const { container } = render(
                <SelectField width={'12rem'} options={FRUIT_OPTIONS} />,
            )
            const wrapper = container.firstChild as HTMLElement
            expect(wrapper.style.width).toBe('12rem')
        })
    })

    describe('grouped options', () => {
        it('renders groups and separators', async () => {
            render(<SelectField options={GROUPED_OPTIONS} />)
            const trigger = screen.getByRole('combobox')
            trigger.focus()
            await userEvent.keyboard('{ArrowDown}')
            await waitFor(() => {
                expect(document.querySelector('[data-open]')).not.toBeNull()
            })
            expect(screen.getByText('Lemon')).toBeTruthy()
            expect(screen.getByText('Strawberry')).toBeTruthy()
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
            const disabledOption = screen.getByText('Raspberry').closest('[role="option"]') as HTMLElement
            expect(disabledOption.getAttribute('data-disabled')).toBe('')
        })
    })

    describe('prop forwarding', () => {
        it('forwards a custom className to the wrapper', () => {
            const { container } = render(
                <SelectField className={'my-select'} options={FRUIT_OPTIONS} />,
            )
            const wrapper = container.firstChild as HTMLElement
            expect(wrapper.className).toContain('my-select')
        })

        it('forwards data-* attributes to the wrapper', () => {
            const { container } = render(
                <SelectField data-testid={'my-select'} options={FRUIT_OPTIONS} />,
            )
            expect(container.querySelector('[data-testid="my-select"]')).toBeTruthy()
        })
    })
})

describe('Select (compound API)', () => {
    it('renders the compound sub-components', () => {
        expect(Select.Trigger).toBeTruthy()
        expect(Select.Value).toBeTruthy()
        expect(Select.Icon).toBeTruthy()
        expect(Select.Portal).toBeTruthy()
        expect(Select.Content).toBeTruthy()
        expect(Select.Viewport).toBeTruthy()
        expect(Select.Group).toBeTruthy()
        expect(Select.Label).toBeTruthy()
        expect(Select.Item).toBeTruthy()
        expect(Select.ItemText).toBeTruthy()
        expect(Select.ItemIndicator).toBeTruthy()
        expect(Select.Separator).toBeTruthy()
    })

    it('forwards ref to the trigger element', () => {
        const ref = createRef<HTMLButtonElement>()
        render(
            <Select>
                <Select.Trigger ref={ref} />
            </Select>,
        )
        expect(ref.current).toBe(screen.getByRole('combobox'))
    })
})
