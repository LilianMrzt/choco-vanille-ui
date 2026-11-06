import type * as React from 'react'

/** Shape variants for the Skeleton placeholder. */
export type SkeletonVariant = 'circular' | 'rectangular' | 'rounded'

export type SkeletonProps = Readonly<
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> &
    React.RefAttributes<HTMLDivElement> & {
        /** Shape variant of the placeholder. Defaults to `rounded`. */
        variant?: SkeletonVariant
        /** Explicit width for the placeholder. */
        width?: React.CSSProperties['width']
        /** Explicit height for the placeholder. */
        height?: React.CSSProperties['height']
    }
>
