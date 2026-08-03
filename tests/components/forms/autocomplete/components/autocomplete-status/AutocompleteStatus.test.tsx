import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { addIcon } from '@iconify/react'
import { beforeAll, describe, expect, it } from 'vitest'

import Autocomplete from '@components/forms/autocomplete/Autocomplete.tsx'
import AutocompleteStatus from '@components/forms/autocomplete/components/autocomplete-status/AutocompleteStatus.tsx'

beforeAll(() => {
    addIcon('lucide:chevron-down', {
        body: '<path d="m6 9 6 6 6-6"/>',
        width: 24,
        height: 24,
    })
})

describe('AutocompleteStatus', () => {
    describe('default rendering', () => {
        it('renders status text when the popup is open', async () => {
            render(
                <Autocomplete>
                    <Autocomplete.InputGroup>
                        <Autocomplete.Input placeholder="Search" />
                        <Autocomplete.Trigger />
                    </Autocomplete.InputGroup>
                    <Autocomplete.Content>
                        <AutocompleteStatus>Loading…</AutocompleteStatus>
                        <Autocomplete.List>
                            <Autocomplete.Item value="apple">Apple</Autocomplete.Item>
                        </Autocomplete.List>
                    </Autocomplete.Content>
                </Autocomplete>,
            )
            await userEvent.click(screen.getByRole('combobox'))
            expect(screen.getByRole('status').textContent).toMatch(/^Loading…/)
        })
    })

    describe('displayName', () => {
        it('is set to "Autocomplete.Status"', () => {
            expect(AutocompleteStatus.displayName).toBe('Autocomplete.Status')
        })
    })
})
