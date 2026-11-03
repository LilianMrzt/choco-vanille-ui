import { vars } from '@theme/styles/contract/contract.css.ts'
import type { ToastDescriptionProps } from '@components/feedback/toast/components/toast-description/types/ToastDescription.props.ts'
import { TOAST_DESCRIPTION_STYLES } from '@components/feedback/toast/components/toast-description/styles/ToastDescription.css.ts'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

/**
 * Description text slot for `Toast`. Renders secondary-colored small
 * typography and forwards all `Typography` props.
 */
const ToastDescription: FC<ToastDescriptionProps> = memo(({
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
            color={vars.color.text.secondary}
            className={cn(TOAST_DESCRIPTION_STYLES.description, className)}
            {...props}
        >
            {children}
        </Typography>
    )
})

ToastDescription.displayName = 'Toast.Description'

export default ToastDescription
