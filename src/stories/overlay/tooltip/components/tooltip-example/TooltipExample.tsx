import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { Tooltip } from '@components/overlay/tooltip'
import type { TooltipStoryArgs } from '@stories/overlay/tooltip/types'

/**
 * Renders the example with tooltip controls.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Tooltip and demonstration options.
 * @param props.children - Trigger supplied by the story; replaced by the example button.
 * @param props.triggerLabel - Label for the example button.
 * @returns The tooltip example.
 * @example
 * <TooltipExample {...args} />
 */
const TooltipExample = ({ children: _children, triggerLabel, ...props }: TooltipStoryArgs): ReactElement => (
    <Tooltip {...props}>
        <Button label={triggerLabel} />
    </Tooltip>
)

export default TooltipExample
