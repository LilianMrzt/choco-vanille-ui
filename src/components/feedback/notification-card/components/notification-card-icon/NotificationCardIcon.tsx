import { NotificationCardContext } from '@components/feedback/notification-card/context/NotificationCard.context.ts'
import {
    VARIANT_TO_COLOR,
    VARIANT_TO_BACKGROUND,
    VARIANT_TO_BORDER_COLOR,
    VARIANT_TO_ICON,
} from '@components/feedback/notification-card/constants'
import { NOTIFICATION_CARD_ICON_STYLES } from '@components/feedback/notification-card/components/notification-card-icon/NotificationCardIcon.css.ts'
import type { NotificationCardIconProps } from '@components/feedback/notification-card/components/notification-card-icon/types'
import { Icon } from '@components/foundation/icon'
import { Box } from '@components/layout/box'
import { cn } from '@utils/cn.ts'
import { memo, useContext, type FC } from 'react'

/**
 * Icon slot for `NotificationCard`. Reads `variant` from context to resolve the
 * default icon and color. Override both with explicit `icon` and `color`
 * props. Defaults to a small 14px SVG with 6px wrapper padding, a 6px radius,
 * and a 1px solid border tinted like an outlinedSubtle Badge.
 * @param props - Icon options.
 * @param props.icon - Custom icon; defaults to the current variant icon.
 * @param props.color - Custom color; defaults to the current variant color.
 * @param props.backgroundColor - Wrapper background; defaults to the variant's subtle surface.
 * @param props.borderColor - Wrapper border color; defaults to the variant's subtle hover shade.
 * @param props.borderWidth - Uniform wrapper border width; defaults to 1px.
 * @param props.borderStyle - Wrapper border style; defaults to solid.
 * @param props.borderRadius - Wrapper radius token; defaults to 6.
 * @param props.padding - Wrapper padding token; defaults to 6.
 * @param props.className - Additional class.
 * @returns The icon.
 * @example
 * <NotificationCard.Icon />
 */
const NotificationCardIcon: FC<NotificationCardIconProps> = memo(({
    icon,
    color,
    backgroundColor,
    borderColor,
    borderWidth = '1px',
    borderStyle = 'solid',
    borderRadius = 6,
    padding = 6,
    className,
    ...props
}) => {
    const { variant } = useContext(NotificationCardContext)

    return (
        <Box
            as={'span'}
            backgroundColor={backgroundColor ?? VARIANT_TO_BACKGROUND[variant]}
            borderBottomWidth={borderWidth}
            borderColor={borderColor ?? VARIANT_TO_BORDER_COLOR[variant]}
            borderLeftWidth={borderWidth}
            borderRadius={borderRadius}
            borderRightWidth={borderWidth}
            borderStyle={borderStyle}
            borderTopWidth={borderWidth}
            className={NOTIFICATION_CARD_ICON_STYLES.icon}
            display={'inline-flex'}
            padding={padding}
        >
            <Icon
                className={cn(NOTIFICATION_CARD_ICON_STYLES.svg, className)}
                color={color ?? VARIANT_TO_COLOR[variant]}
                icon={icon ?? VARIANT_TO_ICON[variant]}
                size={14}
                {...props}
            />
        </Box>
    )
})

NotificationCardIcon.displayName = 'NotificationCard.Icon'

export default NotificationCardIcon
