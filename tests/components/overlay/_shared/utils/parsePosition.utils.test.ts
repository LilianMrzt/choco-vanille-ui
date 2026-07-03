import { describe, expect, it } from 'vitest'

import { parsePosition } from '@components/overlay/_shared/utils/parsePosition.utils.ts'

describe('parsePosition', () => {
    it('splits a position with side and align', () => {
        expect(parsePosition('top-start')).toEqual({ side: 'top', align: 'start' })
    })

    it('defaults align to center when omitted', () => {
        expect(parsePosition('bottom')).toEqual({ side: 'bottom', align: 'center' })
    })

    it('handles end alignment', () => {
        expect(parsePosition('right-end')).toEqual({ side: 'right', align: 'end' })
    })
})
