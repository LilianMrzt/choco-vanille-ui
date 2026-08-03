import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { addIcon } from '@iconify/react'
import { beforeAll, describe, expect, it } from 'vitest'

import Autocomplete from '@components/forms/autocomplete/Autocomplete.tsx'
import AutocompleteEmpty from '@components/forms/autocomplete/components/autocomplete-empty/AutocompleteEmpty.tsx'

beforeAll(() => {
    addIcon('lucide:chevron-down', {
        body: '<path d="m6 9 6 6 6-6"/>',
        width: 24,
        height: 24,
    })
})

describe('AutocompleteEmpty', () => {
    describe('default rendering', () => {
        it('renders its children when there are no matching items', async () => {
            render(
                <Autocomplete>
                    <Autocomplete.InputGroup>
                        <Autocomplete.Input placeholder="Search" />
                        <Autocomplete.Trigger />
                    </Autocomplete.InputGroup>
                    <Autocomplete.Content>
                        <Autocomplete.List>
                            <Autocomplete.Item value="apple">Apple</Autocomplete.Item>
                        </Autocomplete.List>
                        <AutocompleteEmpty>No results found</AutocompleteEmpty>
                    </Autocomplete.Content>
                </Autocomplete>,
            )
            // Type something that matches nothing
            await userEvent.type(screen.getByRole('combobox'), 'zzz')
            expect(screen.getByRole('status').textContent).toMatch(/^No results found/)
        })
    })

    describe('displayName', () => {
        it('is set to "Autocomplete.Empty"', () => {
            expect(AutocompleteEmpty.displayName).toBe('Autocomplete.Empty')
        })
    })
})
