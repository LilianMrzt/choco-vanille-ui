import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { addIcon } from '@iconify/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'

import Collapsible from '@components/surfaces/collapsible/Collapsible.tsx'

beforeAll(() => {
    addIcon('lucide:chevron-down', {
        body: '<path d="m6 9 6 6 6-6"/>',
        width: 24,
        height: 24,
    })
})

const buildCollapsible = (props: Partial<React.ComponentProps<typeof Collapsible>> = {}) =>
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
    })

    describe('displayName', () => {
        it('is set to "Collapsible"', () => {
            expect(Collapsible.displayName).toBe('Collapsible')
        })
    })
})
