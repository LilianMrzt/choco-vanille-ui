import { CHEVRON_DOWN_ICON as ChevronDownIcon } from '@constants/icon-registry'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Collapsible } from '@components/surfaces/collapsible'
import CollapsibleTrigger from '@components/surfaces/collapsible/components/collapsible-trigger/CollapsibleTrigger.tsx'

const buildTrigger = (
    triggerProps: React.ComponentProps<typeof CollapsibleTrigger> = {},
) =>
    render(
        <Collapsible defaultOpen={false}>
            <CollapsibleTrigger {...triggerProps} />
            <Collapsible.Panel>Panel content</Collapsible.Panel>
        </Collapsible>,
    )

describe('CollapsibleTrigger', () => {
    describe('label prop', () => {
        it('renders the label text', () => {
            buildTrigger({ label: 'Show more' })
            expect(screen.getByText('Show more')).toBeTruthy()
        })

        it('renders as a button', () => {
            buildTrigger({ label: 'Toggle' })
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
                <Collapsible defaultOpen={false}>
                    <CollapsibleTrigger>
                        <span data-testid="custom-child">Custom</span>
                    </CollapsibleTrigger>
                    <Collapsible.Panel>Panel</Collapsible.Panel>
                </Collapsible>,
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
        it('opens the panel when clicked', async () => {
            buildTrigger({ label: 'Toggle' })
            await userEvent.click(screen.getByRole('button'))
            expect(screen.getByText('Panel content')).toBeTruthy()
        })

        it('fires onClick when clicked', async () => {
            const handleClick = vi.fn()
            buildTrigger({ label: 'Click me', onClick: handleClick })
            await userEvent.click(screen.getByRole('button'))
            expect(handleClick).toHaveBeenCalledTimes(1)
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = buildTrigger({
                label: 'Toggle',
                className: 'my-trigger',
            })
            expect(container.querySelector('.my-trigger')).toBeTruthy()
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = buildTrigger({
                label: 'Toggle',
                'data-testid': 'trigger',
            })
            expect(container.querySelector('[data-testid="trigger"]')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Collapsible.Trigger"', () => {
            expect(CollapsibleTrigger.displayName).toBe('Collapsible.Trigger')
        })
    })
})
