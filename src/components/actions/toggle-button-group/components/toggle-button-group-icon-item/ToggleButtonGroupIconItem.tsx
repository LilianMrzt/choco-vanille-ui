import { Toggle as BaseToggle } from '@base-ui/react/toggle'

import { BUTTON_SIZES } from '@components/actions/_shared/buttons/constants'
import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'
import { buttonSizeToIconSize } from '@components/actions/toggle-button/constants'
import { TOGGLE_BUTTON_GROUP_ICON_ITEM_STYLES } from '@components/actions/toggle-button-group/components/toggle-button-group-icon-item/styles/ToggleButtonGroupIconItem.css.ts'
import type { ToggleButtonGroupIconItemProps } from '@components/actions/toggle-button-group/components/toggle-button-group-icon-item/types/ToggleButtonGroupIconItem.props.ts'
import { Icon } from '@components/foundation/icon'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

/**
 * A single icon-only toggle button inside a `ToggleButtonGroup`.
 * Renders a square button whose visual style is designed to sit inside the group
 * rather than to be used on its own.
 *
 * @example
 * ```tsx
 * <ToggleButtonGroup value={value} onValueChange={setValue}>
 *   <ToggleButtonGroup.IconItem value="bold" icon="lucide:bold" aria-label="Bold" />
 *   <ToggleButtonGroup.IconItem value="italic" icon="lucide:italic" aria-label="Italic" />
 * </ToggleButtonGroup>
 * ```
 */
const ToggleButtonGroupIconItem: FC<ToggleButtonGroupIconItemProps> = ({
    color,
    size = BUTTON_SIZES.md,
    radius,
    className,
    icon,
    ref,
    ...props
}) => {
    const iconSize = buttonSizeToIconSize[size]

    return (
        <BaseToggle
            ref={ref}
            className={cn(
                TOGGLE_BUTTON_GROUP_ICON_ITEM_STYLES.recipe({ color, size, radius }),
                className,
            )}
            {...props}
        >
            <Icon
                icon={icon}
                size={iconSize}
                className={BUTTON_SHARED_STYLES.icon}
            />
        </BaseToggle>
    )
}

ToggleButtonGroupIconItem.displayName = 'ToggleButtonGroup.IconItem'

export default ToggleButtonGroupIconItem
