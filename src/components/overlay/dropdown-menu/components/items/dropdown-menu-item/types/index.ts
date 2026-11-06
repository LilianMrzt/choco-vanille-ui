import type { Menu } from '@base-ui/react/menu'
import type { IconComponent } from '@components/foundation/icon'

export type DropdownMenuItemProps = Omit<Menu.Item.Props, 'children'> & {
    /** Text label of the item. */
    label: string
    /** Marks the item as the currently selected option. */
    active?: boolean
    /** Renders the item with a destructive (danger) visual style. */
    destructive?: boolean
    /** Iconify icon identifier rendered on the left side of the item. */
    startIcon?: IconComponent
    /** Iconify icon identifier rendered on the right side of the item. */
    endIcon?: IconComponent
    /** Keyboard shortcut hint rendered on the right. */
    shortcut?: string
}
