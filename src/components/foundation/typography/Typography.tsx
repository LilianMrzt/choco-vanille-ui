import * as React from 'react'

import type { TypographyProps } from '@components/foundation/typography/types/Typography.props.ts'
import { useTypography } from '@components/foundation/typography/hooks/useTypography.hook.ts'

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
    ({ as, asChild, variant, fontSize, fontWeight, ellipsis, className, ...props }, ref) => {
        const { element: Element, resolvedClassName } = useTypography({
            as,
            asChild,
            variant,
            fontSize,
            fontWeight,
            ellipsis,
            className,
        })

        return (
            <Element
                ref={ref}
                className={resolvedClassName}
                {...props}
            />
        )
    },
)

Typography.displayName = 'Typography'
