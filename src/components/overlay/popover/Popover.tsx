import { Popover as BasePopover } from '@base-ui/react/popover'

import PopoverContent from '@components/overlay/popover/components/content/PopoverContent.tsx'
import PopoverTrigger from '@components/overlay/popover/components/trigger/PopoverTrigger.tsx'
import type { PopoverCompound } from '@components/overlay/popover/types'

/**
 * The root wrapper that manages open/close state.
 * Accepts `open`, `onOpenChange`, `defaultOpen` and `modal` from Base UI.
 */
const Popover = ((props) => (
    <BasePopover.Root {...props} />
)) as PopoverCompound

Popover.displayName = 'Popover'
Popover.Trigger = PopoverTrigger
Popover.Content = PopoverContent

export default Popover
