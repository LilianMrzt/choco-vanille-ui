import { Typography } from '@components/foundation/typography'
import type { CalloutDescriptionProps } from '@components/feedback/callout/components/callout-description/types/CalloutDescription.props.ts'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

const CalloutDescription: FC<CalloutDescriptionProps> = memo(({
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
})

CalloutDescription.displayName = 'Callout.Description'

export default CalloutDescription
