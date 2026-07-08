import { Icon as Iconify } from '@iconify/react'

import { ICON_STYLES } from '@components/foundation/icon/styles/Icon.css.ts'
import type { IconProps } from '@components/foundation/icon/types/Icon.props.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

const Icon: FC<IconProps> = ({
    icon,
    size,
    spin,
    color,
    'aria-label': ariaLabel,
    className,
    style,
    ...props
}) => {
    const isDecorative = ariaLabel === undefined

    return (
        <Iconify
            icon={icon}
            aria-hidden={isDecorative}
            aria-label={ariaLabel}
            role={isDecorative ? undefined : 'img'}
            className={cn(ICON_STYLES.recipe({ size, spin, color }), className)}
            style={style}
            {...props}
        />
    )
}

Icon.displayName = 'Icon'

export default Icon
