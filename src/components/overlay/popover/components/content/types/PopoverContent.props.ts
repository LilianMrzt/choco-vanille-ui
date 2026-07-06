import type { Popover as BasePopover } from '@base-ui/react/popover'

import type {
    PopoverAlign,
    PopoverPosition,
    PopoverSide,
} from '@components/overlay/popover/types/Popover.types.ts'

export type PopoverContentProps = Omit<BasePopover.Popup.Props, 'className'> & {
  /** CSS class name applied to the panel. Vanilla Extract style, plain string only. */
  className?: string;
  /**
   * Shorthand position combining side and alignment in a single value.
   * Takes precedence over `side` and `align` when provided.
   * @example 'top-start' | 'right' | 'bottom-end' | 'left-start'
   */
  position?: PopoverPosition;
  /** Side of the trigger to render the content. @default 'bottom' */
  side?: PopoverSide;
  /** Alignment along the trigger axis. @default 'center' */
  align?: PopoverAlign;
  /** Offset in pixels from the trigger. @default 6 */
  sideOffset?: number;
  /**
   * Distance in pixels from the viewport edges used for collision detection.
   * The popover shifts inward by exactly the overflowing amount to always stay
   * fully visible — without flipping to the opposite side.
   * Accepts a uniform number or per-side object.
   * @default 8
   */
  collisionPadding?:
    | number
    | { top?: number; right?: number; bottom?: number; left?: number };
  /**
   * Accessible name used when neither `aria-label` nor `aria-labelledby` is
   * provided. Override this for i18n.
   * @default 'Popover'
   */
  defaultAriaLabel?: string;
};
