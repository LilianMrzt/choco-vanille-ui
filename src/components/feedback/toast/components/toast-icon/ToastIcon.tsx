import { ToastContext } from '@components/feedback/toast/context/Toast.context.ts'
import {
    VARIANT_TO_COLOR,
    VARIANT_TO_ICON,
} from '@components/feedback/toast/constants'
import { TOAST_ICON_STYLES } from '@components/feedback/toast/components/toast-icon/ToastIcon.css.ts'
import type { ToastIconProps } from '@components/feedback/toast/components/toast-icon/types/ToastIcon.props.ts'
import { Icon } from '@components/foundation/icon'
import { cn } from '@utils/cn.ts'
import { useContext, type FC } from 'react'

const ToastIcon: FC<ToastIconProps> = ({
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
}

ToastIcon.displayName = 'Toast.Icon'

export default ToastIcon
