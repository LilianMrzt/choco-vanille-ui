import { Popover as BasePopover } from '@base-ui/react/popover'
import { memo } from 'react'

import PopoverContent from '@components/overlay/popover/components/content/PopoverContent.tsx'
import PopoverItem from '@components/overlay/popover/components/item/PopoverItem.tsx'
import PopoverTrigger from '@components/overlay/popover/components/trigger/PopoverTrigger.tsx'
import type { PopoverProps } from '@components/overlay/popover/types'

/**
 * The root wrapper that manages open/close state.
 * Accepts `open`, `onOpenChange`, `defaultOpen` and `modal` from Base UI.
 * The default is non-modal; callbacks receive Base UI change details.
 * @param props - Base UI root props.
 * @returns A popover root.
 * @example
 * <Popover><Popover.Trigger><button>Open</button></Popover.Trigger></Popover>
 */
const PopoverRoot = memo<PopoverProps>((props) => (
    <BasePopover.Root {...props} />
))

PopoverRoot.displayName = 'Popover'

/** Popover root with trigger, content and action slots. */
const Popover = Object.assign(PopoverRoot, {
    Trigger: PopoverTrigger,
    Content: PopoverContent,
    Item: PopoverItem,
})

export default Popover
