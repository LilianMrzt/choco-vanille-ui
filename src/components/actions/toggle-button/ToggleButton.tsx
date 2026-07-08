import { Toggle as BaseToggle } from '@base-ui/react/toggle'

import { TOGGLE_BUTTON_STYLES } from '@components/actions/toggle-button/styles/ToggleButton.css.ts'
import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'
import { BUTTON_SIZES } from '@components/actions/_shared/buttons/constants'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import type { ToggleButtonProps } from '@components/actions/toggle-button/types/ToggleButton.props.ts'
import { buttonSizeToIconSize, TOGGLE_BUTTON_SIZE_TO_FONT_SIZE } from '@components/actions/toggle-button/constants'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

const ToggleButton: FC<ToggleButtonProps> = ({
    variant,
    color,
    size = BUTTON_SIZES.md,
    radius,
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
            className={cn(TOGGLE_BUTTON_STYLES.recipe({ variant, color, size, radius }), className)}
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

ToggleButton.displayName = 'ToggleButton'

export default ToggleButton
