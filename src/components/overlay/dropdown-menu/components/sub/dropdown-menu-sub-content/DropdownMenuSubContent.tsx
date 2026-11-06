import { Menu as BaseMenu } from '@base-ui/react/menu'
import { memo, type CSSProperties, type FC } from 'react'

import { cn } from '@utils/cn.ts'
import { DROPDOWN_MENU_SUB_CONTENT_STYLES } from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-content/DropdownMenuSubContent.css.ts'
import { DROPDOWN_MENU_CONTENT_STYLES } from '@components/overlay/dropdown-menu/components/content/DropdownMenuContent.css.ts'
import type { DropdownMenuSubContentProps } from '@components/overlay/dropdown-menu/components/sub/dropdown-menu-sub-content/types'
import { useViewportShift } from '@hooks/use-viewport-shift/useViewportShift.hook.ts'

/**
 * The panel that appears for a nested sub-menu.
 * Rendered in a portal for correct stacking.
 *
 * Same viewport-shift strategy as DropdownMenuContent:
 * Base UI's side-flipping is disabled and replaced by an offset correction.
 */
const DropdownMenuSubContent: FC<DropdownMenuSubContentProps> = memo(({
    className,
    collisionPadding = 8,
    width = '14rem',
    style,
    ...props
}) => {
    const contentRef = useViewportShift(collisionPadding)

    return (
        <BaseMenu.Portal>
            <BaseMenu.Positioner
                sideOffset={6}
                // Disable Base UI's flip/shift — our hook handles collision instead.
                collisionAvoidance={{ side: 'none', align: 'none' }}
                {...props}
                className={DROPDOWN_MENU_CONTENT_STYLES.positioner}
            >
                <BaseMenu.Popup
                    ref={contentRef}
                    className={cn(DROPDOWN_MENU_SUB_CONTENT_STYLES.root, className)}
                    style={{ width, ...style } as CSSProperties}
                >
                    {props.children}
                </BaseMenu.Popup>
            </BaseMenu.Positioner>
        </BaseMenu.Portal>
    )
})

DropdownMenuSubContent.displayName = 'DropdownMenu.SubContent'

export default DropdownMenuSubContent
