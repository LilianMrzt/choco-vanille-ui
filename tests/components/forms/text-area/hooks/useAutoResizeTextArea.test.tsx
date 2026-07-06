import { describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'

import { useAutoResizeTextArea } from '@components/forms/text-area/hooks/useAutoResizeTextArea.hook.tsx'

describe('useAutoResizeTextArea', () => {
    it('reports auto-resize as disabled when no row limits are provided', () => {
        const ref = { current: document.createElement('textarea') }
        const { result } = renderHook(() => useAutoResizeTextArea(ref, {}))

        expect(result.current.isEnabled).toBe(false)
    })

    it('reports auto-resize as enabled when minRows is provided', () => {
        const ref = { current: document.createElement('textarea') }
        const { result } = renderHook(() => useAutoResizeTextArea(ref, { minRows: 2 }))

        expect(result.current.isEnabled).toBe(true)
    })

    it('reports auto-resize as enabled when maxRows is provided', () => {
        const ref = { current: document.createElement('textarea') }
        const { result } = renderHook(() => useAutoResizeTextArea(ref, { maxRows: 6 }))

        expect(result.current.isEnabled).toBe(true)
    })

    it('does not resize when auto-resize is disabled', () => {
        const textarea = document.createElement('textarea')
        const ref = { current: textarea }
        const { result } = renderHook(() => useAutoResizeTextArea(ref, {}))

        result.current.resize()
        expect(textarea.style.height).toBe('')
    })

    it('sets the textarea height within minRows and maxRows bounds', () => {
        const textarea = document.createElement('textarea')
        const ref = { current: textarea }

        const originalGetComputedStyle = window.getComputedStyle
        window.getComputedStyle = vi.fn(() =>
            ({
                lineHeight: '20px',
                paddingTop: '8px',
                paddingBottom: '8px',
                borderTopWidth: '1px',
                borderBottomWidth: '1px',
            }) as CSSStyleDeclaration
        ) as typeof window.getComputedStyle

        const { result } = renderHook(() => useAutoResizeTextArea(ref, { minRows: 2, maxRows: 4 }))
        result.current.resize()

        // minRows=2 => 2*20 + 8 + 8 + 1 + 1 = 58px
        expect(textarea.style.height).toBe('58px')

        window.getComputedStyle = originalGetComputedStyle
    })
})
