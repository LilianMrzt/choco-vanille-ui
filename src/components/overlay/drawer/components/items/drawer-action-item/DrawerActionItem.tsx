import { useMemo, type FC } from 'react'

import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { DRAWER_ACTION_ITEM_STYLES } from '@components/overlay/drawer/components/items/drawer-action-item/DrawerActionItem.css.ts'
import type { DrawerActionItemProps } from '@components/overlay/drawer/components/items/drawer-action-item/types/DrawerActionItem.props.ts'
import {
    DRAWER_ITEM_SIZE_TO_ICON_SIZE,
    useDrawerItemState,
} from '@components/overlay/drawer/components/items/drawer-item'
import { cn } from '@utils/cn.ts'

/**
 * A button-like action row rendered inside a `Drawer`.
 *
 * Useful for actions that do not navigate, such as "Sign out" or "Toggle theme".
 */
const DrawerActionItem: FC<DrawerActionItemProps> = ({
    label,
    startIcon,
    endIcon,
    size = 'md',
    iconSize,
    disabled,
    className,
    style,
    ref,
    ...props
}) => {
    const { open, mode, position } = useDrawerItemState()
    const resolvedIconSize = iconSize ?? DRAWER_ITEM_SIZE_TO_ICON_SIZE[size]
    const state = open ? 'open' : 'closed'

    const itemAttributes = useMemo(
        () => ({
            'data-state': state,
            'data-mode': mode,
            'data-position': position,
        }),
        [state, mode, position],
    )

    return (
        <button
            ref={ref}
            type={'button'}
            disabled={disabled}
            className={cn(DRAWER_ACTION_ITEM_STYLES.recipe({ size }), className)}
            style={style}
            {...itemAttributes}
            {...props}
        >
            <Icon
                icon={startIcon}
                size={resolvedIconSize}
                className={DRAWER_ACTION_ITEM_STYLES.icon}
            />
            <Typography
                variant={'span'}
                width={'100%'}
                maxLines={1}
                minWidth={0}
                ellipsis={true}
                maxWidth={'100%'}
                data-state={state}
            >
                {label}
            </Typography>
            {endIcon && (
                <Icon
                    icon={endIcon}
                    size={resolvedIconSize}
                    className={DRAWER_ACTION_ITEM_STYLES.endIcon}
                    data-state={state}
                />
            )}
        </button>
    )
}

DrawerActionItem.displayName = 'Drawer.ActionItem'

export default DrawerActionItem
