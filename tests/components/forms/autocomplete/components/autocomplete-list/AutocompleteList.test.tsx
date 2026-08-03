import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { addIcon } from '@iconify/react'
import { beforeAll, describe, expect, it } from 'vitest'

import Autocomplete from '@components/forms/autocomplete/Autocomplete.tsx'
import AutocompleteList from '@components/forms/autocomplete/components/autocomplete-list/AutocompleteList.tsx'
import AutocompleteItem from '@components/forms/autocomplete/components/autocomplete-item/AutocompleteItem.tsx'

beforeAll(() => {
    addIcon('lucide:chevron-down', {
        body: '<path d="m6 9 6 6 6-6"/>',
        width: 24,
        height: 24,
    })
})

describe('AutocompleteList', () => {
    describe('default rendering', () => {
        it('renders a listbox when the popup is open', async () => {
            render(
                <Autocomplete>
                    <Autocomplete.InputGroup>
                        <Autocomplete.Input placeholder="Search" />
                        <Autocomplete.Trigger />
                    </Autocomplete.InputGroup>
                    <Autocomplete.Content>
                        <AutocompleteList>
                            <AutocompleteItem value="apple">Apple</AutocompleteItem>
                            <AutocompleteItem value="banana">Banana</AutocompleteItem>
                        </AutocompleteList>
                    </Autocomplete.Content>
                </Autocomplete>,
            )
            await userEvent.click(screen.getByRole('combobox'))
            expect(screen.getByRole('listbox')).toBeTruthy()
        })

        it('renders its item children', async () => {
            render(
                <Autocomplete>
                    <Autocomplete.InputGroup>
                        <Autocomplete.Input placeholder="Search" />
                        <Autocomplete.Trigger />
                    </Autocomplete.InputGroup>
                    <Autocomplete.Content>
                        <AutocompleteList>
                            <AutocompleteItem value="apple">Apple</AutocompleteItem>
                            <AutocompleteItem value="banana">Banana</AutocompleteItem>
                        </AutocompleteList>
                    </Autocomplete.Content>
                </Autocomplete>,
            )
            await userEvent.click(screen.getByRole('combobox'))
            expect(screen.getByText('Apple')).toBeTruthy()
            expect(screen.getByText('Banana')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Autocomplete.List"', () => {
            expect(AutocompleteList.displayName).toBe('Autocomplete.List')
        })
    })
})
