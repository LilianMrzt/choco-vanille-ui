import { describe, expect, it } from 'vitest'

import { createDialogSource } from '@stories/overlay/dialog/utils/create-dialog-source/createDialogSource.utils'

describe('createDialogSource', () => {
    it('serializes the controlled state and current slot controls', () => {
        const source = createDialogSource('', {
            args: { open: true, modal: 'trap-focus', size: 'lg', title: 'My "dialog"', showDescription: false, showFooter: true, cancelLabel: '' },
        })

        expect(source).toContain('useState(true)')
        expect(source).toContain('open={open} onOpenChange={setOpen}')
        expect(source).toContain('modal={"trap-focus"}')
        expect(source).toContain('size={"lg"}')
        expect(source).toContain('title={"My \\"dialog\\""}')
        expect(source).toContain('label={""}')
        expect(source).not.toContain('description=')
        expect(source).not.toContain('{{')
    })

    it('renders the uncontrolled initial state without a footer', () => {
        const source = createDialogSource('', { args: { defaultOpen: true, showFooter: false } })
        expect(source).toContain('defaultOpen={true}')
        expect(source).not.toContain('useState')
        expect(source).not.toContain('<Dialog.Footer>')
    })
})
