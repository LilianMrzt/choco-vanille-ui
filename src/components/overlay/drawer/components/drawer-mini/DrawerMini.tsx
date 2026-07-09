import { type FC } from 'react'

import { DRAWER_STYLES } from '@components/overlay/drawer/styles/Drawer.css.ts'
import { DRAWER_MINI_STYLES } from '@components/overlay/drawer/components/drawer-mini/styles/DrawerMini.css.ts'
import type { DrawerMiniProps } from '@components/overlay/drawer/components/drawer-mini/types/DrawerMini.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * Mini drawer renderer.
 *
 * Renders the drawer as a layout element that stays visible in a slim
 * state when closed and expands to the requested size when open.
 */
const DrawerMini: FC<DrawerMiniProps> = ({
    open,
    position,
    size,
    collapsedSize,
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
        DRAWER_MINI_STYLES.panel,
        position === 'right' ? DRAWER_MINI_STYLES.right : DRAWER_MINI_STYLES.left,
        !open && DRAWER_MINI_STYLES.closed,
        DRAWER_STYLES.size[size],
        className,
    )

    const panelStyle = {
        width: open ? sizeWidthMap[size] : collapsedSize,
        opacity: !open ? 1 : undefined,
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

DrawerMini.displayName = 'Drawer.Mini'

export default DrawerMini
