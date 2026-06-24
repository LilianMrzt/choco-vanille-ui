import * as React from 'react'

import { Typography } from '@components/foundation/typography'
import type { ButtonProps } from '@components/actions/button/types/Button.props.ts'
import { useButton } from '@components/actions/button/hooks/useButton.hook.ts'

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant, size, className, label, ...props }, ref) => {
        const { resolvedClassName } = useButton({ variant, size, className })

        return (
            <button
                ref={ref}
                className={resolvedClassName}
                {...props}
            >
                {label !== undefined && (
                    <Typography
                        as={'span'}
                        variant={'span'}
                        fontSize={'sm'}
                        fontWeight={'medium'}
                    >
                        {label}
                    </Typography>
                )}
            </button>
        )
    },
)

Button.displayName = 'Button'
