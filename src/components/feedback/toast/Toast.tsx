import { Children, isValidElement, memo, useCallback } from 'react'

import { TOAST_STYLES } from '@components/feedback/toast/styles/Toast.css.ts'
import { ToastActions } from '@components/feedback/toast/components/toast-actions'
import { ToastClose } from '@components/feedback/toast/components/toast-close'
import { ToastDescription } from '@components/feedback/toast/components/toast-description'
import { ToastIcon } from '@components/feedback/toast/components/toast-icon'
import { ToastTitle } from '@components/feedback/toast/components/toast-title'
import { ToastContext } from '@components/feedback/toast/context/Toast.context.ts'
import type { ToastCompound } from '@components/feedback/toast/types'
import type { ToastProps } from '@components/feedback/toast/types/Toast.props.ts'
import { Box } from '@components/layout/box'
import { createIconChildUtils } from '@utils/createIconChildUtils.ts'
import { cn } from '@utils/cn.ts'

const { hasIconChild } = createIconChildUtils(ToastIcon)

/**
 * Notification card compound with `variant` (info|success|warning|error),
 * optional `icon`, `title`, `description`, and a close button. Renders with
 * `role="status"` by default; pass `role="alert"` for urgent messages.
 * Supports compound children via `Toast.Icon`, `.Title`, `.Description`,
 * `.Actions`, and `.Close` slots.
 *
 * Compound slots: `Toast.Icon`, `Toast.Title`, `Toast.Description`,
 * `Toast.Actions`, `Toast.Close`.
 */
const Toast = memo<ToastProps>(({
    variant = 'info',
    role = 'status',
    icon,
    title,
    description,
    closeLabel = 'Close notification',
    onClose,
    children,
    className,
    ref,
    ...props
}) => {
    const isCompound = children !== undefined
    const showDefaultIcon = isCompound && !hasIconChild(children)
    const hasActions = isCompound && Children.toArray(children).some(
        (child) => isValidElement(child) && child.type === ToastActions,
    )

    const handleClose = useCallback(() => {
        onClose?.()
    }, [onClose])

    return (
        <ToastContext.Provider value={{ variant }}>
            <Box
                as={'div'}
                ref={ref}
                className={cn(
                    TOAST_STYLES.recipe({ variant, actions: hasActions }),
                    className,
                )}
                role={role === 'none' ? undefined : role}
                {...props}
            >
                {isCompound ? (
                    <>
                        {showDefaultIcon && <ToastIcon icon={icon} />}
                        {children}
                    </>
                ) : (
                    <>
                        <ToastIcon icon={icon} />
                        {title && <ToastTitle>{title}</ToastTitle>}
                        {description && (
                            <ToastDescription>{description}</ToastDescription>
                        )}
                        {onClose && (
                            <ToastClose
                                aria-label={closeLabel}
                                onClick={handleClose}
                            />
                        )}
                    </>
                )}
            </Box>
        </ToastContext.Provider>
    )
}) as unknown as ToastCompound

Toast.displayName = 'Toast'
Toast.Icon = ToastIcon
Toast.Title = ToastTitle
Toast.Description = ToastDescription
Toast.Actions = ToastActions
Toast.Close = ToastClose

export default Toast
