import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import Autocomplete from '@components/forms/autocomplete/Autocomplete.tsx'
import AutocompleteClear from '@components/forms/autocomplete/components/autocomplete-clear/AutocompleteClear.tsx'

describe('AutocompleteClear', () => {
    describe('default rendering', () => {
        it('renders a button element', () => {
            render(
                <Autocomplete>
                    <Autocomplete.InputGroup>
                        <Autocomplete.Input placeholder="Search" />
                        <AutocompleteClear aria-label="Clear">Clear</AutocompleteClear>
                        <Autocomplete.Trigger />
                    </Autocomplete.InputGroup>
                    <Autocomplete.Content>
                        <Autocomplete.List>
                            <Autocomplete.Item value="apple">Apple</Autocomplete.Item>
                        </Autocomplete.List>
                    </Autocomplete.Content>
                </Autocomplete>,
            )
            expect(screen.getByRole('button', { name: 'Clear' })).toBeTruthy()
        })
    })

    describe('interaction', () => {
        it('clears the input value when clicked', async () => {
            render(
                <Autocomplete>
                    <Autocomplete.InputGroup>
                        <Autocomplete.Input placeholder="Search" />
                        <AutocompleteClear aria-label="Clear">×</AutocompleteClear>
                        <Autocomplete.Trigger />
                    </Autocomplete.InputGroup>
                    <Autocomplete.Content>
                        <Autocomplete.List>
                            <Autocomplete.Item value="apple">Apple</Autocomplete.Item>
                        </Autocomplete.List>
                    </Autocomplete.Content>
                </Autocomplete>,
            )
            await userEvent.type(screen.getByRole('combobox'), 'app')
            expect((screen.getByRole('combobox') as HTMLInputElement).value).toBe(
                'app',
            )
            const clearButton = document.querySelector<HTMLButtonElement>(
                'button[aria-label="Clear"]',
            )
            expect(clearButton).toBeTruthy()
            await userEvent.click(clearButton as HTMLButtonElement)
            expect((screen.getByRole('combobox') as HTMLInputElement).value).toBe('')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = render(
                <Autocomplete>
                    <Autocomplete.InputGroup>
                        <Autocomplete.Input placeholder="Search" />
                        <AutocompleteClear aria-label="Clear" data-testid="clear-btn">
              ×
                        </AutocompleteClear>
                    </Autocomplete.InputGroup>
                    <Autocomplete.Content>
                        <Autocomplete.List>
                            <Autocomplete.Item value="apple">Apple</Autocomplete.Item>
                        </Autocomplete.List>
                    </Autocomplete.Content>
                </Autocomplete>,
            )
            expect(container.querySelector('[data-testid="clear-btn"]')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Autocomplete.Clear"', () => {
            expect(AutocompleteClear.displayName).toBe('Autocomplete.Clear')
        })
    })
})
