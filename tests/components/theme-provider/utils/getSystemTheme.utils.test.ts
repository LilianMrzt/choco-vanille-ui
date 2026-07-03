import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { getSystemTheme } from '@components/theme-provider/utils/getSystemTheme.utils.ts'

describe('getSystemTheme', () => {
    let matchMediaMock: ReturnType<typeof vi.fn>

    beforeEach(() => {
        matchMediaMock = vi.fn()
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: matchMediaMock,
        })
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('returns dark when the OS prefers dark mode', () => {
        matchMediaMock.mockReturnValue({ matches: true })
        expect(getSystemTheme()).toBe('dark')
        expect(matchMediaMock).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
    })

    it('returns light when the OS prefers light mode', () => {
        matchMediaMock.mockReturnValue({ matches: false })
        expect(getSystemTheme()).toBe('light')
    })

    it('returns light when window is undefined (SSR)', () => {
        const originalWindow = globalThis.window
        // @ts-expect-error simulate SSR by removing window
        globalThis.window = undefined
        expect(getSystemTheme()).toBe('light')
        globalThis.window = originalWindow
    })
})
