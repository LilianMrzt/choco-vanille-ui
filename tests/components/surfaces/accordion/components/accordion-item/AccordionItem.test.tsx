import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Accordion from '@components/surfaces/accordion/Accordion.tsx'
import AccordionItem from '@components/surfaces/accordion/components/accordion-item/AccordionItem.tsx'
import { ACCORDION_ITEM_STYLES } from '@components/surfaces/accordion/components/accordion-item/styles/AccordionItem.css.ts'

describe('AccordionItem', () => {
    describe('default rendering', () => {
        it('renders its trigger label inside the Accordion', () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1">
                        <Accordion.Trigger label="Item 1" />
                        <Accordion.Content>Content 1</Accordion.Content>
                    </AccordionItem>
                </Accordion>,
            )
            expect(screen.getByText('Item 1')).toBeTruthy()
        })

        it('renders a button accessible from the keyboard', () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1">
                        <Accordion.Trigger label="Item 1" />
                        <Accordion.Content>Content 1</Accordion.Content>
                    </AccordionItem>
                </Accordion>,
            )
            expect(screen.getByRole('button')).toBeTruthy()
        })
    })

    describe('bordered prop', () => {
        it('applies a different class when bordered is false', () => {
            const borderedClass = ACCORDION_ITEM_STYLES.recipe({ bordered: true })
            const unborderedClass = ACCORDION_ITEM_STYLES.recipe({ bordered: false })
            expect(borderedClass).not.toBe(unborderedClass)
        })

        it('renders with bordered=false without crashing', () => {
            render(
                <Accordion>
                    <AccordionItem value="item-1" bordered={false}>
                        <Accordion.Trigger label="Item" />
                        <Accordion.Content>Content</Accordion.Content>
                    </AccordionItem>
                </Accordion>,
            )
            expect(screen.getByText('Item')).toBeTruthy()
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = render(
                <Accordion>
                    <AccordionItem value="item-1" className="my-item">
                        <Accordion.Trigger label="Item" />
                        <Accordion.Content>Content</Accordion.Content>
                    </AccordionItem>
                </Accordion>,
            )
            expect(container.querySelector('.my-item')).toBeTruthy()
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes to the item element', () => {
            const { container } = render(
                <Accordion>
                    <AccordionItem value="item-1" data-testid="accordion-item">
                        <Accordion.Trigger label="Item" />
                        <Accordion.Content>Content</Accordion.Content>
                    </AccordionItem>
                </Accordion>,
            )
            expect(
                container.querySelector('[data-testid="accordion-item"]'),
            ).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Accordion.Item"', () => {
            expect(AccordionItem.displayName).toBe('Accordion.Item')
        })
    })
})
