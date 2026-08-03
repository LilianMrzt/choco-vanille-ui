import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { addIcon } from '@iconify/react'
import { beforeAll, describe, expect, it } from 'vitest'

import Autocomplete from '@components/forms/autocomplete/Autocomplete.tsx'
import AutocompleteSeparator from '@components/forms/autocomplete/components/autocomplete-separator/AutocompleteSeparator.tsx'
import { AUTOCOMPLETE_SEPARATOR_STYLES } from '@components/forms/autocomplete/components/autocomplete-separator/styles/AutocompleteSeparator.css.ts'

beforeAll(() => {
    addIcon('lucide:chevron-down', {
        body: '<path d="m6 9 6 6 6-6"/>',
        width: 24,
        height: 24,
    })
})

describe('AutocompleteSeparator', () => {
    describe('default rendering', () => {
        it('renders in the popup when open', async () => {
            render(
                <Autocomplete>
                    <Autocomplete.InputGroup>
                        <Autocomplete.Input placeholder="Search" />
                        <Autocomplete.Trigger />
                    </Autocomplete.InputGroup>
                    <Autocomplete.Content>
                        <Autocomplete.List>
                            <Autocomplete.Item value="apple">Apple</Autocomplete.Item>
                            <AutocompleteSeparator data-testid="sep" />
                            <Autocomplete.Item value="banana">Banana</Autocomplete.Item>
                        </Autocomplete.List>
                    </Autocomplete.Content>
                </Autocomplete>,
            )
            await userEvent.click(screen.getByRole('combobox'))
            // The separator element should be in the document
            const sep = document.querySelector('[data-testid="sep"]')
            expect(sep).toBeTruthy()
        })
    })

    describe('styles', () => {
        it('exports a non-empty AUTOCOMPLETE_SEPARATOR_STYLES.root class', () => {
            expect(AUTOCOMPLETE_SEPARATOR_STYLES.root.length).toBeGreaterThan(0)
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
                            <Autocomplete.Item value="apple">Apple</Autocomplete.Item>
                            <AutocompleteSeparator className="my-sep" />
                        </Autocomplete.List>
                    </Autocomplete.Content>
                </Autocomplete>,
            )
            await userEvent.click(screen.getByRole('combobox'))
            expect(document.querySelector('.my-sep')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Autocomplete.Separator"', () => {
            expect(AutocompleteSeparator.displayName).toBe('Autocomplete.Separator')
        })
    })
})
