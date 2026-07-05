import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import type { DropdownMenuTriggerProps } from '@components/overlay/dropdown-menu/components/trigger/types/DropdownMenuTrigger.props.ts'

/**
 * The element that opens the dropdown.
 * Use `asChild` to forward the trigger behaviour to your own element.
 */
const DropdownMenuTrigger = (props: DropdownMenuTriggerProps) => (
    <RadixDropdownMenu.Trigger {...props} />
)

DropdownMenuTrigger.displayName = 'DropdownMenuTrigger'

export default DropdownMenuTrigger
