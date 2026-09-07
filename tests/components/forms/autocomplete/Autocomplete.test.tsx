import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import {
    Autocomplete,
    AutocompleteField,
} from '@components/forms/autocomplete'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'

const OPTIONS = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
]
describe('AutocompleteField', () => {
    describe('rendering', () => {
        it('renders a combobox input', () => {
            render(<AutocompleteField options={OPTIONS} />)
            expect(screen.getByRole('combobox')).toBeTruthy()
        })

        it('renders a label linked to the input', () => {
            render(<AutocompleteField label={'Fruit'} options={OPTIONS} />)
            const input = screen.getByRole('combobox')
            const label = screen.getByText('Fruit') as HTMLSpanElement
            expect(label.id).toBe(input.getAttribute('aria-labelledby'))
        })

        it('renders helper text linked via aria-describedby', () => {
            render(
                <AutocompleteField
                    label={'Fruit'}
                    helperText={'Pick a fruit.'}
                    options={OPTIONS}
                />,
            )
            const input = screen.getByRole('combobox')
            expect(screen.getByText('Pick a fruit.')).toBeTruthy()
            expect(input.getAttribute('aria-describedby')).toBeTruthy()
        })

        it('renders error text and sets aria-invalid', () => {
            render(
                <AutocompleteField
                    label={'Fruit'}
                    error={'Required'}
                    options={OPTIONS}
                />,
            )
            const input = screen.getByRole('combobox')
            expect(screen.getByText('Required')).toBeTruthy()
            expect(input.getAttribute('aria-invalid')).toBe('true')
        })

        it('renders a start icon', () => {
            render(<AutocompleteField startIcon={SearchIcon} options={OPTIONS} />)
            expect(document.querySelector('svg')).toBeTruthy()
        })

        it('renders a trigger button', () => {
            render(<AutocompleteField options={OPTIONS} />)
            expect(screen.getByRole('button', { name: 'Open options' })).toBeTruthy()
        })
    })

    describe('interactions', () => {
        it('opens the popup when the user clicks the input', async () => {
            render(<AutocompleteField options={OPTIONS} />)
            await userEvent.click(screen.getByRole('combobox'))
            expect(screen.getByRole('listbox')).toBeTruthy()
        })

        it('filters items when the user types', async () => {
            render(<AutocompleteField options={OPTIONS} />)
            await userEvent.type(screen.getByRole('combobox'), 'app')
            expect(screen.getByRole('listbox')).toBeTruthy()
            expect(screen.getByText('Apple')).toBeTruthy()
            expect(screen.queryByText('Banana')).not.toBeTruthy()
        })

        it('calls onValueChange when the user types', async () => {
            const handleValueChange = vi.fn()
            render(
                <AutocompleteField
                    options={OPTIONS}
                    onValueChange={handleValueChange}
                />,
            )
            await userEvent.type(screen.getByRole('combobox'), 'a')
            expect(handleValueChange).toHaveBeenCalled()
        })

        it('selects an item with the keyboard', async () => {
            const handleValueChange = vi.fn()
            render(
                <AutocompleteField
                    options={OPTIONS}
                    onValueChange={handleValueChange}
                />,
            )
            const input = screen.getByRole('combobox')
            await userEvent.click(input)
            await userEvent.keyboard('{ArrowDown}{Enter}')
            expect(handleValueChange).toHaveBeenCalled()
        })
    })

    describe('states', () => {
        it('disables the input when disabled is true', () => {
            render(<AutocompleteField disabled options={OPTIONS} />)
            expect((screen.getByRole('combobox') as HTMLInputElement).disabled).toBe(
                true,
            )
        })

        it('applies a custom width to the wrapper', () => {
            const { container } = render(
                <AutocompleteField width={'12rem'} options={OPTIONS} />,
            )
            const wrapper = container.firstChild as HTMLElement
            expect(wrapper.style.width).toBe('12rem')
        })
    })

    describe('empty state', () => {
        it('shows empty text when filtering yields no results', async () => {
            render(
                <AutocompleteField options={OPTIONS} emptyText={'No fruit found'} />,
            )
            await userEvent.type(screen.getByRole('combobox'), 'zzz')
            expect(screen.getByText('No fruit found')).toBeTruthy()
        })
    })
})

describe('Autocomplete compound', () => {
    it('exposes Input, Trigger, Content, List, Item and Empty subcomponents', () => {
        expect(Autocomplete.Input).toBeTruthy()
        expect(Autocomplete.Trigger).toBeTruthy()
        expect(Autocomplete.Content).toBeTruthy()
        expect(Autocomplete.List).toBeTruthy()
        expect(Autocomplete.Item).toBeTruthy()
        expect(Autocomplete.Empty).toBeTruthy()
    })
})
