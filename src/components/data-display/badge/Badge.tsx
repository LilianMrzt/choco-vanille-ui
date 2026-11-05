import { BADGE_STYLES } from '@components/data-display/badge/Badge.css.ts'
import { BADGE_SIZE_LAYOUT, BADGE_SIZE_TO_FONT_SIZE, BADGE_SIZE_TO_ICON_SIZE } from '@components/data-display/badge/constants'
import type { BadgeProps } from '@components/data-display/badge/types'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { Box } from '@components/layout/box'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

/**
 * Displays a noninteractive inline label with optional decorative icons.
 * Defaults to primary, outlinedSubtle, md and a 4px radius at a 16px root.
 * Native attributes, events and ref target the outer span. Layout props override
 * size presets; consumer style overrides primitive props and recipe colors.
 *
 * @param props - Label, appearance and native span attributes.
 * @param props.label - Required visible label; icons do not replace this text.
 * @param props.variant - Visual treatment; defaults to `outlinedSubtle`.
 * @param props.color - Semantic color intent; defaults to `primary`.
 * @param props.size - Label, icon and layout size preset; defaults to `md`.
 * @param props.startIcon - Optional decorative SVG displayed before the label.
 * @param props.endIcon - Optional decorative SVG displayed after the label.
 * @param props.className - Consumer class merged with the badge classes.
 * @param props.ref - Ref forwarded to the outer span.
 * @param props.display - Wrapper CSS display; defaults to `inline-flex`.
 * @param props.borderRadius - Radius token; defaults to `4`.
 * @returns The visible label and its decorative icons.
 * @example
 * <Badge label="Verified" color="success" startIcon={CheckIcon} />
 */
const Badge: FC<BadgeProps> = ({
    label,
    variant,
    color,
    size = 'md',
    startIcon,
    endIcon,
    className,
    ref,
    display = 'inline-flex',
    borderRadius = 4,
    ...props
}) => (
    <Box
        alignItems={'center'}
        as={'span'}
        borderRadius={borderRadius}
        className={cn(BADGE_STYLES.recipe({ variant, color, size }), className)}
        display={display}
        justifyContent={'center'}
        ref={ref}
        {...BADGE_SIZE_LAYOUT[size]}
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
            fontSize={BADGE_SIZE_TO_FONT_SIZE[size]}
            fontWeight={'medium'}
            variant={'span'}
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
)

Badge.displayName = 'Badge'

export default Badge
