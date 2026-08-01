import type * as React from 'react'

import type { SkeletonVariant } from '@components/feedback/skeleton/types/Skeleton.types.ts'
import type { RefAttributes } from 'react'

export type SkeletonProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'children'
> &
  RefAttributes<HTMLDivElement> &
  {
    /** Shape variant of the placeholder. Defaults to `rounded`. */
    variant?: SkeletonVariant
    /** Explicit width for the placeholder. */
    width?: React.CSSProperties['width']
    /** Explicit height for the placeholder. */
    height?: React.CSSProperties['height']
  }
