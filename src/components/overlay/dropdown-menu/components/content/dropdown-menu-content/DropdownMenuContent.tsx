import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'

import { cn } from '@utils/cn.ts'
import { dropdownMenuContentClass } from '@components/overlay/dropdown-menu/components/content/dropdown-menu-content/DropdownMenuContent.css.ts'
import type { DropdownMenuContentProps } from '@components/overlay/dropdown-menu/components/content/dropdown-menu-content/types/DropdownMenuContent.props.ts'
import { useViewportShift } from '@hooks'

/**
 * The panel that pops out from the trigger.
 * Rendered inside a portal by default for correct stacking.
 *
 * Radix's built-in `avoidCollisions` is disabled here: it would flip the menu
 * to the opposite side when space is tight, which is jarring.
 * Instead, `useViewportShift` detects any overflow after positioning and
 * shifts the panel inward by exactly the overflowing amount — keeping the
 * original side and never cropping the menu.
 */
const DropdownMenuContent = ({
    className,
    side = 'bottom',
    align = 'start',
    sideOffset = 6,
    collisionPadding = 8,
    ...props
}: DropdownMenuContentProps) => {
    const contentRef = useViewportShift(collisionPadding)

    return (
        <RadixDropdownMenu.Portal>
            <RadixDropdownMenu.Content
                ref={contentRef}
                side={side}
                align={align}
                sideOffset={sideOffset}
                className={cn(dropdownMenuContentClass, className)}
                {...props}
                // Disable Radix's flip/shift — our hook handles collision instead.
                avoidCollisions={false}
            />
        </RadixDropdownMenu.Portal>
    )
}

DropdownMenuContent.displayName = 'DropdownMenuContent'

export default DropdownMenuContent
