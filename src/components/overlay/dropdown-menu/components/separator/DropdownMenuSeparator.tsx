import { Separator as BaseSeparator } from '@base-ui/react/separator'

import { cn } from '@utils/cn.ts'
import { DROPDOWN_MENU_SEPARATOR_STYLES } from '@components/overlay/dropdown-menu/components/separator/styles/DropdownMenuSeparator.css.ts'
import type { DropdownMenuSeparatorProps } from '@components/overlay/dropdown-menu/components/separator/types/DropdownMenuSeparator.props.ts'

/**
 * A thin horizontal rule used to visually divide groups of items.
 */
const DropdownMenuSeparator = ({ className, ...props }: DropdownMenuSeparatorProps) => (
    <BaseSeparator
        className={cn(DROPDOWN_MENU_SEPARATOR_STYLES.root, className)}
        {...props}
    />
)

DropdownMenuSeparator.displayName = 'DropdownMenu.Separator'

export default DropdownMenuSeparator
