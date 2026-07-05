import * as RadixHoverCard from '@radix-ui/react-hover-card'

import type { HoverCardTriggerProps } from '@components/overlay/hover-card/components/trigger/hover-card-trigger/types/HoverCardTrigger.props.ts'

/**
 * The element that opens the hover card.
 * Use `asChild` to forward the trigger behaviour to your own element.
 */
const HoverCardTrigger = (props: HoverCardTriggerProps) => (
    <RadixHoverCard.Trigger {...props} />
)

HoverCardTrigger.displayName = 'HoverCardTrigger'

export default HoverCardTrigger
