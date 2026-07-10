import { Icon as Iconify } from '@iconify/react'

import { Box } from '@components/layout/box'
import { ICON_STYLES } from '@components/foundation/icon/styles/Icon.css.ts'
import type { IconProps } from '@components/foundation/icon/types/Icon.props.ts'
import { cn } from '@utils/cn.ts'
import { memo, type CSSProperties, type FC } from 'react'

const Icon: FC<IconProps> = memo(({
    icon,
    size,
    spin,
    color,
    padding,
    borderColor,
    backgroundColor,
    borderWidth,
    borderStyle,
    borderRadius,
    'aria-label': ariaLabel,
    className,
    style,
    ...props
}) => {
    const isDecorative = ariaLabel === undefined

    const recipeClassName = ICON_STYLES.recipe({
        size,
        spin,
        color,
    })

    const computedStyle: CSSProperties = {
        ...style,
    }

    return (
        <Box
            as={'span'}
            display={'inline-flex'}
            padding={padding}
            borderColor={borderColor}
            backgroundColor={backgroundColor}
            borderWidth={borderWidth}
            borderStyle={borderStyle}
            borderRadius={borderRadius}
        >
            <Iconify
                icon={icon}
                aria-hidden={isDecorative}
                aria-label={ariaLabel}
                role={isDecorative ? undefined : 'img'}
                className={cn(recipeClassName, className)}
                style={computedStyle}
                {...props}
            />
        </Box>
    )
})

Icon.displayName = 'Icon'

export default Icon
