import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import type { DropdownMenuSubProps } from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub/types/DropdownMenuSub.props.ts'

/**
 * Wraps a nested sub-menu.
 * Use with `DropdownMenuSubTrigger` and `DropdownMenuSubContent`.
 */
const DropdownMenuSub = (props: DropdownMenuSubProps) => (
    <RadixDropdownMenu.Sub {...props} />
)

DropdownMenuSub.displayName = 'DropdownMenuSub'

export default DropdownMenuSub
