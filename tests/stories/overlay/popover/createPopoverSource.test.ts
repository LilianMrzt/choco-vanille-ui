import { describe, expect, it } from 'vitest'

import { DEFAULT_ARGS } from '@stories/overlay/popover/constants'
import { createPopoverSource } from '@stories/overlay/popover/utils/create-popover-source/createPopoverSource.utils'

describe('createPopoverSource', () => {
    it('reflects controlled state and slot controls', () => {
        const source = createPopoverSource('', {
            args: { ...DEFAULT_ARGS, open: true, modal: 'trap-focus', itemLabel: 'Edit "name"', itemDisabled: true },
        })

        expect(source).toContain('useState(true)')
        expect(source).toContain('modal={"trap-focus"}')
        expect(source).toContain('label={"Edit \\"name\\""}')
        expect(source).toContain('disabled={true}')
    })

    it('generates an uncontrolled example when open is undefined', () => {
        const source = createPopoverSource('', { args: { ...DEFAULT_ARGS, open: undefined, defaultOpen: true } })

        expect(source).toContain('defaultOpen={true}')
        expect(source).not.toContain('useState')
    })
})
