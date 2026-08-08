import { BADGE_STYLES } from '@components/data-display/badge/styles/Badge.css.ts'
import { BADGE_SIZE_TO_FONT_SIZE, BADGE_SIZE_TO_ICON_SIZE } from '@components/data-display/badge/constants'
import type { BadgeProps } from '@components/data-display/badge/types/Badge.props.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { Box } from '@components/layout/box'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

/**
 * Inline label chip with variant, color, size, and optional leading/trailing
 * icons. Renders as a `<span>` with a Typography label and decorative Icons.
 */
const Badge: FC<BadgeProps> = memo(({
    label,
    variant,
    color,
    size = 'md',
    startIcon,
    endIcon,
    className,
    ref,
    display = 'inline-flex',
    borderRadius = 'sm',
    ...props
}) => (
    <Box
        as={'span'}
        ref={ref}
        display={display}
        borderRadius={borderRadius}
        className={cn(BADGE_STYLES.recipe({ variant, color, size }), className)}
        {...props}
    >
        {startIcon && (
            <Icon
                icon={startIcon}
                size={BADGE_SIZE_TO_ICON_SIZE[size]}
            />
        )}
        <Typography
            as={'span'}
            variant={'span'}
            fontSize={BADGE_SIZE_TO_FONT_SIZE[size]}
            fontWeight={'medium'}
        >
            {label}
        </Typography>
        {endIcon && (
            <Icon
                icon={endIcon}
                size={BADGE_SIZE_TO_ICON_SIZE[size]}
            />
        )}
    </Box>
))

Badge.displayName = 'Badge'

export default Badge
