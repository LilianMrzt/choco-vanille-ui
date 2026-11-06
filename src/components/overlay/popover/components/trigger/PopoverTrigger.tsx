import { Popover as BasePopover } from '@base-ui/react/popover'
import { memo } from 'react'

import type { PopoverTriggerProps } from '@components/overlay/popover/components/trigger/types'

/**
 * The element that opens the popover.
 * Pass your own element as `children` (e.g. `<Button />`) to use it as the trigger.
 * @param props - Base UI trigger props and rendered child.
 * @param props.children - Focusable trigger element.
 * @param props.ref - Ref to the trigger element.
 * @returns The trigger.
 * @example
 * <Popover.Trigger><button>Open</button></Popover.Trigger>
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
