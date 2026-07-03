import type { OverlayAlign, OverlayPosition, OverlaySide } from '@components/overlay/_shared/types'

/** Parses an `OverlayPosition` string into its `side` and `align` parts. */
export const parsePosition = (position: OverlayPosition): { side: OverlaySide; align: OverlayAlign } => {
    const parts = position.split('-') as [OverlaySide, OverlayAlign?]
    const side = parts[0]
    const align = parts[1] ?? 'center'
    return { side, align }
}
