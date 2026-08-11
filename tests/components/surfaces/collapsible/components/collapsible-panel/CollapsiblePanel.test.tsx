import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Collapsible from '@components/surfaces/collapsible/Collapsible.tsx'
import CollapsiblePanel from '@components/surfaces/collapsible/components/collapsible-panel/CollapsiblePanel.tsx'
/** Render an open collapsible so the panel is visible. */
const buildPanel = (
    panelProps: React.ComponentProps<typeof CollapsiblePanel> = {},
) =>
    render(
        <Collapsible defaultOpen={true}>
            <Collapsible.Trigger label="Toggle" />
            <CollapsiblePanel {...panelProps} />
        </Collapsible>,
    )

describe('CollapsiblePanel', () => {
    describe('default rendering', () => {
        it('renders its children inside the open panel', () => {
            buildPanel({ children: <span>Panel body</span> })
            expect(screen.getByText('Panel body')).toBeTruthy()
        })
    })

    describe('keepMounted prop', () => {
        it('keeps the panel in the DOM when keepMounted={true} (default)', () => {
            const { container } = render(
                <Collapsible defaultOpen={false}>
                    <Collapsible.Trigger label="Toggle" />
                    <CollapsiblePanel keepMounted>Mounted content</CollapsiblePanel>
                </Collapsible>,
            )
            expect(container.textContent).toContain('Mounted content')
        })
    })

    describe('padding prop', () => {
        it('applies an inline paddingBottom style based on the spacing token', () => {
            const { container } = buildPanel({ children: 'Content', padding: 'md' })
            // The panel or its wrapper should have a paddingBottom style set
            const el = container.querySelector(
                '[style*="padding"]',
            ) as HTMLElement | null
            expect(el).toBeTruthy()
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = buildPanel({
                children: 'Content',
                className: 'my-panel',
            })
            expect(container.querySelector('.my-panel')).toBeTruthy()
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = buildPanel({
                children: 'Content',
                'data-testid': 'panel',
            })
            expect(container.querySelector('[data-testid="panel"]')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Collapsible.Panel"', () => {
            expect(CollapsiblePanel.displayName).toBe('Collapsible.Panel')
        })
    })
})
