import { Toggle as BaseToggle } from '@base-ui/react/toggle'

import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'
import { buttonSizeToIconSize } from '@components/actions/_shared/buttons/constants'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { TOGGLE_SIZE_TO_FONT_SIZE } from '@components/actions/toggle/constants/toggleSizes.const.ts'
import { TOGGLE_STYLES } from '@components/actions/toggle/styles/Toggle.css.ts'
import type { ToggleProps } from '@components/actions/toggle/types/Toggle.props.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

const Toggle: FC<ToggleProps> = ({
    variant,
    color,
    size = 'md',
    radius,
    className,
    label,
    icon,
    startIcon,
    endIcon,
    ref,
    ...props
}) => {
    const iconSize = buttonSizeToIconSize[size]
    const fontSize = TOGGLE_SIZE_TO_FONT_SIZE[size]

    return (
        <BaseToggle
            ref={ref}
            data-icon-only={icon ? '' : undefined}
            className={cn(TOGGLE_STYLES.recipe({ variant, color, size, radius }), className)}
            {...props}
        >
            {icon ? (
                <Icon
                    icon={icon}
                    size={iconSize}
                    className={BUTTON_SHARED_STYLES.icon}
                />
            ) : (
                <>
                    {startIcon && (
                        <Icon
                            icon={startIcon}
                            size={iconSize}
                            className={BUTTON_SHARED_STYLES.icon}
                        />
                    )}
                    <Typography
                        as={'span'}
                        fontSize={fontSize}
                        fontWeight={'medium'}
                    >
                        {label}
                    </Typography>
                    {endIcon && (
                        <Icon
                            icon={endIcon}
                            size={iconSize}
                            className={BUTTON_SHARED_STYLES.icon}
                        />
                    )}
                </>
            )}
        </BaseToggle>
    )
}

Toggle.displayName = 'Toggle'

export default Toggle
