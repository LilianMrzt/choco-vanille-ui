import { Menu as BaseMenu } from '@base-ui/react/menu'
import { memo, type FC } from 'react'

import { DropdownMenuGroupProvider } from '@components/overlay/dropdown-menu/components/groups/DropdownMenuGroupContext.tsx'
import type { DropdownMenuGroupProps } from '@components/overlay/dropdown-menu/components/groups/dropdown-menu-group/types'

/**
 * Groups related items together semantically. Pair with `DropdownMenuLabel`.
 */
const DropdownMenuGroup: FC<DropdownMenuGroupProps> = memo((props) => (
    <DropdownMenuGroupProvider value={true}>
        <BaseMenu.Group {...props} />
    </DropdownMenuGroupProvider>
))

DropdownMenuGroup.displayName = 'DropdownMenu.Group'

export default DropdownMenuGroup
