import { PreviewCard } from '@base-ui/react/preview-card'
import { memo, type FC } from 'react'

import type { HoverCardTriggerProps } from '@components/overlay/hover-card/components/trigger/types/HoverCardTrigger.props.ts'

/**
 * The element that opens the hover card.
 * Use `render` to forward the trigger behaviour to your own element.
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
