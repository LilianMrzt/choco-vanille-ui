import { Toggle as BaseToggle } from '@base-ui/react/toggle'

import { BUTTON_SIZES } from '@components/actions/_shared/buttons/constants'
import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'
import { buttonSizeToIconSize, TOGGLE_BUTTON_SIZE_TO_FONT_SIZE } from '@components/actions/toggle-button/constants'
import { TOGGLE_BUTTON_GROUP_ITEM_STYLES } from '@components/actions/toggle-button-group/components/toggle-button-group-item/styles/ToggleButtonGroupItem.css.ts'
import type { ToggleButtonGroupItemProps } from '@components/actions/toggle-button-group/components/toggle-button-group-item/types/ToggleButtonGroupItem.props.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

/**
 * A single toggle button inside a `ToggleButtonGroup`.
 * Renders a button whose visual style is designed to sit inside the group
 * rather than to be used on its own.
 *
 * @example
 * ```tsx
 * <ToggleButtonGroup value={value} onValueChange={setValue}>
 *   <ToggleButtonGroup.Item value="bold" label="Bold" />
 *   <ToggleButtonGroup.Item value="italic" label="Italic" />
 * </ToggleButtonGroup>
 * ```
 */
const ToggleButtonGroupItem: FC<ToggleButtonGroupItemProps> = ({
    color,
    size = BUTTON_SIZES.md,
    className,
    label,
    startIcon,
    endIcon,
    ref,
    ...props
}) => {
    const iconSize = buttonSizeToIconSize[size]
    const fontSize = TOGGLE_BUTTON_SIZE_TO_FONT_SIZE[size]

    return (
        <BaseToggle
            ref={ref}
            className={cn(TOGGLE_BUTTON_GROUP_ITEM_STYLES.recipe({ color, size }), className)}
            {...props}
        >
            {startIcon && (
                <Icon
                    icon={startIcon}
                    size={iconSize}
                    className={BUTTON_SHARED_STYLES.icon}
                />
            )}
            {label && (
                <Typography
                    as={'span'}
                    fontSize={fontSize}
                    fontWeight={'medium'}
                >
                    {label}
                </Typography>
            )}
            {endIcon && (
                <Icon
                    icon={endIcon}
                    size={iconSize}
                    className={BUTTON_SHARED_STYLES.icon}
                />
            )}
        </BaseToggle>
    )
}

ToggleButtonGroupItem.displayName = 'ToggleButtonGroup.Item'

export default ToggleButtonGroupItem
