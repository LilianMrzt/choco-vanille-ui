import { type FocusEventHandler, type MouseEventHandler, useId, useRef } from 'react'
import type { TextAreaProps } from '@components/forms/text-area/types/TextArea.props.ts'
import type { UseTextAreaReturn } from '@components/forms/text-area/hooks/types'

export const useTextArea = (
    props: TextAreaProps & {
        onMouseDown?: MouseEventHandler<HTMLTextAreaElement>
        onFocus?: FocusEventHandler<HTMLTextAreaElement>
        onBlur?: FocusEventHandler<HTMLTextAreaElement>
    }
): UseTextAreaReturn => {
    const {
        label,
        error,
        startIcon,
        endAction,
        onMouseDown,
        onFocus,
        onBlur,
        id
    } = props

    const generatedId = useId()
    const inputId = id ?? (label ? generatedId : undefined)
    const helperId = `${generatedId}-helper`
    const hasError = Boolean(error)

    const pointerDownRef = useRef(false)

    const handleMouseDown = (e: React.MouseEvent<HTMLTextAreaElement>) => {
        pointerDownRef.current = true
        onMouseDown?.(e)
    }

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        if (pointerDownRef.current) {
            e.currentTarget.setAttribute('data-mouse-focus', '')
            pointerDownRef.current = false
        }
        onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        pointerDownRef.current = false
        e.currentTarget.removeAttribute('data-mouse-focus')
        onBlur?.(e)
    }

    const hasStartIcon = Boolean(startIcon)
    const hasEndAction = Boolean(endAction)

    return {
        inputId,
        helperId,
        hasError,
        handleMouseDown,
        handleFocus,
        handleBlur,
        hasStartIcon,
        hasEndAction,
    }
}
