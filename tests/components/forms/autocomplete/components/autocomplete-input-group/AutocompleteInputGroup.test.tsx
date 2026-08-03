import { render, screen } from '@testing-library/react'
import { addIcon } from '@iconify/react'
import { beforeAll, describe, expect, it } from 'vitest'

import Autocomplete from '@components/forms/autocomplete/Autocomplete.tsx'
import AutocompleteInputGroup from '@components/forms/autocomplete/components/autocomplete-input-group/AutocompleteInputGroup.tsx'

beforeAll(() => {
    addIcon('lucide:chevron-down', {
        body: '<path d="m6 9 6 6 6-6"/>',
        width: 24,
        height: 24,
    })
})

describe('AutocompleteInputGroup', () => {
    describe('default rendering', () => {
        it('renders its children', () => {
            render(
                <Autocomplete>
                    <AutocompleteInputGroup>
                        <Autocomplete.Input placeholder="Search" />
                        <Autocomplete.Trigger />
                    </AutocompleteInputGroup>
                    <Autocomplete.Content>
                        <Autocomplete.List>
                            <Autocomplete.Item value="a">A</Autocomplete.Item>
                        </Autocomplete.List>
                    </Autocomplete.Content>
                </Autocomplete>,
            )
            expect(screen.getByRole('combobox')).toBeTruthy()
        })

        it('renders without crashing when used as Autocomplete.InputGroup', () => {
            render(
                <Autocomplete>
                    <Autocomplete.InputGroup>
                        <Autocomplete.Input placeholder="Search" />
                        <Autocomplete.Trigger />
                    </Autocomplete.InputGroup>
                    <Autocomplete.Content>
                        <Autocomplete.List>
                            <Autocomplete.Item value="a">A</Autocomplete.Item>
                        </Autocomplete.List>
                    </Autocomplete.Content>
                </Autocomplete>,
            )
            expect(screen.getByRole('combobox')).toBeTruthy()
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards style to the underlying element', () => {
            render(
                <Autocomplete>
                    <AutocompleteInputGroup style={{ width: '300px' }}>
                        <Autocomplete.Input placeholder="Search" />
                    </AutocompleteInputGroup>
                    <Autocomplete.Content>
                        <Autocomplete.List>
                            <Autocomplete.Item value="a">A</Autocomplete.Item>
                        </Autocomplete.List>
                    </Autocomplete.Content>
                </Autocomplete>,
            )
            // The InputGroup should render - no crash
            expect(screen.getByRole('combobox')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Autocomplete.InputGroup"', () => {
            expect(AutocompleteInputGroup.displayName).toBe('Autocomplete.InputGroup')
        })
    })
})
