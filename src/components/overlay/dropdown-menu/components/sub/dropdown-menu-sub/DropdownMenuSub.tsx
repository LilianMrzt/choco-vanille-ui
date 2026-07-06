import { Menu as BaseMenu } from '@base-ui/react/menu'

import type { DropdownMenuSubProps } from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub/types/DropdownMenuSub.props.ts'

/**
 * Wraps a nested sub-menu.
 * Use with `DropdownMenuSubTrigger` and `DropdownMenuSubContent`.
 */
const DropdownMenuSub = (props: DropdownMenuSubProps) => (
    <BaseMenu.SubmenuRoot {...props} />
)

DropdownMenuSub.displayName = 'DropdownMenu.Sub'

export default DropdownMenuSub
