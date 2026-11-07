import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AlertDialog } from '@components/overlay/alert-dialog'

describe('AlertDialog.Action', () => {
    it('renders a destructive Button by default', () => {
        render(
            <AlertDialog defaultOpen>
                <AlertDialog.Content>
                    <AlertDialog.Action label="Delete" />
                </AlertDialog.Content>
            </AlertDialog>,
        )

        const action = screen.getByRole('button', { name: 'Delete' })
        expect(action.getAttribute('class')).toContain('danger')
        expect(action.getAttribute('class')).toContain('contained')
    })
})
