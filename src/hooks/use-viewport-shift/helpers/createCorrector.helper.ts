import { OFFSCREEN_SENTINEL } from '@hooks/use-viewport-shift/constants'
import type { NormalizedPadding } from '@hooks/use-viewport-shift/types'

/** `true` while Radix keeps the popper wrapper off-screen for measurement. */
const isAwaitingPosition = (wrapper: HTMLElement) =>
    wrapper.style.transform.includes(OFFSCREEN_SENTINEL)

/**
 * Pure geometry: the `translate` string needed to pull `rect` back inside the
 * viewport (minus `pad`), or `''` when it already fits. Right/bottom overflow
 * takes priority over left/top.
 */
const computeTranslate = (rect: DOMRect, pad: NormalizedPadding): string => {
    let dx = 0
    let dy = 0

    if (rect.right > window.innerWidth - pad.right) {
        dx = window.innerWidth - pad.right - rect.right
    } else if (rect.left < pad.left) {
        dx = pad.left - rect.left
    }

    if (rect.bottom > window.innerHeight - pad.bottom) {
        dy = window.innerHeight - pad.bottom - rect.bottom
    } else if (rect.top < pad.top) {
        dy = pad.top - rect.top
    }

    return (dx !== 0 || dy !== 0) ? `${Math.round(dx)}px ${Math.round(dy)}px` : ''
}

/**
 * Builds the idempotent correction pass. It **measures the wrapper** (stable
 * final geometry, immune to the content's entrance `transform` animation) and
 * **writes `translate` to the content** (composing with — not overriding — that
 * animation). Reading the wrapper is unaffected by our content write, so the
 * result is absolute and re-running never accumulates.
 */
export const createCorrector = (
    content: HTMLElement,
    wrapper: HTMLElement,
    padRef: { current: NormalizedPadding },
) => () => {
    if (isAwaitingPosition(wrapper)) { return }
    content.style.translate = computeTranslate(wrapper.getBoundingClientRect(), padRef.current)
}
