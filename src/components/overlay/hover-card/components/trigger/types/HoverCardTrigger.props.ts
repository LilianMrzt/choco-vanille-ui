import type { PreviewCard } from '@base-ui/react/preview-card'
import type { ReactElement } from 'react'

export type HoverCardTriggerProps = Omit<PreviewCard.Trigger.Props, 'render' | 'children'> & {
  /** The element that triggers the hover card — forwarded to Base UI's `render` prop. */
  children: ReactElement;
};
