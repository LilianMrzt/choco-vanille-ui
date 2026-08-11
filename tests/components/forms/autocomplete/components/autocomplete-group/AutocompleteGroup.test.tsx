import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import Autocomplete from '@components/forms/autocomplete/Autocomplete.tsx'
import AutocompleteGroup from '@components/forms/autocomplete/components/autocomplete-group/AutocompleteGroup.tsx'
import AutocompleteLabel from '@components/forms/autocomplete/components/autocomplete-label/AutocompleteLabel.tsx'

describe('AutocompleteGroup', () => {
    describe('default rendering', () => {
        it('renders its children inside the popup', async () => {
            render(
                <Autocomplete>
                    <Autocomplete.InputGroup>
                        <Autocomplete.Input placeholder="Search" />
                        <Autocomplete.Trigger />
                    </Autocomplete.InputGroup>
                    <Autocomplete.Content>
                        <Autocomplete.List>
                            <AutocompleteGroup>
                                <Autocomplete.Item value="apple">Apple</Autocomplete.Item>
                                <Autocomplete.Item value="banana">Banana</Autocomplete.Item>
                            </AutocompleteGroup>
                        </Autocomplete.List>
                    </Autocomplete.Content>
                </Autocomplete>,
            )
            await userEvent.click(screen.getByRole('combobox'))
            expect(screen.getByText('Apple')).toBeTruthy()
            expect(screen.getByText('Banana')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Autocomplete.Group"', () => {
            expect(AutocompleteGroup.displayName).toBe('Autocomplete.Group')
        })
    })
})

describe('AutocompleteLabel', () => {
    describe('default rendering', () => {
        it('renders the group label text inside the popup', async () => {
            render(
                <Autocomplete>
                    <Autocomplete.InputGroup>
                        <Autocomplete.Input placeholder="Search" />
                        <Autocomplete.Trigger />
                    </Autocomplete.InputGroup>
                    <Autocomplete.Content>
                        <Autocomplete.List>
                            <AutocompleteGroup>
                                <AutocompleteLabel>Fruits</AutocompleteLabel>
                                <Autocomplete.Item value="apple">Apple</Autocomplete.Item>
                            </AutocompleteGroup>
                        </Autocomplete.List>
                    </Autocomplete.Content>
                </Autocomplete>,
            )
            await userEvent.click(screen.getByRole('combobox'))
            expect(screen.getByText('Fruits')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Autocomplete.Label"', () => {
            expect(AutocompleteLabel.displayName).toBe('Autocomplete.Label')
        })
    })
})
