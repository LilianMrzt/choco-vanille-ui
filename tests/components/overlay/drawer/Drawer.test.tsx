import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Drawer } from '@components/overlay/drawer/Drawer.tsx'

describe('Drawer', () => {
    describe('compound components', () => {
        it('exposes Header, Body, Footer, NavItem, ActionItem and SectionItem', () => {
            expect(Drawer.Header).toBeDefined()
            expect(Drawer.Body).toBeDefined()
            expect(Drawer.Footer).toBeDefined()
            expect(Drawer.NavItem).toBeDefined()
            expect(Drawer.ActionItem).toBeDefined()
            expect(Drawer.SectionItem).toBeDefined()
        })
    })

    describe('default rendering', () => {
        it('renders a portal drawer with Header, Body and Footer', () => {
            render(
                <Drawer defaultOpen>
                    <Drawer.Header title="Title" description="Description" />
                    <Drawer.Body>Body content</Drawer.Body>
                    <Drawer.Footer>Footer content</Drawer.Footer>
                </Drawer>,
            )

            expect(screen.getByText('Title')).toBeTruthy()
            expect(screen.getByText('Description')).toBeTruthy()
            expect(screen.getByText('Body content')).toBeTruthy()
            expect(screen.getByText('Footer content')).toBeTruthy()
        })

        it('renders an inline drawer when mode is inline', () => {
            render(
                <Drawer defaultOpen mode="inline">
                    <Drawer.Header title="Inline title" />
                    <Drawer.Body>Inline body</Drawer.Body>
                </Drawer>,
            )

            expect(screen.getByText('Inline title')).toBeTruthy()
            expect(screen.getByText('Inline body')).toBeTruthy()
        })

        it('renders a mini drawer when mode is mini', () => {
            render(
                <Drawer defaultOpen={false} mode="mini">
                    <Drawer.Header title="Mini title" />
                    <Drawer.Body>Mini body</Drawer.Body>
                </Drawer>,
            )

            expect(screen.getByText('Mini title')).toBeTruthy()
            expect(screen.getByText('Mini body')).toBeTruthy()
        })

        it('renders a close button by default in the header', () => {
            render(
                <Drawer defaultOpen>
                    <Drawer.Header title="Title" />
                </Drawer>,
            )

            expect(screen.getByLabelText('Close drawer')).toBeTruthy()
        })

        it('hides the close button when showCloseButton is false', () => {
            render(
                <Drawer defaultOpen>
                    <Drawer.Header title="Title" showCloseButton={false} />
                </Drawer>,
            )

            expect(screen.queryByLabelText('Close drawer')).toBeNull()
        })
    })

    describe('interactions', () => {
        it('closes the drawer when the close button is clicked', async () => {
            render(
                <Drawer defaultOpen>
                    <Drawer.Header title="Title" />
                </Drawer>,
            )

            expect(screen.getByText('Title')).toBeTruthy()

            await userEvent.click(screen.getByLabelText('Close drawer'))

            expect(screen.queryByText('Title')).toBeNull()
        })

        it('calls onOpenChange when the drawer closes', async () => {
            const onOpenChange = vi.fn()

            render(
                <Drawer
                    defaultOpen
                    onOpenChange={onOpenChange}
                >
                    <Drawer.Header title="Title" />
                </Drawer>,
            )

            await userEvent.click(screen.getByLabelText('Close drawer'))

            expect(onOpenChange).toHaveBeenCalledWith(false)
        })

        it('supports controlled open state', async () => {
            const onOpenChange = vi.fn()

            const { rerender } = render(
                <Drawer
                    open
                    onOpenChange={onOpenChange}
                >
                    <Drawer.Header title="Title" />
                </Drawer>,
            )

            expect(screen.getByText('Title')).toBeTruthy()

            await userEvent.click(screen.getByLabelText('Close drawer'))

            expect(onOpenChange).toHaveBeenCalledWith(false)

            rerender(
                <Drawer
                    open={false}
                    onOpenChange={onOpenChange}
                >
                    <Drawer.Header title="Title" />
                </Drawer>,
            )

            expect(screen.queryByText('Title')).toBeNull()
        })
    })

    describe('displayName', () => {
        it('is set to "Drawer"', () => {
            expect(Drawer.displayName).toBe('Drawer')
        })
    })
})
