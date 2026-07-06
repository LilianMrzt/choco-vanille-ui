import { TOAST_STYLES } from '@components/feedback/toast/Toast.css.ts'
import { ToastActions } from '@components/feedback/toast/components/toast-actions'
import { ToastClose } from '@components/feedback/toast/components/toast-close'
import { ToastDescription } from '@components/feedback/toast/components/toast-description'
import { ToastIcon } from '@components/feedback/toast/components/toast-icon'
import { ToastTitle } from '@components/feedback/toast/components/toast-title'
import { ToastContext } from '@components/feedback/toast/context/Toast.context.ts'
import type { ToastCompound } from '@components/feedback/toast/types'
import { Box } from '@components/layout/box'
import { createIconChildUtils } from '@utils/createIconChildUtils.ts'
import { cn } from '@utils/cn.ts'

const { hasIconChild } = createIconChildUtils(ToastIcon)

const Toast = (({
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

    return (
        <ToastContext.Provider value={{ variant }}>
            <Box
                as={'div'}
                ref={ref}
                className={cn(TOAST_STYLES.recipe({ variant }), className)}
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
                                onClick={onClose}
                            />
                        )}
                    </>
                )}
            </Box>
        </ToastContext.Provider>
    )
}) as ToastCompound

Toast.displayName = 'Toast'
Toast.Icon = ToastIcon
Toast.Title = ToastTitle
Toast.Description = ToastDescription
Toast.Actions = ToastActions
Toast.Close = ToastClose

export default Toast
