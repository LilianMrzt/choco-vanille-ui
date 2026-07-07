import { useRef, type FocusEventHandler, type MouseEventHandler } from 'react'
import type {
    UseSelectTriggerParams,
    UseSelectTriggerReturn
} from '@components/forms/select/components/select-trigger/types'

const useSelectTrigger = ({
    width,
    style,
    onMouseDown,
    onFocus,
    onBlur,
}: UseSelectTriggerParams): UseSelectTriggerReturn => {
    const pointerDownRef = useRef(false)

    const handleMouseDown: MouseEventHandler<HTMLButtonElement> = (event) => {
        pointerDownRef.current = true
        onMouseDown?.(event)
    }

    const handleFocus: FocusEventHandler<HTMLButtonElement> = (event) => {
        if (pointerDownRef.current) {
            event.currentTarget.setAttribute('data-mouse-focus', '')
            pointerDownRef.current = false
        }
        onFocus?.(event)
    }

    const handleBlur: FocusEventHandler<HTMLButtonElement> = (event) => {
        pointerDownRef.current = false
        event.currentTarget.removeAttribute('data-mouse-focus')
        onBlur?.(event)
    }

    const mergedStyle = width !== undefined ? { ...style, width } : style

    return {
        handleMouseDown,
        handleFocus,
        handleBlur,
        mergedStyle,
    }
}

export default useSelectTrigger
