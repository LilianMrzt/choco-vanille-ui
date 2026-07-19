import { memo, type FC, useMemo } from 'react'

import { Box } from '@components/layout/box'
import { DRAWER_STYLES } from '@components/overlay/drawer/styles/Drawer.css.ts'
import { DRAWER_INLINE_STYLES } from '@components/overlay/drawer/components/variants/drawer-inline/styles/DrawerInline.css.ts'
import type { DrawerInlineProps } from '@components/overlay/drawer/components/variants/drawer-inline/types/DrawerInline.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * Inline drawer renderer.
 *
 * Renders the drawer as a layout element that takes space when open
 * and collapses to `width: 0` when closed.
 */
const DrawerInline: FC<DrawerInlineProps> = memo(({
    open,
    size,
    sizeWidthMap,
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
        DRAWER_INLINE_STYLES.panel,
        !open && DRAWER_INLINE_STYLES.closed,
        DRAWER_STYLES.size[size],
        backgroundClassName,
        className,
    )

    return (
        <Box
            className={panelClassName}
            style={{ width: open ? sizeWidthMap[size] : 0, ...style }}
            aria-label={accessibleName}
            aria-labelledby={ariaLabelledBy}
            aria-hidden={!open}
            inert={!open}
            {...props}
        >
            {children}
        </Box>
    )
})

DrawerInline.displayName = 'Drawer.Inline'

export default DrawerInline
