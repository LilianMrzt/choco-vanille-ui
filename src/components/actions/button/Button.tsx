import { BUTTON_STYLES } from '@components/actions/button/Button.css.ts'
import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import type { ButtonProps } from '@components/actions/button/types/Button.props.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'
import { buttonSizeToFontSize, buttonSizeToIconSize } from '@components/actions/button/constants'

const Button: FC<ButtonProps> = ({
    variant,
    color,
    size = 'md',
    className,
    label,
    startIcon,
    endIcon,
    ref,
    ...props
}) => {
    const iconSize = buttonSizeToIconSize[size]
    const textSize = buttonSizeToFontSize[size]

    return (
        <button
            ref={ref}
            className={cn(BUTTON_STYLES.recipe({ variant, color, size }), className)}
            {...props}
        >
            {startIcon && (
                <Icon
                    icon={startIcon}
                    size={iconSize}
                    className={BUTTON_SHARED_STYLES.icon}
                />
            )}
            <Typography
                as={'span'}
                fontSize={textSize}
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
        </button>
    )
}

Button.displayName = 'Button'

export default Button
