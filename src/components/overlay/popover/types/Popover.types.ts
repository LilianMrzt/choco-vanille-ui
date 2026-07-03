import type { OverlayAlign, OverlayPosition, OverlaySide } from '@components/overlay/_shared/types'

/** Side position of the popover content relative to its trigger. */
export type PopoverSide = OverlaySide

/** Alignment of the popover content relative to its trigger. */
export type PopoverAlign = OverlayAlign

/**
 * Combined position of the popover — shorthand that sets both `side` and `align`
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
export type PopoverPosition = OverlayPosition
