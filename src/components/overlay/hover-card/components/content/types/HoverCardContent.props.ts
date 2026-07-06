import type { PreviewCard } from '@base-ui/react/preview-card'

import type {
    HoverCardAlign,
    HoverCardPosition,
    HoverCardSide,
} from '@components/overlay/hover-card/types/HoverCard.types.ts'

export type HoverCardContentProps = PreviewCard.Popup.Props &
  Pick<PreviewCard.Positioner.Props, 'side' | 'align' | 'sideOffset'> & {
    /**
     * Shorthand position combining side and alignment in a single value.
     * Takes precedence over `side` and `align` when provided.
     * @example 'top-start' | 'right' | 'bottom-end' | 'left-start'
     */
    position?: HoverCardPosition;
    /** Side of the trigger to render the content. @default 'bottom' */
    side?: HoverCardSide;
    /** Alignment along the trigger axis. @default 'center' */
    align?: HoverCardAlign;
    /** Offset in pixels from the trigger. @default 6 */
    sideOffset?: number;
    /**
     * Distance in pixels from the viewport edges used for collision detection.
     * The hover card shifts inward by exactly the overflowing amount to always
     * stay fully visible — without flipping to the opposite side.
     * Accepts a uniform number or per-side object.
     * @default 8
     */
    collisionPadding?:
      | number
      | { top?: number; right?: number; bottom?: number; left?: number };
  };
