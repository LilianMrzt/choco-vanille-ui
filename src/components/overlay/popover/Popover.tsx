import * as RadixPopover from '@radix-ui/react-popover'

import PopoverAnchor from '@components/overlay/popover/components/anchor/popover-anchor/PopoverAnchor.tsx'
import PopoverContent from '@components/overlay/popover/components/content/popover-content/PopoverContent.tsx'
import PopoverTrigger from '@components/overlay/popover/components/trigger/popover-trigger/PopoverTrigger.tsx'
import type { PopoverCompound } from '@components/overlay/popover/types'

/**
 * The root wrapper that manages open/close state.
 * Accepts `open`, `onOpenChange`, `defaultOpen` and `modal` from Radix.
 */
const Popover = ((props) => (
    <RadixPopover.Root {...props} />
)) as PopoverCompound

Popover.displayName = 'Popover'
Popover.Trigger = PopoverTrigger
Popover.Content = PopoverContent
Popover.Anchor = PopoverAnchor

export default Popover
