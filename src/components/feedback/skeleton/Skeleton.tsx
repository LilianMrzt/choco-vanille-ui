import { SKELETON_STYLES } from '@components/feedback/skeleton/styles/Skeleton.css.ts'
import type { SkeletonProps } from '@components/feedback/skeleton/types/Skeleton.props.ts'
import Box from '@components/layout/box/Box.tsx'
import { cn } from '@utils/cn.ts'
import { memo, type FC } from 'react'

/**
 * Animated loading placeholder with `variant` (circular|rectangular|rounded),
 * explicit `width`/`height`, and `aria-hidden` so assistive technology ignores
 * it while content loads.
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
            style={{ width, height, ...style }}
            {...props}
        />
    )
})

Skeleton.displayName = 'Skeleton'

export default Skeleton
