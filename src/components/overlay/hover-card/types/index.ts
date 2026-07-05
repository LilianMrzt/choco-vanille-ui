import type { FC } from 'react'

import type HoverCardContent from '@components/overlay/hover-card/components/content/HoverCardContent.tsx'
import type HoverCardTrigger from '@components/overlay/hover-card/components/trigger/HoverCardTrigger.tsx'
import type { HoverCardProps } from '@components/overlay/hover-card/types/HoverCard.props.ts'

export type HoverCardCompound = FC<HoverCardProps> & {
  Trigger: typeof HoverCardTrigger;
  Content: typeof HoverCardContent;
};
