import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import { dropdownMenuSubContentClass } from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-content/DropdownMenuSubContent.css.ts'
import type { DropdownMenuSubContentProps } from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-content/types/DropdownMenuSubContent.props.ts'

/**
 * The panel that appears for a nested sub-menu.
 * Rendered in a portal for correct stacking.
 */
const DropdownMenuSubContent = ({ className, ...props }: DropdownMenuSubContentProps) => (
    <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.SubContent
            sideOffset={6}
            className={cn(dropdownMenuSubContentClass, className)}
            {...props}
        />
    </RadixDropdownMenu.Portal>
)

DropdownMenuSubContent.displayName = 'DropdownMenuSubContent'

export default DropdownMenuSubContent
