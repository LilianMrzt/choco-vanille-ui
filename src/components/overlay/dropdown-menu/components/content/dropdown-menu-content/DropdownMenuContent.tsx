import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import { dropdownMenuContentClass } from '@components/overlay/dropdown-menu/components/content/dropdown-menu-content/DropdownMenuContent.css.ts'
import type { DropdownMenuContentProps } from '@components/overlay/dropdown-menu/components/content/dropdown-menu-content/types/DropdownMenuContent.props.ts'

/**
 * The panel that pops out from the trigger.
 * Rendered inside a portal by default for correct stacking.
 */
const DropdownMenuContent = ({
    className,
    side = 'bottom',
    align = 'start',
    sideOffset = 6,
    ...props
}: DropdownMenuContentProps) => (
    <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content
            side={side}
            align={align}
            sideOffset={sideOffset}
            className={cn(dropdownMenuContentClass, className)}
            {...props}
        />
    </RadixDropdownMenu.Portal>
)

DropdownMenuContent.displayName = 'DropdownMenuContent'

export default DropdownMenuContent
