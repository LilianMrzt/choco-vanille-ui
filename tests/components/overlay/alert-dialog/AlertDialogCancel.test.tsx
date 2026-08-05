import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AlertDialog } from '@components/overlay/alert-dialog'

describe('AlertDialog.Cancel', () => {
    it('renders a labeled outlined Button by default', () => {
        render(
            <AlertDialog defaultOpen>
                <AlertDialog.Content>
                    <AlertDialog.Cancel />
                </AlertDialog.Content>
            </AlertDialog>,
        )

        const cancel = screen.getByRole('button', { name: 'Cancel' })
        expect(cancel.getAttribute('class')).toContain('primary')
        expect(cancel.getAttribute('class')).toContain('outlined')
    })
})
