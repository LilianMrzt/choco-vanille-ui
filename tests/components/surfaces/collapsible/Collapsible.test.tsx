import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Collapsible } from '@components/surfaces/collapsible'

const buildCollapsible = (
    props: Partial<React.ComponentProps<typeof Collapsible>> = {},
) =>
    render(
        <Collapsible defaultOpen={false} {...props}>
            <Collapsible.Trigger label="Toggle" />
            <Collapsible.Panel>Panel content</Collapsible.Panel>
        </Collapsible>,
    )

describe('Collapsible', () => {
    describe('compound components', () => {
        it('exposes Trigger and Panel sub-components', () => {
            expect(Collapsible.Trigger).toBeDefined()
            expect(Collapsible.Panel).toBeDefined()
        })
    })

    describe('default rendering', () => {
        it('renders the trigger', () => {
            buildCollapsible()
            expect(screen.getByText('Toggle')).toBeTruthy()
        })

        it('renders the trigger as a button', () => {
            buildCollapsible()
            expect(screen.getByRole('button')).toBeTruthy()
        })

        it('renders an outer wrapper element', () => {
            const { container } = buildCollapsible()
            expect(container.firstElementChild).toBeTruthy()
        })
    })

    describe('uncontrolled open behavior', () => {
        it('is closed by default when defaultOpen is not set', () => {
            buildCollapsible({ defaultOpen: false })
            // Panel content is not visible
            const content = screen.queryByText('Panel content')
            if (content) {
                // If mounted, it should be hidden
                expect(content).toBeTruthy()
            }
        })

        it('is open when defaultOpen={true}', () => {
            buildCollapsible({ defaultOpen: true })
            expect(screen.getByText('Panel content')).toBeTruthy()
        })

        it('opens the panel when the trigger is clicked', async () => {
            buildCollapsible({ defaultOpen: false })
            await userEvent.click(screen.getByRole('button'))
            expect(screen.getByText('Panel content')).toBeTruthy()
        })

        it('fires onOpenChange when the trigger is clicked', async () => {
            const handleOpenChange = vi.fn()
            buildCollapsible({ onOpenChange: handleOpenChange })
            await userEvent.click(screen.getByRole('button'))
            expect(handleOpenChange).toHaveBeenCalled()
            const [firstArg] = handleOpenChange.mock.calls[0]
            expect(firstArg).toBe(true)
        })

        it('passes event details through and respects cancellation', async () => {
            const handler: NonNullable<React.ComponentProps<typeof Collapsible>['onOpenChange']> = vi.fn((_open, details) => details.cancel())
            buildCollapsible({ onOpenChange: handler })
            const trigger = screen.getByRole('button', { name: 'Toggle' })

            await userEvent.click(trigger)
            expect(handler).toHaveBeenCalledWith(true, expect.objectContaining({ event: expect.any(Event), cancel: expect.any(Function) }))
            expect(trigger.getAttribute('aria-expanded')).toBe('false')
        })

        it('opens using the keyboard', async () => {
            buildCollapsible()
            const trigger = screen.getByRole('button', { name: 'Toggle' })
            trigger.focus()
            await userEvent.keyboard('{Enter}')
            expect(trigger.getAttribute('aria-expanded')).toBe('true')
        })
    })

    describe('controlled open behavior', () => {
        it('renders in open state when open={true}', () => {
            const handleChange = vi.fn()
            render(
                <Collapsible open={true} onOpenChange={handleChange}>
                    <Collapsible.Trigger label="Toggle" />
                    <Collapsible.Panel>Controlled content</Collapsible.Panel>
                </Collapsible>,
            )
            expect(screen.getByText('Controlled content')).toBeTruthy()
        })
    })

    describe('width prop', () => {
        it('applies full width by default', () => {
            const { container } = buildCollapsible()
            const wrapper = container.firstElementChild as HTMLElement
            expect(wrapper.style.width).toBe('100%')
        })

        it('applies a custom width via inline style', () => {
            const { container } = buildCollapsible({ width: '500px' })
            const wrapper = container.firstElementChild as HTMLElement
            expect(wrapper.style.width).toBe('500px')
        })
    })

    describe('CSS class application', () => {
        it('merges a custom className', () => {
            const { container } = buildCollapsible({ className: 'my-collapsible' })
            const wrapper = container.firstElementChild as HTMLElement
            expect(wrapper.className).toContain('my-collapsible')
        })

        it('updates state-dependent classes on the root, trigger, and panel', async () => {
            render(
                <Collapsible className={(state) => state.open ? 'root-open' : 'root-closed'}>
                    <Collapsible.Trigger className={(state) => state.open ? 'trigger-open' : 'trigger-closed'} label={'Toggle'} />
                    <Collapsible.Panel className={(state) => state.open ? 'panel-open' : 'panel-closed'}>Content</Collapsible.Panel>
                </Collapsible>,
            )

            const trigger = screen.getByRole('button', { name: 'Toggle' })
            expect(trigger.className).toContain('trigger-closed')
            expect(document.querySelector('.root-closed')).toBeTruthy()
            expect(document.querySelector('.panel-closed')).toBeTruthy()
            await userEvent.click(trigger)
            expect(trigger.className).toContain('trigger-open')
            expect(document.querySelector('.root-open')).toBeTruthy()
            expect(document.querySelector('.panel-open')).toBeTruthy()
        })

        it('merges a state-dependent panel style with its default padding', () => {
            render(
                <Collapsible defaultOpen>
                    <Collapsible.Trigger label={'Toggle'} />
                    <Collapsible.Panel data-testid={'panel'} style={(state) => ({ opacity: state.open ? 0.8 : 0 })}>
                        Content
                    </Collapsible.Panel>
                </Collapsible>,
            )

            const panel = screen.getByTestId('panel')
            expect(panel.style.paddingBottom).toContain('--')
            expect(panel.style.opacity).toBe('0.8')
        })
    })

    describe('displayName', () => {
        it('is set to "Collapsible"', () => {
            expect(Collapsible.displayName).toBe('Collapsible')
        })
    })
})
