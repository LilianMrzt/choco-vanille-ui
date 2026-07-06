import type { Menu } from '@base-ui/react/menu'

export type DropdownMenuRadioItemProps = Omit<Menu.RadioItem.Props, 'children'> & {
    /** Text label of the item. */
    label: string
}
