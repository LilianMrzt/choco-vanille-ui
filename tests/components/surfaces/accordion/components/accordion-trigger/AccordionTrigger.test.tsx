import { CHEVRON_DOWN_ICON as ChevronDownIcon } from '@constants/icon-registry'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Accordion from '@components/surfaces/accordion/Accordion.tsx'
import AccordionTrigger from '@components/surfaces/accordion/components/accordion-trigger/AccordionTrigger.tsx'

/** Helper: render a minimal accordion with a single item using AccordionTrigger. */
const buildTrigger = (
    triggerProps: React.ComponentProps<typeof AccordionTrigger> = {},
) =>
    render(
        <Accordion defaultValue={[]}>
            <Accordion.Item value="item-1">
                <AccordionTrigger {...triggerProps} />
                <Accordion.Content>Panel content</Accordion.Content>
            </Accordion.Item>
        </Accordion>,
    )

describe('AccordionTrigger', () => {
    describe('label prop', () => {
        it('renders the label text', () => {
            buildTrigger({ label: 'My Section' })
            expect(screen.getByText('My Section')).toBeTruthy()
        })

        it('renders as a button role', () => {
            buildTrigger({ label: 'Section' })
            expect(screen.getByRole('button')).toBeTruthy()
        })
    })

    describe('startIcon prop', () => {
        it('renders an SVG when a startIcon is provided', () => {
            const { container } = buildTrigger({
                label: 'Section',
                startIcon: ChevronDownIcon,
            })
            expect(container.querySelectorAll('svg').length).toBeGreaterThanOrEqual(
                1,
            )
        })
    })

    describe('endIcon prop', () => {
        it('renders an SVG when an endIcon is provided', () => {
            const { container } = buildTrigger({
                label: 'Section',
                endIcon: ChevronDownIcon,
            })
            expect(container.querySelectorAll('svg').length).toBeGreaterThanOrEqual(
                1,
            )
        })
    })

    describe('custom children', () => {
        it('renders custom children when no label is provided', () => {
            render(
                <Accordion defaultValue={[]}>
                    <Accordion.Item value="item-1">
                        <AccordionTrigger>
                            <span data-testid="custom-child">Custom</span>
                        </AccordionTrigger>
                        <Accordion.Content>Panel</Accordion.Content>
                    </Accordion.Item>
                </Accordion>,
            )
            expect(screen.getByTestId('custom-child')).toBeTruthy()
        })

        it('prioritises the label over children when both are provided', () => {
            buildTrigger({
                label: 'Label wins',
                children: <span>Children lose</span>,
            })
            expect(screen.getByText('Label wins')).toBeTruthy()
            expect(screen.queryByText('Children lose')).toBeFalsy()
        })
    })

    describe('interaction', () => {
        it('opens the accordion panel when clicked', async () => {
            buildTrigger({ label: 'Toggle' })
            await userEvent.click(screen.getByRole('button'))
            expect(screen.getByText('Panel content')).toBeTruthy()
        })

        it('fires onClick when the trigger is clicked', async () => {
            const handleClick = vi.fn()
            buildTrigger({ label: 'Click me', onClick: handleClick })
            await userEvent.click(screen.getByRole('button'))
            expect(handleClick).toHaveBeenCalledTimes(1)
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = buildTrigger({
                label: 'Section',
                className: 'my-trigger',
            })
            expect(container.querySelector('.my-trigger')).toBeTruthy()
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = buildTrigger({
                label: 'Section',
                'data-testid': 'trigger',
            })
            expect(container.querySelector('[data-testid="trigger"]')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Accordion.Trigger"', () => {
            expect(AccordionTrigger.displayName).toBe('Accordion.Trigger')
        })
    })
})
