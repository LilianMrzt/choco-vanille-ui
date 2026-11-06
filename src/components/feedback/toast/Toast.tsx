import { Children, isValidElement, memo, useCallback } from 'react'

import { TOAST_STYLES } from '@components/feedback/toast/Toast.css.ts'
import { ToastActions } from '@components/feedback/toast/components/toast-actions'
import { ToastClose } from '@components/feedback/toast/components/toast-close'
import { ToastDescription } from '@components/feedback/toast/components/toast-description'
import { ToastIcon } from '@components/feedback/toast/components/toast-icon'
import { ToastTitle } from '@components/feedback/toast/components/toast-title'
import { ToastContext } from '@components/feedback/toast/context/Toast.context.ts'
import type { ToastProps } from '@components/feedback/toast/types'
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
 * @param props - Toast content and root attributes.
 * @param props.variant - Visual intent; defaults to `info`.
 * @param props.role - Live-region role; defaults to `status`.
 * @param props.icon - Optional icon override.
 * @param props.title - Convenience title.
 * @param props.description - Convenience description.
 * @param props.closeLabel - Convenience close label; defaults to `Close notification`.
 * @param props.onClose - Renders the convenience close button when provided.
 * @param props.children - Compound content.
 * @param props.className - Additional root class.
 * @param props.ref - Ref to the root element.
 * @returns A notification card.
 * @example
 * <Toast title="Saved" variant="success" />
 */
const ToastRoot = memo<ToastProps>(({
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
})

ToastRoot.displayName = 'Toast'

/** Notification card with namespaced content slots. */
const Toast = Object.assign(ToastRoot, {
    Icon: ToastIcon,
    Title: ToastTitle,
    Description: ToastDescription,
    Actions: ToastActions,
    Close: ToastClose,
})

export default Toast
