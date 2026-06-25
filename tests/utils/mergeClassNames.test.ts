import { describe, expect, it } from 'vitest'

import { mergeClassNames } from '@utils/mergeClassNames.ts'

describe('mergeClassNames', () => {
    it('merges multiple class strings', () => {
        expect(mergeClassNames('foo', 'bar')).toBe('foo bar')
    })

    it('does NOT resolve any conflicts — clsx simply concatenates', () => {
        expect(mergeClassNames('text-sm', 'text-lg')).toBe('text-sm text-lg')
        expect(mergeClassNames('a', 'b')).toBe('a b')
    })

    it('ignores falsy values (false, null, undefined)', () => {
        const condition = false as boolean
        expect(mergeClassNames('foo', condition && 'bar', undefined, null, 'baz')).toBe('foo baz')
    })

    it('returns an empty string when called with no arguments', () => {
        expect(mergeClassNames()).toBe('')
    })

    it('handles arrays of class names', () => {
        expect(mergeClassNames(['foo', 'bar'], 'baz')).toBe('foo bar baz')
    })

    it('handles conditional object syntax from clsx', () => {
        expect(mergeClassNames({ active: true, disabled: false })).toBe('active')
    })

    it('does NOT deduplicate duplicate class names (clsx only concatenates)', () => {
    // clsx concatenates values as-is; it performs no deduplication.
        expect(mergeClassNames('foo', 'foo')).toBe('foo foo')
    })
})
