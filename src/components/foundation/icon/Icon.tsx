import { Icon as Iconify } from '@iconify/react'

import { ICON_STYLES } from '@components/foundation/icon/styles/Icon.css.ts'
import type { IconProps } from '@components/foundation/icon/types/Icon.props.ts'
import { cn } from '@utils/cn.ts'
import { useMemo, type CSSProperties, type FC } from 'react'

const Icon: FC<IconProps> = ({
    icon,
    size,
    spin,
    color,
    padding,
    borderColor,
    backgroundColor,
    borderWidth,
    borderStyle,
    'aria-label': ariaLabel,
    className,
    style,
    ...props
}) => {
    const isDecorative = ariaLabel === undefined

    const recipeClassName = useMemo(
        () =>
            ICON_STYLES.recipe({
                size,
                spin,
                color,
                padding,
                borderColor,
                backgroundColor,
            }),
        [size, spin, color, padding, borderColor, backgroundColor],
    )

    const computedStyle = useMemo<CSSProperties>(
        () => ({
            borderWidth,
            borderStyle,
            ...style,
        }),
        [borderWidth, borderStyle, style],
    )

    return (
        <Iconify
            icon={icon}
            aria-hidden={isDecorative}
            aria-label={ariaLabel}
            role={isDecorative ? undefined : 'img'}
            className={cn(recipeClassName, className)}
            style={computedStyle}
            {...props}
        />
    )
}

Icon.displayName = 'Icon'

export default Icon
