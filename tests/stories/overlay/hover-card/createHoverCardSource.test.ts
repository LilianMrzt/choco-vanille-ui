import { describe, expect, it } from 'vitest'

import { DEFAULT_ARGS } from '@stories/overlay/hover-card/constants'
import { createHoverCardSource } from '@stories/overlay/hover-card/utils/create-hover-card-source/createHoverCardSource.utils'

describe('createHoverCardSource', () => {
    it('reflects and escapes controlled story values', () => {
        const source = createHoverCardSource('', { args: { ...DEFAULT_ARGS, open: true, triggerDelay: 200, contentText: 'A "preview"' } })

        expect(source).toContain('useState(true)')
        expect(source).toContain('delay={200}')
        expect(source).toContain('A \\"preview\\"')
    })

    it('generates an uncontrolled example', () => {
        const source = createHoverCardSource('', { args: { ...DEFAULT_ARGS, open: undefined, defaultOpen: true } })

        expect(source).toContain('defaultOpen={true}')
        expect(source).not.toContain('useState')
    })
})
