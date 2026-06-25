import { buttonRecipe } from '@components/actions/button/Button.css.ts'
import { Typography } from '@components/foundation/typography'
import type { ButtonProps } from '@components/actions/button/types/Button.props.ts'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

const Button: FC<ButtonProps> = ({
    variant,
    size,
    className,
    label,
    ref,
    ...props
}) => {
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
}

Button.displayName = 'Button'

export default Button
