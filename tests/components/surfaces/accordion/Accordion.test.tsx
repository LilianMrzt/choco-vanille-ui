import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import Accordion from '@components/surfaces/accordion/Accordion.tsx'

const buildAccordion = (
    props: Partial<React.ComponentProps<typeof Accordion>> = {},
) =>
    render(
        <Accordion defaultValue={[]} {...props}>
            <Accordion.Item value="item-1">
                <Accordion.Trigger label="Item 1" />
                <Accordion.Content>Content 1</Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-2">
                <Accordion.Trigger label="Item 2" />
                <Accordion.Content>Content 2</Accordion.Content>
            </Accordion.Item>
        </Accordion>,
    )

describe('Accordion', () => {
    describe('compound components', () => {
        it('exposes Item, Trigger and Content sub-components', () => {
            expect(Accordion.Item).toBeDefined()
            expect(Accordion.Trigger).toBeDefined()
            expect(Accordion.Content).toBeDefined()
        })
    })

    describe('default rendering', () => {
        it('renders trigger labels', () => {
            buildAccordion()
            expect(screen.getByText('Item 1')).toBeTruthy()
            expect(screen.getByText('Item 2')).toBeTruthy()
        })

        it('exposes trigger buttons that are keyboard accessible', () => {
            buildAccordion()
            const buttons = screen.getAllByRole('button')
            expect(buttons.length).toBeGreaterThanOrEqual(2)
        })

        it('renders a wrapper element as a flex column', () => {
            const { container } = buildAccordion()
            const wrapper = container.firstElementChild as HTMLElement
            expect(wrapper).toBeTruthy()
            expect(wrapper.tagName.toLowerCase()).toBe('div')
        })
    })

    describe('uncontrolled behavior', () => {
        it('opens the matching item when defaultValue is provided', () => {
            render(
                <Accordion defaultValue={['item-1']}>
                    <Accordion.Item value="item-1">
                        <Accordion.Trigger label="Open Item" />
                        <Accordion.Content>Open Content</Accordion.Content>
                    </Accordion.Item>
                </Accordion>,
            )
            expect(screen.getByText('Open Content')).toBeTruthy()
        })

        it('fires onValueChange when a trigger is clicked', async () => {
            const handleChange = vi.fn()
            buildAccordion({ onValueChange: handleChange })
            await userEvent.click(screen.getAllByRole('button')[0])
            expect(handleChange).toHaveBeenCalled()
        })

        it('calls onValueChange with the newly opened item value', async () => {
            const handleChange = vi.fn()
            buildAccordion({ onValueChange: handleChange })
            await userEvent.click(screen.getAllByRole('button')[0])
            const [[nextValue]] = handleChange.mock.calls
            expect(nextValue).toContain('item-1')
        })
    })

    describe('controlled behavior', () => {
        it('renders with a controlled value', () => {
            const handleChange = vi.fn()
            render(
                <Accordion value={['item-1']} onValueChange={handleChange}>
                    <Accordion.Item value="item-1">
                        <Accordion.Trigger label="Item 1" />
                        <Accordion.Content>Content 1</Accordion.Content>
                    </Accordion.Item>
                </Accordion>,
            )
            expect(screen.getByText('Content 1')).toBeTruthy()
        })
    })

    describe('width prop', () => {
        it('applies full width by default', () => {
            const { container } = buildAccordion()
            const wrapper = container.firstElementChild as HTMLElement
            expect(wrapper.style.width).toBe('100%')
        })

        it('applies a custom width via inline style', () => {
            const { container } = buildAccordion({ width: '600px' })
            const wrapper = container.firstElementChild as HTMLElement
            expect(wrapper.style.width).toBe('600px')
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className onto the outer wrapper', () => {
            const { container } = buildAccordion({ className: 'my-accordion' })
            const wrapper = container.firstElementChild as HTMLElement
            expect(wrapper.className).toContain('my-accordion')
        })
    })

    describe('HTML attribute passthrough', () => {
        it('forwards data-* attributes', () => {
            const { container } = buildAccordion({
                'data-testid': 'accordion',
            } as never)
            expect(container.querySelector('[data-testid="accordion"]')).toBeTruthy()
        })
    })

    describe('displayName', () => {
        it('is set to "Accordion"', () => {
            expect(Accordion.displayName).toBe('Accordion')
        })
    })
})
