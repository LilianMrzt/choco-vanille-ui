import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '@components/actions/button'
import { Panel } from '@components/overlay/panel/Panel.tsx'

describe('Panel', () => {
    it('exposes the dialog-like compound components', () => {
        expect(Panel.Trigger).toBeDefined()
        expect(Panel.Content).toBeDefined()
        expect(Panel.Header).toBeDefined()
        expect(Panel.Body).toBeDefined()
        expect(Panel.Footer).toBeDefined()
        expect(Panel.Title).toBeDefined()
        expect(Panel.Description).toBeDefined()
        expect(Panel.Close).toBeDefined()
    })

    it('renders an open panel with its content', () => {
        render(
            <Panel defaultOpen>
                <Panel.Content position="left" width="42rem">
                    <Panel.Header title="Settings" description="Manage your account." />
                    <Panel.Body>Panel content</Panel.Body>
                    <Panel.Footer>Panel actions</Panel.Footer>
                </Panel.Content>
            </Panel>,
        )

        expect(screen.getByRole('dialog', { name: 'Settings' })).toBeTruthy()
        expect(screen.getByText('Panel content')).toBeTruthy()
        expect(screen.getByText('Panel actions')).toBeTruthy()
    })

    it('uses the default accessible name when no title is provided', () => {
        render(
            <Panel defaultOpen>
                <Panel.Content>Panel content</Panel.Content>
            </Panel>,
        )

        expect(screen.getByRole('dialog', { name: 'Panel' })).toBeTruthy()
    })

    it('does not render the backdrop when withBackdrop is false', () => {
        render(
            <Panel defaultOpen withBackdrop={false}>
                <Panel.Content>Panel content</Panel.Content>
            </Panel>,
        )

        expect(screen.getByRole('dialog', { name: 'Panel' })).toBeTruthy()
        expect(screen.queryByRole('presentation')).toBeNull()
    })

    it('opens from the trigger and closes with the panel close button', async () => {
        render(
            <Panel>
                <Panel.Trigger>
                    <Button label="Open panel" />
                </Panel.Trigger>
                <Panel.Content>
                    <Panel.Header title="Panel title" />
                </Panel.Content>
            </Panel>,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Open panel' }))
        expect(screen.getByText('Panel title')).toBeTruthy()

        await userEvent.click(screen.getByRole('button', { name: 'Close panel' }))
        expect(screen.queryByText('Panel title')).toBeNull()
    })

    it('forwards open changes from the Base UI dialog root', async () => {
        const onOpenChange = vi.fn()

        render(
            <Panel defaultOpen onOpenChange={onOpenChange}>
                <Panel.Content>
                    <Panel.Header title="Panel title" />
                </Panel.Content>
            </Panel>,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Close panel' }))

        expect(onOpenChange).toHaveBeenCalledWith(false, expect.anything())
    })

    it('sets its display name', () => {
        expect(Panel.displayName).toBe('Panel')
    })
})
