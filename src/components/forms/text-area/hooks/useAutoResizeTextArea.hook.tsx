import { useCallback, useEffect, useRef, useState } from 'react'
import type { UseAutoResizeTextAreaOptions } from '@components/forms/text-area/hooks/types'
import { getTextAreaHeight } from '@components/forms/text-area/hooks/utils/getTextAreaHeight.utils'

/**
 * Automatically resizes a `<textarea>` to fit its content between `minRows`
 * and `maxRows`. Once the content reaches `maxRows`, the textarea stops
 * expanding and the native scrollbar appears.
 */
export const useAutoResizeTextArea = (
    ref: React.RefObject<HTMLTextAreaElement | null>,
    { minRows, maxRows, value }: UseAutoResizeTextAreaOptions
) => {
    const [isEnabled] = useState(() => minRows !== undefined || maxRows !== undefined)
    const resizeRef = useRef<() => void>(() => {})

    resizeRef.current = useCallback(() => {
        const el = ref.current
        if (!el || !isEnabled) {
            return
        }

        el.style.height = `${getTextAreaHeight(el, { minRows, maxRows })}px`
    }, [ref, isEnabled, minRows, maxRows])

    const handleInput = useCallback(() => {
        resizeRef.current()
    }, [])

    // Recalculate on mount, on prop changes, and whenever a controlled `value`
    // is updated externally (which would not fire an `input` event).
    useEffect(() => {
        if (!isEnabled) {
            return
        }
        resizeRef.current()
    }, [isEnabled, minRows, maxRows, value])

    // Recalculate when the textarea's width changes (e.g. container resize or
    // viewport reflow), since wrapping — and therefore content height — depends
    // on width. Guard against feedback loops by reacting to width changes only.
    useEffect(() => {
        const el = ref.current
        if (!isEnabled || !el || typeof ResizeObserver === 'undefined') {
            return
        }

        let previousWidth = el.clientWidth
        const observer = new ResizeObserver(() => {
            const nextWidth = el.clientWidth
            if (nextWidth !== previousWidth) {
                previousWidth = nextWidth
                resizeRef.current()
            }
        })
        observer.observe(el)
        return () => observer.disconnect()
    }, [ref, isEnabled])

    return { isEnabled, resize: handleInput }
}
