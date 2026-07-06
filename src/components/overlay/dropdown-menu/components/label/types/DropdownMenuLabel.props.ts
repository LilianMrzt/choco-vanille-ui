import type { Menu } from '@base-ui/react/menu'

export type DropdownMenuLabelProps = Omit<Menu.GroupLabel.Props, 'children'> & {
    /** Text label of the section heading. */
    label: string
}
