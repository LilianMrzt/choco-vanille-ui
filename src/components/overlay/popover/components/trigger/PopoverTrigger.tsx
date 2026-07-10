import { Popover as BasePopover } from '@base-ui/react/popover'
import { memo, type FC } from 'react'

import type { PopoverTriggerProps } from '@components/overlay/popover/components/trigger/types/PopoverTrigger.props.ts'

/**
 * The element that opens the popover.
 * Pass your own element as `children` (e.g. `<Button />`) to use it as the trigger.
 */
const PopoverTrigger: FC<PopoverTriggerProps> = memo(({ children, ...props }) => (
    <BasePopover.Trigger
        {...props}
        render={children}
    />
))

PopoverTrigger.displayName = 'Popover.Trigger'

export default PopoverTrigger
