import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Tabs } from '@components/navigation/tabs'

const TestTabs = (props: React.ComponentProps<typeof Tabs>) => (
    <Tabs {...props}>
        <Tabs.List aria-label="User settings">
            <Tabs.Trigger value="account" label="Account" />
            <Tabs.Trigger value="password" label="Password" />
            <Tabs.Trigger value="billing" label="Billing" disabled />
        </Tabs.List>
        <Tabs.Content value="account">Account settings content</Tabs.Content>
        <Tabs.Content value="password">Password settings content</Tabs.Content>
        <Tabs.Content value="billing">Billing settings content</Tabs.Content>
    </Tabs>
)

describe('Tabs', () => {
    describe('default rendering', () => {
        it('renders the tab list and triggers', () => {
            render(<TestTabs defaultValue="account" />)
            expect(screen.getByRole('tablist')).toBeTruthy()
            expect(screen.getAllByRole('tab')).toHaveLength(3)
        })

        it('renders the active tab panel', () => {
            render(<TestTabs defaultValue="account" />)
            expect(screen.getByText('Account settings content')).toBeTruthy()
        })

        it('hides inactive tab panels', () => {
            render(<TestTabs defaultValue="account" />)
            expect(screen.queryByText('Password settings content')).toBeNull()
        })
    })

    describe('selection', () => {
        it('switches content when a trigger is clicked', async () => {
            render(<TestTabs defaultValue="account" />)
            await userEvent.click(screen.getByRole('tab', { name: 'Password' }))
            expect(screen.getByText('Password settings content')).toBeTruthy()
            expect(screen.queryByText('Account settings content')).toBeNull()
        })

        it('marks the selected trigger as active', () => {
            render(<TestTabs defaultValue="password" />)
            const passwordTab = screen.getByRole('tab', { name: 'Password' })
            expect(passwordTab.getAttribute('data-active')).not.toBeNull()
        })
    })

    describe('controlled mode', () => {
        it('calls onValueChange when a trigger is clicked', async () => {
            const handler = vi.fn()
            render(<TestTabs value="account" onValueChange={handler} />)
            await userEvent.click(screen.getByRole('tab', { name: 'Password' }))
            expect(handler).toHaveBeenCalledWith('password', expect.anything())
        })
    })

    describe('disabled trigger', () => {
        it('does not switch to a disabled tab when clicked', async () => {
            render(<TestTabs defaultValue="account" />)
            await userEvent.click(screen.getByRole('tab', { name: 'Billing' }))
            expect(screen.getByText('Account settings content')).toBeTruthy()
            expect(screen.queryByText('Billing settings content')).toBeNull()
        })

        it('marks the disabled trigger with data-disabled', () => {
            render(<TestTabs defaultValue="account" />)
            const billingTab = screen.getByRole('tab', { name: 'Billing' })
            expect(billingTab.getAttribute('data-disabled')).not.toBeNull()
        })
    })

    describe('keyboard navigation', () => {
        it('keeps selection on the current tab by default until the focused tab is activated', async () => {
            const user = userEvent.setup()
            render(<TestTabs defaultValue="account" />)
            const account = screen.getByRole('tab', { name: 'Account' })
            const password = screen.getByRole('tab', { name: 'Password' })

            account.focus()
            await user.keyboard('{ArrowRight}')
            expect(password.getAttribute('aria-selected')).toBe('false')
            await user.keyboard('{Enter}')
            expect(password.getAttribute('aria-selected')).toBe('true')
        })

        it('moves focus to the next tab with ArrowRight', async () => {
            render(<TestTabs defaultValue="account" />)
            const accountTab = screen.getByRole('tab', { name: 'Account' })
            accountTab.focus()
            await userEvent.keyboard('{ArrowRight}')
            expect(document.activeElement).toBe(
                screen.getByRole('tab', { name: 'Password' }),
            )
        })

        it('moves focus to the previous tab with ArrowLeft', async () => {
            render(<TestTabs defaultValue="password" />)
            const passwordTab = screen.getByRole('tab', { name: 'Password' })
            passwordTab.focus()
            await userEvent.keyboard('{ArrowLeft}')
            expect(document.activeElement).toBe(
                screen.getByRole('tab', { name: 'Account' }),
            )
        })
    })

    describe('className passthrough', () => {
        it('merges a custom className onto the list', () => {
            render(
                <Tabs defaultValue="account">
                    <Tabs.List className="my-list">...</Tabs.List>
                </Tabs>,
            )
            expect(screen.getByRole('tablist').className).toContain('my-list')
        })

        it('merges a custom className onto a trigger', () => {
            render(
                <Tabs defaultValue="account">
                    <Tabs.List>
                        <Tabs.Trigger value="account" label="Account" className="my-trigger" />
                    </Tabs.List>
                </Tabs>,
            )
            expect(screen.getByRole('tab').className).toContain('my-trigger')
        })
    })

    describe('ref forwarding', () => {
        it('forwards ref to the root element', () => {
            const ref = createRef<HTMLDivElement>()
            render(<Tabs ref={ref} defaultValue="account" />)
            expect(ref.current).toBeInstanceOf(HTMLDivElement)
        })

        it('forwards ref to the list element', () => {
            const ref = createRef<HTMLDivElement>()
            render(
                <Tabs defaultValue="account">
                    <Tabs.List ref={ref} aria-label="User settings" />
                </Tabs>,
            )
            expect(ref.current).toBeInstanceOf(HTMLDivElement)
        })

        it('forwards ref to the trigger element', () => {
            const ref = createRef<HTMLButtonElement>()
            render(
                <Tabs defaultValue="account">
                    <Tabs.List aria-label="User settings">
                        <Tabs.Trigger ref={ref} value="account" label="Account" />
                    </Tabs.List>
                </Tabs>,
            )
            expect(ref.current).toBeInstanceOf(HTMLButtonElement)
        })
    })

    describe('displayName', () => {
        it('is set on compound sub-components', () => {
            expect(Tabs.List.displayName).toBe('Tabs.List')
            expect(Tabs.Trigger.displayName).toBe('Tabs.Trigger')
            expect(Tabs.Content.displayName).toBe('Tabs.Content')
        })
    })
})
