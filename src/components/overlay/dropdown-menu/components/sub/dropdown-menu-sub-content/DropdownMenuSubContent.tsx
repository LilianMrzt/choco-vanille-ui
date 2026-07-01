import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import { DROPDOWN_MENU_SUB_CONTENT_STYLES } from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-content/DropdownMenuSubContent.css.ts'
import type { DropdownMenuSubContentProps } from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-content/types/DropdownMenuSubContent.props.ts'
import { useViewportShift } from '@hooks'

/**
 * The panel that appears for a nested sub-menu.
 * Rendered in a portal for correct stacking.
 *
 * Same viewport-shift strategy as DropdownMenuContent:
 * Radix's side-flipping is disabled and replaced by an offset correction.
 */
const DropdownMenuSubContent = ({ className, collisionPadding = 8, ...props }: DropdownMenuSubContentProps) => {
    const contentRef = useViewportShift(collisionPadding)

    return (
        <RadixDropdownMenu.Portal>
            <RadixDropdownMenu.SubContent
                ref={contentRef}
                sideOffset={6}
                className={cn(DROPDOWN_MENU_SUB_CONTENT_STYLES.root, className)}
                {...props}
                // Disable Radix's flip/shift — our hook handles collision instead.
                avoidCollisions={false}
            />
        </RadixDropdownMenu.Portal>
    )
}

DropdownMenuSubContent.displayName = 'DropdownMenuSubContent'

export default DropdownMenuSubContent
