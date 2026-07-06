import { PreviewCard } from '@base-ui/react/preview-card'

import HoverCardContent from '@components/overlay/hover-card/components/content/HoverCardContent.tsx'
import HoverCardTrigger from '@components/overlay/hover-card/components/trigger/HoverCardTrigger.tsx'
import type { HoverCardCompound } from '@components/overlay/hover-card/types'

/**
 * A hover-activated overlay built on top of `@base-ui/react/preview-card`.
 * It behaves like a popover but opens on hover and stays open while the cursor
 * is over the trigger or the panel.
 *
 * Reuses the popover content styles for visual consistency.
 */
const HoverCard = ((props) => (
    <PreviewCard.Root {...props} />
)) as HoverCardCompound

HoverCard.displayName = 'HoverCard'
HoverCard.Trigger = HoverCardTrigger
HoverCard.Content = HoverCardContent

export default HoverCard
