import { memo, type FC } from 'react'

import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { useDrawerItemAttributes } from '@components/overlay/drawer/components/items/_shared/hooks/use-drawer-item-attributes/useDrawerItemAttributes.hook.ts'
import type { DrawerItemContentProps } from '@components/overlay/drawer/components/items/_shared/components/drawer-item-content/types/DrawerItemContent.props.ts'
import { RotatingChevron } from '@components/_common/rotating-chevron'

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
    endChevronIcon,
    expanded,
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
            {trailing}
            {endChevronIcon && (
                <RotatingChevron
                    expanded={expanded ?? false}
                    size={resolvedIconSize}
                    data-state={state}
                />
            )}
        </>
    )
})

DrawerItemContent.displayName = 'DrawerItemContent'

export default DrawerItemContent
