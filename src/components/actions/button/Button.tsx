import { BUTTON_STYLES } from '@components/actions/button/Button.css.ts'
import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'
import { getButtonLayoutClassName } from '@components/actions/_shared/buttons/utils/buttonLayout.utils.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import type { ButtonProps } from '@components/actions/button/types'
import { cn } from '@utils/cn.ts'
import type * as React from 'react'
import { BUTTON_SIZE_TO_FONT_SIZE, buttonSizeToIconSize } from '@components/actions/button/constants'
import { BUTTON_SIZES } from '@components/actions/_shared/buttons/constants'

/**
 * Text-label action button. Supply a meaningful visible label. Renders a native
 * anchor when `href` is provided and a button otherwise. Anchor clicks with an
 * `onClick` handler prevent native navigation before invoking that handler.
 * Native attributes and ref are forwarded to the chosen element.
 * @param props - Button options and native element attributes.
 * @param props.variant - Visual treatment; defaults to contained.
 * @param props.color - Semantic color intent; defaults to primary.
 * @param props.size - Height preset: sm 28px, md 36px (default), lg 44px at a 16px root.
 * @param props.className - Additional element class.
 * @param props.label - Visible text and accessible name.
 * @param props.startIcon - Decorative leading SVG component.
 * @param props.endIcon - Decorative trailing SVG component.
 * @param props.active - Whether the button has an active visual state.
 * @param props.margin - Margin token.
 * @param props.marginTop - Top margin token.
 * @param props.marginRight - Right margin token.
 * @param props.marginBottom - Bottom margin token.
 * @param props.marginLeft - Left margin token.
 * @param props.width - CSS width.
 * @param props.alignSelf - Flex alignment.
 * @param props.style - Inline style overrides.
 * @returns The action button or link.
 * @example
 * <Button label="Save" onClick={save} />
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
        /**
         * Invokes a custom anchor handler after preventing native navigation.
         * @param event - Anchor click event.
         * @returns Nothing.
         * @example
         * handleClick(event)
         */
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
