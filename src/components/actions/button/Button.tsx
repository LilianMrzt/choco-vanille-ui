import { buttonRecipe } from '@components/actions/button/Button.css.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import type { ButtonProps } from '@components/actions/button/types/Button.props.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'
import { buttonSizeToFontSize, buttonSizeToIconSize } from '@components/actions/button/constants'

const Button: FC<ButtonProps> = ({
    variant,
    size = 'default',
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
            className={cn(buttonRecipe({ variant, size }), className)}
            {...props}
        >
            {startIcon && (
                <Icon
                    icon={startIcon}
                    size={iconSize}
                />
            )}
            {label && (
                <Typography
                    as={'span'}
                    variant={'span'}
                    fontSize={textSize}
                    fontWeight={'medium'}
                >
                    {label}
                </Typography>
            )}
            {endIcon && (
                <Icon
                    icon={endIcon}
                    size={iconSize}
                />
            )}
        </button>
    )
}

Button.displayName = 'Button'

export default Button
