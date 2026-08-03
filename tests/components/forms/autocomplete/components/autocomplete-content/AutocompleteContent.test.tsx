import { render, screen } from '@testing-library/react'
import { addIcon } from '@iconify/react'
import userEvent from '@testing-library/user-event'
import { beforeAll, describe, expect, it } from 'vitest'

import Autocomplete from '@components/forms/autocomplete/Autocomplete.tsx'
import AutocompleteContent from '@components/forms/autocomplete/components/autocomplete-content/AutocompleteContent.tsx'
import { AUTOCOMPLETE_CONTENT_STYLES } from '@components/forms/autocomplete/components/autocomplete-content/styles/AutocompleteContent.css.ts'

beforeAll(() => {
    addIcon('lucide:chevron-down', {
        body: '<path d="m6 9 6 6 6-6"/>',
        width: 24,
        height: 24,
    })
})

describe('AutocompleteContent', () => {
    describe('default rendering', () => {
        it('renders the listbox popup when the autocomplete is open', async () => {
            render(
                <Autocomplete>
                    <Autocomplete.InputGroup>
                        <Autocomplete.Input placeholder="Search" />
                        <Autocomplete.Trigger />
                    </Autocomplete.InputGroup>
                    <AutocompleteContent>
                        <Autocomplete.List>
                            <Autocomplete.Item value="apple">Apple</Autocomplete.Item>
                        </Autocomplete.List>
                    </AutocompleteContent>
                </Autocomplete>,
            )
            await userEvent.click(screen.getByRole('combobox'))
            expect(screen.getByText('Apple')).toBeTruthy()
        })

        it('applies a default accessible name to the listbox', async () => {
            render(
                <Autocomplete>
                    <Autocomplete.InputGroup>
                        <Autocomplete.Input placeholder="Search" />
                        <Autocomplete.Trigger />
                    </Autocomplete.InputGroup>
                    <AutocompleteContent listboxAriaLabel="Fruits">
                        <Autocomplete.List>
                            <Autocomplete.Item value="apple">Apple</Autocomplete.Item>
                        </Autocomplete.List>
                    </AutocompleteContent>
                </Autocomplete>,
            )
            await userEvent.click(screen.getByRole('combobox'))
            expect(screen.getByRole('listbox', { name: 'Fruits' })).toBeTruthy()
        })
    })

    describe('styles', () => {
        it('exports a non-empty AUTOCOMPLETE_CONTENT_STYLES.root class', () => {
            expect(AUTOCOMPLETE_CONTENT_STYLES.root.length).toBeGreaterThan(0)
        })
    })

    describe('displayName', () => {
        it('is set to "Autocomplete.Content"', () => {
            expect(AutocompleteContent.displayName).toBe('Autocomplete.Content')
        })
    })
})
