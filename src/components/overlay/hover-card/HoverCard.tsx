import { PreviewCard } from '@base-ui/react/preview-card'
import { memo } from 'react'

import HoverCardContent from '@components/overlay/hover-card/components/content/HoverCardContent.tsx'
import HoverCardTrigger from '@components/overlay/hover-card/components/trigger/HoverCardTrigger.tsx'
import type { HoverCardProps } from '@components/overlay/hover-card/types'

/**
 * A hover-activated overlay built on top of `@base-ui/react/preview-card`.
 * It behaves like a popover but opens on hover and stays open while the cursor
 * is over the trigger or the panel.
 *
 * Reuses the popover content styles for visual consistency.
 * @param props - Base UI preview card root props.
 * @returns A preview card root.
 * @example
 * <HoverCard><HoverCard.Trigger><a href="/">Profile</a></HoverCard.Trigger></HoverCard>
 */
const HoverCardRoot = memo<HoverCardProps>((props) => (
    <PreviewCard.Root {...props} />
))

HoverCardRoot.displayName = 'HoverCard'

/** Hover preview card with trigger and content slots. */
const HoverCard = Object.assign(HoverCardRoot, { Trigger: HoverCardTrigger, Content: HoverCardContent })

export default HoverCard
