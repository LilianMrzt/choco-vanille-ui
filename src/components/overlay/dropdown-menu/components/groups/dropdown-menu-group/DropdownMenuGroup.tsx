import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import type { DropdownMenuGroupProps } from '@components/overlay/dropdown-menu/components/groups/dropdown-menu-group/types/DropdownMenuGroup.props.ts'

/**
 * Groups related items together semantically. Pair with `DropdownMenuLabel`.
 */
const DropdownMenuGroup = (props: DropdownMenuGroupProps) => (
    <RadixDropdownMenu.Group {...props} />
)

DropdownMenuGroup.displayName = 'DropdownMenuGroup'

export default DropdownMenuGroup
