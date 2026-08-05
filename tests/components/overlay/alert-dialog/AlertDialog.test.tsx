import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { AlertDialog } from '@components/overlay/alert-dialog'

describe('AlertDialog', () => {
    it('exposes the confirmation compound slots', () => {
        expect(AlertDialog.Trigger).toBeDefined()
        expect(AlertDialog.Content).toBeDefined()
        expect(AlertDialog.Header).toBeDefined()
        expect(AlertDialog.Body).toBeDefined()
        expect(AlertDialog.Footer).toBeDefined()
        expect(AlertDialog.Action).toBeDefined()
        expect(AlertDialog.Cancel).toBeDefined()
    })

    it('uses destructive action and cancel defaults', () => {
        render(
            <AlertDialog defaultOpen>
                <AlertDialog.Content>
                    <AlertDialog.Header title="Delete account" />
                    <AlertDialog.Footer>
                        <AlertDialog.Cancel />
                        <AlertDialog.Action label="Delete account" />
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>,
        )

        expect(screen.getByRole('button', { name: 'Cancel' }).getAttribute('class')).toContain('outlined')
        expect(screen.getByRole('button', { name: 'Cancel' }).getAttribute('class')).toContain('primary')
        expect(screen.getByRole('button', { name: 'Delete account' }).getAttribute('class')).toContain('contained')
        expect(screen.getByRole('button', { name: 'Delete account' }).getAttribute('class')).toContain('destructive')
    })

    it('closes when cancel is activated', async () => {
        render(
            <AlertDialog defaultOpen>
                <AlertDialog.Content>
                    <AlertDialog.Header title="Delete account" />
                    <AlertDialog.Footer>
                        <AlertDialog.Cancel />
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>,
        )

        await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
        expect(screen.queryByText('Delete account')).toBeNull()
    })
})
