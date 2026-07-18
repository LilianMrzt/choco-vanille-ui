import { useEffect, useLayoutEffect, useState } from 'react'

import { vars } from '@theme/contract.css.ts'

import type { UseTransitionRenderReturnType } from '@hooks/use-transition-render/types'
import {
    getPrefersReducedMotion,
    resolveDurationMs
} from '@hooks/use-transition-render/utils/useTransitionRender.utils.ts'

/**
 * Manages mount/unmount transitions with a two-phase approach (visible → fading-in).
 *
 * Opening sequence:
 *   1. `useLayoutEffect` sets `isVisible=true` synchronously before the browser paints
 *      → element is in the DOM at its initial hidden state on the very first frame.
 *   2. Double `requestAnimationFrame` in `useEffect` waits for two rendered frames
 *      before setting `isFadingIn=true`, guaranteeing the CSS transition always starts
 *      from the painted hidden state (prevents flickering).
 *
 * Closing sequence:
 *   `isFadingIn=false` → CSS transition plays → after `duration` ms → `isVisible=false`.
 *
 * When `prefers-reduced-motion: reduce` is active the effective duration is forced to
 * `0` so the element is removed from the DOM immediately after hiding, in sync with
 * the near-instant CSS transition set by the global `globals.css` rule.
 *
 * @param isOpen - Whether the element should be shown.
 * @param durationVar - CSS variable reference for the transition duration
 *   (e.g. `vars.duration.normal`). Defaults to the theme's normal duration.
 */
export const useTransitionRender = (
    isOpen: boolean,
    durationVar: string = vars.duration.normal,
): UseTransitionRenderReturnType => {
    const durationMs = resolveDurationMs(durationVar)
    const effectiveDuration = getPrefersReducedMotion() ? 0 : durationMs
    const [isVisible, setIsVisible] = useState(isOpen)
    const [isFadingIn, setIsFadingIn] = useState(isOpen)

    // Mount synchronously before paint so the element is in the DOM at opacity:0
    // on the very first frame — no extra render cycle between null and the initial state.
    useLayoutEffect(() => {
        if (isOpen) {
            setIsVisible(true)
        }
    }, [isOpen])

    useEffect(() => {
        if (isOpen) {
            // Double RAF: frame 1 → element rendered; frame 2 → element painted at hidden
            // state → THEN trigger the CSS transition.
            let raf2: number
            const raf1 = requestAnimationFrame(() => {
                raf2 = requestAnimationFrame(() => setIsFadingIn(true))
            })
            return () => {
                cancelAnimationFrame(raf1)
                cancelAnimationFrame(raf2)
            }
        } else {
            setIsFadingIn(false)
            const timeout = setTimeout(() => setIsVisible(false), effectiveDuration)
            return () => clearTimeout(timeout)
        }
    }, [isOpen, effectiveDuration])

    return { isVisible, isFadingIn }
}
