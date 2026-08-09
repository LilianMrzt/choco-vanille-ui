import { IconButton } from '@components/actions/icon-button'
import type { ToastCloseProps } from '@components/feedback/toast/components/toast-close/types/ToastClose.props.ts'
import { TOAST_CLOSE_STYLES } from '@components/feedback/toast/components/toast-close/styles/ToastClose.css.ts'
import CloseIcon from '@resources/asset/CloseIcon.svg?react'
import { vars } from '@theme/contract.css.ts'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

/**
 * Close button slot for `Toast`. Renders a ghost `xs` `IconButton` with
 * a close icon. Requires `aria-label` for accessibility.
 */
const ToastClose: FC<ToastCloseProps> = memo(({
    'aria-label': ariaLabel,
    color: _color,
    className,
    ...props
}) => {
    return (
        <IconButton
            variant={'ghost'}
            color={'tertiary'}
            size={'xs'}
            icon={CloseIcon}
            aria-label={ariaLabel}
            className={cn(TOAST_CLOSE_STYLES.close, className)}
            style={{ marginInlineStart: vars.space.xs, color: vars.color.mutedForeground }}
            {...props}
        />
    )
})

ToastClose.displayName = 'Toast.Close'

export default ToastClose
