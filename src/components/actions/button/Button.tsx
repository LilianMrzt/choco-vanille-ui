import { BUTTON_STYLES } from '@components/actions/button/styles/Button.css.ts'
import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import type { ButtonProps } from '@components/actions/button/types/Button.props.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'
import { BUTTON_SIZE_TO_FONT_SIZE, buttonSizeToIconSize } from '@components/actions/button/constants'
import { BUTTON_SIZES } from '@components/actions/_shared/buttons/constants'

/**
 * Text-label action button. Requires a visible `label`. Supports
 * `variant` (contained|outlined|ghost), semantic `color`, `size`
 * (sm|md|lg), and optional `startIcon`/`endIcon` Iconify identifiers.
 */
const Button: FC<ButtonProps> = ({
    variant,
    color,
    size = BUTTON_SIZES.md,
    className,
    label,
    startIcon,
    endIcon,
    active,
    ref,
    ...props
}) => {
    const iconSize = buttonSizeToIconSize[size]
    const textSize = BUTTON_SIZE_TO_FONT_SIZE[size]

    return (
        <button
            ref={ref}
            data-active={active ? 'true' : undefined}
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
