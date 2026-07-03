/** Side position of an overlay panel relative to its trigger. */
export type OverlaySide = 'top' | 'right' | 'bottom' | 'left'

/** Alignment of an overlay panel relative to its trigger. */
export type OverlayAlign = 'start' | 'center' | 'end'

/**
 * Combined position shorthand for overlay components — sets both `side` and
 * `align` in a single value. Twelve values are available (4 sides × 3 alignments).
 */
export type OverlayPosition =
    | 'top-start'    | 'top'    | 'top-end'
    | 'right-start'  | 'right'  | 'right-end'
    | 'bottom-start' | 'bottom' | 'bottom-end'
    | 'left-start'   | 'left'   | 'left-end'
