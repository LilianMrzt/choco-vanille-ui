import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { addIcon } from '@iconify/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import { AutocompleteField } from '@components/forms/autocomplete'

const OPTIONS = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'blueberry', label: 'Blueberry' },
]

beforeAll(() => {
    addIcon('lucide:chevron-down', {
        body: '<path d="m6 9 6 6 6-6"/>',
        width: 24,
        height: 24,
    })
    addIcon('lucide:search', {
        body: '<path d="M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/>',
        width: 24,
        height: 24,
    })
})

describe('AutocompleteField', () => {
    describe('rendering', () => {
        it('renders a combobox input', () => {
            render(<AutocompleteField options={OPTIONS} />)
            expect(screen.getByRole('combobox')).toBeTruthy()
        })

        it('renders a linked label when provided', () => {
            render(<AutocompleteField label="Fruit" options={OPTIONS} />)
            const input = screen.getByRole('combobox')
            const label = screen.getByText('Fruit') as HTMLLabelElement
            expect(label.htmlFor).toBe(input.id)
        })

        it('renders helper text linked via aria-describedby', () => {
            render(
                <AutocompleteField label="Fruit" helperText="Pick a fruit." options={OPTIONS} />,
            )
            const input = screen.getByRole('combobox')
            expect(screen.getByText('Pick a fruit.')).toBeTruthy()
            expect(input.getAttribute('aria-describedby')).toBeTruthy()
        })

        it('renders error text and sets aria-invalid', () => {
            render(<AutocompleteField label="Fruit" error="Required" options={OPTIONS} />)
            const input = screen.getByRole('combobox')
            expect(screen.getByText('Required')).toBeTruthy()
            expect(input.getAttribute('aria-invalid')).toBe('true')
        })

        it('renders a start icon when provided', () => {
            render(<AutocompleteField startIcon="lucide:search" options={OPTIONS} />)
            expect(document.querySelector('svg')).toBeTruthy()
        })

        it('renders a trigger button', () => {
            render(<AutocompleteField options={OPTIONS} />)
            expect(screen.getByRole('button', { name: 'Open options' })).toBeTruthy()
        })
    })

    describe('interactions', () => {
        it('opens the popup when the input is clicked', async () => {
            render(<AutocompleteField options={OPTIONS} />)
            await userEvent.click(screen.getByRole('combobox'))
            expect(screen.getByRole('listbox')).toBeTruthy()
        })

        it('filters options when the user types', async () => {
            render(<AutocompleteField options={OPTIONS} />)
            await userEvent.type(screen.getByRole('combobox'), 'app')
            expect(screen.getByText('Apple')).toBeTruthy()
            expect(screen.queryByText('Banana')).not.toBeTruthy()
        })

        it('calls onValueChange when the user types', async () => {
            const handleValueChange = vi.fn()
            render(<AutocompleteField options={OPTIONS} onValueChange={handleValueChange} />)
            await userEvent.type(screen.getByRole('combobox'), 'a')
            expect(handleValueChange).toHaveBeenCalled()
        })
    })

    describe('controlled/uncontrolled', () => {
        it('renders with a controlled value', () => {
            render(
                <AutocompleteField
                    value="apple"
                    onValueChange={vi.fn()}
                    options={OPTIONS}
                />,
            )
            expect((screen.getByRole('combobox') as HTMLInputElement).value).toBe('apple')
        })

        it('renders with a defaultValue (uncontrolled)', () => {
            render(<AutocompleteField defaultValue="banana" options={OPTIONS} />)
            expect((screen.getByRole('combobox') as HTMLInputElement).value).toBe('banana')
        })
    })

    describe('states', () => {
        it('disables the input when disabled={true}', () => {
            render(<AutocompleteField disabled options={OPTIONS} />)
            expect((screen.getByRole('combobox') as HTMLInputElement).disabled).toBe(true)
        })

        it('applies a custom width to the wrapper', () => {
            const { container } = render(<AutocompleteField width="12rem" options={OPTIONS} />)
            const wrapper = container.firstChild as HTMLElement
            expect(wrapper.style.width).toBe('12rem')
        })
    })

    describe('empty state', () => {
        it('shows emptyText when filtering yields no results', async () => {
            render(<AutocompleteField options={OPTIONS} emptyText="No fruit found" />)
            await userEvent.type(screen.getByRole('combobox'), 'zzz')
            expect(screen.getByText('No fruit found')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "AutocompleteField"', () => {
            expect(AutocompleteField.displayName).toBe('AutocompleteField')
        })
    })
})
