import { type FC } from 'react'

import { DRAWER_STYLES } from '@components/overlay/drawer/styles/Drawer.css.ts'
import { DRAWER_INLINE_STYLES } from '@components/overlay/drawer/components/drawer-inline/styles/DrawerInline.css.ts'
import type { DrawerInlineProps } from '@components/overlay/drawer/components/drawer-inline/types/DrawerInline.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * Inline drawer renderer.
 *
 * Renders the drawer as a layout element that takes space when open
 * and collapses to `width: 0` when closed.
 */
const DrawerInline: FC<DrawerInlineProps> = ({
    open,
    position,
    size,
    sizeWidthMap,
    accessibleName,
    ariaLabelledBy,
    children,
    className,
    style,
    ...props
}) => {
    const panelClassName = cn(
        DRAWER_STYLES.panel,
        DRAWER_INLINE_STYLES.panel,
        position === 'right' ? DRAWER_INLINE_STYLES.right : DRAWER_INLINE_STYLES.left,
        !open && DRAWER_INLINE_STYLES.closed,
        DRAWER_STYLES.size[size],
        className,
    )

    const panelStyle = {
        width: open ? sizeWidthMap[size] : 0,
        ...style,
    }

    return (
        <div
            className={panelClassName}
            style={panelStyle}
            aria-label={accessibleName}
            aria-labelledby={ariaLabelledBy}
            {...props}
        >
            {children}
        </div>
    )
}

DrawerInline.displayName = 'Drawer.Inline'

export default DrawerInline
