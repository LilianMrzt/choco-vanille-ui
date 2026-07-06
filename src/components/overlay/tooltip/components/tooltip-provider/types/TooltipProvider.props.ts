import type { ReactNode } from 'react'

export type TooltipProviderProps = {
  /** The subtree whose tooltips share this provider's timing. */
  children: ReactNode;
  /** Delay in milliseconds before a tooltip opens. @default 300 */
  delayDuration?: number;
  /**
   * Time window (ms) during which moving from one trigger to another opens the
   * next tooltip instantly, skipping `delayDuration`. @default 300
   */
  skipDelayDuration?: number;
}
