import { IconButton } from '@components/actions/icon-button'
import type { ToastCloseProps } from '@components/feedback/toast/components/toast-close/types/ToastClose.props.ts'
import { TOAST_CLOSE_STYLES } from '@components/feedback/toast/components/toast-close/styles/ToastClose.css.ts'
import { IconRegistry } from '@constants/icons'
import { vars } from '@theme/contract.css.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

const ToastClose: FC<ToastCloseProps> = ({
    'aria-label': ariaLabel,
    color: _color,
    className,
    ...props
}) => {
    return (
        <IconButton
            variant={'ghost'}
            color={'secondary'}
            size={'xs'}
            icon={IconRegistry.close}
            aria-label={ariaLabel}
            className={cn(TOAST_CLOSE_STYLES.close, className)}
            style={{ marginInlineStart: vars.space.xs, color: vars.color.mutedForeground }}
            {...props}
        />
    )
}

ToastClose.displayName = 'Toast.Close'

export default ToastClose
