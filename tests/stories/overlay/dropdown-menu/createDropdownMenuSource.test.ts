import { describe, expect, it } from 'vitest'
import { DEFAULT_ARGS } from '@stories/overlay/dropdown-menu/constants'
import { createDropdownMenuSource } from '@stories/overlay/dropdown-menu/utils/create-dropdown-menu-source/createDropdownMenuSource.utils'

describe('createDropdownMenuSource', () => {
    it('reflects state and slot controls', () => {
        const source = createDropdownMenuSource('', { args: { ...DEFAULT_ARGS, open: true, itemLabel: 'Rename', side: 'left', showCheckbox: false } })
        expect(source).toContain('useState(true)')
        expect(source).toContain('label={"Rename"}')
        expect(source).toContain('side={"left"}')
        expect(source).not.toContain('DropdownMenu.CheckboxItem')
    })
})
