import type { ToastDescriptionProps } from '@components/feedback/toast/components/toast-description/types/ToastDescription.props.ts'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

const ToastDescription: FC<ToastDescriptionProps> = ({
    children,
    className,
    ref,
    ...props
}) => {
    return (
        <Typography
            ref={ref}
            as={'span'}
            variant={'span'}
            fontSize={'sm'}
            color={'textSecondary'}
            className={cn(className)}
            {...props}
        >
            {children}
        </Typography>
    )
}

ToastDescription.displayName = 'Toast.Description'

export default ToastDescription
