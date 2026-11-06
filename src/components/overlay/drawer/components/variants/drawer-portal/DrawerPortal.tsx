import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { memo, type FC, useMemo } from 'react'

import { DRAWER_STYLES } from '@components/overlay/drawer/Drawer.css.ts'
import { DRAWER_PORTAL_STYLES } from '@components/overlay/drawer/components/variants/drawer-portal/DrawerPortal.css.ts'
import type { DrawerPortalProps } from '@components/overlay/drawer/components/variants/drawer-portal/types'
import { cn } from '@utils/cn.ts'

/**
 * Portal drawer renderer.
 *
 * Renders the drawer through a React portal using `@base-ui/react/dialog`,
 * with an optional backdrop and modal focus trap.
 */
const DrawerPortal: FC<DrawerPortalProps> = memo(({
    open,
    onOpenChange,
    position,
    size,
    withBackdrop = true,
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
        DRAWER_PORTAL_STYLES.panel,
        position === 'right'
            ? DRAWER_PORTAL_STYLES.right
            : DRAWER_PORTAL_STYLES.left,
        DRAWER_STYLES.size[size],
        backgroundClassName,
        className,
    )

    return (
        <BaseDialog.Root
            open={open}
            onOpenChange={onOpenChange}
            modal
        >
            <BaseDialog.Portal>
                {withBackdrop && (
                    <BaseDialog.Backdrop className={DRAWER_PORTAL_STYLES.backdrop} />
                )}
                <BaseDialog.Popup
                    className={panelClassName}
                    style={style}
                    aria-label={accessibleName}
                    aria-labelledby={ariaLabelledBy}
                    {...props}
                >
                    {children}
                </BaseDialog.Popup>
            </BaseDialog.Portal>
        </BaseDialog.Root>
    )
})

DrawerPortal.displayName = 'Drawer.Portal'

export default DrawerPortal
