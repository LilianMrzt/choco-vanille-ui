import { LINK_STYLES } from '@components/navigation/link/Link.css.ts'
import type { LinkProps } from '@components/navigation/link/types/Link.props.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'
import type * as React from 'react'

const Link: React.FC<LinkProps> = ({
    href = '#',
    className,
    onClick,
    ref,
    label,
    startIcon,
    endIcon,
    fontSize = 'base',
    fontWeight = 'medium',
    iconSize = 'md',
    ...props
}) => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (onClick) {
            event.preventDefault()
            onClick(event)
        }
    }

    return (
        <a
            ref={ref}
            href={href}
            className={cn(LINK_STYLES.base, className)}
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
}

Link.displayName = 'Link'

export default Link
