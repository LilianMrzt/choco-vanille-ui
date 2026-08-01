import type { ReactElement, ReactNode } from 'react'

import type { TooltipSide, TooltipAlign, TooltipPosition } from '@components/overlay/tooltip/types/Tooltip.types.ts'

export type TooltipProps = {
  /** The element that triggers the tooltip (must be a single React element that can receive a ref). */
  children: ReactElement;
  /** Content rendered inside the tooltip bubble. */
  content: ReactNode;
  /**
   * Shorthand position combining side and alignment in a single value.
   * Takes precedence over `side` and `align` when provided.
   * @example 'top-start' | 'right' | 'bottom-end' | 'left-start'
   */
  position?: TooltipPosition;
  /** Side of the trigger on which the tooltip appears. @default 'top' */
  side?: TooltipSide;
  /** Alignment of the tooltip along the trigger's axis. @default 'center' */
  align?: TooltipAlign;
  /** Delay in milliseconds before the tooltip opens. @default 300 */
  delayDuration?: number;
  /** Whether the tooltip is disabled. */
  disabled?: boolean;
  /** Additional class names to apply to the tooltip content. */
  className?: string;
  /** Controls the open state when used as a controlled component. */
  open?: boolean;
  /** Initial open state when used as an uncontrolled component. */
  defaultOpen?: boolean;
  /** Callback called when the open state changes. */
  onOpenChange?: (open: boolean) => void;
}
