import { TOAST_STYLES } from '@components/feedback/toast/Toast.css.ts'
import { ToastClose } from '@components/feedback/toast/components/toast-close'
import { ToastDescription } from '@components/feedback/toast/components/toast-description'
import { ToastIcon } from '@components/feedback/toast/components/toast-icon'
import { ToastTitle } from '@components/feedback/toast/components/toast-title'
import { ToastContext } from '@components/feedback/toast/context/Toast.context.ts'
import type { ToastCompound } from '@components/feedback/toast/types'
import { Flex } from '@components/layout/flex'
import { createIconChildUtils } from '@utils/createIconChildUtils.ts'
import { cn } from '@utils/cn.ts'

const { hasIconChild, extractIconChild } = createIconChildUtils(ToastIcon)

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
    const showDefaultIcon = !hasIconChild(children)
    const iconChild = extractIconChild(children)
    const remainingChildren = iconChild.remaining

    return (
        <ToastContext.Provider value={{ variant }}>
            <Flex
                ref={ref}
                alignItems={'start'}
                gap={'md'}
                className={cn(TOAST_STYLES.recipe({ variant }), className)}
                role={role === 'none' ? undefined : role}
                {...props}
            >
                {isCompound ? (
                    <>
                        {showDefaultIcon ? <ToastIcon icon={icon} /> : iconChild.node}
                        <Flex
                            flexDirection={'column'}
                            alignItems={'start'}
                            gap={'xs'}
                            minWidth={'none'}
                            flex={'1'}
                        >
                            {remainingChildren}
                        </Flex>
                    </>
                ) : (
                    <>
                        <ToastIcon icon={icon} />
                        <Flex
                            flexDirection={'column'}
                            alignItems={'start'}
                            gap={'xs'}
                            minWidth={'none'}
                            flex={'1'}
                        >
                            {title && <ToastTitle>{title}</ToastTitle>}
                            {description && (
                                <ToastDescription>{description}</ToastDescription>
                            )}
                        </Flex>
                        {onClose && (
                            <ToastClose
                                aria-label={closeLabel}
                                onClick={onClose}
                            />
                        )}
                    </>
                )}
            </Flex>
        </ToastContext.Provider>
    )
}) as ToastCompound

Toast.displayName = 'Toast'
Toast.Icon = ToastIcon
Toast.Title = ToastTitle
Toast.Description = ToastDescription
Toast.Close = ToastClose

export default Toast
