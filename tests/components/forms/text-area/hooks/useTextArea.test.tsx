import { describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import { useTextArea } from '@components/forms/text-area/hooks/useTextArea.hook.tsx'
import type { TextAreaProps } from '@components/forms/text-area/types/TextArea.props.ts'

describe('useTextArea', () => {
    it('uses the provided id when available', () => {
        const { result } = renderHook(() =>
            useTextArea({ id: 'explicit-id' } as TextAreaProps),
        )

        expect(result.current.inputId).toBe('explicit-id')
    })

    it('generates an id when a label is provided but no id', () => {
        const { result } = renderHook(() =>
            useTextArea({ label: 'Description' } as TextAreaProps),
        )

        expect(result.current.inputId).toBeTruthy()
    })

    it('does not generate an input id when there is no label and no id', () => {
        const { result } = renderHook(() => useTextArea({} as TextAreaProps))

        expect(result.current.inputId).toBeUndefined()
    })

    it('always generates a helper id', () => {
        const { result } = renderHook(() => useTextArea({} as TextAreaProps))

        expect(result.current.helperId).toBeTruthy()
    })

    it('reports an error when the error prop is set', () => {
        const { result } = renderHook(() =>
            useTextArea({ error: 'Required' } as TextAreaProps),
        )

        expect(result.current.hasError).toBe(true)
    })

    it('reports whether a start icon is present', () => {
        const { result } = renderHook(() =>
            useTextArea({ startIcon: 'lucide:message-square' } as TextAreaProps),
        )

        expect(result.current.hasStartIcon).toBe(true)
    })

    it('reports an end action when endAction is provided', () => {
        const { result } = renderHook(() =>
            useTextArea({
                endAction: <button type="button">Clear</button>,
            } as TextAreaProps),
        )

        expect(result.current.hasEndAction).toBe(true)
    })

    it('calls the original onMouseDown handler', () => {
        const onMouseDown = vi.fn()
        const { result } = renderHook(() =>
            useTextArea({ onMouseDown } as TextAreaProps),
        )

        const event = { button: 0 } as React.MouseEvent<HTMLTextAreaElement>
        act(() => {
            result.current.handleMouseDown(event)
        })

        expect(onMouseDown).toHaveBeenCalledWith(event)
    })

    it('sets data-mouse-focus when focus follows a mouse down', () => {
        const { result } = renderHook(() => useTextArea({} as TextAreaProps))

        const textarea = document.createElement('textarea')
        const mouseDownEvent = {
            button: 0,
            currentTarget: textarea,
        } as unknown as React.MouseEvent<HTMLTextAreaElement>
        const focusEvent = {
            currentTarget: textarea,
        } as unknown as React.FocusEvent<HTMLTextAreaElement>

        act(() => {
            result.current.handleMouseDown(mouseDownEvent)
            result.current.handleFocus(focusEvent)
        })

        expect(textarea.getAttribute('data-mouse-focus')).toBe('')
    })

    it('removes data-mouse-focus on blur', () => {
        const { result } = renderHook(() => useTextArea({} as TextAreaProps))

        const textarea = document.createElement('textarea')
        textarea.setAttribute('data-mouse-focus', '')
        const blurEvent = {
            currentTarget: textarea,
        } as unknown as React.FocusEvent<HTMLTextAreaElement>

        act(() => {
            result.current.handleBlur(blurEvent)
        })

        expect(textarea.hasAttribute('data-mouse-focus')).toBe(false)
    })

    it('calls the original onFocus and onBlur handlers', () => {
        const onFocus = vi.fn()
        const onBlur = vi.fn()
        const { result } = renderHook(() =>
            useTextArea({ onFocus, onBlur } as TextAreaProps),
        )

        const focusEvent = {
            currentTarget: document.createElement('textarea'),
        } as unknown as React.FocusEvent<HTMLTextAreaElement>
        const blurEvent = {
            currentTarget: document.createElement('textarea'),
        } as unknown as React.FocusEvent<HTMLTextAreaElement>

        act(() => {
            result.current.handleFocus(focusEvent)
            result.current.handleBlur(blurEvent)
        })

        expect(onFocus).toHaveBeenCalledWith(focusEvent)
        expect(onBlur).toHaveBeenCalledWith(blurEvent)
    })
})