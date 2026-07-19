import { memo, type FC, useMemo } from 'react'

import { Box } from '@components/layout/box'
import { DRAWER_STYLES } from '@components/overlay/drawer/styles/Drawer.css.ts'
import { cn } from '@utils/cn.ts'
import type {
    DrawerMiniProps
} from '@components/overlay/drawer/components/variants/drawer-mini/types/DrawerMini.props.ts'
import { DRAWER_MINI_STYLES } from '@components/overlay/drawer/components/variants/drawer-mini/styles/DrawerMini.css.ts'
import { COLLAPSED_WIDTH } from '@components/overlay/drawer/components/variants/drawer-mini/constants'

/**
 * Mini drawer renderer.
 *
 * Renders the drawer as a layout element that stays visible when closed,
 * collapsing to a narrower width instead of disappearing completely.
 */
const DrawerMini: FC<DrawerMiniProps> = memo(({
    open,
    size,
    sizeWidthMap,
    collapsedWidth = COLLAPSED_WIDTH,
    backgroundColor,
    accessibleName,
    ariaLabelledBy,
    children,
    className,
    style,
    ...props
}) => {
    const backgroundClassName = useMemo(
        () =>
            backgroundColor ? DRAWER_STYLES.recipe({ backgroundColor }) : undefined,
        [backgroundColor],
    )

    const panelClassName = cn(
        DRAWER_STYLES.panel,
        DRAWER_MINI_STYLES.panel,
        !open && DRAWER_MINI_STYLES.closed,
        DRAWER_STYLES.size[size],
        backgroundClassName,
        className,
    )

    return (
        <Box
            className={panelClassName}
            style={{ width: open ? sizeWidthMap[size] : collapsedWidth, ...style }}
            aria-label={accessibleName}
            aria-labelledby={ariaLabelledBy}
            {...props}
        >
            {children}
        </Box>
    )
})

DrawerMini.displayName = 'Drawer.Mini'

export default DrawerMini
