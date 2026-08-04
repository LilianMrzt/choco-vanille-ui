import { describe, expect, it } from 'vitest'

import { resolveInsetPadding } from '@components/layout/inset/utils/resolveInsetPadding.utils.ts'

describe('resolveInsetPadding', () => {
    it('uses the space token for current padding', () => {
        expect(resolveInsetPadding('current', 'lg')).toBe('lg')
    })

    it('preserves explicit padding tokens', () => {
        expect(resolveInsetPadding('sm', 'lg')).toBe('sm')
    })

    it('preserves an omitted padding value', () => {
        expect(resolveInsetPadding(undefined, 'lg')).toBeUndefined()
    })
})
