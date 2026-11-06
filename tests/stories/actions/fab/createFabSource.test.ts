import { describe, expect, it } from 'vitest'

import SearchIcon from '@resources/asset/SearchIcon.svg?react'
import { createFabSource } from '@stories/actions/fab/utils/create-fab-source/createFabSource.utils'

describe('createFabSource', () => {
    it('reflects the current extended button controls', () => {
        const source = createFabSource('', {
            args: {
                icon: SearchIcon,
                label: 'Search "all"',
                'aria-label': 'Find items',
                color: 'secondary',
                size: 'lg',
                position: 'bottom-center',
                disabled: true,
            },
        })

        expect(source).toContain('label={"Search \\"all\\""}')
        expect(source).toContain('aria-label={"Find items"}')
        expect(source).toContain('color={"secondary"}')
        expect(source).toContain('size={"lg"}')
        expect(source).toContain('position={"bottom-center"}')
        expect(source).toContain(' disabled')
        expect(source).not.toContain('{{')
    })

    it('omits optional controls for an icon-only button', () => {
        const source = createFabSource('', {
            args: { icon: SearchIcon, 'aria-label': 'Search' },
        })

        expect(source).toContain('aria-label={"Search"}')
        expect(source).not.toContain(' label=')
        expect(source).not.toContain(' disabled')
    })
})
