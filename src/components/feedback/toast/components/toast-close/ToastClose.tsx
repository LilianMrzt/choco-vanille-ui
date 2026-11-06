import { IconButton } from '@components/actions/icon-button'
import type { ToastCloseProps } from '@components/feedback/toast/components/toast-close/types'
import { TOAST_CLOSE_STYLES } from '@components/feedback/toast/components/toast-close/ToastClose.css.ts'
import CloseIcon from '@resources/asset/CloseIcon.svg?react'
import { vars } from '@theme/styles/contract/contract.css.ts'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

/**
 * Close button slot for `Toast`. Renders a ghost `xs` `IconButton` with
 * a close icon. Requires `aria-label` for accessibility.
 * @param props - Native button attributes.
 * @param props["aria-label"] - Accessible close label.
 * @param props.className - Additional class.
 * @returns A close button.
 * @example
 * <Toast.Close aria-label="Dismiss" />
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
            style={{ marginInlineStart: vars.space[4], color: vars.color.surface.mutedForeground }}
            {...props}
        />
    )
})

ToastClose.displayName = 'Toast.Close'

export default ToastClose
