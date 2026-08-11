import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import Autocomplete from '@components/forms/autocomplete/Autocomplete.tsx'
import AutocompleteItem from '@components/forms/autocomplete/components/autocomplete-item/AutocompleteItem.tsx'
import { AUTOCOMPLETE_ITEM_STYLES } from '@components/forms/autocomplete/components/autocomplete-item/styles/AutocompleteItem.css.ts'

describe('AutocompleteItem', () => {
    describe('default rendering', () => {
        it('renders its label inside the open popup', async () => {
            render(
                <Autocomplete>
                    <Autocomplete.InputGroup>
                        <Autocomplete.Input placeholder="Search" />
                        <Autocomplete.Trigger />
                    </Autocomplete.InputGroup>
                    <Autocomplete.Content>
                        <Autocomplete.List>
                            <AutocompleteItem value="apple">Apple</AutocompleteItem>
                        </Autocomplete.List>
                    </Autocomplete.Content>
                </Autocomplete>,
            )
            await userEvent.click(screen.getByRole('combobox'))
            expect(screen.getByText('Apple')).toBeTruthy()
        })

        it('renders as an option role', async () => {
            render(
                <Autocomplete>
                    <Autocomplete.InputGroup>
                        <Autocomplete.Input placeholder="Search" />
                        <Autocomplete.Trigger />
                    </Autocomplete.InputGroup>
                    <Autocomplete.Content>
                        <Autocomplete.List>
                            <AutocompleteItem value="apple">Apple</AutocompleteItem>
                        </Autocomplete.List>
                    </Autocomplete.Content>
                </Autocomplete>,
            )
            await userEvent.click(screen.getByRole('combobox'))
            expect(screen.getByRole('option', { name: 'Apple' })).toBeTruthy()
        })
    })

    describe('styles', () => {
        it('exports a non-empty AUTOCOMPLETE_ITEM_STYLES.root class', () => {
            expect(AUTOCOMPLETE_ITEM_STYLES.root.length).toBeGreaterThan(0)
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', async () => {
            render(
                <Autocomplete>
                    <Autocomplete.InputGroup>
                        <Autocomplete.Input placeholder="Search" />
                        <Autocomplete.Trigger />
                    </Autocomplete.InputGroup>
                    <Autocomplete.Content>
                        <Autocomplete.List>
                            <AutocompleteItem value="apple" className="my-item">
                Apple
                            </AutocompleteItem>
                        </Autocomplete.List>
                    </Autocomplete.Content>
                </Autocomplete>,
            )
            await userEvent.click(screen.getByRole('combobox'))
            expect(document.querySelector('.my-item')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Autocomplete.Item"', () => {
            expect(AutocompleteItem.displayName).toBe('Autocomplete.Item')
        })
    })
})
