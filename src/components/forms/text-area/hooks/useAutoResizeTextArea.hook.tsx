import { useCallback, useEffect, useRef, useState } from 'react'
import type { UseAutoResizeTextAreaOptions } from '@components/forms/text-area/hooks/types'

/**
 * Automatically resizes a `<textarea>` to fit its content between `minRows`
 * and `maxRows`. Once the content reaches `maxRows`, the textarea stops
 * expanding and the native scrollbar appears.
 */
export const useAutoResizeTextArea = (
    ref: React.RefObject<HTMLTextAreaElement | null>,
    { minRows, maxRows }: UseAutoResizeTextAreaOptions
) => {
    const [isEnabled] = useState(() => minRows !== undefined || maxRows !== undefined)
    const resizeRef = useRef<() => void>(() => {})

    resizeRef.current = useCallback(() => {
        const el = ref.current
        if (!el || !isEnabled) {
            return
        }

        const computed = window.getComputedStyle(el)
        const lineHeight = parseFloat(computed.lineHeight)
        const paddingTop = parseFloat(computed.paddingTop)
        const paddingBottom = parseFloat(computed.paddingBottom)
        const borderTop = parseFloat(computed.borderTopWidth)
        const borderBottom = parseFloat(computed.borderBottomWidth)
        const verticalExtras = paddingTop + paddingBottom + borderTop + borderBottom

        const minHeight = minRows !== undefined
            ? minRows * lineHeight + verticalExtras
            : undefined
        const maxHeight = maxRows !== undefined
            ? maxRows * lineHeight + verticalExtras
            : undefined

        // Reset height to auto so scrollHeight reflects the content size.
        el.style.height = 'auto'
        let newHeight = el.scrollHeight

        if (minHeight !== undefined) {
            newHeight = Math.max(newHeight, minHeight)
        }
        if (maxHeight !== undefined) {
            newHeight = Math.min(newHeight, maxHeight)
        }

        el.style.height = `${newHeight}px`
    }, [ref, isEnabled, minRows, maxRows])

    const handleInput = useCallback(() => {
        resizeRef.current()
    }, [])

    useEffect(() => {
        if (!isEnabled) {
            return
        }
        resizeRef.current()
    }, [isEnabled, minRows, maxRows])

    return { isEnabled, resize: handleInput }
}
