import { Popover as BasePopover } from '@base-ui/react/popover'
import { memo } from 'react'

import PopoverContent from '@components/overlay/popover/components/content/PopoverContent.tsx'
import PopoverTrigger from '@components/overlay/popover/components/trigger/PopoverTrigger.tsx'
import type { PopoverCompound } from '@components/overlay/popover/types'
import type { PopoverProps } from '@components/overlay/popover/types/Popover.props.ts'

/**
 * The root wrapper that manages open/close state.
 * Accepts `open`, `onOpenChange`, `defaultOpen` and `modal` from Base UI.
 */
const Popover = memo<PopoverProps>((props) => (
    <BasePopover.Root {...props} />
)) as unknown as PopoverCompound

Popover.displayName = 'Popover'
Popover.Trigger = PopoverTrigger
Popover.Content = PopoverContent

export default Popover
