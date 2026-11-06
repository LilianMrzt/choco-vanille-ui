import { describe, expect, it } from 'vitest'
import { DEFAULT_ARGS } from '@stories/overlay/context-menu/constants'
import { createContextMenuSource } from '@stories/overlay/context-menu/utils/create-context-menu-source/createContextMenuSource.utils'

describe('createContextMenuSource', () => {
    it('reflects state and content controls', () => {
        const source = createContextMenuSource('', { args: { ...DEFAULT_ARGS, open: true, editLabel: 'Rename', showDisabledItem: true } })
        expect(source).toContain('useState(true)')
        expect(source).toContain('label={"Rename"}')
        expect(source).toContain('label="Disabled action" disabled')
    })

    it('shows uncontrolled state', () => {
        const source = createContextMenuSource('', { args: { ...DEFAULT_ARGS, open: undefined, defaultOpen: true } })
        expect(source).toContain('defaultOpen={true}')
    })
})
