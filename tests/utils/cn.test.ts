import { describe, expect, it } from 'vitest'

import { cn } from '@utils/cn.ts'

describe('cn', () => {
    it('joins multiple class strings', () => {
        expect(cn('foo', 'bar')).toBe('foo bar')
    })

    it('ignores falsy values (false, null, undefined)', () => {
        const condition = false as boolean
        expect(cn('foo', condition && 'bar', undefined, null, 'baz')).toBe('foo baz')
    })

    it('returns an empty string when called with no arguments', () => {
        expect(cn()).toBe('')
    })

    it('returns the single class unchanged', () => {
        expect(cn('foo')).toBe('foo')
    })
})
