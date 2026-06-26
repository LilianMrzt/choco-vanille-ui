import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import { dropdownMenuSeparatorClass } from '@components/overlay/dropdown-menu/DropdownMenu.css.ts'
import type { DropdownMenuSeparatorProps } from '@components/overlay/dropdown-menu/components/separator/dropdown-menu-separator/types/DropdownMenuSeparator.props.ts'

/**
 * A thin horizontal rule used to visually divide groups of items.
 */
const DropdownMenuSeparator = ({ className, ...props }: DropdownMenuSeparatorProps) => (
    <RadixDropdownMenu.Separator
        className={cn(dropdownMenuSeparatorClass, className)}
        {...props}
    />
)

DropdownMenuSeparator.displayName = 'DropdownMenuSeparator'

export default DropdownMenuSeparator
