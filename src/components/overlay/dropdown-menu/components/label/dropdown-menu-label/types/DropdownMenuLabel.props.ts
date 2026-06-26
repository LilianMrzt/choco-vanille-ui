import type * as React from 'react'
import type * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

export type DropdownMenuLabelProps = Omit<React.ComponentPropsWithoutRef<typeof RadixDropdownMenu.Label>, 'children'> & {
    /** Text label of the section heading. */
    label: string
}
