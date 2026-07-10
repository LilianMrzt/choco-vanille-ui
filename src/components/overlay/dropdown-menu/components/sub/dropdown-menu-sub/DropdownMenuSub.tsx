import { Menu as BaseMenu } from '@base-ui/react/menu'
import { memo, type FC } from 'react'

import type { DropdownMenuSubProps } from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub/types/DropdownMenuSub.props.ts'

/**
 * Wraps a nested sub-menu.
 * Use with `DropdownMenuSubTrigger` and `DropdownMenuSubContent`.
 */
const DropdownMenuSub: FC<DropdownMenuSubProps> = memo((props) => (
    <BaseMenu.SubmenuRoot {...props} />
))

DropdownMenuSub.displayName = 'DropdownMenu.Sub'

export default DropdownMenuSub
