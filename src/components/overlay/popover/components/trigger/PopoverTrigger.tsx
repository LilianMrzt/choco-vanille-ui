import { Popover as BasePopover } from '@base-ui/react/popover'
import { memo } from 'react'

import type { PopoverTriggerProps } from '@components/overlay/popover/components/trigger/types/PopoverTrigger.props.ts'

/**
 * The element that opens the popover.
 * Pass your own element as `children` (e.g. `<Button />`) to use it as the trigger.
 */
const PopoverTrigger = memo(
    ({ children, ref, ...props }: PopoverTriggerProps) => (
        <BasePopover.Trigger
            {...props}
            ref={ref}
            render={children}
        />
    ),
)

PopoverTrigger.displayName = 'Popover.Trigger'

export default PopoverTrigger
