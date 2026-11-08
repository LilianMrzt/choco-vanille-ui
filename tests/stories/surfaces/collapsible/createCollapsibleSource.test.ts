import { INFO_ICON as InfoIcon } from '@constants/icon-registry'
import { describe, expect, it } from 'vitest'

import { createCollapsibleSource } from '@stories/surfaces/collapsible/utils/create-collapsible-source/createCollapsibleSource.utils'

describe('createCollapsibleSource', () => {
    it('reflects controlled root and slot controls', () => {
        const source = createCollapsibleSource('', {
            args: {
                open: true,
                width: '20rem',
                triggerLabel: 'More "details"',
                triggerWidth: '10rem',
                triggerStartIcon: InfoIcon,
                panelPadding: 0,
            },
        })

        expect(source).toContain('useState(true)')
        expect(source).toContain('open={open} onOpenChange={setOpen}')
        expect(source).toContain('width={"20rem"}')
        expect(source).toContain('label={"More \\"details\\""}')
        expect(source).toContain('startIcon={InfoIcon}')
        expect(source).toContain('style={{ width: "10rem" }}')
        expect(source).toContain('padding={0}')
    })

    it('represents an uncontrolled initial state', () => {
        const source = createCollapsibleSource('', { args: { defaultOpen: true } })
        expect(source).toContain('defaultOpen={true}')
        expect(source).not.toContain('useState')
    })
})
