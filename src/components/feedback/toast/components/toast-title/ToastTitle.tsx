import { ToastContext } from '@components/feedback/toast/context/Toast.context.ts'
import { VARIANT_TO_COLOR } from '@components/feedback/toast/constants'
import { TOAST_TITLE_STYLES } from '@components/feedback/toast/components/toast-title/ToastTitle.css.ts'
import type { ToastTitleProps } from '@components/feedback/toast/components/toast-title/types'
import { Typography } from '@components/foundation/typography'
import { cn } from '@utils/cn.ts'
import { memo, useContext, type FC } from 'react'

/**
 * Title text slot for `Toast`. Reads `variant` from context to resolve the
 * text color and renders semibold small typography.
 * @param props - Content and span attributes.
 * @param props.children - Title content.
 * @param props.className - Additional class.
 * @param props.ref - Ref to the span.
 * @returns The title.
 * @example
 * <Toast.Title>Saved</Toast.Title>
 */
const ToastTitle: FC<ToastTitleProps> = memo(({
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
            fontSize={14}
            fontWeight={'semibold'}
            color={VARIANT_TO_COLOR[variant]}
            className={cn(TOAST_TITLE_STYLES.title, className)}
            {...props}
        >
            {children}
        </Typography>
    )
})

ToastTitle.displayName = 'Toast.Title'

export default ToastTitle
