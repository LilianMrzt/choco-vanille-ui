import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { addIcon } from '@iconify/react'
import { beforeAll, describe, expect, it } from 'vitest'

import Autocomplete from '@components/forms/autocomplete/Autocomplete.tsx'
import AutocompleteCollection from '@components/forms/autocomplete/components/autocomplete-collection/AutocompleteCollection.tsx'

beforeAll(() => {
    addIcon('lucide:chevron-down', {
        body: '<path d="m6 9 6 6 6-6"/>',
        width: 24,
        height: 24,
    })
})

describe('AutocompleteCollection', () => {
    describe('default rendering', () => {
        it('renders its render-function children in the popup', async () => {
            const ITEMS = [
                { value: 'apple', label: 'Apple' },
                { value: 'banana', label: 'Banana' },
            ]

            render(
                <Autocomplete items={ITEMS}>
                    <Autocomplete.InputGroup>
                        <Autocomplete.Input placeholder="Search" />
                        <Autocomplete.Trigger />
                    </Autocomplete.InputGroup>
                    <Autocomplete.Content>
                        <Autocomplete.List>
                            <AutocompleteCollection>
                                {(item: { value: string; label: string }) => (
                                    <Autocomplete.Item key={item.value} value={item.value}>
                                        {item.label}
                                    </Autocomplete.Item>
                                )}
                            </AutocompleteCollection>
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
        it('is set to "Autocomplete.Collection"', () => {
            expect(AutocompleteCollection.displayName).toBe('Autocomplete.Collection')
        })
    })
})
