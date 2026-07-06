import { IconButton } from '@components/actions/icon-button'
import type { ToastCloseProps } from '@components/feedback/toast/components/toast-close/types/ToastClose.props.ts'
import { IconRegistry } from '@constants/icons'
import { vars } from '@theme/contract.css.ts'
import type { FC } from 'react'

const ToastClose: FC<ToastCloseProps> = ({
    'aria-label': ariaLabel,
    color: _color,
    ...props
}) => {
    return (
        <IconButton
            variant={'ghost'}
            color={'secondary'}
            size={'sm'}
            icon={IconRegistry.close}
            aria-label={ariaLabel}
            style={{ marginInlineStart: vars.space.xs, color: vars.color.mutedForeground }}
            {...props}
        />
    )
}

ToastClose.displayName = 'Toast.Close'

export default ToastClose
