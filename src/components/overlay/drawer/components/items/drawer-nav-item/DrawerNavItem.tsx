import { memo, type FC } from 'react'

import { useDrawerNavItem } from '@components/overlay/drawer/components/items/drawer-nav-item/hooks/use-drawer-nav-item/useDrawerNavItem.hook.ts'
import type { DrawerNavItemProps } from '@components/overlay/drawer/components/items/drawer-nav-item/types/DrawerNavItem.props.ts'
import { DRAWER_ITEM_STYLES, DrawerItemContent } from '@components/overlay/drawer/components/items/_shared'
import { cn } from '@utils/cn.ts'
import { useTransitionRender } from '@hooks/use-transition-render/useTransitionRender.hook.ts'
import { vars } from '@theme/contract.css.ts'

/**
 * A navigation row rendered inside a `Drawer`.
 *
 * Behaves like a link, supports icons, an active state and graceful close
 * animation when the drawer is dismissed.
 */
const DrawerNavItem: FC<DrawerNavItemProps> = memo(({
    label,
    href = '#',
    startIcon,
    trailing,
    active,
    disabled,
    variant = 'default',
    color = 'primary',
    iconSize,
    className,
    style,
    onClick,
    ref,
    ...props
}) => {
    const { open, linkAttributes, handleClick } = useDrawerNavItem({
        active,
        disabled,
        iconSize,
        onClick,
    })
    const { shouldRenderContent } = useTransitionRender(open, vars.duration.normal)

    return (
        <a
            ref={ref}
            href={href}
            aria-label={shouldRenderContent ? undefined : label}
            className={cn(
                DRAWER_ITEM_STYLES.recipe({ variant, color }),
                className,
            )}
            style={style}
            onClick={handleClick}
            {...linkAttributes}
            {...props}
        >
            <DrawerItemContent
                label={label}
                startIcon={startIcon}
                trailing={trailing}
                iconSize={iconSize}
                renderContent={shouldRenderContent}
            />
        </a>
    )
})

DrawerNavItem.displayName = 'Drawer.NavItem'

export default DrawerNavItem
