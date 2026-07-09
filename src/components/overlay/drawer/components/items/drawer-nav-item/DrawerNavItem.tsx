import { useMemo, type FC, type MouseEvent } from 'react'

import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import {
    DRAWER_ITEM_SIZE_TO_ICON_SIZE,
    DRAWER_ITEM_STYLES,
    useDrawerItemState,
} from '@components/overlay/drawer/components/items/drawer-item'
import type { DrawerNavItemProps } from '@components/overlay/drawer/components/items/drawer-nav-item/types/DrawerNavItem.props.ts'
import { cn } from '@utils/cn.ts'

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
    iconSize,
    className,
    style,
    onClick,
    ref,
    ...props
}) => {
    const { open, mode, position } = useDrawerItemState()
    const resolvedIconSize = iconSize ?? DRAWER_ITEM_SIZE_TO_ICON_SIZE[size]
    const state = open ? 'open' : 'closed'

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (onClick) {
            event.preventDefault()
            onClick(event)
        }
    }

    const itemAttributes = useMemo(
        () => ({
            'data-state': state,
            'data-mode': mode,
            'data-position': position,
            'data-active': active ? 'true' : undefined,
            'aria-disabled': disabled || undefined,
            'aria-current': active ? ('page' as const) : undefined,
        }),
        [state, mode, position, active, disabled],
    )

    return (
        <a
            ref={ref}
            href={href}
            className={cn(DRAWER_ITEM_STYLES.recipe({ size }), className)}
            style={style}
            onClick={handleClick}
            {...itemAttributes}
            {...props}
        >
            <Icon
                icon={startIcon}
                size={resolvedIconSize}
                className={DRAWER_ITEM_STYLES.icon}
            />
            <Typography
                variant={'span'}
                className={DRAWER_ITEM_STYLES.label}
                data-state={state}
            >
                {label}
            </Typography>
            {endIcon && (
                <Icon
                    icon={endIcon}
                    size={resolvedIconSize}
                    className={DRAWER_ITEM_STYLES.endIcon}
                    data-state={state}
                />
            )}
        </a>
    )
}

DrawerNavItem.displayName = 'Drawer.NavItem'

export default DrawerNavItem
