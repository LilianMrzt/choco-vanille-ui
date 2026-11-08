import { memo, useContext, type FC } from 'react'
import type * as React from 'react'

import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { BottomNavigationContext } from '@components/navigation/bottom-navigation/context/BottomNavigation.context.ts'
import { BOTTOM_NAVIGATION_STYLES } from '@components/navigation/bottom-navigation/BottomNavigation.css.ts'
import type { BottomNavigationItemProps } from '@components/navigation/bottom-navigation/components/bottom-navigation-item/types'
import { cn } from '@utils/cn.ts'

/**
 * A single bottom navigation entry. Items render as links when `href` is
 * provided and as native buttons otherwise. Link items prevent default
 * navigation when `onClick` is provided, enabling client-side routers.
 */
const BottomNavigationItem: FC<BottomNavigationItemProps> = memo((props) => {
    const context = useContext(BottomNavigationContext)

    if (!context) {
        throw new Error(
            'BottomNavigation.Item must be rendered inside BottomNavigation.',
        )
    }

    const {
        value,
        label,
        icon,
        height,
        disabled = false,
        className,
        style,
        ...itemProps
    } = props
    const isActive = context.value === value
    const controlClassName = cn(BOTTOM_NAVIGATION_STYLES.control, className)
    const controlStyle = height !== undefined ? { ...style, height } : style
    const content = (
        <>
            <Icon
                icon={icon}
                size={20}
                className={BOTTOM_NAVIGATION_STYLES.icon}
            />
            {label !== undefined && (
                <Typography
                    as={'span'}
                    variant={'span'}
                    className={BOTTOM_NAVIGATION_STYLES.label}
                >
                    {label}
                </Typography>
            )}
        </>
    )

    if ('href' in itemProps && itemProps.href !== undefined) {
        const { href, ref, onClick, tabIndex, ...anchorProps } = itemProps
        const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
            if (disabled) {
                event.preventDefault()
                return
            }

            context.onValueChange(value)
            if (onClick) {
                event.preventDefault()
                onClick(event)
            }
        }

        return (
            <li className={BOTTOM_NAVIGATION_STYLES.item}>
                <a
                    {...anchorProps}
                    ref={ref}
                    href={href}
                    tabIndex={disabled ? -1 : tabIndex}
                    aria-current={isActive ? 'page' : undefined}
                    aria-disabled={disabled || undefined}
                    data-active={isActive || undefined}
                    data-disabled={disabled || undefined}
                    className={controlClassName}
                    style={controlStyle}
                    onClick={handleClick}
                >
                    {content}
                </a>
            </li>
        )
    }

    const { ref, onClick, ...buttonProps } = itemProps
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) {
            return
        }

        context.onValueChange(value)
        onClick?.(event)
    }

    return (
        <li className={BOTTOM_NAVIGATION_STYLES.item}>
            <button
                {...buttonProps}
                ref={ref}
                type={'button'}
                disabled={disabled}
                aria-current={isActive ? 'page' : undefined}
                aria-disabled={disabled || undefined}
                data-active={isActive || undefined}
                data-disabled={disabled || undefined}
                className={controlClassName}
                style={controlStyle}
                onClick={handleClick}
            >
                {content}
            </button>
        </li>
    )
})

BottomNavigationItem.displayName = 'BottomNavigation.Item'

export default BottomNavigationItem
