import { type FocusEventHandler, type MouseEventHandler, useId, useRef, useState } from 'react'
import type { TextFieldProps } from '@components/forms/text-field/types/TextField.props.ts'
import type { UseTextFieldReturn } from '@components/forms/text-field/hooks/types'

export const useTextField = (
    props: TextFieldProps & {
        type?: string
        onMouseDown?: MouseEventHandler<HTMLInputElement>
        onFocus?: FocusEventHandler<HTMLInputElement>
        onBlur?: FocusEventHandler<HTMLInputElement>
    }
): UseTextFieldReturn => {
    const {
        label,
        error,
        startIcon,
        endAction,
        type,
        onMouseDown,
        onFocus,
        onBlur,
        id
    } = props

    const generatedId = useId()
    const inputId = id ?? (label ? generatedId : undefined)
    const helperId = `${generatedId}-helper`
    const hasError = Boolean(error)
    const isPassword = type === 'password'

    const [showPassword, setShowPassword] = useState(false)
    const pointerDownRef = useRef(false)

    const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
        pointerDownRef.current = true
        onMouseDown?.(e)
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (pointerDownRef.current) {
            e.currentTarget.setAttribute('data-mouse-focus', '')
            pointerDownRef.current = false
        }
        onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        pointerDownRef.current = false
        e.currentTarget.removeAttribute('data-mouse-focus')
        onBlur?.(e)
    }

    const hasStartIcon = Boolean(startIcon)
    const hasEndAction = isPassword || Boolean(endAction)
    const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type

    return {
        inputId,
        helperId,
        hasError,
        isPassword,
        showPassword,
        setShowPassword,
        handleMouseDown,
        handleFocus,
        handleBlur,
        hasStartIcon,
        hasEndAction,
        resolvedType,
    }
}
