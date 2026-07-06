import { Menu as BaseMenu } from '@base-ui/react/menu'

import { DropdownMenuGroupProvider } from '@components/overlay/dropdown-menu/components/groups/DropdownMenuGroupContext.tsx'
import type { DropdownMenuGroupProps } from '@components/overlay/dropdown-menu/components/groups/dropdown-menu-group/types/DropdownMenuGroup.props.ts'

/**
 * Groups related items together semantically. Pair with `DropdownMenuLabel`.
 */
const DropdownMenuGroup = (props: DropdownMenuGroupProps) => (
    <DropdownMenuGroupProvider value={true}>
        <BaseMenu.Group {...props} />
    </DropdownMenuGroupProvider>
)

DropdownMenuGroup.displayName = 'DropdownMenu.Group'

export default DropdownMenuGroup
