import * as RadixPopover from '@radix-ui/react-popover'

import type { PopoverTriggerProps } from '@components/overlay/popover/components/trigger/types/PopoverTrigger.props.ts'

/**
 * The element that opens the popover.
 * Use `asChild` to forward the trigger behaviour to your own element.
 */
const PopoverTrigger = (props: PopoverTriggerProps) => (
    <RadixPopover.Trigger {...props} />
)

PopoverTrigger.displayName = 'PopoverTrigger'

export default PopoverTrigger
