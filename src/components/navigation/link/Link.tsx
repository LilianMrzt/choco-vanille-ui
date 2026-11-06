import { memo, useCallback } from 'react'
import type * as React from 'react'

import { BOX_STYLES } from '@components/layout/box/Box.css.ts'
import { LINK_STYLES } from '@components/navigation/link/Link.css.ts'
import type { LinkProps } from '@components/navigation/link/types'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'

/**
 * Styled `<a>` element with optional start/end icons and typography tokens.
 * Prevents default navigation when `onClick` is provided, enabling SPA
 * routing adapters. The visible label names the link unless an ARIA name is
 * supplied. Native anchor attributes and the ref are forwarded to the anchor.
 * Custom colors apply at rest; hover and active use the theme link colors.
 *
 * @param props - Native anchor attributes and link presentation options.
 * @param props.href - Destination; defaults to `#`.
 * @param props.className - Additional anchor class.
 * @param props.onClick - Handler called after default navigation is prevented.
 * @param props.ref - Ref to the anchor.
 * @param props.label - Visible link text.
 * @param props.color - Theme color token.
 * @param props.startIcon - Decorative icon preceding the label.
 * @param props.endIcon - Decorative icon following the label.
 * @param props.fontSize - Label font size token; defaults to `16`.
 * @param props.fontWeight - Label font weight; defaults to `normal`.
 * @param props.iconSize - Icon size; defaults to `md`.
 * @param props.margin - Margin token.
 * @param props.marginTop - Top margin token.
 * @param props.marginRight - Right margin token.
 * @param props.marginBottom - Bottom margin token.
 * @param props.marginLeft - Left margin token.
 * @param props.padding - Padding token.
 * @param props.width - CSS width.
 * @param props.alignSelf - CSS self-alignment.
 * @param props.style - Inline style overrides.
 * @returns The anchor.
 * @example
 * <Link href="/settings" label="Settings" />
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
    fontSize = 16,
    fontWeight = 'normal',
    iconSize = 'md',
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    padding,
    width,
    alignSelf,
    style,
    ...props
}) => {
    const layoutClassName = (
        margin !== undefined ||
        marginTop !== undefined ||
        marginRight !== undefined ||
        marginBottom !== undefined ||
        marginLeft !== undefined ||
        padding !== undefined
    )
        ? BOX_STYLES.recipe({ margin, marginTop, marginRight, marginBottom, marginLeft, padding })
        : undefined

    /**
     * Prevents native navigation when a consumer handles the click.
     * @param event - Anchor click event.
     * @returns Nothing.
     * @example
     * handleClick(event)
     */
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
            className={cn(
                LINK_STYLES.base,
                LINK_STYLES.color({ color }),
                layoutClassName,
                className,
            )}
            style={{ width, alignSelf, ...style }}
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
