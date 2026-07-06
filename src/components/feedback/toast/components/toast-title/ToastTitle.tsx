import { ToastContext } from '@components/feedback/toast/context/Toast.context.ts'
import { VARIANT_TO_COLOR } from '@components/feedback/toast/constants'
import type { ToastTitleProps } from '@components/feedback/toast/components/toast-title/types/ToastTitle.props.ts'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'
import { useContext, type FC } from 'react'

const ToastTitle: FC<ToastTitleProps> = ({
    children,
    className,
    ref,
    ...props
}) => {
    const { variant } = useContext(ToastContext)

    return (
        <Typography
            ref={ref}
            as={'span'}
            variant={'span'}
            fontSize={'sm'}
            fontWeight={'semibold'}
            color={VARIANT_TO_COLOR[variant]}
            className={cn(className)}
            {...props}
        >
            {children}
        </Typography>
    )
}

ToastTitle.displayName = 'Toast.Title'

export default ToastTitle
