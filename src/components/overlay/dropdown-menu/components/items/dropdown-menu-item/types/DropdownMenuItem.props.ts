import type { Menu } from '@base-ui/react/menu'

export type DropdownMenuItemProps = Omit<Menu.Item.Props, 'children'> & {
    /** Text label of the item. */
    label: string
    /** Renders the item with a destructive (danger) visual style. */
    destructive?: boolean
    /** Iconify icon identifier rendered on the left side of the item. */
    startIcon?: string
    /** Iconify icon identifier rendered on the right side of the item. */
    endIcon?: string
    /** Keyboard shortcut hint rendered on the right. */
    shortcut?: string
}
