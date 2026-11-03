import { describe, expect, it } from 'vitest'

import { resolveInsetPadding } from '@components/layout/inset/utils/resolveInsetPadding.utils.ts'

describe('resolveInsetPadding', () => {
    it('uses the space token for current padding', () => {
        expect(resolveInsetPadding('current', 16)).toBe(16)
    })

    it('preserves explicit padding tokens', () => {
        expect(resolveInsetPadding(8, 16)).toBe(8)
    })

    it('preserves an omitted padding value', () => {
        expect(resolveInsetPadding(undefined, 16)).toBeUndefined()
    })

    it('preserves zero as an explicit token or the current space', () => {
        expect(resolveInsetPadding(0, 16)).toBe(0)
        expect(resolveInsetPadding('current', 0)).toBe(0)
    })
})
