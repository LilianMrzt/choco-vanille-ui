import { iconButtonRecipe } from '@components/actions/icon-button/IconButton.css.ts'
import { Icon } from '@components/foundation/icon'
import type { IconButtonProps } from '@components/actions/icon-button/types/IconButton.props.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'
import { iconButtonSizeToIconSize } from '@components/actions/icon-button/constants'

const IconButton: FC<IconButtonProps> = ({
    variant,
    size = 'default',
    className,
    icon,
    label,
    ref,
    ...props
}) => {
    const iconSize = iconButtonSizeToIconSize[size]

    return (
        <button
            ref={ref}
            aria-label={label}
            className={cn(iconButtonRecipe({ variant, size }), className)}
            {...props}
        >
            <Icon
                icon={icon}
                size={iconSize}
            />
        </button>
    )
}

IconButton.displayName = 'IconButton'

export default IconButton
