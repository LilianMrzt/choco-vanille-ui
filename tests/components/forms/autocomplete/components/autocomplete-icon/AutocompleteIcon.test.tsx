import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Autocomplete from '@components/forms/autocomplete/Autocomplete.tsx'
import AutocompleteIcon from '@components/forms/autocomplete/components/autocomplete-icon/AutocompleteIcon.tsx'

describe('AutocompleteIcon', () => {
    describe('default rendering', () => {
        it('renders without crashing inside the Autocomplete context', () => {
            expect(() =>
                render(
                    <Autocomplete>
                        <Autocomplete.InputGroup>
                            <AutocompleteIcon>
                                <svg data-testid="icon-svg" />
                            </AutocompleteIcon>
                            <Autocomplete.Input placeholder="Search" />
                            <Autocomplete.Trigger />
                        </Autocomplete.InputGroup>
                        <Autocomplete.Content>
                            <Autocomplete.List>
                                <Autocomplete.Item value="a">A</Autocomplete.Item>
                            </Autocomplete.List>
                        </Autocomplete.Content>
                    </Autocomplete>,
                ),
            ).not.toThrow()
        })

        it('renders its children', () => {
            const { container } = render(
                <Autocomplete>
                    <Autocomplete.InputGroup>
                        <AutocompleteIcon>
                            <span data-testid="icon-child">icon</span>
                        </AutocompleteIcon>
                        <Autocomplete.Input placeholder="Search" />
                    </Autocomplete.InputGroup>
                    <Autocomplete.Content>
                        <Autocomplete.List>
                            <Autocomplete.Item value="a">A</Autocomplete.Item>
                        </Autocomplete.List>
                    </Autocomplete.Content>
                </Autocomplete>,
            )
            expect(
                container.querySelector('[data-testid="icon-child"]'),
            ).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Autocomplete.Icon"', () => {
            expect(AutocompleteIcon.displayName).toBe('Autocomplete.Icon')
        })
    })
})
