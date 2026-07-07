import { SKELETON_STYLES } from '@components/feedback/skeleton/styles/Skeleton.css.ts'
import type { SkeletonProps } from '@components/feedback/skeleton/types/Skeleton.props.ts'
import Box from '@components/layout/box/Box.tsx'
import { cn } from '@utils/cn.ts'
import type { FC } from 'react'

const Skeleton: FC<SkeletonProps> = ({
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
}

Skeleton.displayName = 'Skeleton'

export default Skeleton
