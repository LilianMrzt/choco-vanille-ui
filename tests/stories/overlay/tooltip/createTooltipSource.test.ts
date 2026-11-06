import { describe, expect, it } from 'vitest'

import { DEFAULT_ARGS } from '@stories/overlay/tooltip/constants'
import { createTooltipSource } from '@stories/overlay/tooltip/utils/create-tooltip-source/createTooltipSource.utils'

describe('createTooltipSource', () => {
    it('reflects and escapes controlled story values', () => {
        const source = createTooltipSource('', { args: { ...DEFAULT_ARGS, open: true, content: 'Edit "name"', arrow: true } })

        expect(source).toContain('useState(true)')
        expect(source).toContain('content={"Edit \\"name\\""}')
        expect(source).toContain('arrow={true}')
    })

    it('generates an uncontrolled example', () => {
        const source = createTooltipSource('', { args: { ...DEFAULT_ARGS, open: undefined, defaultOpen: true } })

        expect(source).toContain('defaultOpen={true}')
        expect(source).not.toContain('useState')
    })
})
