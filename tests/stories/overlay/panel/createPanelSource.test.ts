import { describe, expect, it } from 'vitest'

import { createPanelSource } from '@stories/overlay/panel/utils/create-panel-source/createPanelSource.utils'

describe('createPanelSource', () => {
    it('serializes the current controlled state and panel controls', () => {
        const source = createPanelSource('', {
            args: { open: true, withBackdrop: false, position: 'left', width: '', title: 'My "panel"', showDescription: false },
        })

        expect(source).toContain('useState(true)')
        expect(source).toContain('open={open} onOpenChange={setOpen}')
        expect(source).toContain('withBackdrop={false}')
        expect(source).toContain('position={"left"}')
        expect(source).toContain('width={""}')
        expect(source).toContain('title={"My \\"panel\\""}')
        expect(source).not.toContain('description=')
        expect(source).not.toContain('{{')
    })

    it('uses the uncontrolled initial state', () => {
        const source = createPanelSource('', { args: { defaultOpen: true } })
        expect(source).toContain('defaultOpen={true}')
        expect(source).not.toContain('useState')
    })
})
