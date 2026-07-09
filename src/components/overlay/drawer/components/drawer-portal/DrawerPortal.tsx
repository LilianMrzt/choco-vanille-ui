import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { type FC } from 'react'

import { DRAWER_STYLES } from '@components/overlay/drawer/styles/Drawer.css.ts'
import { DRAWER_PORTAL_STYLES } from '@components/overlay/drawer/components/drawer-portal/styles/DrawerPortal.css.ts'
import type { DrawerPortalProps } from '@components/overlay/drawer/components/drawer-portal/types/DrawerPortal.props.ts'
import { cn } from '@utils/cn.ts'

/**
 * Portal drawer renderer.
 *
 * Renders the drawer through a React portal using `@base-ui/react/dialog`,
 * with an optional backdrop and modal focus trap.
 */
const DrawerPortal: FC<DrawerPortalProps> = ({
    open,
    onOpenChange,
    position,
    size,
    withBackdrop = true,
    modal = true,
    accessibleName,
    ariaLabelledBy,
    children,
    className,
    ...props
}) => {
    const panelClassName = cn(
        DRAWER_STYLES.panel,
        DRAWER_PORTAL_STYLES.panel,
        position === 'right' ? DRAWER_PORTAL_STYLES.right : DRAWER_PORTAL_STYLES.left,
        DRAWER_STYLES.size[size],
        className,
    )

    return (
        <BaseDialog.Root
            open={open}
            onOpenChange={onOpenChange}
            modal={modal}
        >
            <BaseDialog.Portal>
                {withBackdrop && (
                    <BaseDialog.Backdrop className={DRAWER_PORTAL_STYLES.backdrop} />
                )}
                <BaseDialog.Popup
                    className={panelClassName}
                    aria-label={accessibleName}
                    aria-labelledby={ariaLabelledBy}
                    {...props}
                >
                    {children}
                </BaseDialog.Popup>
            </BaseDialog.Portal>
        </BaseDialog.Root>
    )
}

DrawerPortal.displayName = 'Drawer.Portal'

export default DrawerPortal
