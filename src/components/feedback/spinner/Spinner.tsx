import { SPINNER_STYLES } from '@components/feedback/spinner/Spinner.css.ts'
import type { SpinnerProps } from '@components/feedback/spinner/types'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

/**
 * Animated loading indicator rendered as a status region. Provide an accessible
 * name or descriptive content when the loading state needs an explanation.
 * Native attributes and the ref are forwarded to the span.
 *
 * @param props - Native span attributes and spinner options.
 * @param props.size - Size variant; defaults to `md`.
 * @param props.color - Semantic color intent; defaults to `primary`.
 * @param props.className - Additional class for the span.
 * @param props.role - Accessible role; defaults to `status`.
 * @param props.ref - Ref to the span.
 * @returns The loading indicator.
 * @example
 * <Spinner aria-label="Loading" />
 */
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
