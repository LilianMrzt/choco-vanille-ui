import * as RadixPopover from '@radix-ui/react-popover'

import type { PopoverAnchorProps } from '@components/overlay/popover/components/anchor/popover-anchor/types/PopoverAnchor.props.ts'

/**
 * Optional anchor element used to position the popover content.
 * When not provided, the trigger is used as the anchor.
 */
const PopoverAnchor = (props: PopoverAnchorProps) => (
    <RadixPopover.Anchor {...props} />
)

PopoverAnchor.displayName = 'PopoverAnchor'

export default PopoverAnchor
