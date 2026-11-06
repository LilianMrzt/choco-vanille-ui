import { describe, expect, it } from 'vitest'

import { createAlertDialogSource } from '@stories/overlay/alert-dialog/utils/create-alert-dialog-source/createAlertDialogSource.utils'

describe('createAlertDialogSource', () => {
    it('serializes the current controlled state and composition', () => {
        const source = createAlertDialogSource('', {
            args: { open: true, modal: 'trap-focus', title: 'Delete "item"', actionLabel: '', showBody: true },
        })

        expect(source).toContain('useState(true)')
        expect(source).toContain('open={open} onOpenChange={setOpen}')
        expect(source).toContain('modal={"trap-focus"}')
        expect(source).toContain('title={"Delete \\"item\\""}')
        expect(source).toContain('label={""}')
        expect(source).toContain('<AlertDialog.Body>')
        expect(source).not.toContain('{{')
    })

    it('uses the uncontrolled initial state and omits the body when hidden', () => {
        const source = createAlertDialogSource('', { args: { defaultOpen: true, showBody: false } })
        expect(source).toContain('defaultOpen={true}')
        expect(source).not.toContain('useState')
        expect(source).not.toContain('Typography')
    })
})
