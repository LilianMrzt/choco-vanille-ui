import { PreviewCard } from '@base-ui/react/preview-card'
import { memo, type FC } from 'react'

import type { HoverCardTriggerProps } from '@components/overlay/hover-card/components/trigger/types'

/**
 * The element that opens the hover card.
 * Pass a child element to receive the trigger behavior.
 * @param props - Base UI trigger props and rendered child.
 * @param props.children - Focusable trigger element.
 * @param props.delay - Hover opening delay in milliseconds; defaults to `0`.
 * @returns The trigger.
 * @example
 * <HoverCard.Trigger><a href="/">Profile</a></HoverCard.Trigger>
 */
const HoverCardTrigger: FC<HoverCardTriggerProps> = memo(({ children, delay = 0, ...props }) => (
    <PreviewCard.Trigger
        {...props}
        delay={delay}
        render={children}
    />
))

HoverCardTrigger.displayName = 'HoverCard.Trigger'

export default HoverCardTrigger
