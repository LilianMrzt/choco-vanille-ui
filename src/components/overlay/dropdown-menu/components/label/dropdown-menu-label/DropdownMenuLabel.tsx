import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import { dropdownMenuLabelClass } from '@components/overlay/dropdown-menu/DropdownMenu.css.ts'
import type { DropdownMenuLabelProps } from '@components/overlay/dropdown-menu/components/label/dropdown-menu-label/types/DropdownMenuLabel.props.ts'

/**
 * A non-interactive section heading. Pair with `DropdownMenuGroup` for
 * semantic grouping of related items.
 */
const DropdownMenuLabel = ({ className, ...props }: DropdownMenuLabelProps) => (
    <RadixDropdownMenu.Label
        className={cn(dropdownMenuLabelClass, className)}
        {...props}
    />
)

DropdownMenuLabel.displayName = 'DropdownMenuLabel'

export default DropdownMenuLabel
