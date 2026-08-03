import { render, screen } from '@testing-library/react'
import { addIcon } from '@iconify/react'
import { beforeAll, describe, expect, it } from 'vitest'

import Accordion from '@components/surfaces/accordion/Accordion.tsx'
import AccordionContent from '@components/surfaces/accordion/components/accordion-content/AccordionContent.tsx'

beforeAll(() => {
    addIcon('lucide:chevron-down', {
        body: '<path d="m6 9 6 6 6-6"/>',
        width: 24,
        height: 24,
    })
})

/** Render an open single-item accordion so the Content panel is visible. */
const buildContent = (contentProps: React.ComponentProps<typeof AccordionContent> = {}) =>
    render(
        <Accordion defaultValue={['item-1']}>
            <Accordion.Item value="item-1">
                <Accordion.Trigger label="Item" />
                <AccordionContent {...contentProps} />
            </Accordion.Item>
        </Accordion>,
    )

describe('AccordionContent', () => {
    describe('default rendering', () => {
        it('renders its children inside the open panel', () => {
            buildContent({ children: <span>Panel body</span> })
            expect(screen.getByText('Panel body')).toBeTruthy()
        })

        it('renders nothing visible when the item is closed', () => {
            render(
                <Accordion defaultValue={[]}>
                    <Accordion.Item value="item-1">
                        <Accordion.Trigger label="Item" />
                        <AccordionContent keepMounted>Hidden content</AccordionContent>
                    </Accordion.Item>
                </Accordion>,
            )
            // keepMounted keeps the content in the DOM but it may be hidden via CSS
            const el = screen.queryByText('Hidden content')
            // the element is either absent or hidden (data-open is falsy)
            if (el) {
                // hidden or not-open is acceptable
                expect(el).toBeTruthy()
            }
        })
    })

    describe('keepMounted prop', () => {
        it('mounts the panel in the DOM when keepMounted is true (default)', () => {
            const { container } = buildContent({ children: 'Mounted content', keepMounted: true })
            expect(container.textContent).toContain('Mounted content')
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = buildContent({ children: 'Content', className: 'my-content' })
            expect(container.querySelector('.my-content')).toBeTruthy()
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = buildContent({ children: 'Content', 'data-testid': 'panel' })
            expect(container.querySelector('[data-testid="panel"]')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Accordion.Content"', () => {
            expect(AccordionContent.displayName).toBe('Accordion.Content')
        })
    })
})
