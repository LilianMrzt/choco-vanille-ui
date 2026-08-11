import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Autocomplete from '@components/forms/autocomplete/Autocomplete.tsx'
import AutocompleteTrigger from '@components/forms/autocomplete/components/autocomplete-trigger/AutocompleteTrigger.tsx'

const buildTrigger = (
    triggerProps: React.ComponentProps<typeof AutocompleteTrigger> = {},
) =>
    render(
        <Autocomplete>
            <Autocomplete.InputGroup>
                <Autocomplete.Input placeholder="Search" />
                <AutocompleteTrigger {...triggerProps} />
            </Autocomplete.InputGroup>
            <Autocomplete.Content>
                <Autocomplete.List>
                    <Autocomplete.Item value="apple">Apple</Autocomplete.Item>
                </Autocomplete.List>
            </Autocomplete.Content>
        </Autocomplete>,
    )

describe('AutocompleteTrigger', () => {
    describe('default rendering', () => {
        it('renders a button', () => {
            buildTrigger()
            expect(screen.getByRole('button')).toBeTruthy()
        })

        it('has default aria-label "Open options"', () => {
            buildTrigger()
            expect(screen.getByRole('button', { name: 'Open options' })).toBeTruthy()
        })

        it('renders a chevron icon', () => {
            const { container } = buildTrigger()
            expect(container.querySelector('svg')).toBeTruthy()
        })
    })

    describe('aria-label prop', () => {
        it('accepts a custom aria-label', () => {
            buildTrigger({ 'aria-label': 'Ouvrir les options' })
            expect(
                screen.getByRole('button', { name: 'Ouvrir les options' }),
            ).toBeTruthy()
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = buildTrigger({ className: 'my-trigger' })
            expect(container.querySelector('.my-trigger')).toBeTruthy()
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = buildTrigger({ 'data-testid': 'ac-trigger' })
            expect(
                container.querySelector('[data-testid="ac-trigger"]'),
            ).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Autocomplete.Trigger"', () => {
            expect(AutocompleteTrigger.displayName).toBe('Autocomplete.Trigger')
        })
    })
})
