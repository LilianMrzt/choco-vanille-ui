import type * as React from 'react'
import type * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

export type DropdownMenuCheckboxItemProps = Omit<React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.CheckboxItem>, 'children'> & {
    /** Text label of the item. */
    label: string
}
