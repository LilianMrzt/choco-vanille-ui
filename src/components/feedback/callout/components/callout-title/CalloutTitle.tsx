import { Typography } from '@components/foundation/typography'
import type { CalloutTitleProps } from '@components/feedback/callout/components/callout-title/types/CalloutTitle.props.ts'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

/**
 * Title text slot for `Callout`. Renders semibold small typography and
 * forwards all `Typography` props.
 */
const CalloutTitle: FC<CalloutTitleProps> = memo(({
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
            fontSize={14}
            fontWeight={'semibold'}
            className={cn(className)}
            {...props}
        >
            {children}
        </Typography>
    )
})

CalloutTitle.displayName = 'Callout.Title'

export default CalloutTitle
