import { SKELETON_STYLES } from '@components/feedback/skeleton/Skeleton.css.ts'
import type { SkeletonProps } from '@components/feedback/skeleton/types'
import Box from '@components/layout/box/Box.tsx'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

/**
 * Animated placeholder for content being loaded. It is hidden from assistive
 * technology by default; communicate loading separately when necessary.
 * Native div attributes and the ref are forwarded to the root element.
 *
 * @param props - Native div attributes and placeholder options.
 * @param props.variant - Shape; defaults to `rounded`.
 * @param props.width - CSS width.
 * @param props.height - CSS height.
 * @param props.className - Additional root class.
 * @param props.style - Inline style overrides, including dimensions.
 * @param props.ref - Ref to the root div.
 * @returns The placeholder.
 * @example
 * <Skeleton variant="rounded" width="12rem" height="2rem" />
 */
const Skeleton: FC<SkeletonProps> = memo(({
    variant,
    width,
    height,
    className,
    style,
    ref,
    ...props
}) => {
    return (
        <Box
            ref={ref}
            className={cn(SKELETON_STYLES.recipe({ variant }), className)}
            aria-hidden={'true'}
            width={width}
            height={height}
            style={style}
            {...props}
        />
    )
})

Skeleton.displayName = 'Skeleton'

export default Skeleton
