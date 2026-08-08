import { memo, useCallback } from 'react'
import type * as React from 'react'

import { LINK_STYLES } from '@components/navigation/link/styles/Link.css.ts'
import type { LinkProps } from '@components/navigation/link/types/Link.props.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'

/**
 * Styled `<a>` element with optional start/end icons and typography tokens.
 * Prevents default navigation when `onClick` is provided, enabling SPA
 * routing adapters. Requires a visible `label` or icon-accessible content.
 */
const Link: React.FC<LinkProps> = memo(({
    href = '#',
    className,
    onClick,
    ref,
    label,
    color,
    startIcon,
    endIcon,
    fontSize = 'md',
    fontWeight = 'medium',
    iconSize = 'md',
    ...props
}) => {
    const handleClick = useCallback(
        (event: React.MouseEvent<HTMLAnchorElement>) => {
            if (onClick) {
                event.preventDefault()
                onClick(event)
            }
        },
        [onClick],
    )

    return (
        <a
            ref={ref}
            href={href}
            className={cn(LINK_STYLES.base, LINK_STYLES.color({ color }), className)}
            onClick={handleClick}
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
                    fontSize={fontSize}
                    fontWeight={fontWeight}
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
        </a>
    )
})

Link.displayName = 'Link'

export default Link
