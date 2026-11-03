import type { ToastActionsProps } from '@components/feedback/toast/components/toast-actions/types/ToastActions.props.ts'
import { TOAST_ACTIONS_STYLES } from '@components/feedback/toast/components/toast-actions/styles/ToastActions.css.ts'
import { Flex } from '@components/layout/flex'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

/**
 * Actions slot for `Toast`. A flex row that aligns call-to-action buttons
 * at the end of the notification card.
 */
const ToastActions: FC<ToastActionsProps> = memo(({
    children,
    className,
    ref,
    ...props
}) => {
    return (
        <Flex
            ref={ref}
            flexDirection={'row'}
            alignItems={'center'}
            gap={8}
            justifyContent={'end'}
            className={cn(TOAST_ACTIONS_STYLES.actions, className)}
            width={'100%'}
            {...props}
        >
            {children}
        </Flex>
    )
})

ToastActions.displayName = 'Toast.Actions'

export default ToastActions
