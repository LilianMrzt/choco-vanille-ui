import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { HoverCard } from '@components/overlay/hover-card'
import type { HoverCardStoryArgs } from '@stories/overlay/hover-card/constants'

/**
 * Renders the example with root and slot controls.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Root and demonstration options.
 * @returns The preview card example.
 * @example
 * <HoverCardExample {...args} />
 */
const HoverCardExample = ({ triggerLabel, triggerDelay, closeDelay, contentWidth, contentText, ...rootProps }: HoverCardStoryArgs): ReactElement => (
    <HoverCard {...rootProps}>
        <HoverCard.Trigger
            delay={triggerDelay}
            closeDelay={closeDelay}
        >
            <Button label={triggerLabel} />
        </HoverCard.Trigger>
        <HoverCard.Content style={{ width: contentWidth, padding: '1rem' }}>
            <p style={{ margin: 0 }}>{contentText}</p>
        </HoverCard.Content>
    </HoverCard>
)

export default HoverCardExample
