import { Toggle as BaseToggle } from '@base-ui/react/toggle'
import type { FC } from 'react'

import { BUTTON_SHARED_STYLES } from '@components/actions/_shared/buttons/styles/buttonShared.css.ts'
import { buttonSizeToIconSize } from '@components/actions/_shared/buttons/constants'
import { getButtonLayoutClassName } from '@components/actions/_shared/buttons/utils/buttonLayout.utils.ts'
import { Icon } from '@components/foundation/icon'
import { Typography } from '@components/foundation/typography'
import { TOGGLE_SIZE_TO_FONT_SIZE } from '@components/actions/toggle/constants'
import { TOGGLE_STYLES } from '@components/actions/toggle/Toggle.css.ts'
import type { ToggleProps } from '@components/actions/toggle/types'
import { cn } from '@utils/cn.ts'

/**
 * Two-state button, exposed independently as `Toggle` or as `ToggleGroup.Item`.
 * Text mode requires `label`; icon-only mode requires `icon` and `aria-label`.
 * Supply a unique `value` in a group, which controls pressed state. Standalone
 * state supports `pressed`, `defaultPressed` and `onPressedChange`. Native
 * button attributes, events and ref target the rendered button.
 *
 * @param props - Content, appearance, state and native button props.
 * @param props.variant - Visual treatment; defaults to `ghostSubtle`.
 * @param props.color - Semantic color intent; defaults to `primary`.
 * @param props.size - Size preset; defaults to `md`.
 * @param props.radius - Radius override.
 * @param props.className - Additional button classes.
 * @param props.label - Text label in text mode.
 * @param props.icon - Decorative icon in icon-only mode.
 * @param props.startIcon - Decorative icon before the label.
 * @param props.endIcon - Decorative icon after the label.
 * @param props.margin - Margin token or auto.
 * @param props.marginTop - Top margin token or auto.
 * @param props.marginRight - Right margin token or auto.
 * @param props.marginBottom - Bottom margin token or auto.
 * @param props.marginLeft - Left margin token or auto.
 * @param props.width - CSS width.
 * @param props.alignSelf - CSS self-alignment.
 * @param props.style - Inline style overrides.
 * @param props.ref - Ref to the native button.
 * @returns The toggle button.
 * @example
 * <Toggle label="Bold" />
 */
const ToggleGroupItem: FC<ToggleProps> = ({
    variant,
    color,
    size = 'md',
    radius,
    className,
    label,
    icon,
    startIcon,
    endIcon,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    width,
    alignSelf,
    style,
    ref,
    ...props
}) => {
    const iconSize = buttonSizeToIconSize[size]
    const fontSize = TOGGLE_SIZE_TO_FONT_SIZE[size]

    return (
        <BaseToggle
            ref={ref}
            data-icon-only={icon ? '' : undefined}
            className={cn(
                TOGGLE_STYLES.recipe({ variant, color, size, radius }),
                getButtonLayoutClassName({ margin, marginTop, marginRight, marginBottom, marginLeft, width, alignSelf }),
                className,
            )}
            style={{ width, alignSelf, ...style }}
            {...props}
        >
            {icon ? (
                <Icon
                    icon={icon}
                    size={iconSize}
                    className={BUTTON_SHARED_STYLES.icon}
                />
            ) : (
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
                        fontSize={fontSize}
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
            )}
        </BaseToggle>
    )
}

ToggleGroupItem.displayName = 'ToggleGroup.Item'

export default ToggleGroupItem
