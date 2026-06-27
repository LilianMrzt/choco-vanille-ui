/** Side position of the tooltip relative to its trigger. */
export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';

/** Alignment of the tooltip relative to its trigger. */
export type TooltipAlign = 'start' | 'center' | 'end';

/**
 * Combined position of the tooltip — shorthand that sets both `side` and `align`
 * in a single prop. Twelve values are available (4 sides × 3 alignments).
 *
 * | Value           | side     | align    |
 * |-----------------|----------|----------|
 * | `top-start`     | top      | start    |
 * | `top`           | top      | center   |
 * | `top-end`       | top      | end      |
 * | `right-start`   | right    | start    |
 * | `right`         | right    | center   |
 * | `right-end`     | right    | end      |
 * | `bottom-start`  | bottom   | start    |
 * | `bottom`        | bottom   | center   |
 * | `bottom-end`    | bottom   | end      |
 * | `left-start`    | left     | start    |
 * | `left`          | left     | center   |
 * | `left-end`      | left     | end      |
 */
export type TooltipPosition =
    | 'top-start'    | 'top'    | 'top-end'
    | 'right-start'  | 'right'  | 'right-end'
    | 'bottom-start' | 'bottom' | 'bottom-end'
    | 'left-start'   | 'left'   | 'left-end';

/** Parses a `TooltipPosition` string into its `side` and `align` parts. */
export const parsePosition = (position: TooltipPosition): { side: TooltipSide; align: TooltipAlign } => {
    const parts = position.split('-') as [TooltipSide, TooltipAlign?]
    const side   = parts[0]
    const align  = parts[1] ?? 'center'
    return { side, align }
}
