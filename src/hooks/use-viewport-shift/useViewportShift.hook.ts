import { useCallback, useRef } from 'react'
import { guardAccidentalSelection } from '@hooks/use-viewport-shift/helpers/guardAccidentalSelection.helper.ts'
import { normalizePadding } from '@hooks/use-viewport-shift/helpers/normalizePadding.helper.ts'
import { createCorrector } from '@hooks/use-viewport-shift/helpers/createCorrector.helper.ts'
import { watchRepositions } from '@hooks/use-viewport-shift/helpers/watchRepositions.helper.ts'
import type { Padding } from '@hooks/use-viewport-shift/types'

/**
 * Returns a React 19 **callback ref** that keeps a Radix floating panel fully
 * visible within the viewport by applying a CSS `translate` correction.
 *
 * A callback ref is required because Radix `Portal` mounts content in a second
 * render pass, so a parent `useLayoutEffect` would fire while the node is still
 * `null`; the callback fires exactly when the DOM node attaches.
 *
 * @param collisionPadding - Minimum gap in px between the panel and each
 *   viewport edge. Accepts a uniform number or a per-side object. @default 8
 */
export const useViewportShift = (collisionPadding: Padding = 8) => {
    // Stable ref so the callback always reads the latest padding without being
    // recreated on every render.
    const padRef = useRef(normalizePadding(collisionPadding))
    padRef.current = normalizePadding(collisionPadding)

    return useCallback((content: HTMLDivElement | null): (() => void) | void => {
        // `parentElement` is the Radix popper wrapper carrying floating-ui's
        // positioning transform — the element we measure and observe.
        const wrapper = content?.parentElement
        if (!content || !wrapper) { return }

        const correct = createCorrector(content, wrapper, padRef)
        const stopWatching = watchRepositions(content, wrapper, correct)
        const stopGuarding = guardAccidentalSelection(content)

        // React 19 callback ref cleanup — called automatically on unmount.
        return () => {
            stopWatching()
            stopGuarding()
        }
    }, []) // stable: only padRef (a ref) is captured — never changes identity
}
