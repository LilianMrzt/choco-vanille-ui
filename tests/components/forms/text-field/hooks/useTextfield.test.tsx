import { describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

import { useTextField } from '@components/forms/text-field/hooks/useTextfield.hook.tsx'
import type { TextFieldProps } from '@components/forms/text-field/types/TextField.props.ts'
import SearchIcon from '@resources/asset/SearchIcon.svg?react'

describe('useTextField', () => {
    it('uses the provided id when available', () => {
        const { result } = renderHook(() =>
            useTextField({ id: 'explicit-id' } as TextFieldProps),
        )

        expect(result.current.inputId).toBe('explicit-id')
    })

    it('generates an id when a label is provided but no id', () => {
        const { result } = renderHook(() =>
            useTextField({ label: 'Email' } as TextFieldProps),
        )

        expect(result.current.inputId).toBeTruthy()
    })

    it('does not generate an input id when there is no label and no id', () => {
        const { result } = renderHook(() => useTextField({} as TextFieldProps))

        expect(result.current.inputId).toBeUndefined()
    })

    it('always generates a helper id', () => {
        const { result } = renderHook(() => useTextField({} as TextFieldProps))

        expect(result.current.helperId).toBeTruthy()
    })

    it('reports an error when the error prop is set', () => {
        const { result } = renderHook(() =>
            useTextField({ error: 'Required' } as TextFieldProps),
        )

        expect(result.current.hasError).toBe(true)
    })

    it('detects password type and toggles resolved type', () => {
        const { result } = renderHook(() =>
            useTextField({ type: 'password' } as TextFieldProps),
        )

        expect(result.current.isPassword).toBe(true)
        expect(result.current.resolvedType).toBe('password')

        act(() => {
            result.current.setShowPassword(true)
        })

        expect(result.current.showPassword).toBe(true)
        expect(result.current.resolvedType).toBe('text')
    })

    it('preserves non-password types', () => {
        const { result } = renderHook(() =>
            useTextField({ type: 'email' } as TextFieldProps),
        )

        expect(result.current.isPassword).toBe(false)
        expect(result.current.resolvedType).toBe('email')
    })

    it('reports whether a start icon is present', () => {
        const { result } = renderHook(() =>
            useTextField({ startIcon: SearchIcon } as TextFieldProps),
        )

        expect(result.current.hasStartIcon).toBe(true)
    })

    it('reports an end action when endAction is provided', () => {
        const { result } = renderHook(() =>
            useTextField({
                endAction: <button type="button">Clear</button>,
            } as TextFieldProps),
        )

        expect(result.current.hasEndAction).toBe(true)
    })

    it('prioritizes password toggle over endAction', () => {
        const { result } = renderHook(() =>
            useTextField({
                type: 'password',
                endAction: <button type="button">Clear</button>,
            } as TextFieldProps),
        )

        expect(result.current.hasEndAction).toBe(true)
    })

    it('calls the original onMouseDown handler', () => {
        const onMouseDown = vi.fn()
        const { result } = renderHook(() =>
            useTextField({ onMouseDown } as TextFieldProps),
        )

        const event = { button: 0 } as React.MouseEvent<HTMLInputElement>
        act(() => {
            result.current.handleMouseDown(event)
        })

        expect(onMouseDown).toHaveBeenCalledWith(event)
    })

    it('sets data-mouse-focus when focus follows a mouse down', () => {
        const { result } = renderHook(() => useTextField({} as TextFieldProps))

        const input = document.createElement('input')
        const mouseDownEvent = {
            button: 0,
            currentTarget: input,
        } as unknown as React.MouseEvent<HTMLInputElement>
        const focusEvent = {
            currentTarget: input,
        } as unknown as React.FocusEvent<HTMLInputElement>

        act(() => {
            result.current.handleMouseDown(mouseDownEvent)
            result.current.handleFocus(focusEvent)
        })

        expect(input.getAttribute('data-mouse-focus')).toBe('')
    })

    it('removes data-mouse-focus on blur', () => {
        const { result } = renderHook(() => useTextField({} as TextFieldProps))

        const input = document.createElement('input')
        input.setAttribute('data-mouse-focus', '')
        const blurEvent = {
            currentTarget: input,
        } as unknown as React.FocusEvent<HTMLInputElement>

        act(() => {
            result.current.handleBlur(blurEvent)
        })

        expect(input.hasAttribute('data-mouse-focus')).toBe(false)
    })

    it('calls the original onFocus and onBlur handlers', () => {
        const onFocus = vi.fn()
        const onBlur = vi.fn()
        const { result } = renderHook(() =>
            useTextField({ onFocus, onBlur } as TextFieldProps),
        )

        const focusEvent = {
            currentTarget: document.createElement('input'),
        } as unknown as React.FocusEvent<HTMLInputElement>
        const blurEvent = {
            currentTarget: document.createElement('input'),
        } as unknown as React.FocusEvent<HTMLInputElement>

        act(() => {
            result.current.handleFocus(focusEvent)
            result.current.handleBlur(blurEvent)
        })

        expect(onFocus).toHaveBeenCalledWith(focusEvent)
        expect(onBlur).toHaveBeenCalledWith(blurEvent)
    })
})
