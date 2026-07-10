import type { FC } from 'react'

import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { DRAWER_ITEM_CONTENT_STYLES } from '@components/overlay/drawer/components/items/_shared/components/drawer-item-content/styles/DrawerItemContent.css.ts'
import { useDrawerItemAttributes } from '@components/overlay/drawer/components/items/_shared/hooks/use-drawer-item-attributes/useDrawerItemAttributes.hook.ts'
import type { DrawerItemContentProps } from '@components/overlay/drawer/components/items/_shared/components/drawer-item-content/types/DrawerItemContent.props.ts'

/**
 * Shared inner content of a drawer item row.
 *
 * Renders the start icon, label and an optional trailing icon (or custom
 * trailing content). Used by `DrawerActionItem`, `DrawerNavItem` and
 * `DrawerSectionItem` to keep their markup consistent.
 */
const DrawerItemContent: FC<DrawerItemContentProps> = ({
    label,
    startIcon,
    endIcon,
    size = 'md',
    iconSize,
    trailing,
}) => {
    const { state, resolvedIconSize } = useDrawerItemAttributes(size, iconSize)

    return (
        <>
            <Icon
                icon={startIcon}
                size={resolvedIconSize}
                className={DRAWER_ITEM_CONTENT_STYLES.icon}
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
            {trailing ??
                (endIcon && (
                    <Icon
                        icon={endIcon}
                        size={resolvedIconSize}
                        className={DRAWER_ITEM_CONTENT_STYLES.endIcon}
                        data-state={state}
                    />
                ))}
        </>
    )
}

DrawerItemContent.displayName = 'DrawerItemContent'

export default DrawerItemContent
