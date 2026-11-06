import { memo, type FC } from 'react'

import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { useDrawerItemAttributes } from '@components/overlay/drawer/components/items/_shared/hooks/use-drawer-item-attributes/useDrawerItemAttributes.hook.ts'
import type { DrawerItemContentProps } from '@components/overlay/drawer/components/items/_shared/components/drawer-item-content/types'
import { RotatingChevron } from '@components/_common/rotating-chevron'
import { DRAWER_ITEM_STYLES } from '@components/overlay/drawer/components/items/_shared/DrawerItemShared.css.ts'

/**
 * Shared inner content of a drawer item row.
 *
 * Renders the start icon, label, optional trailing content and an optional
 * end icon. Used by `DrawerActionItem`, `DrawerNavItem` and
 * `DrawerSectionItem` to keep their markup consistent.
 */
const DrawerItemContent: FC<DrawerItemContentProps> = memo(({
    label,
    startIcon,
    endIcon,
    endChevronIcon,
    expanded,
    iconSize,
    trailing,
}) => {
    const { state, resolvedIconSize } = useDrawerItemAttributes(iconSize)

    return (
        <>
            <Icon
                icon={startIcon}
                size={resolvedIconSize}
            />
            <span
                className={DRAWER_ITEM_STYLES.content}
                data-state={state}
                aria-hidden={state === 'closed'}
            >
                <Typography
                    variant={'span'}
                    width={'100%'}
                    maxLines={1}
                    minWidth={0}
                    ellipsis={true}
                    maxWidth={'100%'}
                >
                    {label}
                </Typography>
                {trailing}
                {endIcon && (
                    <Icon
                        icon={endIcon}
                        size={resolvedIconSize}
                    />
                )}
                {endChevronIcon && (
                    <RotatingChevron
                        expanded={expanded ?? false}
                        size={resolvedIconSize}
                    />
                )}
            </span>
        </>
    )
})

DrawerItemContent.displayName = 'DrawerItemContent'

export default DrawerItemContent
