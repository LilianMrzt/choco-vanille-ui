import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import Autocomplete from '@components/forms/autocomplete/Autocomplete.tsx'
import AutocompleteGroup from '@components/forms/autocomplete/components/autocomplete-group/AutocompleteGroup.tsx'
import AutocompleteLabel from '@components/forms/autocomplete/components/autocomplete-label/AutocompleteLabel.tsx'

describe('AutocompleteLabel', () => {
    describe('default rendering', () => {
        it('renders its text as a group label inside the popup', async () => {
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

        it('forwards HTML attributes to the underlying element', async () => {
            render(
                <Autocomplete>
                    <Autocomplete.InputGroup>
                        <Autocomplete.Input placeholder="Search" />
                        <Autocomplete.Trigger />
                    </Autocomplete.InputGroup>
                    <Autocomplete.Content>
                        <Autocomplete.List>
                            <AutocompleteGroup>
                                <AutocompleteLabel data-testid="group-label">
                  Group
                                </AutocompleteLabel>
                                <Autocomplete.Item value="apple">Apple</Autocomplete.Item>
                            </AutocompleteGroup>
                        </Autocomplete.List>
                    </Autocomplete.Content>
                </Autocomplete>,
            )
            await userEvent.click(screen.getByRole('combobox'))
            expect(
                document.querySelector('[data-testid="group-label"]'),
            ).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Autocomplete.Label"', () => {
            expect(AutocompleteLabel.displayName).toBe('Autocomplete.Label')
        })
    })
})
