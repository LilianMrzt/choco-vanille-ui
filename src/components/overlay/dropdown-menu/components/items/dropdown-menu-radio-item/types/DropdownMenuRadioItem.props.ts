import type * as React from 'react'
import type * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

export type DropdownMenuRadioItemProps = Omit<React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.RadioItem>, 'children'> & {
    /** Text label of the item. */
    label: string
}
