import { Menu as BaseMenu } from '@base-ui/react/menu'
import { memo } from 'react'

import DropdownMenuContent from '@components/overlay/dropdown-menu/components/content/DropdownMenuContent.tsx'
import DropdownMenuGroup from '@components/overlay/dropdown-menu/components/groups/dropdown-menu-group/DropdownMenuGroup.tsx'
import DropdownMenuRadioGroup from '@components/overlay/dropdown-menu/components/groups/dropdown-menu-radio-group/DropdownMenuRadioGroup.tsx'
import DropdownMenuCheckboxItem from '@components/overlay/dropdown-menu/components/items/dropdown-menu-checkbox-item/DropdownMenuCheckboxItem.tsx'
import DropdownMenuItem from '@components/overlay/dropdown-menu/components/items/dropdown-menu-item/DropdownMenuItem.tsx'
import DropdownMenuRadioItem from '@components/overlay/dropdown-menu/components/items/dropdown-menu-radio-item/DropdownMenuRadioItem.tsx'
import DropdownMenuLabel from '@components/overlay/dropdown-menu/components/label/DropdownMenuLabel.tsx'
import DropdownMenuSeparator from '@components/overlay/dropdown-menu/components/separator/DropdownMenuSeparator.tsx'
import DropdownMenuShortcut from '@components/overlay/dropdown-menu/components/shortcut/DropdownMenuShortcut.tsx'
import DropdownMenuSubContent from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-content/DropdownMenuSubContent.tsx'
import DropdownMenuSub from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub/DropdownMenuSub.tsx'
import DropdownMenuSubTrigger from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-trigger/DropdownMenuSubTrigger.tsx'
import DropdownMenuTrigger from '@components/overlay/dropdown-menu/components/trigger/DropdownMenuTrigger.tsx'
import type { DropdownMenuProps } from '@components/overlay/dropdown-menu/types'

/**
 * The root wrapper that manages open/close state.
 * Accepts `open`, `onOpenChange`, `defaultOpen` and `modal` from Base UI Menu.
 */
const DropdownMenuRoot = memo<DropdownMenuProps>((props) => (
    <BaseMenu.Root {...props} />
))

DropdownMenuRoot.displayName = 'DropdownMenu'

/** Dropdown menu root with its item and submenu slots. */
const DropdownMenu = Object.assign(DropdownMenuRoot, {
    Trigger: DropdownMenuTrigger,
    Content: DropdownMenuContent,
    Group: DropdownMenuGroup,
    RadioGroup: DropdownMenuRadioGroup,
    Item: DropdownMenuItem,
    CheckboxItem: DropdownMenuCheckboxItem,
    RadioItem: DropdownMenuRadioItem,
    Label: DropdownMenuLabel,
    Separator: DropdownMenuSeparator,
    Shortcut: DropdownMenuShortcut,
    Sub: DropdownMenuSub,
    SubTrigger: DropdownMenuSubTrigger,
    SubContent: DropdownMenuSubContent,
})

export default DropdownMenu
