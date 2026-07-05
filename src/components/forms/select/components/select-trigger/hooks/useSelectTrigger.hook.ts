import { useRef, type MouseEventHandler } from 'react'
import type {
    UseSelectTriggerParams,
    UseSelectTriggerReturn
} from '@components/forms/select/components/select-trigger/types'

const useSelectTrigger = ({
    width,
    style,
    onMouseDown,
}: UseSelectTriggerParams): UseSelectTriggerReturn => {
    const pointerDownRef = useRef(false)

    const handleMouseDown: MouseEventHandler<HTMLButtonElement> = (event) => {
        pointerDownRef.current = true
        onMouseDown?.(event)
    }

    const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
        if (pointerDownRef.current) {
            event.currentTarget.setAttribute('data-mouse-focus', '')
            pointerDownRef.current = false
        }
    }

    const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
        pointerDownRef.current = false
        event.currentTarget.removeAttribute('data-mouse-focus')
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
