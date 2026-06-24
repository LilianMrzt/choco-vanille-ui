import * as React from 'react'

import type { ButtonProps } from '@components/actions/button/types/Button.props.ts'
import { useButton } from '@components/actions/button/hooks/useButton.hook.ts'

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ asChild = false, variant, size, className, ...props }, ref) => {
        const { element: Element, resolvedClassName } = useButton({
            asChild,
            variant,
            size,
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

Button.displayName = 'Button'
