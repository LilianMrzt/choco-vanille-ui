import { SPINNER_STYLES } from '@components/feedback/spinner/styles/Spinner.css.ts'
import type { SpinnerProps } from '@components/feedback/spinner/types/Spinner.props.ts'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

const Spinner: FC<SpinnerProps> = memo(({
    size,
    color,
    className,
    role,
    ref,
    ...props
}) => (
    <span
        ref={ref}
        role={role ?? 'status'}
        className={cn(SPINNER_STYLES.recipe({ size, color }), className)}
        {...props}
    />
))

Spinner.displayName = 'Spinner'

export default Spinner
