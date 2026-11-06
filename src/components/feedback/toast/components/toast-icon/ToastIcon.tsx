import { ToastContext } from '@components/feedback/toast/context/Toast.context.ts'
import {
    VARIANT_TO_COLOR,
    VARIANT_TO_ICON,
} from '@components/feedback/toast/constants'
import { TOAST_ICON_STYLES } from '@components/feedback/toast/components/toast-icon/ToastIcon.css.ts'
import type { ToastIconProps } from '@components/feedback/toast/components/toast-icon/types'
import { Icon } from '@components/foundation/icon'
import { cn } from '@utils/cn.ts'
import { memo, useContext, type FC } from 'react'

/**
 * Icon slot for `Toast`. Reads `variant` from context to resolve the
 * default icon and color. Override both with explicit `icon` and `color`
 * props.
 * @param props - Icon options.
 * @param props.icon - Custom icon; defaults to the current variant icon.
 * @param props.color - Custom color; defaults to the current variant color.
 * @param props.className - Additional class.
 * @returns The icon.
 * @example
 * <Toast.Icon />
 */
const ToastIcon: FC<ToastIconProps> = memo(({
    icon,
    color,
    className,
    ...props
}) => {
    const { variant } = useContext(ToastContext)

    return (
        <Icon
            icon={icon ?? VARIANT_TO_ICON[variant]}
            color={color ?? VARIANT_TO_COLOR[variant]}
            size={'md'}
            className={cn(TOAST_ICON_STYLES.icon, className)}
            {...props}
        />
    )
})

ToastIcon.displayName = 'Toast.Icon'

export default ToastIcon
