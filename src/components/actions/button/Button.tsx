import * as React from 'react'

import { buttonRecipe } from '@components/actions/button/Button.css.ts'
import { Typography } from '@components/foundation/typography'
import type { ButtonProps } from '@components/actions/button/types/Button.props.ts'
import { cn } from '@utils/cn.ts'

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant, size, className, label, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(buttonRecipe({ variant, size }), className)}
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
