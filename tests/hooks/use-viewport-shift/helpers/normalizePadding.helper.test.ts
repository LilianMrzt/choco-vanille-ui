import { describe, expect, it } from 'vitest'

import { normalizePadding } from '@hooks/use-viewport-shift/helpers/normalizePadding.helper.ts'

describe('normalizePadding', () => {
    it('expands a uniform number into all sides', () => {
        expect(normalizePadding(8)).toEqual({ top: 8, right: 8, bottom: 8, left: 8 })
    })

    it('fills missing sides with zero', () => {
        expect(normalizePadding({ top: 4, right: 8 })).toEqual({ top: 4, right: 8, bottom: 0, left: 0 })
    })

    it('preserves a fully specified object', () => {
        expect(normalizePadding({ top: 1, right: 2, bottom: 3, left: 4 })).toEqual({
            top: 1,
            right: 2,
            bottom: 3,
            left: 4,
        })
    })

    it('handles zero padding', () => {
        expect(normalizePadding(0)).toEqual({ top: 0, right: 0, bottom: 0, left: 0 })
    })
})
