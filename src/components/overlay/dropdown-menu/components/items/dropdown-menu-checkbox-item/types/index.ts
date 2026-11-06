import type { Menu } from '@base-ui/react/menu'

export type DropdownMenuCheckboxItemProps = Omit<Menu.CheckboxItem.Props, 'children'> & {
    /** Text label of the item. */
    label: string
}
