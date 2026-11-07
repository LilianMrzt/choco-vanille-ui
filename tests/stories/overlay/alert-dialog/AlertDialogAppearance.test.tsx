import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import AlertDialogAppearance from '@stories/overlay/alert-dialog/components/alert-dialog-appearance/AlertDialogAppearance'
import { APPEARANCE_COLORS, APPEARANCE_VARIANTS } from '@stories/overlay/alert-dialog/constants'
import source from '@stories/overlay/alert-dialog/sources/AlertDialogAppearance.source.txt?raw'

describe('AlertDialogAppearance', () => {
    it('shows and documents every variant × color for Action and Cancel together', async () => {
        render(<AlertDialogAppearance />)
        await userEvent.click(screen.getByRole('button', { name: 'Compare action appearance' }))
        const pairs = APPEARANCE_VARIANTS.length * APPEARANCE_COLORS.length
        expect(screen.getAllByRole('button', { name: /^Confirm / })).toHaveLength(pairs)
        expect(screen.getAllByRole('button', { name: /^Cancel / })).toHaveLength(pairs)
        expect(source.match(/<AlertDialog.Action\s/g)).toHaveLength(pairs)
        expect(source.match(/<AlertDialog.Cancel\s/g)).toHaveLength(pairs)
        for (const variant of APPEARANCE_VARIANTS) {
            for (const color of APPEARANCE_COLORS) {
                expect(screen.getByRole('button', { name: `Confirm ${variant} ${color}` })).toBeTruthy()
                expect(screen.getByRole('button', { name: `Cancel ${variant} ${color}` })).toBeTruthy()
                expect(source).toContain(`label="Confirm ${variant} ${color}"`)
                expect(source).toContain(`label="Cancel ${variant} ${color}"`)
            }
        }
        expect(source).not.toMatch(/<AlertDialog\.(?:Action|Cancel)[^>]*size=/)
    })
})
