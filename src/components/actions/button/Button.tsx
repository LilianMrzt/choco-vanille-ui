import { BUTTON_STYLES } from '@components/actions/button/styles/Button.css.ts'
import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'
import { getButtonLayoutClassName } from '@components/actions/_shared/buttons/utils/buttonLayout.utils.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import type { ButtonProps } from '@components/actions/button/types/Button.props.ts'
import { cn } from '@utils/cn.ts'
import type * as React from 'react'
import { BUTTON_SIZE_TO_FONT_SIZE, buttonSizeToIconSize } from '@components/actions/button/constants'
import { BUTTON_SIZES } from '@components/actions/_shared/buttons/constants'

/**
 * Text-label action button. Requires a visible `label`. Renders a native
 * anchor when `href` is provided. Supports `variant` (contained|outlined|ghost),
 * semantic `color`, `size` (sm|md|lg), and optional `startIcon`/`endIcon`
 * Iconify identifiers.
 */
const Button: React.FC<ButtonProps> = ({
    variant,
    color,
    size = BUTTON_SIZES.md,
    className,
    label,
    startIcon,
    endIcon,
    active,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    width,
    alignSelf,
    style,
    ...elementProps
}) => {
    const iconSize = buttonSizeToIconSize[size]
    const textSize = BUTTON_SIZE_TO_FONT_SIZE[size]
    const buttonClassName = cn(
        BUTTON_STYLES.recipe({ variant, color, size }),
        getButtonLayoutClassName({ margin, marginTop, marginRight, marginBottom, marginLeft, width, alignSelf }),
        className,
    )
    const buttonStyle = { width, alignSelf, ...style }
    const content = (
        <>
            {startIcon && (
                <Icon
                    icon={startIcon}
                    size={iconSize}
                    className={BUTTON_SHARED_STYLES.icon}
                />
            )}
            <Typography
                as={'span'}
                fontSize={textSize}
                fontWeight={'medium'}
            >
                {label}
            </Typography>
            {endIcon && (
                <Icon
                    icon={endIcon}
                    size={iconSize}
                    className={BUTTON_SHARED_STYLES.icon}
                />
            )}
        </>
    )

    if (elementProps.href !== undefined) {
        const {
            href,
            ref: anchorRef,
            onClick,
            ...anchorProps
        } = elementProps
        const handleClick = onClick
            ? (event: React.MouseEvent<HTMLAnchorElement>) => {
                event.preventDefault()
                onClick(event)
            }
            : undefined

        return (
            <a
                ref={anchorRef}
                href={href}
                data-active={active ? 'true' : undefined}
                className={buttonClassName}
                style={buttonStyle}
                onClick={handleClick}
                {...anchorProps}
            >
                {content}
            </a>
        )
    }

    const {
        ref: buttonRef,
        ...buttonProps
    } = elementProps

    return (
        <button
            ref={buttonRef}
            data-active={active ? 'true' : undefined}
            className={buttonClassName}
            style={buttonStyle}
            {...buttonProps}
        >
            {content}
        </button>
    )
}

Button.displayName = 'Button'

export default Button
