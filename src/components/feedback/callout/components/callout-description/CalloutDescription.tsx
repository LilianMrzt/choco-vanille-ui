import { vars } from '@theme/styles/contract/contract.css.ts'
import { Typography } from '@components/foundation/typography'
import type { CalloutDescriptionProps } from '@components/feedback/callout/components/callout-description/types'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

/**
 * Description text slot for `Callout`. Renders secondary-colored small
 * typography and forwards all `Typography` props.
 * @param props - Description content and native span attributes.
 * @param props.children - Description content.
 * @param props.className - Additional class.
 * @param props.ref - Ref to the span.
 * @returns A callout description.
 * @example
 * <Callout.Description>Changes saved.</Callout.Description>
 */
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
            fontSize={14}
            color={vars.color.text.secondary}
            className={cn(className)}
            {...props}
        >
            {children}
        </Typography>
    )
})

CalloutDescription.displayName = 'Callout.Description'

export default CalloutDescription
