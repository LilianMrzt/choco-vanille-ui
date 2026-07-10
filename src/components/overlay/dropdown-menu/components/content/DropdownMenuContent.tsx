import { Menu as BaseMenu } from '@base-ui/react/menu'
import { memo, type CSSProperties, type FC } from 'react'

import { cn } from '@utils/cn.ts'
import { DROPDOWN_MENU_CONTENT_STYLES } from '@components/overlay/dropdown-menu/components/content/styles/DropdownMenuContent.css.ts'
import type { DropdownMenuContentProps } from '@components/overlay/dropdown-menu/components/content/types/DropdownMenuContent.props.ts'
import { useViewportShift } from '@hooks'

/**
 * The panel that pops out from the trigger.
 * Rendered inside a portal by default for correct stacking.
 *
 * Base UI's built-in collision handling is disabled here: it would flip the menu
 * to the opposite side when space is tight, which is jarring.
 * Instead, `useViewportShift` detects any overflow after positioning and
 * shifts the panel inward by exactly the overflowing amount — keeping the
 * original side and never cropping the menu.
 */
const DropdownMenuContent: FC<DropdownMenuContentProps> = memo(({
    className,
    side = 'bottom',
    align = 'start',
    sideOffset = 6,
    collisionPadding = 8,
    width = '14rem',
    style,
    ...props
}) => {
    const contentRef = useViewportShift(collisionPadding)

    return (
        <BaseMenu.Portal>
            <BaseMenu.Positioner
                side={side}
                align={align}
                sideOffset={sideOffset}
                // Disable Base UI's flip/shift — our hook handles collision instead.
                collisionAvoidance={{ side: 'none', align: 'none' }}
                {...props}
            >
                <BaseMenu.Popup
                    ref={contentRef}
                    className={cn(DROPDOWN_MENU_CONTENT_STYLES.root, className)}
                    style={{ width, flexGrow: '0', flexShrink: '0', ...style } as CSSProperties}
                >
                    {props.children}
                </BaseMenu.Popup>
            </BaseMenu.Positioner>
        </BaseMenu.Portal>
    )
})

DropdownMenuContent.displayName = 'DropdownMenu.Content'

export default DropdownMenuContent
