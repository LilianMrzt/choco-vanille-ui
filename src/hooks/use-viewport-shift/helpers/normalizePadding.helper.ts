import type { NormalizedPadding, Padding } from '@hooks/use-viewport-shift/types'

/** Expands a uniform number or a partial per-side object into a full padding. */
export const normalizePadding = (padding: Padding): NormalizedPadding => {
    if (typeof padding === 'number') {
        return { top: padding, right: padding, bottom: padding, left: padding }
    }
    return { top: 0, right: 0, bottom: 0, left: 0, ...padding }
}
