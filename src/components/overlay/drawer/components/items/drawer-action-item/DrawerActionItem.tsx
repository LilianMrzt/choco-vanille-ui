import type { FC } from 'react'

import { DRAWER_ACTION_ITEM_STYLES } from '@components/overlay/drawer/components/items/drawer-action-item/styles/DrawerActionItem.css.ts'
import type { DrawerActionItemProps } from '@components/overlay/drawer/components/items/drawer-action-item/types/DrawerActionItem.props.ts'
import {
    DrawerItemContent,
    useDrawerItemAttributes,
} from '@components/overlay/drawer/components/items/_shared'
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
    const { itemAttributes } = useDrawerItemAttributes(size, iconSize)

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
            <DrawerItemContent
                label={label}
                startIcon={startIcon}
                endIcon={endIcon}
                size={size}
                iconSize={iconSize}
            />
        </button>
    )
}

DrawerActionItem.displayName = 'Drawer.ActionItem'

export default DrawerActionItem
