import { describe, expect, it } from 'vitest'
import { createCommandSource } from '@stories/overlay/command/utils/create-command-source/createCommandSource.utils'
import { createControlledCommandSource } from '@stories/overlay/command/utils/create-controlled-command-source/createControlledCommandSource.utils'

describe('createCommandSource', () => {
    it('reflects state and visible groups', () => {
        const source = createCommandSource('', { args: { open: true, size: 'lg', showGroup1: true, showGroup2: false, showIcons: true } })
        expect(source).toContain('useState(true)')
        expect(source).toContain('size={"lg"}')
        expect(source).toContain('icon={SearchIcon}')
        expect(source).not.toContain('label="Navigation"')
        expect(source).not.toContain('<Command.Separator')
    })

    it('reflects the controlled external example state', () => {
        expect(createControlledCommandSource('', { args: { open: true } })).toContain('useState(true)')
    })
})
