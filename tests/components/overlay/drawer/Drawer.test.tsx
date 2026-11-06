import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Drawer } from '@components/overlay/drawer'

describe('Drawer', () => {
    describe('compound components', () => {
        it('exposes Header, Body, Footer, Section, NavItem, ActionItem and SectionItem', () => {
            expect(Drawer.Header).toBeDefined()
            expect(Drawer.Body).toBeDefined()
            expect(Drawer.Footer).toBeDefined()
            expect(Drawer.Section).toBeDefined()
            expect(Drawer.NavItem).toBeDefined()
            expect(Drawer.ActionItem).toBeDefined()
            expect(Drawer.SectionItem).toBeDefined()
        })
    })

    describe('default rendering', () => {
        it('renders a portal drawer with Header, Body and Footer', () => {
            render(
                <Drawer defaultOpen>
                    <Drawer.Header>
                        <span>Title</span>
                        <span>Description</span>
                    </Drawer.Header>
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
                    <Drawer.Header>Inline title</Drawer.Header>
                    <Drawer.Body>Inline body</Drawer.Body>
                </Drawer>,
            )

            expect(screen.getByText('Inline title')).toBeTruthy()
            expect(screen.getByText('Inline body')).toBeTruthy()
        })

        it('renders custom header content without a close button', () => {
            render(
                <Drawer defaultOpen>
                    <Drawer.Header>Title</Drawer.Header>
                </Drawer>,
            )

            expect(screen.getByText('Title')).toBeTruthy()
            expect(screen.queryByLabelText('Close drawer')).toBeNull()
        })

        it('renders custom header content', () => {
            render(
                <Drawer defaultOpen>
                    <Drawer.Header>Custom header</Drawer.Header>
                </Drawer>,
            )

            expect(screen.getByText('Custom header')).toBeTruthy()
        })
    })

    describe('accessibility', () => {
        it('supports an explicit accessible label', () => {
            render(
                <Drawer defaultOpen aria-label="Settings">
                    <Drawer.Header>Settings</Drawer.Header>
                    <Drawer.Body>Content</Drawer.Body>
                </Drawer>,
            )

            const dialog = screen.getByRole('dialog')

            expect(dialog.getAttribute('aria-label')).toBe('Settings')
        })

        it('prefers explicit aria-label over auto-wired aria-labelledby', () => {
            render(
                <Drawer defaultOpen aria-label="Custom label">
                    <Drawer.Header>Settings</Drawer.Header>
                    <Drawer.Body>Content</Drawer.Body>
                </Drawer>,
            )

            const dialog = screen.getByRole('dialog')

            expect(dialog.getAttribute('aria-label')).toBe('Custom label')
            expect(dialog.getAttribute('aria-labelledby')).toBeNull()
        })

        it('hides inline drawer content when closed', () => {
            render(
                <Drawer open={false} mode="inline">
                    <Drawer.Header>Inline title</Drawer.Header>
                    <Drawer.Body>Inline body</Drawer.Body>
                </Drawer>,
            )

            const panel = screen.getByText('Inline title').closest('[aria-hidden]')

            expect(panel?.getAttribute('aria-hidden')).toBe('true')
            expect(panel?.hasAttribute('inert')).toBe(true)
        })
    })

    describe('displayName', () => {
        it('is set to "Drawer"', () => {
            expect(Drawer.displayName).toBe('Drawer')
        })
    })
})
