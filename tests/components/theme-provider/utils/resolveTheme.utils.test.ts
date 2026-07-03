import { describe, expect, it } from 'vitest'

import { resolveTheme } from '@components/theme-provider/utils/resolveTheme.utils.ts'

describe('resolveTheme', () => {
    it('returns the system theme when mode is system', () => {
        expect(resolveTheme('system', 'dark')).toBe('dark')
        expect(resolveTheme('system', 'light')).toBe('light')
    })

    it('returns light when mode is light', () => {
        expect(resolveTheme('light', 'dark')).toBe('light')
    })

    it('returns dark when mode is dark', () => {
        expect(resolveTheme('dark', 'light')).toBe('dark')
    })
})
