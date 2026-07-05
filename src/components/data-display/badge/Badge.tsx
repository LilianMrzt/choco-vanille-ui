import { BADGE_STYLES } from '@components/data-display/badge/Badge.css.ts'
import { BADGE_SIZE_TO_FONT_SIZE, BADGE_SIZE_TO_ICON_SIZE } from '@components/data-display/badge/constants'
import type { BadgeProps } from '@components/data-display/badge/types/Badge.props.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { Box } from '@components/layout/box'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

const Badge: FC<BadgeProps> = ({
    label,
    variant,
    color,
    size = 'md',
    startIcon,
    endIcon,
    className,
    ref,
    // Box layout props — forwarded to the underlying Box.
    display,
    w,
    h,
    overflow,
    overflowX,
    overflowY,
    position,
    radius = 'sm',
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    m,
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    gap,
    gapX,
    gapY,
    bg,
    ...props
}) => {
    return (
        <Box
            as={'span'}
            ref={ref}
            display={display ?? 'inline-flex'}
            w={w}
            h={h}
            overflow={overflow}
            overflowX={overflowX}
            overflowY={overflowY}
            position={position}
            radius={radius}
            p={p}
            px={px}
            py={py}
            pt={pt}
            pr={pr}
            pb={pb}
            pl={pl}
            m={m}
            mx={mx}
            my={my}
            mt={mt}
            mr={mr}
            mb={mb}
            ml={ml}
            gap={gap}
            gapX={gapX}
            gapY={gapY}
            bg={bg}
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
    )
}

Badge.displayName = 'Badge'

export default Badge
