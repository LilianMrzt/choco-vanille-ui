import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Autocomplete from '@components/forms/autocomplete/Autocomplete.tsx'
import AutocompleteInput from '@components/forms/autocomplete/components/autocomplete-input/AutocompleteInput.tsx'
import { AUTOCOMPLETE_INPUT_STYLES } from '@components/forms/autocomplete/components/autocomplete-input/styles/AutocompleteInput.css.ts'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'

const buildInput = (
    inputProps: React.ComponentProps<typeof AutocompleteInput> = {},
) =>
    render(
        <Autocomplete>
            <Autocomplete.InputGroup>
                <AutocompleteInput placeholder="Search…" {...inputProps} />
                <Autocomplete.Trigger />
            </Autocomplete.InputGroup>
            <Autocomplete.Content>
                <Autocomplete.List>
                    <Autocomplete.Item value="apple">Apple</Autocomplete.Item>
                </Autocomplete.List>
            </Autocomplete.Content>
        </Autocomplete>,
    )

describe('AutocompleteInput', () => {
    describe('default rendering', () => {
        it('renders a combobox input', () => {
            buildInput()
            expect(screen.getByRole('combobox')).toBeTruthy()
        })

        it('applies the placeholder', () => {
            buildInput({ placeholder: 'Find something' })
            expect(
                (screen.getByRole('combobox') as HTMLInputElement).placeholder,
            ).toBe('Find something')
        })
    })

    describe('size prop', () => {
        it('produces distinct class names for each size', () => {
            const sm = AUTOCOMPLETE_INPUT_STYLES.recipe({ size: 'sm' })
            const md = AUTOCOMPLETE_INPUT_STYLES.recipe({ size: 'md' })
            const lg = AUTOCOMPLETE_INPUT_STYLES.recipe({ size: 'lg' })
            expect(sm).not.toBe(md)
            expect(md).not.toBe(lg)
        })
    })

    describe('hasError prop', () => {
        it('produces a different class when hasError is true', () => {
            const normal = AUTOCOMPLETE_INPUT_STYLES.recipe({ hasError: false })
            const error = AUTOCOMPLETE_INPUT_STYLES.recipe({ hasError: true })
            expect(normal).not.toBe(error)
        })
    })

    describe('startIcon prop', () => {
        it('renders an SVG when a startIcon is provided', () => {
            const { container } = buildInput({ startIcon: SearchIcon })
            expect(container.querySelector('svg')).toBeTruthy()
        })
    })

    describe('width prop', () => {
        it('applies width as an inline style', () => {
            buildInput({ width: '300px' })
            const input = screen.getByRole('combobox') as HTMLInputElement
            expect(input.style.width).toBe('300px')
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            buildInput({ className: 'my-input' })
            expect(screen.getByRole('combobox').className).toContain('my-input')
        })
    })

    describe('displayName', () => {
        it('is set to "Autocomplete.Input"', () => {
            expect(AutocompleteInput.displayName).toBe('Autocomplete.Input')
        })
    })
})
