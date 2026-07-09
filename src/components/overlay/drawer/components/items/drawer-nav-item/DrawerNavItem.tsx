import { type FC } from 'react'

import { useDrawerNavItem } from '@components/overlay/drawer/components/items/drawer-nav-item/hooks/useDrawerNavItem.hook.ts'
import type { DrawerNavItemProps } from '@components/overlay/drawer/components/items/drawer-nav-item/types/DrawerNavItem.props.ts'
import { DrawerItemContent } from '@components/overlay/drawer/components/items/_shared'
import { cn } from '@utils/cn.ts'
import { DRAWER_NAV_ITEM_STYLES } from '@components/overlay/drawer/components/items/drawer-nav-item/styles/DrawerNavItem.css.ts'

/**
 * A navigation row rendered inside a `Drawer`.
 *
 * Behaves like a link, supports icons, an active state and graceful close
 * animation when the drawer is dismissed.
 */
const DrawerNavItem: FC<DrawerNavItemProps> = ({
    label,
    href = '#',
    startIcon,
    endIcon,
    active,
    disabled,
    size = 'md',
    variant = 'default',
    iconSize,
    className,
    style,
    onClick,
    ref,
    ...props
}) => {
    const { linkAttributes, handleClick } = useDrawerNavItem({
        active,
        disabled,
        size,
        iconSize,
        onClick,
    })

    return (
        <a
            ref={ref}
            href={href}
            className={cn(
                DRAWER_NAV_ITEM_STYLES.recipe({ size, variant }),
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
                endIcon={endIcon}
                size={size}
                iconSize={iconSize}
            />
        </a>
    )
}

DrawerNavItem.displayName = 'Drawer.NavItem'

export default DrawerNavItem
