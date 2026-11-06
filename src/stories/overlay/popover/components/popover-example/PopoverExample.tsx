import type { ReactElement } from 'react'

import { Button } from '@components/actions/button'
import { Popover } from '@components/overlay/popover'
import type { PopoverStoryArgs } from '@stories/overlay/popover/constants'

/**
 * Renders the example with root and slot controls.
 * @internal Storybook-only component; not part of the public package API.
 * @param props - Root and demonstration options.
 * @returns The popover example.
 * @example
 * <PopoverExample {...args} />
 */
const PopoverExample = ({
    triggerLabel,
    contentWidth,
    contentPadding,
    itemLabel,
    itemDisabled,
    itemDestructive,
    itemCloseOnClick,
    ...rootProps
}: PopoverStoryArgs): ReactElement => (
    <Popover {...rootProps}>
        <Popover.Trigger>
            <Button label={triggerLabel} />
        </Popover.Trigger>
        <Popover.Content
            width={contentWidth}
            padding={contentPadding}
            aria-label={'Options'}
        >
            <Popover.Item
                label={itemLabel}
                disabled={itemDisabled}
                destructive={itemDestructive}
                closeOnClick={itemCloseOnClick}
            />
        </Popover.Content>
    </Popover>
)

export default PopoverExample
